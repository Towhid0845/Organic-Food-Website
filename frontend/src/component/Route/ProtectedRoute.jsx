import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
	const { loading, isAuthenticated, user } = useSelector((state) => state.user);

	if (loading === false) {
		if (isAuthenticated === false) {
			return <Navigate replace to="/login" />;
		}
		if (isAdmin === true && user.role !== "admin") {
			return <Navigate replace to="/login" />;
		}

		return <Component />;
	}
	// return (
	// 	<>
	// 		{loading === false && (
	//
	// 				<Route>
	// 					{...rest}
	// 					render=
	// 					{(props) => {
	// 						if (isAuthenticated === false) {
	// 							return <Navigate replace to="/login" />;
	// 						}

	// 						if (isAdmin === true && user.role !== "admin") {
	// 							return <Navigate replace to="/login" />;
	// 						}

	// 						return <Component {...props} />;
	// 					}}
	// 				</Route>
	//
	// 		)}
	// 	</>
	// );
};

export default ProtectedRoute;
