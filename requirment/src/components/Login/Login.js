import './Login.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
function Login() {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleSignupVisibility = () => {
        setShowSignup(!showSignup);
    };
    let navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/api/signin/", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
    
          },
        })
          .then((res) => {
            if (res.ok) {
              return res.json(); // Parse response as JSON
            } else if (res.status === 400) {
              console.log("Unauthorized request");
              alert("Login Error");
              throw new Error("Unauthorized request");
            } else {
              console.log("Something went wrong");
              throw new Error("Something went wrong");
            }
          })
          .then((data) => {
            console.log(data);
            const { user, access } = data;
            localStorage.setItem("token", data.access);
            localStorage.setItem("tokenExpiration", data.access);
            localStorage.setItem("user_details", JSON.stringify(user));
             const users = JSON.parse(localStorage.getItem('user_details'));
             const iscandiate = users && users.is_candiate;
             if(iscandiate)
             {
            //    navigate("/form");
                navigate("/dashboard");
             }
             else{
               navigate("/");
             }
            
          })
          .catch((err) => {
            alert("Check your Username Or Password");
            console.log(err);
          });
      }
    return (
        <>
            <div className='login-container'>
                <Header></Header>
                <div className='login-content'>
                    <div className='form-container'>
                        <div className='information'>
                            <h2>Important Informations</h2>
                            <ol>
                                <li style={{ padding: '12px' }}> Requirment Details</li>
                            </ol>
                            <div style={{ width: '300px', color: 'red', textAlign: 'justify' }}>
                                <p>
                                नोट:-  सभी अभ्यर्थियों को सूचित किया जाता है कि उपर्युक्त्त समय में अपने आवेदन पत्र 
                                भरते समय हुई त्रुटियों का उचित संशोधन कर लें। यह संशोधन का अंतिम अवसर होगा, 
                                इसके बाद संशोधन का कोई भी अनुरोध विचारणीय नहीं होगा।
                                </p>
                            </div>
                        </div>
                        <div className='form-content'>
                            <div className='content'>
                                <div>
                                    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                                        <h1>Login</h1>
                                    </div>
                                    <form id='loginForm'>
                                        <div className="mb-3 form-control-group">
                                            <label className="form-label">User Name</label>
                                            <input
                                                type="text"
                                                id="username"
                                                className="form-control"
                                                placeholder="User Name"
                                                name="username"
                                                onChange={handleChange}
                                                value={user.username}
                                            />
                                        </div>
                                        <div className="mb-3 form-control-group password-container">
                                            <label className="form-label">Password</label>
                                            <div className="password-input">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="password"
                                                    name="password"
                                                    id="password"
                                                    onChange={handleChange}
                                                    value={user.password}
                                                    className="form-control"
                                                />
                                                <button
                                                    type="button"
                                                    className="eye-button"
                                                    onClick={togglePasswordVisibility}
                                                >
                                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                                </button>
                                            </div>
                                        </div>
                                        </form>
                                        <div style={{ justifyContent: 'space-between', display:'flex', marginBottom: '16px' }}>
                                            <Link style={{ textDecoration:'none', color:'black', cursor: 'pointer', fontWeight: 'bold',marginTop: '16px' }}>
                                                Forgot Password ?
                                            </Link>
                                            <button className='loginbutton' type='submit'onClick={handleSubmit} style={{marginTop:'10px'}}>
                                                Login
                                            </button>
                                        </div>
                                        <div className='' style={{display:'flex',textDecoration:'none'}}>
                                            New Candiate ?
                                            <Link to="/register" style={{ fontWeight: 'bold', cursor: 'pointer', textDecoration:'none', color:'black' }}                                           
                                            > Register New Candidate</Link>
                                        </div>                                  
                               </div>
                            </div>
                        </div>                           
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;