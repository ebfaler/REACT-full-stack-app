import React, { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
//importing context
import Context from "./Context/AppContext";

function UserSignIn() {
  //here I am using the context i gave created
  //if we successfully authenticate when we log in, we will set our new auth state and store it in the global context
  const { actions } = useContext(Context);
  console.log(actions);

  //so we can set the focus on the email input when the page first loads
  //error ref to set the focus on the errors for a screen reader to read
  const emailRef = useRef();
  const errorRef = useRef();

  //setting state for user inputs
  const [emailAddress, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // setting state for the error we might get back when we try to authenticate
  const [errMsg, setErrMsg] = useState("");

  //allows us to change location
  let navigate = useNavigate();

  //setting focus on first input when componenet loads
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  //clears any error message if the user changes any of their inputs
  useEffect(() => {
    setErrMsg("");
  }, [emailAddress, password]);

  ///****Function to handle form submission****///
  const handleSubmit = async (e) => {
    console.log("form submitted");

    //preventing default behaviour of the form which would reload the page
    e.preventDefault();

    // linking to api
    actions.signIn(emailAddress, password).then((response) => {
      if (response !== null) {
        console.log("sign in successful!");
        navigate("/");
      } else {
        console.log("sign in unsuccessful!");
      }
    });
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
            value={emailAddress}
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
