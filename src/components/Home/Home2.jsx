import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "/Assets/me.png";
import Tilt from "react-parallax-tilt";
import {
	AiFillGithub,
	AiFillInstagram,
	AiFillMail
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
	return (
		<Container fluid className="home-about-section" id="about">
			<Container>
				<Row>
					<Col md={8} className="home-about-description">
						<h1 style={{ fontSize: "2.6em" }}>
							LET ME <span className="purple"> INTRODUCE </span> MYSELF
						</h1>
						<p className="home-about-body">
							I am an undergrad student pursuing B.Tech in Computer Science
							with specialization in Artificial Intelligence and Machine
							Learning from Vellore Institute of Technology, Chennai. Coding has
							always been my forte and I also am passionate about Web
							Development and have been working on projects for the past 2
							years.
							<br />
							<br />I am fluent in classics like
							<i>
								<b className="purple"> Java, C++ and Python. </b>
							</i>
							<br />
							<br />
							My field of Interest's are building new&nbsp;
							<i>
								<b className="purple">Web Technologies </b> and
								also in areas related to{" "}
								<b className="purple">Machine Learning, Deep Learning and NLP.</b>
							</i>
							<br />
							<br />
							Whenever possible, I also apply my passion for developing products
							with <b className="purple">Node.js, Flask or Django</b> and
							<i>
								<b className="purple">
									{" "}
									Modern Javascript Library and Frameworks
								</b>
							</i>
							&nbsp; like
							<i>
								<b className="purple"> React.js and Next.js</b>
							</i>
						</p>
					</Col>
					<Col md={4} className="myAvtar">
						<Tilt>
							<img src={myImg} className="img-fluid avatar-img" alt="avatar" />
						</Tilt>
					</Col>
				</Row>
				<Row>
					<Col md={12} className="home-about-social">
						<h1>FIND ME ON</h1>
						<p>
							Feel free to <span className="purple">connect </span>with me
						</p>
						<ul className="home-about-social-links">
							<li className="social-icons">
								<a
									href="mailto:aneeshraskar@gmail.com"
									target="_blank"
									rel="noreferrer"
									className="icon-colour  home-social-icons">
									<AiFillMail />
								</a>
							</li>
							<li className="social-icons">
								<a
									href="https://github.com/Zephyrus02"
									target="_blank"
									rel="noreferrer"
									className="icon-colour  home-social-icons">
									<AiFillGithub />
								</a>
							</li>
							<li className="social-icons">
								<a
									href="https://www.linkedin.com/in/aneesh-raskar//"
									target="_blank"
									rel="noreferrer"
									className="icon-colour  home-social-icons">
									<FaLinkedinIn />
								</a>
							</li>
							<li className="social-icons">
								<a
									href="https://www.instagram.com/_.aneesh_raskar._/"
									target="_blank"
									rel="noreferrer"
									className="icon-colour home-social-icons">
									<AiFillInstagram />
								</a>
							</li>
						</ul>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}
export default Home2;
