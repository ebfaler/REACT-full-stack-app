import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Context from './Context/AppContext';

//The PrivateRoute component will serve as a high-order component for any routes
//that you want to protect and make accessible to authenticated users only. 
//The component will either allow the user to continue to the specified private component
// or redirect them to the sign in page if they are not logged in.


const PrivateRoute = () => {

    //gets access the path that user is in
    const location = useLocation();

    const { authenticatedUser } = useContext(Context);
    //if user is authenticated, go to create/update page. if not, redirect to sign-in.
    return (
        authenticatedUser ?
            <Outlet /> :
            //takes a prop called state. Whatever is passed in state is saved in the location hook,
            // even after the user is redeiredted to ansother route

            //setting replace (prop) is true so that the user is redirected they are taken to the page they were at before
            <Navigate to='/signin' replace state={{ from: location }} />
    );
};

export default PrivateRoute;