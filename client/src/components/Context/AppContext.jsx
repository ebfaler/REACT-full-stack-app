import React, { createContext, useState } from "react";
import { Buffer } from "buffer";
// using js-cookie to keep track of the suthentication user data
import Cookies from 'js-cookie';

//Creating Context using the Context Api which is used to set global state
//setting context to an empty object at first
//I will import Context into other components using "useContext(Context)"
const Context = createContext({});

//creating a provider which will provide the context to my app
// children refers to the children within the data provider, which the data will become available to

export const ContextProvider = ({ children }) => {
  //state for coursesData is set by the function setCoursesData
  const [courses, setCoursesData] = useState([]);

  //state for course details
  const [course, setCourseDetails] = useState([]);

  //state for signed in user
  const [authenticatedUser, setUser] = useState(null);

  //username state
  const [emailAddress, setEmail] = useState("");

  //password state
  const [password, setPassword] = useState("");

  //*** MAIN FUNCTION FOR API CALLS - here i am creating an api method to manage api requests ***//
  //these are default values
  function api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = "/api" + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encryptedCredentials = Buffer.from(
        //buffer is looking for the properties username and password
        `${credentials.username}:${credentials.password}`
      ).toString("base64");
      options.headers["Authorization"] = `Basic ${encryptedCredentials}`;
    }

    const results = fetch(url, options);
    return results;
  }

  //* COURSE API REQUESTS *//

  // function to GET courses from api
  async function handleFetchCourses() {
    const response = await api("/courses");

    // if successful...
    if (response.status === 200) {
      response
        .json() /* parse response to json */
        .then((data) =>
          setCoursesData(data)
        ); /* set the courses state to the json response */
      return courses; //returns the courses arrray, this will be made available to context
    }
    // if unauthorized...
    else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  // function to GET course details from a single course
  async function handleFetchCourseDetail(id) {
    const response = await api(`/courses/${id}`);

    if (response.status === 200) {
      response.json().then((data) => setCourseDetails(data));
      return course; //this will be made available to context
    } else if (response.status === 404) {
      return null;
    } else {
      throw new Error();
    }
  }

  // function to create (POST) a new course
  // credential required ar eusername and password

  async function handleCreateNewCourse(courseBody) {
    const response = await api("/courses", "POST", courseBody, true, {
      username: emailAddress,
      password: password,
    });

    // if created successfully...
    if (response.status === 201) {
      return response;
    }
    return response.json();
  }

  // function to update(PUT) an existing course
  async function handleUpdateCourse(id, courseBody) {
    const response = await api(`/courses/${id}`, "PUT", courseBody, true, {
      username: emailAddress,
      password: password,
    });

    // if update is successfull...
    if (response.status === 204) {
      return true;
    }
    return response.json();
  }

  // function to delete an existing course
  async function handleDeleteCourse(id) {
    const response = await api(`/courses/${id}`, "DELETE", null, true, {
      username: emailAddress,
      password: password,
    });

    // if delete is successfull...
    if (response.status === 204) {
      return true;
    }
  }

  //* USER API REQUESTS  *//

  // function to create(POST) a new user
  async function handleSignUp(userBody) {
    const response = await api("/users", "POST", userBody);

    if (response.status === 201) {
      return true;
    }
    return response.json();
  }

  //function to sign in user will be called in UserSignIn
  async function handleSignIn(username, password) {
    const response = await api("/users", "GET", null, true, {
      username,
      password,
    });

    if (response.status === 200) {
      setEmail(username);
      setPassword(password);

      return response
        .json()
        .then((data) => setUser(data)); /* set user state to response */
    }

    else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  //function to sign out user
  function handleSignOut() {
    setUser(null);
    setEmail("");
    setPassword("");
    Cookies.remove();
  }

  return (
    //value is the data we are passing for the context
    <Context.Provider
      value={{
        authenticatedUser,
        courses,
        course,

        actions: {
          getCourses: handleFetchCourses,
          courseDetail: handleFetchCourseDetail,
          createCourse: handleCreateNewCourse,
          updateCourse: handleUpdateCourse,
          deleteCourse: handleDeleteCourse,
          signIn: handleSignIn,
          signUp: handleSignUp,
          signOut: handleSignOut,
        },
      }}
    >
      {children}
    </Context.Provider>
  );

};

export default Context;
