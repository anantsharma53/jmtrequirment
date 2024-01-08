import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './UploadFile.css'
const MAX_IMAGE_SIZE_KB = 100;
const MAX_SIGNATURE_SIZE_KB = 100;

const ImageSignatureForm = () => {
    const [selectedImagePreview, setSelectedImagePreview] = useState(null);
    const [selectedSignaturePreview, setSelectedSignaturePreview] = useState(null);
    const [ApplicantData, setApplicantData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        formik.setFieldValue('image', event.target.files[0]);
        setSelectedImagePreview(URL.createObjectURL(event.target.files[0]));
    };

    const handleSignatureChange = (event) => {
        formik.setFieldValue('signature', event.target.files[0]);
        setSelectedSignaturePreview(URL.createObjectURL(event.target.files[0]));
    };

    const validateAndSetImage = (event) => {
        const file = event.target.files[0];

        if (file) {
            const fileSize = file.size / 1024; // Convert size to kilobytes

            if (fileSize > MAX_IMAGE_SIZE_KB) {
                alert(`Image size should be between 20 KB and ${MAX_IMAGE_SIZE_KB} KB.`);
                event.target.value = ''; // Clear the file input
            } else {
                handleImageChange(event);
            }
        }
    };

    const validateAndSetSignature = (event) => {
        const file = event.target.files[0];

        if (file) {
            const fileSize = file.size / 1024; // Convert size to kilobytes

            if (fileSize > MAX_SIGNATURE_SIZE_KB) {
                alert(`Signature size should be between 20 KB and ${MAX_SIGNATURE_SIZE_KB} KB.`);
                event.target.value = ''; // Clear the file input
            } else {
                handleSignatureChange(event);
            }
        }
    };

    const submitFormToServer = async (formData) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/upload-files/", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: formData,
            });

            if (response.ok) {
                console.log('Form submitted successfully');
                navigate("/dashboard");
            } else {
                console.error('Error submitting form:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

    const formik = useFormik({
        initialValues: {
            image: null,
            signature: null,
        },
        validationSchema: Yup.object({
            image: Yup.mixed().required('Image is required'),
            signature: Yup.mixed().required('Signature is required'),
        }),
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append('image', values.image);
            formData.append('signature', values.signature);

            submitFormToServer(formData);
        },
    });

    useEffect(() => {
        const fetchApplicantData = async () => {
            try {
                const token = localStorage.getItem("token");
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
            } catch (error) {
                setError('Error fetching ApplicantData');
            }
        };

        fetchApplicantData();
    }, []);

    const pic = ApplicantData.image;

    return (
        <main className="content">
            {pic ? (
                <div className="success-message">
                    <p>Your form has been submitted successfully!</p>
                    <p>Your Application Number :&nbsp;{ApplicantData.application_number}</p>
                </div>
            ) : (
                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">

                    <div className="image-box">
                        <div className="file-upload">
                            <label htmlFor="image">Image:</label>
                            <p style={{ color: 'red' }}>Note: image size should be 20 to 100 KB and Image Diamantion height: 100px width: 100px</p>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={validateAndSetImage}
                            />
                            {selectedImagePreview ? (
                                <img src={selectedImagePreview} alt="Selected Image" style={{ height: '100px', width: '100px' }} />
                            ) : (
                                <img src={'https://rkmvdeoghar.org//domains/rkmvdeoghar.org/documents/old_images/Sample-Passport-photo-251x300.jpg'} 
                                alt="Dummy Image" style={{ height: '100px', width: '100px', border: '1px solid #ddd', padding: '5px' }} />
                            )}
                            {formik.errors.image && formik.touched.image && (
                                <div style={{ color: 'red' }}>{formik.errors.image}</div>
                            )}
                        </div>

                        <div className="file-upload">
                            <label htmlFor="signature">Signature:</label>
                            <p style={{ color: 'red' }}>Note: image size should be 20 to 100 KB and Image Diamantion height: 50px width: 200px</p>
                            <input
                                type="file"
                                id="signature"
                                name="signature"
                                onChange={validateAndSetSignature}
                            />
                            {selectedSignaturePreview ? (
                                <img src={selectedSignaturePreview} alt="Selected Signature" style={{ height: '80px', width: '250px' }} />
                            ) : (
                                <img src={'https://clipart-library.com/data_images/26386.jpg'} 
                                alt="Dummy Image" style={{ height: '80px', width: '250px', border: '1px solid #ddd', padding: '5px' }} />
                            )}
                            {/* {selectedSignaturePreview && <img src={selectedSignaturePreview} alt="Selected Signature" style={{ height: '50px', width: '200px' }} />} */}
                            {formik.errors.signature && formik.touched.signature && (
                                <div style={{ color: 'red' }}>{formik.errors.signature}</div>
                            )}
                        </div>
                    </div>

                    <button type="submit" style={{ width: '100%' }}>Upload</button>
                </form>
            )}
        </main>
    );
};

export default ImageSignatureForm;
