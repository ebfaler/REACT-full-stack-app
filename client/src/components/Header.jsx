import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    //the following code is for when the user is NOT signed in.Need to show different headers depending on if user is signed in or not
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <a href="index.html">Courses</a>
        </h1>
        <nav>
          <ul className="header--signedout">
            <li>
              <a href="sign-up.html">Sign Up</a>
            </li>
            <li>
              <a href="sign-in.html">Sign In</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

// will display this when user is signed in
// <header>
//             <div className="wrap header--flex">
//                 <h1 className="header--logo"><a href="index.html">Courses</a></h1>
//                 <nav>
//                     <ul className="header--signedin">
//                         <li>Welcome, Joe Smith!</li>
//                         <li><a href="sign-out.html">Sign Out</a></li>
//                     </ul>
//                 </nav>
//             </div>
//         </header>

export default Header;
