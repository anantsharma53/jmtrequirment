import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Sign from './components/SignUp/Sign';
import JobApplicationForm from './components/JobForm/JobFrom';
import FormPreview from './components/FormPre/FormPre';
import ImageSignatureForm from './components/UploadFile/UploadFile';

import Layout from './components/Dashboard/Dashboard';
import ApplicantList from './components/Allaplication/Allaplication';
import ProtectedRoute from './components/routes/ProtectedRoute';
function App() {
  return (

    <BrowserRouter>
      <Routes>
        {/* <Route path='/form' element={<JobApplicationForm />} /> */}
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Layout />} />
        {/* <Route path='/dashboard' element={<ProtectedRoute Component={Layout} />}/> */}
        <Route path='/register' element={<Sign />} />
        {/* <Route path='/fileUpload' element={<ImageSignatureForm/>}/> */}
        {/* <Route path='/preview' element={<FormPreview />} /> */}
        {/* <Route path='/preview' element={<ProtectedRoute Component={FormPreview} />}/> */}
        {/* <Route path='/applicantList' element={<ProtectedRoute Component={ApplicantList} />}/> */}
        <Route path='/applicantList' element={<ApplicantList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;