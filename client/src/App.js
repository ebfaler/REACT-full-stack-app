import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./styles/global.css";

import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";


import CreateCourse from "./components/CreateCourse";
import Header from "./components/Header";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import UserSignUp from "./components/UserSignUp";
import Forbidden from "./components/Errors/Forbidden";
import Error from "./components/Errors/Error";
import NotFound from "./components/Errors/NotFound";
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />

        <Route element={<PrivateRoute />}>
          {/* These routes are only available to authorised users */}
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/courses/:id/update" element={<UpdateCourse />} />
        </Route>

        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signout" element={<UserSignOut />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/error" element={<Error />} />
        <Route path="/notfound" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


