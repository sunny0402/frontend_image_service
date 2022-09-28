import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// will receive prop allowed roles
const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    // another Outlet like in the Layout component
    // but this outlet represents any child components of RequireAuth component

    //for each role in roles see if in allowedRoles
    //compare roles array stored in auth state and allowedRoles passed in to component
    auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
      <Outlet />
    ) : //   another ternary to see if user authed for route
    //the user is authed just not for this resource/route
    auth?.user ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      // User isn't asking to login but we found out they are not logged in
      // replace the location in naviation history with location they came from
      // TODO: previously to="/login"
      <Navigate to="/" state={{ from: location }} replace />
    )
  );
};

export default RequireAuth;
