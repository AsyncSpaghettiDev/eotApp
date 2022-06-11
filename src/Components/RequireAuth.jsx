// Imports
import { useCookies } from "react-cookie";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children, requiredRole }) => {
    // Hooks
    let [cookies] = useCookies();
    let location = useLocation();

    // Const values
    const cookieRole = cookies.role;

    const roleValid =
        requiredRole instanceof Array ?
            requiredRole.some(rqRole => rqRole === cookieRole ) :
            cookieRole !== requiredRole;

    // Conditional render section
    // If we havent a session yet, returns to login page
    if (cookieRole === undefined)
        return <Navigate to="/login" state={{ from: location }} replace />;
    // In case session role is TABLE we were send to that table detail
    if (cookieRole === 'TABLE')
        return <Navigate to={`/dashboard/details/${cookies.name[5]}`} />
    // If we are any role not valid we were send to home
    if (!roleValid) {
        return <Navigate to="/" replace />;
    }
    // Else we render the component
    return children;
}

export default RequireAuth;