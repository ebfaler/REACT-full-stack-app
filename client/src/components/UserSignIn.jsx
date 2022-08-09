import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserSignIn() {
  //   //testing onClick action
  //   const sayHello = (e) => {
  //     e.preventDefault();
  //     console.log("say hello");
  //   };

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

  //fucntion to handle form submission
  const handleSubmit = async (e) => {
    console.log("form submitted");
    //preventing default behaviour of the form which would reload the page
    e.preventDefault();
  };

  return (
    <main>
      <div className="form--centered">
        {/* setting error message with aria live attribute which allows screen readers to announce message when focus is set */}
        {/* need to add class name to css! */}
        <p
          ref={errorRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h2>Sign In</h2>
        <form>
          {/* htmlfor needs to match the id attribute of the user input */}
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            ref={emailRef}
            autoComplete="off"
            // tying on change to the email state
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            // tying on change to the email state
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <button className="button" type="submit" onClick={handleSubmit}>
            Sign In
          </button>

          <button className="button button-secondary">Cancel</button>
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
