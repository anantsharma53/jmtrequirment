import './Header.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function Header() {
    let token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const checkTokenExpiration = () => {
            const tokenExpiration = localStorage.getItem('tokenExpiration');
            if (tokenExpiration) {
                const expirationDate = new Date(tokenExpiration);
                const currentDate = new Date();
                    
                if (currentDate >= expirationDate) {
                    // Token is expired, redirect to login page
                    console.log("expire")
                    navigate('/');

                }
            } else {
                // Token expiration not found, redirect to login page
                navigate('/');
            }
        };

        // Check token expiration on component mount
        checkTokenExpiration();

        // Set up interval to check token expiration periodically
        const interval = setInterval(() => {
            checkTokenExpiration();
        }, 60000); // Check every minute, adjust as needed

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, [navigate]);

    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('user_details');

        // Redirect to the login page
        navigate('/');
    };

    return (
        <>
            <nav className="no-print" >
                <div className="logo" >
                    <a style={{ textDecoration: 'none', color: 'black' }}
                        href="https://jamtara.nic.in/" title="Go to home" class="emblem" rel="home">
                        <img class="site_logo"
                            height="80" id="logo"
                            src="https://cdn.s3waas.gov.in/s313f320e7b5ead1024ac95c3b208610db/uploads/2020/09/2020091221.jpg"
                            alt="" />

                        <p style={{ marginTop: '15px' }}>
                            <strong>&nbsp;&nbsp;जिला जामताड़ा </strong>
                            <br></br>
                            <strong>&nbsp;&nbsp;DISTRICT JAMTARA</strong>
                        </p>
                    </a>
                    <p style={{ marginTop: '15px' }}>
                        <strong>Help Desk no-: XXXXXXXXX | XXXXXXXXX (10 AM to 6 PM)&nbsp;
                        </strong>
                        <br></br>
                        <strong>Help Desk Email -: XXXXXXXXXXX@gmail.com &nbsp; {token ?
                            <button onClick={handleLogout} className='logout'>Logout</button> :
                            null
                        }&nbsp;</strong>
                    </p>


                </div>

                <hr style={{ margin: '0' }} />

            </nav>



        </>
    );
}
export default Header;
