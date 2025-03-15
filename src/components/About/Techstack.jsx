import React from "react";
import { Col, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import {
	DiJavascript1,
	DiReact,
	DiNodejs,
	DiMongodb,
	DiPython,
	DiPostgresql,
	DiGit,
	DiJava,
} from "react-icons/di";
import {
	SiPytorch,
	SiFlask,
	SiDjango,
	SiTypescript,
	SiNextdotjs,
	SiOpencv,
	SiMysql,
	SiKeras,
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
				<DiReact />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<SiFlask />
			</Col>
			<Col xs={4} md={2} className="tech-icons">
				<DiMongodb />
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
