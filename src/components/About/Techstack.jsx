import React from "react";
import { Col, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import {
	DiJavascript1,
	DiReact,
	DiNodejs,
	DiPython,
	DiPostgresql,
	DiGit,
	DiJava,
	DiDjango
} from "react-icons/di";
import {
	SiPytorch,
	SiGo,
	SiWails,
	SiFlask,
	SiDjango,
	SiGithub,
	SiTypescript,
	SiNextdotjs,
	SiOpencv,
	SiMysql,
	SiKeras,
	SiTensorflow,
	SiMongodb
} from "react-icons/si";

function Techstack() {
	return (
		<Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
			<Col xs={4} md={2} className="tech-icons">
				<CgCPlusPlus />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<DiJavascript1 />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiTypescript />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<DiNodejs />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<DiDjango />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<DiReact />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiFlask />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiGo />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiWails />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiMongodb />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<DiPostgresql />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiNextdotjs />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<DiGit />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiGithub />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiMysql />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<DiPython />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiDjango />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiPytorch />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiTensorflow />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiKeras />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiOpencv />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<DiJava />
			</Col>
		</Row>
	);
}

export default Techstack;
