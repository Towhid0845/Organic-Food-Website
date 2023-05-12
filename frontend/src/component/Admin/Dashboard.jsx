import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./dashboard.css";
import { Link } from "react-router-dom";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

// import faker from "faker";
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";

const Dashboard = () => {
	const dispatch = useDispatch();

	const { products } = useSelector((state) => state.products);

	const { orders } = useSelector((state) => state.allOrders);

	const { users } = useSelector((state) => state.allUsers);

	let outOfStock = 0;

	products &&
		products.forEach((item) => {
			if (item.stock === 0) {
				outOfStock += 1;
			}
		});

	useEffect(() => {
		dispatch(getAdminProduct());
		dispatch(getAllOrders());
		dispatch(getAllUsers());
	}, [dispatch]);

	let totalAmount = 0;
	orders &&
		orders.forEach((item) => {
			totalAmount += item.totalPrice;
		});

	const lineState = {
		labels: ["Initial Amount", "Amount Earned"],
		datasets: [
			{
				label: "TOTAL AMOUNT",
				data: [0, totalAmount],
				tension: 0.4,
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 0, 0)",
				fill: {
					target: "origin",
					above: "rgba(255, 0, 0, 0.3)",
				},
			},
			// {
			// 	label: "Dataset 2",
			// 	data: [10, 20, 40, 60, 20, 10, 50],
			// 	tension: 0.4,
			// 	borderColor: "rgb(255, 99, 132)",
			// 	backgroundColor: "rgba(97 197 174)",
			// 	fill: {
			// 		target: "origin",
			// 	},
			// },
		],
	};

	const doughnutState = {
		labels: ["Out of Stock", "InStock"],
		datasets: [
			{
				label: "Out of Stock",
				data: [outOfStock, products.length - outOfStock],
				// data: [outOfStock, 70],
				backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
				borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
				borderWidth: 1,
			},
		],
	};

	return (
		<div className="dashboard">
			<MetaData title="Dashboard - Admin Panel" />
			<Sidebar />

			<div className="dashboardContainer">
				<Typography component="h1">Dashboard</Typography>

				<div className="dashboardSummary">
					<div>
						<p>
							Total Amount <br /> ৳ {totalAmount}
						</p>
					</div>
					<div className="dashboardSummaryBox2">
						<Link to="/admin/products">
							<p>Product</p>
							<p>{products && products.length}</p>
						</Link>
						<Link to="/admin/orders">
							<p>Orders</p>
							<p>{orders && orders.length}</p>
						</Link>
						<Link to="/admin/users">
							<p>Users</p>
							<p>{users && users.length}</p>
						</Link>
					</div>
				</div>

				<div className="lineChart">
					<Line data={lineState} />
				</div>
				<div className="doughnutChart">
					<Doughnut data={doughnutState} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
