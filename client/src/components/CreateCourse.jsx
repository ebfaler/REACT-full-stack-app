import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "./Context/AppContext";



function CreateCourse() {

  //importing variables from Context
  const { actions } = useContext(Context);
  const authenticatedUser = useContext(Context);

  const navigate = useNavigate();

  //setting state for the form 


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState();
  const [materialsNeeded, setMaterialsNeeded] = useState();
  // const [errors, setErrors] = useState({});

  ///****Function to handle form submission and create a course ****///

  const handleSubmit = async (e) => {
    //preventing default behaviour of the form which would reload the page
    e.preventDefault();

    //these are the variables in api data.json which will be used in the createCourse method found in context
    const courseBody = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authenticatedUser.userId
    }

    // linking to api and creating course via createCourse action
    actions.createCourse(courseBody

    ).then((response) => {
      if (response !== null) {
        console.log("course created successfully!");
        navigate("/");
      } else {
        console.log("course creation unsuccessful!");
      }
    });
  };



  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>



        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            <li>Please provide a value for "Title"</li>
            <li>Please provide a value for "Description"</li>
          </ul>
        </div>



        <form>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input id="courseTitle"
                name="courseTitle"
                type="text"
                value=""
                onChange={(e) => setTitle(e.target.value)}

              />

              {/* <p>{authenticatedUser.firstName}</p> */}

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value=""
                onChange={(e) => setEstimatedTime(e.target.value)}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                onChange={(e) => setMaterialsNeeded(e.target.value)}>

              </textarea>
            </div>
          </div>
          <button className="button" type="submit" onClick={handleSubmit}>
            Create Course
          </button>
          <Link to='/'>
            <button
              className="button button-secondary"
            >
              Cancel
            </button>
          </Link>
        </form>
      </div>
    </main>
  );
}

export default CreateCourse;
