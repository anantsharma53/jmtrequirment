// import React, { useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';

// const YourComponent = () => {
//   const [UserData, setUserData] = useState({
//     name: '',
//     email: '',
//     mobile_number: '',
//     // Add other fields as needed
//   });
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await fetch('http://127.0.0.1:8000/api/user-information/', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch UserData');
//         }

//         const data = await response.json();
//         setUserData(data);
        
//       } catch (error) {
//         console.error('Error fetching UserData:', error);
//       }
//     };

//     fetchUserData();
//   }, []);
//   const initialValues = {
//     post: '',
//     applicantName: '',
//     fatherName: '',
//     dob: '',
//     correspondentAddress: '',
//     permanentAddress: '',
//     mobileNumber: '',
//     email: '',
//     nationality: '',
//     education: [
//       { education: '', boardUniversity: '', passingYear: '', percentage: '' },
//       { education: '', boardUniversity: '', passingYear: '', percentage: '' },
//       { education: '', boardUniversity: '', passingYear: '', percentage: '' },
//     ],
//     experience: [
//       { organization: '', years: '', remarks: '' },
//       { organization: '', years: '', remarks: '' },
//       { organization: '', years: '', remarks: '' },
//     ],
//     category: '',
//     gender: '',
//     isPhysicallyChallenged: false,
//     image: null,
//     signature: null,
//     declaration: false,
//   };

//   const validationSchema = Yup.object({
//     post: Yup.string().required('Required'),
//     applicantName: Yup.string().required('Required'),
//     fatherName: Yup.string().required('Required').min(3, 'Father Name must be at least 10 characters'),
//     dob: Yup.date().required('Required'),
//     correspondentAddress: Yup.string().required('Required').min(10, 'Address must be at least 10 characters'),
//     permanentAddress: Yup.string().required('Required').min(10, 'Address must be at least 10 characters'),
//     mobileNumber: Yup.string(),
//     email: Yup.string(),
//     nationality: Yup.string().required('Required').min(3, 'Must be at least 10 characters'),
//     education: Yup.array().of(
//       Yup.object().shape({
//         education: Yup.string().required('Required'),
//         boardUniversity: Yup.string().required('Required'),
//         passingYear: Yup.number().required('Required'),
//         percentage: Yup.number().required('Required'),
//       })
//     ).min(1, 'At least one education entry is required'), // Ensure at least one education entry
//     experience: Yup.array().of(
//       Yup.object().shape({
//         organization: Yup.string().required('Required'),
//         years: Yup.string().required('Required'),
//         remarks: Yup.string().required('Required'),
//       })
//     ).min(1, 'At least one experience entry is required'), // Ensure at least one experience entry
//     category: Yup.string().required('Required'),
//     gender: Yup.string().required('Required'),
//     isPhysicallyChallenged: Yup.boolean().oneOf([true, false], 'Required'),
//     declaration: Yup.boolean().oneOf([true, false], 'You must accept the terms and conditions'),
//   });

//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit: (values, { resetForm }) => {
     

//       fetch('http://127.0.0.1:8000/api/job-application/', {
//         method: 'POST',
//         body: JSON.stringify(values),
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((res) => {
//           console.log(res);
//           if (res.status === 201) {
//             console.log('Form submitted:', values);
//             navigate('/dashboard');
//           } else if (res.status === 401) {
//             console.log('Unauthorized request');
//             navigate('/');
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     },
//   });

  
//   const handlePreview = () => {
//     if (formik.isValid) {
//       console.log('I am on submit');
//       console.log(formik.values);

//       // Store form values in localStorage
//       localStorage.setItem('formValues', JSON.stringify(formik.values));

//       // Open the preview page in a new window or tab
//       const previewWindow = window.open('/preview');

//       // Optionally, you can focus on the new window
//       previewWindow && previewWindow.focus();
//     }
//   };
//   console.log('Formik errors:', formik.errors);
//   return (
//     <>
//     <form onSubmit={formik.handleSubmit}>
//       {/* ... (other form fields) */}
//       <label htmlFor="post">Post</label>
//                   <select {...formik.getFieldProps('post')} onBlur={() => formik.setFieldTouched('post')}>
//                     <option value="" label="Select a post" />
//                     <option value="post1" label="Post 1" />
//                     <option value="post2" label="Post 2" />
//                     {/* Add other options */}
//                   </select>
//                   {formik.touched.post && formik.errors.post ? <div className="error">{formik.errors.post}</div> : null}


//       <label htmlFor="applicantName">Applicant Name</label>
//       <input
//         type="text"
//         id="applicantName"
//         value={UserData.name.toUpperCase()}
//         // onChange={(e) => setUserData({ ...UserData, name: UserData.name.toUpperCase() })}
        
//       />
//       {/* Add validation and error handling as needed */}

//       <label htmlFor="mobileNumber">Mobile Number</label>
//       <input
//         type="text"
//         id="mobileNumber"
//         value={UserData.mobile_number}
//         onChange={(e) => setUserData({ ...UserData, mobile_number: UserData.mobile_number })}
//         disabled
//       />
//       {/* Add validation and error handling as needed */}

//       <label htmlFor="email">Email</label>
//       <input
//         type="text"
//         id="email"
//         value={UserData.email}
//         onChange={(e) => setUserData({ ...UserData, email: UserData.email })}
//         disabled
//       />
//       {/* Add validation and error handling as needed */}

//       {/* ... (other form fields) */}

//       <button type="submit">Submit</button>
//     </form>
//     <button  onClick={handlePreview} style={{width:'95%',margin:'15px'}}>Preview</button>
//     </>
//   );
// };

// export default YourComponent;


import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Sign.css';
import Header from '../Header/Header';
import { Twilio } from 'twilio';

function Sign() {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState({});
  const [flashMessage, setFlashMessage] = useState(null);
  const navigate = useNavigate();

  // Add state to manage OTP and verification status
  const [otpSent, setOtpSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  // Function to send OTP
// ...

const sendOTP = async (mobileNumber) => {
    try {
      const accountSid = 'ACde26b264cc7a93237d16acd96940e50a';
      const authToken = 'd25dcb0a1430312af98231f1d8677a70';
      const client = require('twilio')(accountSid, authToken);
  
      const verification = await client.verify
        .services('VAadbb57fc9c5ad89db67eb985153ff123')
        .verifications.create({
          to: `+91${mobileNumber}`, // Replace with your country code
          channel: 'sms',
        });
  
      console.log(verification);
      setOtpSent(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };
  
  const verifyOTP = async (mobileNumber, code) => {
    try {
      const accountSid = 'ACde26b264cc7a93237d16acd96940e50a';
      const authToken = 'd25dcb0a1430312af98231f1d8677a70';
      const client = require('twilio')(accountSid, authToken);
  
      const verificationCheck = await client.verify
        .services('VAadbb57fc9c5ad89db67eb985153ff123')
        .verificationChecks.create({
          to: `+91${mobileNumber}`, // Replace with your country code
          code: code,
        });
  
      console.log(verificationCheck);
  
      if (verificationCheck.status === 'approved') {
        // OTP verified successfully, proceed with form submission
        handleSubmit(user);
      } else {
        console.error('Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };
  
  // ...
  
  // Rest of your component code...

  return (
    <>
      {/* ... Your existing JSX */}
      <Formik
        initialValues={{
          // ... Your existing form fields
          mobile_number: '',
        }}
        validationSchema={Yup.object().shape({
          // ... Your existing validation rules
          mobile_number: Yup.number().required('Mobile Number is required'),
        })}
        onSubmit={(fields) => {
          // If OTP has not been sent, send OTP
          if (!otpSent) {
            sendOTP(fields.mobile_number);
          } else {
            // If OTP has been sent, verify the entered code
            verifyOTP(fields.mobile_number, verificationCode);
          }
        }}
      >
        {/* Your existing Formik component */}
        {({ errors, status, touched }) => (
          <section className="">
            {/* ... Your existing JSX */}
            <Form id="signForm">
              {/* ... Your existing form fields */}
              <div className="mb-3 form-control-group">
                <label className="form-label" htmlFor="mobile_number">
                  Mobile Number
                </label>
                <Field
                  name="mobile_number"
                  type="number"
                  onInput={(e) => {
                    setUser({ ...user, mobile_number: e.target.value });
                  }}
                  className={'form-control' + (errors.mobile_number && touched.mobile_number ? ' is-invalid' : '')}
                />
                <ErrorMessage name="mobile_number" component="div" className="invalid-feedback" />
              </div>
              {/* New field for verification code */}
              {otpSent && (
                <div className="mb-3 form-control-group">
                  <label className="form-label" htmlFor="verificationCode">
                    Verification Code
                  </label>
                  <Field
                    name="verificationCode"
                    type="text"
                    onInput={(e) => setVerificationCode(e.target.value)}
                    className={'form-control' + (errors.verificationCode && touched.verificationCode ? ' is-invalid' : '')}
                  />
                  <ErrorMessage name="verificationCode" component="div" className="invalid-feedback" />
                </div>
              )}
              <div className="mb-3 form-control-group">
                <button type="submit" className="loginbutton" style={{ textDecoration: 'none', textAlign: 'center', width: '100%' }}>
                  {otpSent ? 'Verify OTP' : 'Send OTP'}
                </button>
              </div>
              {/* ... Your existing JSX */}
            </Form>
          </section>
        )}
      </Formik>
      {/* ... Your existing JSX */}
    </>
  );
}

export default Sign;
