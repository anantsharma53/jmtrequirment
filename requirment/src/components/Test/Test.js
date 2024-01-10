import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const YourComponent = () => {
  const [UserData, setUserData] = useState({
    name: '',
    email: '',
    mobile_number: '',
    // Add other fields as needed
  });

  const initialValues = {
    post: '',
    applicantName: '',
    fatherName: '',
    dob: '',
    correspondentAddress: '',
    permanentAddress: '',
    mobileNumber: '',
    email: '',
    nationality: '',
    education: [
      { education: '', boardUniversity: '', passingYear: '', percentage: '' },
      { education: '', boardUniversity: '', passingYear: '', percentage: '' },
      { education: '', boardUniversity: '', passingYear: '', percentage: '' },
    ],
    experience: [
      { organization: '', years: '', remarks: '' },
      { organization: '', years: '', remarks: '' },
      { organization: '', years: '', remarks: '' },
    ],
    category: '',
    gender: '',
    isPhysicallyChallenged: false,
    image: null,
    signature: null,
    declaration: false,
  };

  const validationSchema = Yup.object({
    // Define your validation schema
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
     

      fetch('http://127.0.0.1:8000/api/job-application/', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            console.log('Form submitted:', values);
            navigate('/dashboard');
          } else if (res.status === 401) {
            console.log('Unauthorized request');
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/api/user-information/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch UserData');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching UserData:', error);
      }
    };

    fetchUserData();
  }, []);
  const handlePreview = () => {
    if (formik.isValid) {
      console.log('I am on submit');
      console.log(formik.values);

      // Store form values in localStorage
      localStorage.setItem('formValues', JSON.stringify(formik.values));

      // Open the preview page in a new window or tab
      const previewWindow = window.open('/preview');

      // Optionally, you can focus on the new window
      previewWindow && previewWindow.focus();
    }
  };
  console.log('Formik errors:', formik.errors);
  return (
    <>
    <form onSubmit={formik.handleSubmit}>
      {/* ... (other form fields) */}

      <label htmlFor="applicantName">Applicant Name</label>
      <input
        type="text"
        id="applicantName"
        value={UserData.name.toUpperCase()}
        onChange={(e) => setUserData({ ...UserData, name: e.target.value })}
      />
      {/* Add validation and error handling as needed */}

      <label htmlFor="mobileNumber">Mobile Number</label>
      <input
        type="text"
        id="mobileNumber"
        value={UserData.mobile_number}
        onChange={(e) => setUserData({ ...UserData, mobile_number: e.target.value })}
      />
      {/* Add validation and error handling as needed */}

      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        value={UserData.email}
        onChange={(e) => setUserData({ ...UserData, email: e.target.value })}
      />
      {/* Add validation and error handling as needed */}

      {/* ... (other form fields) */}

      <button type="submit">Submit</button>
    </form>
    <button  onClick={handlePreview} style={{width:'95%',margin:'15px'}}>Preview</button>
    </>
  );
};

export default YourComponent;
