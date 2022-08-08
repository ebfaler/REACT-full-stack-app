import React from "react";
import { Link } from "react-router-dom";

function UpdateCourse() {
  //testing onClick action
  const sayHello = (e) => {
    e.preventDefault();
    console.log("say hello");
  };

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        <form>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                value="Build a Basic Bookcase"
              />

              <p>By Joe Smith</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription">
                High-end furniture projects are great to dream about.
              </textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value="14 hours"
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded">
                * 1/2 x 3/4 inch parting strip&#13;&#13;* 1 x 2 common
                pine&#13;&#13;* 1 x 4 common pine&#13;&#13;* 1 x 10 common
                pine&#13;&#13;* 1/4 inch thick lauan plywood&#13;&#13;*
                Finishing Nails&#13;&#13;* Sandpaper&#13;&#13;* Wood
                Glue&#13;&#13;* Wood Filler&#13;&#13;* Minwax Oil Based
                Polyurethane
              </textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Update Course
          </button>
          <button
            className="button button-secondary"
            // onClick="event.preventDefault(); location.href='index.html';"
            onClick={sayHello}
          >
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
}

export default UpdateCourse;
