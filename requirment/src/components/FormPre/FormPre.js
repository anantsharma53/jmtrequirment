import React from 'react';
import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom';
import './FormPre.css';
const FormPreview = ({ formValues }) => {
    const values = JSON.parse(formValues);
    const [formSubmitted, setFormSubmitted] = useState(false);
    let token = localStorage.getItem("token");
    const navigate = useNavigate();

   

    const handleSubmit = () => {
        fetch("http://127.0.0.1:8000/api/job-application/", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,

            },

        })
            .then((res) => {
                console.log(res);
                if (res.status === 201) {
                    // document.getElementById("signForm").reset();
                    // setFlashMessage("Registration successful!");
                    // setTimeout(removeFlashMessage, 1000);
                    console.log('Form submitted:', values);
                    window.location.reload();
                    navigate("/dashboard");

                } else if (res.status === 401) {
                    console.log("Unauthorized request");
                    navigate("/");
                }
            })
            .catch((err) => {
                console.log(err);
            });
        // Add your submit logic here
        console.log('Form submitted:', values);
    };
    const calculateTotalExperience = () => {
        if (!values.experience || values.experience.length === 0) {
            return 0; // or whatever default value you want when there is no experience
        }

        return values.experience.reduce((total, currentExp) => {
            // Assuming years are represented as strings, convert to numbers for addition
            return total + parseInt(currentExp.years, 10);
        }, 0);
    };

    // ...

    // Use the function in your component
    { calculateTotalExperience() }

    return (
        <>
            {/* <Header /> */}


            <div className="applicant-details-container">
                <div className="header-section">
                    <div className="logo" >
                        <img
                            src="https://cdn.s3waas.gov.in/s313f320e7b5ead1024ac95c3b208610db/uploads/2020/09/2020091221.jpg"
                            alt="" style={{ height: '80px', width: 'auto' }} />
                        <p>
                            <strong>जिला जामताड़ा </strong>
                            <br></br>
                            <strong>DISTRICT JAMTARA</strong>
                        </p>
                    </div>

                </div>
                <div style={{ margin: '0', marginBottom: '3px' }}>
                    <hr style={{ margin: '0' }} />
                    <p style={{ margin: '0', marginBottom: '3px' }}><strong>Post Name:</strong> &nbsp;&nbsp;&nbsp;{values.post}</p>
                    <p style={{ margin: '0', marginBottom: '3px' }}><strong>Application Number:</strong> &nbsp;&nbsp;&nbsp;</p>
                    <hr style={{ margin: '0' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="personal-info">
                        <h2>Personal Information</h2>
                        <table className="applicant-info-table">
                            <tbody>
                                <tr>
                                    <td><strong>Name:</strong></td>
                                    <td>{values.applicantName}</td>
                                </tr>
                                <tr>
                                    <td><strong>Father's Name:</strong></td>
                                    <td>{values.fatherName}</td>
                                </tr>
                                <tr>
                                    <td><strong>Date of Birth:</strong></td>
                                    <td>{values.dob}</td>
                                </tr>
                                <tr>
                                    <td><strong>Correspondent Address:</strong></td>
                                    <td>{values.correspondentAddress}</td>
                                </tr>
                                <tr>
                                    <td><strong>Permanent Address:</strong></td>
                                    <td>{values.permanentAddress}</td>
                                </tr>
                                <tr>
                                    <td><strong>Mobile Number:</strong></td>
                                    <td>{values.mobileNumber}</td>
                                </tr>
                                <tr>
                                    <td><strong>Email:</strong></td>
                                    <td>{values.email}</td>
                                </tr>
                                <tr>
                                    <td><strong>Nationality:</strong></td>
                                    <td>{values.nationality}</td>
                                </tr>
                                <tr>
                                    <td><strong>Category:</strong></td>
                                    <td>{values.category}</td>
                                </tr>
                                <tr>
                                    <td><strong>Gender:</strong></td>
                                    <td>{values.gender}</td>
                                </tr>
                                <tr>
                                    <td><strong>Physically Challenged:</strong></td>
                                    <td>{values.isPhysicallyChallenged ? 'Yes' : 'No'}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className="image-section" style={{alignItems:'center'}}>
                        {values.image ? (
                            <img className="profile-image" src={`http://127.0.0.1:8000/${values.image}`} alt="Applicant Image" />
                        ) : (
                            <img src={'https://rkmvdeoghar.org//domains/rkmvdeoghar.org/documents/old_images/Sample-Passport-photo-251x300.jpg'} 
                                alt="Dummy Image" style={{ height: '100px', width: '100px', border: '1px solid #ddd', padding: '5px' }} />
                        )}

                        {values.signature ? (
                            <img className="profile-signature" src={`http://127.0.0.1:8000/${values.signature}`} alt="Applicant Signature" />
                        ) : (
                            <img src={'https://clipart-library.com/data_images/26386.jpg'} 
                                alt="Dummy Image" style={{ height: '80px', width: '250px', border: '1px solid #ddd', padding: '5px' }} />
                        )}
                    </div>
                    {/* <div className="image-section">
                        <img className="profile-image" src={`http://127.0.0.1:8000/${values.image}`} alt="Applicant Image" />
                        <img className="profile-signe" src={`http://127.0.0.1:8000/${values.signature}`} alt="Applicant Signature" />


                    </div> */}
                </div>
                <div className="pre-education-section">
                    <h2>Education</h2>
                    <table className="pre-education-container">
                        <thead>
                            <tr>
                                <th>Education</th>
                                <th>Board/University</th>
                                <th>Passing Year</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {values.education && values.education.map((edu, index) => (
                                <tr key={index} className="pre-education-item">
                                    <td><strong>{edu.education}</strong></td>
                                    <td>{edu.boardUniversity}</td>
                                    <td>{edu.passingYear}</td>
                                    <td>{edu.percentage}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

                <div className="experience-section">
                    <h2>Experience</h2>
                    <table className="experience-container">
                        <thead>
                            <tr>
                                <th>Organization</th>
                                <th>In Months</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {values.experience ? (
                                values.experience.map((exp, index) => (
                                    <tr key={index} className="experience-item">
                                        <td><strong>{exp.organization}</strong></td>
                                        <td>{exp.years}</td>
                                        <td>{exp.remarks}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="experience-item">
                                    <td colSpan="3">No experience available</td>
                                </tr>
                            )}
                            {/* Total Experience Row */}
                            {values.experience && (
                                <tr className="experience-item">
                                    <td>Total Experience:</td>
                                    <td colSpan="2">{calculateTotalExperience()}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>

                <p style={{ marginLeft: '10px', textAlign: 'justify' }}>
                    I hereby declare that the information provided in this form is true, complete, and accurate to the best of my knowledge. I understand that any false statement or omission may result in disqualification from consideration or, if already employed, in disciplinary action, up to and including termination.
                    <br />
                    I further understand that submission of this form does not guarantee acceptance or approval, and decisions will be made based on the criteria specified by Organization.
                </p>
                <button onClick={handleSubmit} style={{ width: '100%' }}>Submit</button>
            </div>

        </>
    );
};

export default FormPreview;
