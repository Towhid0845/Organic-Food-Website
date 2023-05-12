import * as React from "react";
import "./App.css";
// import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import SpeedDial from "./component/layout/Header/SpeedDial";
import Profile from "./component/User/Profile.jsx";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUsers";
import ProductReviews from "./component/Admin/ProductReviews";
import About from "./component/layout/About/About";
import Contact from "./component/layout/Contact/Contact";
import NotFound from "./component/layout/NotFound/NotFound";
import WebFont from "webfontloader";

// import UserOptions from "./component/layout/Header/UserOptions";
function App() {
	// const { isAuthenticated, user } = useSelector((state) => state.user);

	// React.useEffect(()=>{
	//   WebFont.load({
	//     google:{
	//       families:["Merienda", "Merriweather Sans"]
	//     }
	//   })
	// }, []);

	const [stripeApiKey, setStripeApiKey] = useState("");

	async function getStripeApiKey() {
		const { data } = await axios.get("/api/v1/stripeapikey");

		setStripeApiKey(data.stripeApiKey);
	}

	useEffect(() => {
		WebFont.load({
			google: {
				families: ["Roboto", "Droid Sans", "Chilanka"],
			},
		});
		store.dispatch(loadUser());
		getStripeApiKey();
	}, []);
	// window.addEventListener("contextmenu", (e) => e.preventDefault());
	return (
		<>
			<Router>
				<Header />
				<SpeedDial />
				{/* {stripeApiKey && (
					<Elements stripe={loadStripe(stripeApiKey)}>
						<ProtectedRoute exact path="/process/payment" component={Payment} />
					</Elements>
				)} */}
				<Routes>
					<Route exact path="/" element={<Home />}></Route>
					<Route exact path="/about" element={<About />}></Route>
					<Route exact path="/contact" element={<Contact />}></Route>
					<Route exact path="/products" element={<Products />}></Route>
					<Route exact path="/product/:id" element={<ProductDetails />}></Route>
					<Route path="/products/:keyword" element={<Products />}></Route>
					<Route exact path="/search" element={<Search />}></Route>
					<Route exact path="/login" element={<LoginSignUp />}></Route>
					<Route
						exact
						path="/password/forgot"
						element={<ForgotPassword />}
					></Route>
					<Route
						exact
						path="/password/reset/:token"
						element={<ResetPassword />}
					></Route>
					<Route
						exact
						path="/account"
						element={<ProtectedRoute component={Profile} />}
					></Route>
					<Route
						exact
						path="/me/update"
						element={<ProtectedRoute component={UpdateProfile} />}
					></Route>
					<Route
						exact
						path="/password/update"
						element={<ProtectedRoute component={UpdatePassword} />}
					></Route>
					<Route exact path="/cart" element={<Cart />}></Route>
					<Route
						exact
						path="/shipping"
						element={<ProtectedRoute component={Shipping} />}
					></Route>
					<Route
						exact
						path="/order/confirm"
						element={<ProtectedRoute component={ConfirmOrder} />}
					></Route>
					<Route
						exact
						path="/process/payment"
						element={
							stripeApiKey && (
								<Elements stripe={loadStripe(stripeApiKey)}>
									<ProtectedRoute component={Payment} />
								</Elements>
							)
						}
					></Route>
					<Route
						exact
						path="/success"
						element={<ProtectedRoute component={OrderSuccess} />}
					></Route>
					<Route
						exact
						path="/orders"
						element={<ProtectedRoute component={MyOrders} />}
					></Route>
					<Route
						exact
						path="/order/:id"
						element={<ProtectedRoute component={OrderDetails} />}
					></Route>
					<Route
						exact
						path="/admin/dashboard"
						element={<ProtectedRoute isAdmin={true} component={Dashboard} />}
					></Route>
					<Route
						exact
						path="/admin/products"
						element={<ProtectedRoute isAdmin={true} component={ProductList} />}
					></Route>
					<Route
						exact
						path="/admin/product"
						element={<ProtectedRoute isAdmin={true} component={NewProduct} />}
					></Route>
					<Route
						exact
						path="/admin/product/:id"
						element={
							<ProtectedRoute isAdmin={true} component={UpdateProduct} />
						}
					></Route>
					<Route
						exact
						path="/admin/orders"
						element={<ProtectedRoute isAdmin={true} component={OrderList} />}
					></Route>
					<Route
						exact
						path="/admin/order/:id"
						element={<ProtectedRoute isAdmin={true} component={ProcessOrder} />}
					></Route>
					<Route
						exact
						path="/admin/users"
						element={<ProtectedRoute isAdmin={true} component={UsersList} />}
					></Route>
					<Route
						exact
						path="/admin/user/:id"
						element={<ProtectedRoute isAdmin={true} component={UpdateUser} />}
					></Route>
					<Route
						exact
						path="/admin/reviews"
						element={
							<ProtectedRoute isAdmin={true} component={ProductReviews} />
						}
					></Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
