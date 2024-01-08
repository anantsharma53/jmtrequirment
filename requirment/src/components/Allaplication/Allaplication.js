import React, { useState, useEffect } from 'react';
import './Allaplication.css';
import * as html2pdf from 'html2pdf.js';

const ApplicantList = () => {
  const [applicants, setApplicants] = useState([]);
  const [selectedPost, setSelectedPost] = useState('');
  let [serialNumber, setSerialNumber] = useState(1);

  const handlePostChange = (event) => {
    setSelectedPost(event.target.value);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://127.0.0.1:8000/api/applicants/by_post/${selectedPost}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setApplicants(data);
      setSerialNumber(1); // Reset serial number when fetching new data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (selectedPost) {
      fetchData();
    }
  }, [selectedPost]);

  const handleGeneratePDF = () => {
    const content = document.querySelector('.applicants-details-container');

    // Convert images to base64 and embed them in the HTML
    const images = content.querySelectorAll('img');
    images.forEach(async (img) => {
      const imageUrl = img.src;
      const base64Image = await getBase64Image(imageUrl);
      img.src = base64Image;
    });

    const pdfOptions = {
      margin: 5,
      filename: `applicants_${selectedPost}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    };

    html2pdf(content, pdfOptions);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  const getBase64Image = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error fetching image:', error.message);
      throw error; // Rethrow the error to handle it at the higher level
    }
  };

  return (
    <div className="applicants-details-container">
      <label htmlFor="postSelect">Select Post: </label>
      <select id="postSelect" value={selectedPost} onChange={handlePostChange}>
        <option value="">Select a Post</option>
        {/* Add options based on your available posts */}
        <option value="post1">Post 1</option>
        <option value="post2">Post 2</option>
        {/* ... */}
      </select>

      <div >
        <h2>Applicant Information</h2>
        <table  border="1" style={{ width: '100%', borderCollapse: 'collapse',fontSize:'12px' }}>
          <thead>
            <tr>
              <th>Sl No</th>
              {/* <th>User ID</th> */}
              <th>Application Number</th>
              <th>Applicant Name</th>
              <th>Father's Name</th>
              <th>DOB</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>Category</th>
              <th>Gender</th>
              <th>Physically Challenged</th>
              <th >Education
                <th>Exam</th>
                <th>Board/University</th>
                <th>Passing Year</th>
                <th>Percentage</th>
              </th>
              <th>Experience
                <th>Organization</th>
                <th>Months</th>
                <th>Remarks</th>
              </th>
              <th>Image</th>
              <th>Signature</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map(applicant => (
              <tr key={applicant.id}>
                <td className="tabledesign">{serialNumber++}</td>
                {/* <td className="tabledesign">{applicant.id}</td> */}
                <td className="tabledesign">{applicant.application_number}</td>
                <td className="tabledesign">{applicant.applicantName}</td>
                <td className="tabledesign">{applicant.fatherName}</td>
                <td className="tabledesign">{applicant.dob}</td>
                <td className="tabledesign">{applicant.mobileNumber}</td>
                <td className="tabledesign">{applicant.email}</td>
                <td className="tabledesign">{applicant.category}</td>
                <td className="tabledesign">{applicant.gender}</td>
                <td className="tabledesign">{applicant.isPhysicallyChallenged ? 'Yes' : 'No'}</td>
                <td className="tabledesign">
                  <table className="insidetable">
                    <tbody>
                      {applicant.education && applicant.education.map((edu, index) => (
                        <tr key={index} >
                          <td ><strong>{edu.education}</strong></td>
                          <td >{edu.boardUniversity}</td>
                          <td > {edu.passingYear}</td>
                          <td > {edu.percentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td className="tabledesign">
                  <table className="insidetable">
                    <tbody>
                      {applicant.experience && applicant.experience.length > 0 ? (
                        <>
                          {applicant.experience.map((exp, index) => (
                            <tr key={index}>
                              <td ><strong>{exp.organization}</strong></td>
                              <td >{exp.years}</td>
                              <td >{exp.remarks}</td>
                            </tr>
                          ))}
                          {/* Total Experience Row */}
                          <tr className="experience-item">
                            <td >Total Experience:</td>
                            <td colSpan="2">
                              {(applicant.experience.reduce((total, exp) => total + parseFloat(exp.years, 10), 0)) / 12} &nbsp; Years
                            </td>
                          </tr>
                        </>
                      ) : (
                        <tr>
                          <td colSpan="3">No experience available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </td>
                <td className="tabledesign">
                  <img className="img-app" src={`http://localhost:8000${applicant.image}`} alt="Applicant" style={{
                    height: '120px',
                    maxWidth: '200px',
                    border: 'none',
                    borderRadius: 'none',
                    padding: 'none',
                    backgroundColor: 'none',
                  }} />
                </td>
                <td className="tabledesign">
                  <img className="img-app" src={`http://localhost:8000${applicant.signature}`} alt="Signature" style={{
                    height: '100',
                    maxWidth: '150px',
                    border: 'none',
                    borderRadius: 'none',
                    padding: 'none',
                    backgroundColor: 'none',
                  }} />
                </td>
                <td>print</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <button onClick={handlePrintPDF}>Print</button>
      <button onClick={handleGeneratePDF}>Generate PDF</button> */}
    </div>
  );
};

export default ApplicantList;
