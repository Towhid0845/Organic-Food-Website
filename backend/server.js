const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const connectDatabase = require("./config/database");

const cors = require("cors");
app.use(cors());

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down the server due to Uncaught Exception`);
	process.exit(1);
});

// config
dotenv.config({ path: "config/config.env" });

// Connecting to database
connectDatabase();

// Configuration
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const PORT = process.env.PORT || 6010;
// const server = app.listen(PORT, () => {
const server = app.listen(process.env.PORT, () => {
	console.log(`server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down the server due to Unhandled Promise Rejection`);

	server.close(() => {
		process.exit(1);
	});
});
