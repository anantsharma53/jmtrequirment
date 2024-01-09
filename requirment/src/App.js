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

import SessionExpired from './components/SessionExpired/SessionExpired';
function App() {
  return (

    <BrowserRouter>
      <Routes>
      <Route path='/register' element={<Sign />} />
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Layout />} />
        
        <Route path='/applicantList' element={<ApplicantList/>}/>
        <Route path='/sessionexpires' element={<SessionExpired/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
