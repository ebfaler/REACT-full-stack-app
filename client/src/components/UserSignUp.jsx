import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";



import Context from "./Context/AppContext";

function UserSignUp() {


  //navigation
  const navigate = useNavigate();

  //importing variables from Context
  const { actions } = useContext(Context);

  //setting state for the form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  /****Function to sign up ****/

  const handleSubmit = async (e) => {
    //preventing default behaviour of the form which would reload the page
    e.preventDefault();


    //these are the variables in api data.json which will be used in the signUp method found in context
    const userBody = {
      firstName,
      lastName,
      emailAddress,
      password,
    }

    // linking to api and creating course via signUp action

    actions.signUp(userBody

    ).then((response) => {
      if (response.errors) {
        console.log("sign up unsuccessful!");
        setErrors(response.errors)
        console.log(response.errors);


      } else {

        console.log("signed up successfully!");
        navigate("/");
      }
    });
  };

  return (

    <main>

      <div className="form--centered">
        <h2>Sign Up</h2>

        <form>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="button" type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
          <button
            className="button button-secondary"
          >
            Cancel
          </button>
        </form>
        <p>
          Already have a user account? Click here to{" "}
          <Link to="sign-in.html">sign in</Link>!
        </p>
      </div>
    </main>
  );
}

export default UserSignUp;
