import React from "react";
import UserOptions from "./UserOptions";
import { useSelector } from "react-redux";
const SpeedDial = () => {
	const { isAuthenticated, user } = useSelector((state) => state.user);
	return <div>{isAuthenticated && <UserOptions user={user} />}</div>;
};

export default SpeedDial;
