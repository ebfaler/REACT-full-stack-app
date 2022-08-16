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
  const [authenticatedUser, setUser] = useState(JSON.parse(Cookies.get('authenticatedUser') || null));

  // //username state
  // const [emailAddress, setEmail] = useState("");

  // //password state
  // const [password, setPassword] = useState("");

  //cookies state
  //Set the initial state of the Provider to the value stored in the 'authenticatedUser' cookie or null. Retrieve the value of the cookie using Cookies.getJSON(), which takes the cookie name ('authenticatedUser') as a parameter:


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
    if (!authenticatedUser) {
      return false;
    }
    const response = await api("/courses", "POST", courseBody, true, {
      username: authenticatedUser.emailAddress,
      password: authenticatedUser.password,
    });

    // if created successfully...
    if (response.status === 201) {
      return response;
    }
    return response.json();
  }

  // function to update(PUT) an existing course
  async function handleUpdateCourse(id, courseBody) {
    if (!authenticatedUser) {
      return false;
    }
    const response = await api(`/courses/${id}`, "PUT", courseBody, true, {
      username: authenticatedUser.emailAddress,
      password: authenticatedUser.password,
    });

    // if update is successfull...
    if (response.status === 204) {
      return true;
    }
    return response.json();

  }

  // function to delete an existing course
  async function handleDeleteCourse(id) {
    if (!authenticatedUser) {
      return false;
    }
    const response = await api(`/courses/${id}`, "DELETE", null, true, {
      username: authenticatedUser.emailAddress,
      password: authenticatedUser.password,
    });

    // if delete is successfull...
    if (response.status === 204) {
      return true;
    }
    return false;
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

      // setEmail(username);
      // setPassword(password);

      return response
        .json()
        .then((data) => {
          //setting the password on data to the user entered password. 
          data.password = password;
          setUser(data); /* set user state to response */

          //Set cookie. First argument specifies the name of the cookie, second is the value to store
          //In Chrome DevTools, for instance, cookies are displayed in the "Application" tab, under "Storage > Cookies".
          Cookies.set('authenticatedUser', JSON.stringify(data));
          console.log(data);
        });


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
    Cookies.remove('authenticatedUser');
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
