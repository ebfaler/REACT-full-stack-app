import React, { useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";


import Context from "./Context/AppContext";

function CourseDetail() {
  const { course } = useContext(Context);
  const { actions } = useContext(Context);
  const { authenticatedUser } = useContext(Context);

  //gets the id from the URL
  const { id } = useParams();
  const navigate = useNavigate()

  // The useEffect Hook instructs React to do something after render, it's called when the component first renders
  // and after each subsequent re-render or update.
  useEffect(

    () => {
      const displayDetails = async () => {
        await actions.courseDetail(id);
      };
      displayDetails();
    },

    []);

  // TO DO: create a function in the CourseDetail component that will delete
  // the course and redirects the user back to the home page when the delete button is clicked.

  const handleDeleteCourse = () => {

    actions.deleteCourse(course.id).then(res => {
      if (res) {
        navigate("/");
        console.log("course deleted");
      }
      else {
        navigate("/forbidden");
        console.log("course not deleted");
      }
    })

  };

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          {/* need to set up so that user's ID matches that of the user who owns the course. */}
          {authenticatedUser ? (
            <React.Fragment>
              <Link className="button" to={`/courses/${id}/update`}>
                Update Course
              </Link>
              <Link className="button" to={`/`} onClick={handleDeleteCourse}>
                Delete Course
              </Link>
            </React.Fragment>
          )
            : (
              <React.Fragment></React.Fragment>
            )

          }

          <Link className="button button-secondary" to={`/`}>
            Return to List
          </Link>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>

        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              {course.user && (
                <p>
                  By {course.user.firstName} {course.user.lastName}
                </p>
              )}

              <p>High-end furniture projects are great to dream about.</p>
            </div>

            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              {/* added reactmarkdown top match mockup styling */}
              <ReactMarkdown className="course--detail--list">
                {course.materialsNeeded}
              </ReactMarkdown>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default CourseDetail;
