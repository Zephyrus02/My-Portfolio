import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import img1 from "/Assets/home/img1.svg";
import img2 from "/Assets/home/img2.svg";
import img3 from "/Assets/home/img3.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";

const images = [img1, img2, img3];

function Home() {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [prevImageIndex, setPrevImageIndex] = useState(2); // Start with the last image as prev
	const [isTransitioning, setIsTransitioning] = useState(false);
	
	useEffect(() => {
		const interval = setInterval(() => {
			setIsTransitioning(true);
			setPrevImageIndex(currentImageIndex);
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
			
			// Reset transition state after animation completes
			const transitionTimeout = setTimeout(() => {
				setIsTransitioning(false);
			}, 600); // Slightly longer than the animation duration
			
			return () => clearTimeout(transitionTimeout);
		}, 4000); // Change image every 4 seconds
		
		return () => clearInterval(interval); // Cleanup on component unmount
	}, [currentImageIndex]);
	
	return (
		<section>
			<Container fluid className="home-section" id="home">
				<Particle />
				<Container className="home-content home">
					<Row>
						<Col md={7} className="home-header">
							<h1 style={{ paddingBottom: 15 }} className="heading">
								Hi There!{" "}
								<span className="wave" role="img" aria-labelledby="wave">
									👋🏻
								</span>
							</h1>

							<h1 className="heading-name">
								I'M
								<strong className="main-name"> ANEESH RASKAR</strong>
							</h1>

							<div style={{ padding: 50, textAlign: "left" }}>
								<Type />
							</div>
						</Col>

						<Col md={5} style={{ paddingBottom: 20 }}>
							<div className="image-slider-container">
								{/* Current image */}
								<img
									src={images[currentImageIndex]}
									alt="home pic"
									className={`img-fluid slider-image ${isTransitioning ? 'image-enter' : 'image-active'}`}
								/>
								
								{/* Previous image (for transition) */}
								<img
									src={images[prevImageIndex]}
									alt="previous home pic"
									className={`img-fluid slider-image ${isTransitioning ? 'image-exit' : 'image-inactive'}`}
								/>
							</div>
						</Col>
					</Row>
				</Container>
			</Container>
			<Home2 />
		</section>
	);
}

export default Home;
