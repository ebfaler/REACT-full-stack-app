import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Context from './Context/AppContext';



function Header() {
  const { authenticatedUser } = useContext(Context);
  return (
    //the following code is for when the user is NOT signed in.Need to show different headers depending on if user is signed in or not
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="index.html">Courses</Link>
        </h1>
        <nav>

          <ul className="header--signedout">

            <li>
              <Link to="sign-up.html">Sign Up</Link>
            </li>
            <li>
              <Link to="sign-in.html">Sign In</Link>
            </li>

          </ul>

        </nav>
      </div>
    </header>
  );
}


export default Header;
