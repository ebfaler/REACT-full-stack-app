import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Context from './Context/AppContext'



function UserSignOut() {
  const context = useContext(Context);

  useEffect(() => {
    //runs the sign out function set in context
    context.actions.signOut()
  }, [])

  return (
    <Navigate to={'/'} />
  )

}

export default UserSignOut;
