import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Context from './Context/AppContext'



function UserSignOut() {
  const context = useContext(Context);

  //Developers refer to these types of actions as "side effects" and React now warns that you shouldn't perform them during rendering.

  //This state update should happen after the UserSignOut component renders. React now provides a straightforward way to do that with the useEffect Hook.

  useEffect(() => {
    //runs the sign out function set in context
    context.actions.signOut()
    console.log("sign out function ran");
  }, [])

  return (
    <Navigate to={'/'} />
  )

}

export default UserSignOut;

