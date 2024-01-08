import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import './Dashboard.css';
import SidePanel from '../SidePanel/SidePanel';
import { Navigate, useNavigate } from 'react-router-dom';
import JobApplicationForm from '../JobForm/JobFrom';
import ImageSignatureForm from '../UploadFile/UploadFile';
import ApplicantProfile from '../Displayform/Displayform';
import jwtDecode from 'jwt-decode';


const Layout = () => {
  const [selectedMenu, setSelectedMenu] = useState('menu-item-1');
  const navigate = useNavigate();

  const handleMenuClick = (menuItem) => {
    setSelectedMenu(menuItem);
  };

  const handlePrint = () => {
    const sidePanel = document.querySelector('.side-panel');

    sidePanel.classList.add('show-side-panel');

    window.print();

    sidePanel.classList.remove('show-side-panel');
  };

  const renderContent = () => {
    // Check if the token is expired
    const isTokenExpired = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          return decodedToken.exp < currentTime;
        } catch (error) {
          // Handle any error that occurs during token decoding, if necessary
          return true; // Consider token expired if there's an error
        }
      }

      return true; // Token not found, consider it expired
    };

    // Redirect to login page if token is expired
    if (isTokenExpired()) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      localStorage.removeItem('user_details');
      navigate('/'); // Use history.push('/') to navigate to the login page
      return null; // Do not render anything if redirected
    }

    // Render content based on the selected menu
    switch (selectedMenu) {
      case 'menu-item-1':
        return <JobApplicationForm />;
      case 'menu-item-2':
        return <ImageSignatureForm />;
      case 'menu-item-3':
        return (
          <div style={{ alignItems: 'center' }}>
            <ApplicantProfile />
            <button onClick={handlePrint} style={{ marginLeft: '25%', width: '50%' }}>
              Print
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="layout-container">
      {/* Add a class 'no-print' to the Header to hide it when printing */}
      <Header className="no-print" />
      <div className="main-content">
        <SidePanel onMenuClick={handleMenuClick} className="side-panel" />
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Layout;




























// import React from 'react';
// import Header from '../Header/Header';
// import './Dashboard.css'
// import SidePanel from '../SidePanel/SidePanel';
// import { useState } from 'react';
// import JobApplicationForm from '../JobForm/JobFrom';
// import ImageSignatureForm from '../UploadFile/UploadFile';
// import ApplicantProfile from '../Displayform/Displayform';

// const Layout = () => {
//   const [selectedMenu, setSelectedMenu] = useState('menu-item-1');

//   const handleMenuClick = (menuItem) => {
//     setSelectedMenu(menuItem);
//   };

//   const handlePrint = () => {
//     const sidePanel = document.querySelector('.side-panel');
    
//     sidePanel.classList.add('show-side-panel');
    
//     window.print();
    
//     sidePanel.classList.remove('show-side-panel');
//   };

//   const renderContent = () => {
//     switch (selectedMenu) {
//       case 'menu-item-1':
//         return <JobApplicationForm />;
//       case 'menu-item-2':
//         return <ImageSignatureForm />;
//       case 'menu-item-3':
//         return (
//           <div style={{ alignItems: 'center' }}>
//             <ApplicantProfile />
//             <button onClick={handlePrint} style={{ marginLeft: '25%', width: '50%' }}>
//               Print
//             </button>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="layout-container">
//       {/* Add a class 'no-print' to the Header to hide it when printing */}
//       <Header className="no-print" />
//       <div className="main-content">
//         <SidePanel onMenuClick={handleMenuClick} className="side-panel" />
//         <div className="content">{renderContent()}</div>
//       </div>
//     </div>
//   );
// };

// export default Layout;
