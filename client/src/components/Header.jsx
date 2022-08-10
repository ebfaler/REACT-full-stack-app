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
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          {/* displays buttons for signing in and signing up (if there's not an authenticated user) or the user's name and
         a button for signing out (if there's an authenticated user). */}

          {authenticatedUser ? (

            <React.Fragment>
              <ul className="header--signedin">
                <li> {authenticatedUser.firstName} {""} {authenticatedUser.lastName}
                </li>
                <li><Link to="/signout">Sign Out</Link>
                </li>
              </ul>
            </React.Fragment>

          ) : (

            <React.Fragment>
              <ul className="header--signedout">
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/signin">Sign In</Link>
                </li>
              </ul>
            </React.Fragment>
          )
          }

        </nav>
      </div>
    </header>
  );
}


export default Header;
