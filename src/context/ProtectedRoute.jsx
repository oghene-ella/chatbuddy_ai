import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext/index";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
	const { userLoggedIn } = useAuth();

	if (!userLoggedIn) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default ProtectedRoute;
