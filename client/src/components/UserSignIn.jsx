import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserSignIn() {
  //testing onClick action
  const sayHello = (e) => {
    e.preventDefault();
    console.log("say hello");
  };

  //so we can set the focus on the email input when the page first loads
  //error ref to set the focus on the errors for a screen reader to read
  const emailRef = useRef();
  const errorRef = useRef();

  //setting state for user inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // setting state for the error we might get back when we try to authenticate
  const [errMsg, setErrMsg] = useState("");

  //setting focus on first inout when componenet loads
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  //clears any error message if the user changes any of their inputs
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>

        <form>
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
          <button className="button" type="submit">
            Sign In
          </button>
          <button
            className="button button-secondary"
            onClick={sayHello}
            // onClick="event.preventDefault(); location.href='index.html';"
          >
            Cancel
          </button>
        </form>
        <p>
          Don't have a user account? Click here to{" "}
          <Link to="/signup">sign up</Link>!
        </p>
      </div>
    </main>
  );
}

export default UserSignIn;
