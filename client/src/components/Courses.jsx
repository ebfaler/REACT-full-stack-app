import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Courses() {
  //coursesData state is set by the function setCoursesData
  const [coursesData, setCoursesData] = useState([]);

  // The useEffect Hook instructs React to do something after render, it's called when the component first renders
  // and after each subsequent re-render or update.
  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((resData) => {
        console.log("useEffect called and courses rendered");
        // console.log(resData);
        setCoursesData(resData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main>
      <div className="wrap main--grid">
        {coursesData.map((data) => (
          <Link
            to={`/courses/${data.id}`}
            key={data.id}
            className="course--module course--link"
          >
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{data.title} </h3>
          </Link>
        ))}

        <a
          className="course--module course--add--module"
          href="create-course.html"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </a>
      </div>
    </main>
  );
}

export default Courses;
