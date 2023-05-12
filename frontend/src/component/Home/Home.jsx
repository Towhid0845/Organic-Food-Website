import React, { useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

// const product = {
//     name:"T-Shirt",
//     images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
//     price:"$100",
//     _id: "Towhid"
// }

const Home = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const { loading, error, products } = useSelector((state) => state.products);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		dispatch(getProduct());
	}, [dispatch, error, alert]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title="TCOMMERCE" />

					<div className="banner">
						<p>Welcome to Tcommerce</p>
						<h1>FIND AMAZING ORGANIC FOODS</h1>

						<a href="#container">
							<button>
								Scroll <CgMouse />
							</button>
						</a>
					</div>

					<h2 className="homeHeading">Featured Foods</h2>

					<div className="container" id="container">
						{products &&
							products.map((product) => (
								<ProductCard key={product._id} product={product} />
							))}
					</div>
				</>
			)}
		</>
	);
};

export default Home;
