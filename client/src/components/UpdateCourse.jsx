import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Context from "./Context/AppContext";


function UpdateCourse() {

  //navigation

  const navigate = useNavigate();

  //importing variables from Context
  const { actions, course } = useContext(Context);
  const { authenticatedUser } = useContext(Context);


  //setting state for the form 

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [errors, setErrors] = useState({});


  //useParams to get the id of the course from the url
  const { id } = useParams();


  //state for course details
  // const [course, setCourseDetails] = useState([]);


  //testing onClick action
  // const sayHello = (e) => {
  //   e.preventDefault();
  //   console.log("say hello");
  // };

  ///****Function to handle form submission and update a course ****///

  const handleSubmit = async (e) => {
    //preventing default behaviour of the form which would reload the page
    e.preventDefault();


    //these are the variables in api data.json which will be used in the updateCourse method found in context
    const courseBody = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authenticatedUser.id
    }

    // linking to api and creating course via updateCourse action
    // takes a paramater id which is the id of the course
    actions.updateCourse(id, courseBody

    ).then((response) => {
      if (response.errors) {
        console.log("course update unsuccessful!");
        setErrors(response.errors)
        console.log(response.errors);
        console.log(courseBody);
        console.log(authenticatedUser);

      } else {

        console.log("course successfully updated!");
        navigate("/");
      }
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <p> By {""} {authenticatedUser.firstName} {""} {authenticatedUser.lastName} </p>


              <label htmlFor="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription" value={description}
                onChange={(e) => setDescription(e.target.value)}>
              </textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded}
                onChange={(e) => setMaterialsNeeded(e.target.value)}>

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
  );
}

export default UpdateCourse;
