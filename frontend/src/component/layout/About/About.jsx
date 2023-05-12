import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
const About = () => {
	const visitGithub = () => {
		window.location = "https://github.com/Towhid0845";
	};
	return (
		<div className="aboutSection">
			<div></div>
			<div className="aboutSectionGradient"></div>
			<div className="aboutSectionContainer">
				<Typography component="h1">About Us</Typography>

				<div>
					<div>
						<Avatar
							style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
							src="https://res.cloudinary.com/dnlemhn2l/image/upload/v1683282816/products/Towhid_new_zfl0k7.jpg"
							alt="Founder"
						/>
						<Typography>Towhiduzzaman</Typography>
						<Button onClick={visitGithub} color="primary">
							Visit GitHub
						</Button>
						<span>This is a sample wesbite made by @towhiduzzaman.</span>
					</div>
					<div className="aboutSectionContainer2">
						<Typography component="h2">Our Brands</Typography>
						<a href="https://www.linkedin.com/in/iamtowhid/" target="blank">
							<LinkedInIcon className="youtubeSvgIcon" />
						</a>

						<a href="https://github.com/Towhid0845" target="blank">
							<GitHubIcon className="instagramSvgIcon" />
						</a>
						<a
							href="https://www.facebook.com/towhiduzzaman.towhid.39/"
							target="blank"
						>
							<FacebookIcon className="instagramSvgIcon" />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
