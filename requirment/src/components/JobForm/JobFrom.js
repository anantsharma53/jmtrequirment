
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../Header/Header';
import './JobForm.css';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FormPreview from '../FormPre/FormPre';
const initialValues = {
  post: '',
  // applicantName:'',
  fatherName: '',
  dob: '',
  correspondentAddress: '',
  permanentAddress: '',
  // mobileNumber: '',
  // email: '',
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
  post: Yup.string().required('Required'),
 applicantName: Yup.string(),
  fatherName: Yup.string().required('Required').min(3, 'Father Name must be at least 10 characters'),
  dob: Yup.date().required('Required'),
  correspondentAddress: Yup.string().required('Required').min(10, 'Address must be at least 10 characters'),
  permanentAddress: Yup.string().required('Required').min(10, 'Address must be at least 10 characters'),
  mobileNumber: Yup.string().required('Required').min(10, 'Mobile Number must be at least 10 characters'),
  email: Yup.string(),
  nationality: Yup.string().required('Required').min(3, 'Must be at least 10 characters'),
  education: Yup.array().of(
    Yup.object().shape({
      education: Yup.string().required('Required'),
      boardUniversity: Yup.string().required('Required'),
      passingYear: Yup.number().required('Required'),
      percentage: Yup.number().required('Required'),
    })
  ).min(1, 'At least one education entry is required'), // Ensure at least one education entry
  experience: Yup.array().of(
    Yup.object().shape({
      organization: Yup.string().required('Required'),
      years: Yup.string().required('Required'),
      remarks: Yup.string().required('Required'),
    })
  ).min(1, 'At least one experience entry is required'), // Ensure at least one experience entry
  category: Yup.string().required('Required'),
  gender: Yup.string().required('Required'),
  isPhysicallyChallenged: Yup.boolean().oneOf([true, false], 'Required'),
  declaration: Yup.boolean().oneOf([true, false], 'You must accept the terms and conditions'),
});


const JobApplicationForm = () => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [ApplicantData, setApplicantData] = useState([]);
  const [error, setError] = useState(null);
  const [application, setApplication] = useState()
  const [loader, setLoader] = useState(true);
  const [preview, setPreview] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userData, setUserData] = useState(
    {
      name: '',
      email: '',
      mobile_number: ''
    }
  )
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch('http://127.0.0.1:8000/api/user-information/', {
          headers: {
            'Authorization': `Bearer ${token}`,

          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch ApplicantData');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError('Error fetching ApplicantData');
      }
    };

    // Call the fetchUserData function when the component mounts
    fetchUserData();
  }, []);  // Pass an empty dependency array to run the effect only once when the component mounts
  console.log('UserData', { userData })
  const mergedValues = {
    ...initialValues,
    applicantName: userData.name || '',
    email: userData.email || '',
    mobileNumber: userData.mobile_number || '',
  };

  const formik = useFormik({
    initialValues: mergedValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      // Handle form submission
    },
  });
  useEffect(() => {
    const fetchApplicantApplicantData = async () => {
      try {
        const token = localStorage.getItem("token"); // Replace 'your_bearer_token' with the actual bearer token
        const response = await fetch('http://127.0.0.1:8000/api/applicant-information/', {
          headers: {
            'Authorization': `Bearer ${token}`,

          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch ApplicantData');
        }

        const data = await response.json();
        setApplicantData(data);
        setApplication(true)
        setLoader(false)
      } catch (error) {
        setApplication(false)
        setLoader(false)
        setError('Error fetching ApplicantData');
      }
    };

    fetchApplicantApplicantData();
  }, [preview]);


  const handlePreview = () => {
    // Manually set values for disabled fields
    formik.setFieldValue('applicantName', userData.name || '');
    formik.setFieldValue('email', userData.email || '');
    formik.setFieldValue('mobileNumber', userData.mobile_number || '');

    if (formik.isValid) {
      setPreview(true);
    }
  };
  console.log('Formik errors:', formik.errors);


  console.log(ApplicantData)
  return (
    <>
      {!preview ?
        (<main className='form-container'>
          {loader ? (
            <Loader />
          )
            :
            application ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p>Your form has been submitted successfully!</p>
                <p>Your Application Number :&nbsp;{ApplicantData.application_number}</p>
                <p>Please complete Part II</p>
              </div>
            ) : (
              <div >
                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                  {/* Post */}
                  <label htmlFor="post">Post</label>
                  <select {...formik.getFieldProps('post')} onBlur={() => formik.setFieldTouched('post')}>
                    <option value="" label="Select a post" />
                    <option value="post1" label="Post 1" />
                    <option value="post2" label="Post 2" />
                    {/* Add other options */}
                  </select>
                  {formik.touched.post && formik.errors.post ? <div className="error">{formik.errors.post}</div> : null}

                  {/* Applicant Name */}
                  <label htmlFor="applicantName">Applicant Name</label>
                  <input
                    type="text"
                    id="applicantName"
                    value={userData.name}  // Use userData.name directly
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled
                  />
                  {formik.touched.applicantName && formik.errors.applicantName ? (
                    <div className="error">{formik.errors.applicantName}</div>
                  ) : null}

                  {/* Father Name */}
                  <label htmlFor="fatherName">Father Name</label>
                  <input
                    type="text"
                    id="fatherName"
                    {...formik.getFieldProps('fatherName')}
                    onBlur={() => formik.setFieldTouched('fatherName')}
                    onChange={(e) => formik.setFieldValue('fatherName', e.target.value.toUpperCase())}
                  />
                  {formik.touched.fatherName && formik.errors.fatherName ? (
                    <div className="error">{formik.errors.fatherName}</div>
                  ) : null}

                  {/* Date of Birth */}
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    {...formik.getFieldProps('dob')}
                    onBlur={() => formik.setFieldTouched('dob')}
                  />
                  {formik.touched.dob && formik.errors.dob ? <div className="error">{formik.errors.dob}</div> : null}

                  {/* Correspondent Address */}
                  <label htmlFor="correspondentAddress">Correspondent Address</label>
                  <input
                    type="text"
                    id="correspondentAddress"
                    {...formik.getFieldProps('correspondentAddress')}
                    onBlur={() => formik.setFieldTouched('correspondentAddress')}
                    onChange={(e) => formik.setFieldValue('correspondentAddress', e.target.value.toUpperCase())}
                  />
                  {formik.touched.correspondentAddress && formik.errors.correspondentAddress ? (
                    <div className="error">{formik.errors.correspondentAddress}</div>
                  ) : null}

                  {/* Permanent Address */}
                  <label htmlFor="permanentAddress">Permanent Address</label>
                  <input
                    type="text"
                    id="permanentAddress"
                    {...formik.getFieldProps('permanentAddress')}
                    onBlur={() => formik.setFieldTouched('permanentAddress')}
                    onChange={(e) => formik.setFieldValue('permanentAddress', e.target.value.toUpperCase())}
                  />
                  {formik.touched.permanentAddress && formik.errors.permanentAddress ? (
                    <div className="error">{formik.errors.permanentAddress}</div>
                  ) : null}

                  {/* Mobile Number */}
                  <label htmlFor="mobileNumber">Mobile Number</label>
                  <input
                    type="text"
                    id="mobileNumber"
                    value={userData.mobile_number}  // Use userData.mobile_number directly
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled
                  />
                  {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                    <div className="error">{formik.errors.mobileNumber}</div>
                  ) : null}

                  {/* Email */}
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    value={userData.email}  // Use userData.email directly
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled
                  />
                  {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}

                  {/* Nationality */}
                  <label htmlFor="nationality">Nationality</label>
                  <input
                    type="text"
                    id="nationality"
                    {...formik.getFieldProps('nationality')}
                    onBlur={() => formik.setFieldTouched('nationality')}
                    onChange={(e) => formik.setFieldValue('nationality', e.target.value.toUpperCase())}
                  />
                  {formik.touched.nationality && formik.errors.nationality ? (
                    <div className="error">{formik.errors.nationality}</div>
                  ) : null}

                  {/* Education */}
                  <label>Education</label>
                  {formik.values.education.map((edu, index) => (
                    // Inside the map function for Education fields
                    <div key={index} className="education-fields">
                      {/* Education Input Fields */}
                      <input
                  type="text"
                  placeholder="Education"
                  {...formik.getFieldProps(`education[${index}].education`)}
                  onBlur={() => formik.setFieldTouched(`education[${index}].education`)}
                  onChange={(e) => formik.setFieldValue(`education[${index}].education`, e.target.value.toUpperCase())}
                />
                <input
                  type="text"
                  placeholder="Board/University"
                  {...formik.getFieldProps(`education[${index}].boardUniversity`)}
                  onBlur={() => formik.setFieldTouched(`education[${index}].boardUniversity`)}
                  onChange={(e) => formik.setFieldValue(`education[${index}].boardUniversity`, e.target.value.toUpperCase())}
                />
                <input
                  type="text"
                  placeholder="Passing Year"
                  {...formik.getFieldProps(`education[${index}].passingYear`)}
                  onBlur={() => formik.setFieldTouched(`education[${index}].passingYear`)}
                  onInput={(e) => {
                    // Allow only numeric input
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                />
                      <input
                  type="text"
                  placeholder="Percentage"
                  {...formik.getFieldProps(`education[${index}].percentage`)}
                  onBlur={() => formik.setFieldTouched(`education[${index}].percentage`)}
                  onInput={(e) => {
                    // Allow only numeric input
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                />


                      {/* Display Validation Errors */}
                      {/* {formik.touched.education && formik.errors.education ? (
                <div className="error">{formik.errors.education[index]?.education}</div>
              ) : null}
              {formik.touched.education && formik.errors.education ? (
                <div className="error">{formik.errors.education[index]?.boardUniversity}</div>
              ) : null}
              {formik.touched.education && formik.errors.education ? (
                <div className="error">{formik.errors.education[index]?.passingYear}</div>
              ) : null}
              {formik.touched.education && formik.errors.education ? (
                <div className="error">{formik.errors.education[index]?.percentage}</div>
              ) : null} */}
                    </div>

                  ))}

                  {/* Experience */}
                  <label>Experience</label>
                  {formik.values.experience.map((exp, index) => (
                    <div key={index} className="education-fields">
                      <input
                  type="text"
                  placeholder="Organization"
                  {...formik.getFieldProps(`experience[${index}].organization`)}
                  onBlur={() => formik.setFieldTouched(`experience[${index}].organization`)}
                />
                <input
                  type="text"
                  placeholder="In Month"
                  {...formik.getFieldProps(`experience[${index}].years`)}
                  onBlur={() => formik.setFieldTouched(`experience[${index}].years`)}
                  onInput={(e) => {
                    // Allow only numeric input
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                />
                <input
                  type="text"
                  placeholder="Remarks"
                  {...formik.getFieldProps(`experience[${index}].remarks`)}
                  onBlur={() => formik.setFieldTouched(`experience[${index}].remarks`)}
                />
                      {/* {formik.touched.experience && formik.errors.experience ? (
                <div>{formik.errors.experience[index]?.organization}</div>
              ) : null}
              {formik.touched.experience && formik.errors.experience ? (
                <div>{formik.errors.experience[index]?.years}</div>
              ) : null}
              {formik.touched.experience && formik.errors.experience ? (
                <div>{formik.errors.experience[index]?.remarks}</div>
              ) : null} */}
                    </div>
                  ))}

                  {/* Category */}
                  <div className="category-field">
                    {/* Category Label */}
                    <label htmlFor="category">Category</label>
                    {/* Category Dropdown */}
                    <select
                      {...formik.getFieldProps('category')}
                      onBlur={() => formik.setFieldTouched('category')}
                    >
                      <option value="" label="Select a category" />
                      <option value="gen" label="General" />
                      <option value="sc" label="SC" />
                      <option value="st" label="ST" />
                      <option value="ews" label="EWS" />
                      <option value="ebc1" label="EBC-1" />
                      <option value="ebc2" label="EBC-2" />
                    </select>

                    {/* Display Validation Errors */}
                    {formik.touched.category && formik.errors.category ? (
                      <div className="error">{formik.errors.category}</div>
                    ) : null}
                  </div>


                  {/* Gender */}
                  {/* // Inside the render code for Gender field */}
                  <div className="gender-field">
                    {/* Gender Label */}
                    <label>Gender</label>

                    {/* Gender Radio Buttons */}
                    <div role="group" aria-labelledby="gender">
                      <label>
                        <input
                          type="radio"
                          {...formik.getFieldProps('gender')}
                          value="male"
                          checked={formik.values.gender === 'male'}
                        />
                        Male
                      </label>
                      <label>
                        <input
                          type="radio"
                          {...formik.getFieldProps('gender')}
                          value="female"
                          checked={formik.values.gender === 'female'}
                        />
                        Female
                      </label>
                      <label>
                        <input
                          type="radio"
                          {...formik.getFieldProps('gender')}
                          value="tg"
                          checked={formik.values.gender === 'tg'}
                        />
                        TG
                      </label>
                    </div>

                    {/* Display Validation Errors */}
                    {formik.touched.gender && formik.errors.gender ? (
                      <div className="error" style={{ marginLeft: '15px' }}>{formik.errors.gender}</div>
                    ) : null}
                  </div>
                  <div className="gender-field">
                    {/* Physically Challenged */}
                    <label>Physically Challenged</label>
                    <div role="group" aria-labelledby="physicallyChallenged">
                      <label>
                        <input
                          type="radio"
                          {...formik.getFieldProps('isPhysicallyChallenged')}
                          value="true" // Use "true" and "false" as strings
                          checked={formik.values.isPhysicallyChallenged === "true"} // Check against "true" as string
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          {...formik.getFieldProps('isPhysicallyChallenged')}
                          value="false" // Use "true" and "false" as strings
                          checked={formik.values.isPhysicallyChallenged === "false"} // Check against "false" as string
                        />
                        No
                      </label>
                    </div>
                    {formik.touched.isPhysicallyChallenged && formik.errors.isPhysicallyChallenged ? (
                      <div className="error" style={{ marginLeft: '15px' }}>{formik.errors.isPhysicallyChallenged}</div>
                    ) : null}
                  </div>


                  {/* Declaration */}
                  <div style={{ display: 'flex', alignItems: 'start', margin: '16px' }}>

                    <label>
                      <span>
                        <input
                          type="checkbox"
                          id="declaration"
                          {...formik.getFieldProps('declaration')}
                          checked={formik.values.declaration}
                        />

                      </span>

                    </label><p style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                      I hereby declare that the information provided in this form is true, complete, and accurate to the best of my knowledge. I understand that any false statement or omission may result in disqualification from consideration or, if already employed, in disciplinary action, up to and including termination.
                      <br />
                      I further understand that submission of this form does not guarantee acceptance or approval, and decisions will be made based on the criteria specified by Organization.
                    </p>

                  </div>
                  {formik.touched.declaration && formik.errors.declaration ? (
                    <div className="error" >{formik.errors.declaration}</div>
                  ) : null}
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {/* <button type="submit" style={{width:'30%'}}>Submit</button> */}

                  </div>

                </form>
                <button onClick={handlePreview} style={{ width: '95%', margin: '15px' }}>Preview</button>

              </div>
            )}
        </main>) :
        <FormPreview formValues={JSON.stringify(formik.values)} />
      }</>
  );
};

export default JobApplicationForm;