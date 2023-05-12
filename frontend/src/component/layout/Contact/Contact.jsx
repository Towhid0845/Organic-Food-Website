import React from "react";
import "./Contact.css";

import { Button } from "@mui/material";

const Contact = () => {
	return (
		<div className="contactContainer">
			<a className="mailBtn" href="mailto:towhidewucse@gmail.com">
				<Button>Contact: towhidewucse@gmail.com</Button>
			</a>
		</div>
	);
};

export default Contact;
