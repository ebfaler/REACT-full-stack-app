import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Context from './Context/AppContext';

//The PrivateRoute component will serve as a high-order component for any routes
//that you want to protect and make accessible to authenticated users only. 
//The component will either allow the user to continue to the specified private component
// or redirect them to the sign in page if they are not logged in.


const PrivateRoute = () => {

    const { authenticatedUser } = useContext(Context);

    return (
        authenticatedUser ?
            <Outlet /> :
            <Navigate to={'/signin'} />
    );
};

export default PrivateRoute;