
import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './styles/global.css';

import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import Header from './components/Header';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';


function App() {
  
  
  return (  

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail/>} />
        {/* <Route path="/courses/create" element={<CreateCourse/>} />
        <Route path="/courses/:id/update" element={<UpdateCourse/>} />
        <Route path="/signin" element={<UserSignIn/>} />
        <Route path="/signout" element={<UserSignOut/>} /> */}
      </Routes>
    </BrowserRouter>

  );


}

export default App;






// // testing that local host can retreiev courses from host 5000
// fetch("http://localhost:5000/api/courses")
// .then(res => res.json())
// .then((resData) => {
// console.log(resData);
// })
