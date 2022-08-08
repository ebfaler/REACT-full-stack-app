import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function CourseDetail() {
  const [coursesData, setCoursesData] = useState([]);

  //gets the id from the URL
  const { id } = useParams();

  // The useEffect Hook instructs React to do something after render, it's called when the component first renders
  // and after each subsequent re-render or update.
  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then((res) => res.json())
      .then((resData) => {
        console.log("useEffect called and course details rendered");
        console.log(resData);
        setCoursesData(resData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <Link className="button" to="#">
            {" "}
            Update Course{" "}
          </Link>
          <Link className="button" to="#">
            Delete Course
          </Link>
          <Link className="button button-secondary" to="#">
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
              <h4 className="course--name">{coursesData.title}</h4>
              {coursesData.User && (
                <p>
                  By {coursesData.User.firstName} {coursesData.User.lastName}
                </p>
              )}

              <p>High-end furniture projects are great to dream about.</p>
            </div>

            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{coursesData.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              {/* added reactmarkdown top match mockup styling */}
              <ReactMarkdown className="course--detail--list">
                {coursesData.materialsNeeded}
              </ReactMarkdown>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default CourseDetail;
