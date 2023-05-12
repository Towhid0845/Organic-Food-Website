import React, { useState, useEffect } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { logout } from "../../../actions/userAction";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop } from "@mui/material";

const UserOptions = ({ user }) => {
	const { cartItems } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const alert = useAlert();

	const history = useNavigate();

	const actions = [
		{ icon: <ListAltIcon />, name: "Orders", func: orders },
		{ icon: <PersonIcon />, name: "Profile", func: account },
		{
			icon: (
				<ShoppingCartIcon
					style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
				/>
			),
			name: `Cart(${cartItems.length})`,
			func: cart,
		},
		{ icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
	];

	if (user.role === "admin") {
		actions.unshift({
			icon: <DashboardIcon />,
			name: "Dashboard",
			func: dashboard,
		});
	}

	function dashboard() {
		history("/admin/dashboard");
	}

	function orders() {
		history("/orders");
	}
	function account() {
		history("/account");
	}
	function cart() {
		history("/cart");
	}
	function logoutUser() {
		dispatch(logout());
		alert.success("Logout Successfully");
	}
	return (
		<>
			{/* <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}> */}
			<Backdrop open={open} style={{ zIndex: "10" }} />
			<SpeedDial
				ariaLabel="SpeedDial controlled open example"
				// sx={{ position: "absolute", bottom: 16, right: 16 }}
				onClose={handleClose}
				onOpen={handleOpen}
				open={open}
				style={{ zIndex: "11" }}
				direction="down"
				className="speedDial"
				icon={
					<img
						className="speedDialIcon"
						src={user.avatar.url ? user.avatar.url : "/Profile.png"}
						alt="Profile"
					/>
				}
			>
				{actions.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
						onClick={action.func}
						tooltipOpen={window.innerWidth <= 600 ? true : false}
					/>
				))}
			</SpeedDial>

			{/* </Box> */}
		</>
	);
};

export default UserOptions;
