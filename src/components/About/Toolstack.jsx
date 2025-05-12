import React from "react";
import { Col, Row } from "react-bootstrap";
import {
	SiVisualstudiocode,
	SiPostman,
	SiVercel,
	SiMacos,
	SiJupyter,
	SiGooglecolab,
	SiKaggle,
	SiAmazonaws,
	SiGooglecloud,
	SiDocker,
} from "react-icons/si";

function Toolstack() {
	return (
		<Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
			<Col xs={4} md={2} className="tech-icons">
				<SiMacos />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiVisualstudiocode />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiPostman />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiGooglecolab />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiJupyter />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiKaggle />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiVercel />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiAmazonaws />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiGooglecloud />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiDocker />
			</Col>
		</Row>
	);
}

export default Toolstack;
