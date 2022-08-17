import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate, useParams, Navigate } from "react-router-dom";
import Context from "./Context/AppContext";
import Forbidden from "./Errors/Forbidden";


function UpdateCourse() {

  //navigation

  const navigate = useNavigate();
  // const location = useLocation();

  //importing variables from Context
  const { actions, course } = useContext(Context);
  const { authenticatedUser } = useContext(Context);
  console.log("authenticatedUser is " + authenticatedUser.id);
  console.log("course is " + course.userId);

  //setting state for the form 

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [errors, setErrors] = useState({});

  const descriptionEl = useRef(null);
  const titleEl = useRef(null);
  const materialsNeededEl = useRef(null);
  const estimatedTimeEl = useRef(null);

  //useParams to get the id of the course from the url
  const { id } = useParams();


  // After the component renders, makes call to api to retrieve course details so it can be edited
  useEffect(
    () => {
      actions.courseDetail(id)
        .then((response) => {
          if (!response) {
            navigate('/notfound');
            return;
          } //if there is a response course will be returned

          //here I am setting the state for the content
          setTitle(response.title);
          setDescription(response.description);
          setEstimatedTime(response.estimatedTime || "");
          setMaterialsNeeded(response.materialsNeeded || "");
          console.log("response is " + response.title);

        })
        .catch((e) => {
          console.log(e);
          navigate('/error');
        })
    }
    // eslint-disable-next-line
    , []);

  ///****Function to handle form submission ****///

  const handleSubmit = async (e) => {
    //preventing default behaviour of the form which would reload the page
    e.preventDefault();
    console.log(descriptionEl.current.value);
    console.log(titleEl.current.value);
    //these are the variables in api data.json which will be used in the updateCourse method found in context
    const courseBody = {
      title: titleEl.current.value,
      description: descriptionEl.current.value,
      estimatedTime: estimatedTimeEl.current.value,
      materialsNeeded: materialsNeededEl.current.value,
      userId: authenticatedUser.id
    }


    // linking to api and creating course via updateCourse action
    // takes a paramater id which is the id of the course
    actions.updateCourse(id, courseBody

    ).then((response) => {

      if (!response) {
        navigate("/notfound");
        console.log("page doesnt exist");
      }

      else {

        if (response.errors) {
          console.log("course has errors!");
          setErrors(response.errors)

        }

        else {
          console.log("course successfully updated!");
          navigate(`/courses/${id}`);
        }

      }
    }).catch((e) => {
      navigate('/error');
      console.log("error getting data");

    });


  };



  /* Displaying Errors */

  function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;

    if (errors.length) {
      errorsDisplay = (
        <div>
          <h2 className="validation--errors--label">Validation errors</h2>
          <div className="validation-errors">
            <ul>
              {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
          </div>
        </div>
      );
    }

    return errorsDisplay;
  }

  return (

    (course.userId === authenticatedUser.id) ?

      <main>
        <div className="wrap">
          <h2>Update Course</h2>
          <ErrorsDisplay errors={errors} />
          <form>
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                  ref={titleEl}
                  defaultValue={title}
                />

                <p> By {""} {authenticatedUser.firstName} {""} {authenticatedUser.lastName} </p>


                <label htmlFor="courseDescription">Course Description</label>
                <textarea id="courseDescription" name="courseDescription" ref={descriptionEl} defaultValue={description}
                >
                </textarea>
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  ref={estimatedTimeEl}
                  defaultValue={estimatedTime}
                />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeededEl} defaultValue={materialsNeeded}
                >

                </textarea>
              </div>
            </div>
            <button className="button" type="submit" onClick={handleSubmit}>
              Update Course
            </button>

            <Link to='/'>
              <button
              >
                Cancel
              </button>
            </Link>
          </form>
        </div>
      </main>
      :
      <React.Fragment>
        <Navigate to="/forbidden" />
        <Forbidden />
      </React.Fragment>
  );
}

export default UpdateCourse;
