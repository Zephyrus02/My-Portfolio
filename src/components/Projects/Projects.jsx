import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "/Assets/Projects/leaf.png";
import driver from "/Assets/Projects/driver.png";
import attendance from "/Assets/Projects/attendance.png";
import disaster from "/Assets/Projects/disaster.png";
import CVL from "/Assets/Projects/cvl.png";
import Lumen from "/Assets/Projects/Lumen.png";
import Ascendancy from "/Assets/Projects/Ascendancy.png";
import valo from "/Assets/Projects/valo.png";
import crime from "/Assets/Projects/crime.png";
import irrigation from "/Assets/Projects/irrigation.png";
import NLP from "/Assets/Projects/NLP.png";
import offloading from "/Assets/Projects/offloading.png";
import IJFMR from "/Assets/Projects/IJFMR.png";
import JIDSBDM from "/Assets/Projects/JIDSBDM.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {/* Lumen AI */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Lumen}
              isBlog={false}
              title="Lumen AI"
              description="Developing a desktop application can assist users in managing their daily tasks, enhancing productivity, and providing a user-friendly interface for various functionalities. The application is designed to be intuitive and easy to use, with a focus on improving the user experience. It enables users to use their local AI models anywhere in the system, making it a versatile tool for various tasks. The application is built using Wails and React.js, and it is designed to be lightweight and efficient, ensuring that it runs smoothly on most systems. The application is also designed to be customizable, allowing users to tailor it to their specific needs and preferences."
              ghLink="https://github.com/Zephyrus02/Lumem-AI"
            />
          </Col>

          {/* Collaborative Vehicle Localiation using LSTM Based Federated Learning for Trajectory Prediction */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={CVL}
              isBlog={false}
              title="Collaborative Vehicle Localiation using LSTM Based Federated Learning for Trajectory Prediction"
              description="Developed a collaborative vehicle localization system using LSTM based federated learning for trajectory prediction. The system uses the GPS data of the vehicles to predict the trajectory of the vehicles and also uses the federated learning technique to train the model on the client devices without sharing the data. The system is able to minimize the average displacement error by 29.2% when compared to traditional approaches."
              ghLink="https://github.com/Zephyrus02/Collaborative-Vehicle-Localization-using-LSTM-based-Federated-Learning-for-Trajecory-Prediction"
            />
          </Col>

          {/* Ascendancy eSports */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Ascendancy}
              isBlog={false}
              title="Ascendancy eSports"
              description="An full stack webs application for end-to-end management of eSports tournaments for Valorant. The website is built using React.js and Node.js and uses MongoDB as the database. The website has a very attractive UI/UX based around a gaming theme. The website includes realtime showcasing of the tournament leaderboard and brackets, and also has an interactive map veto room architecture.  The website includes payment gateway for team registrateion, and an admin panel for managing the tournament sessions, scheduling matches and managing users. "
              ghLink="https://github.com/Zephyrus02/Ascendancy"
              demoLink="https://www.ascendancy-esports.me/"
            />
          </Col>

          {/* NLP Resume Parser */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={NLP}
              isBlog={false}
              title="NLP Resume Parser"
              description="An advanced system designed to revolutionize the job application process by intelligently parsing resumes, offering personalized career recommendations, and enhancing skills. Powered by cutting-edge AI and NLP, it evaluates resumes to provide a comprehensive score, suggest skill improvements, recommend relevant courses, and match users with tailored job opportunities. By integrating career insights, resume optimization, and dynamic job market analysis, this system empowers users to unlock their full potential and streamline their path to success."
              ghLink="https://github.com/Zephyrus02/NLP-Resume-Parser"
              demoLink="https://skill-scout-jet.vercel.app/"
            />
          </Col>

          {/* Computational Offloading */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={offloading}
              isBlog={false}
              title="Computational Offloading using Deep Learning"
              description="Computational offloading, is a technique used to improve the performance and efficiency of resource-constrained devices, such as smartphones, tablets, or IoT devices, by offloading computational tasks to more powerful remote servers or cloud services. This process allows the device to perform complex calculations and tasks without being limited by its own hardware capabilities"
              ghLink="https://github.com/Zephyrus02/Computational-Offloading"
            />
          </Col>

          {/* Smart Irrigation */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={irrigation}
              isBlog={false}
              title="Energy Efficient Smart Irrigation System"
              description="An IoT based smart irrigation system which uses parameters such as soil moisture, humidity and environment temperature and also take crop type as user input then accordingly water the plants as predicted by the AI model. The system uses the decision tree model which takes in all parameters as input and provides a decision on watering the field. The system also uses the solar panel to charge the battery of the system and make it energy efficient.This was a collaborative project and the decision tree model was trained using a self generated dataset and it was able to achieve an accuracy of 98%."
              ghLink="https://github.com/Zephyrus02/Energy-Efficient-Smart-Irrigation-System"
            />
          </Col>

          {/* Crime Detection */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={crime}
              isBlog={false}
              title="Face Recognition and Emotion Detection"
              description="An anomaly detection system which uses the live feed from the camera to detect the real-time occurances of criminal activity. The system uses the OpenCV and Keras library to detect the criminal activity. The system alerts the respected authorities with a proper analysis of the occurances of the crime."
              ghLink="https://github.com/Zephyrus02/Crime-Anomaly-Detection"
            />
          </Col>

          {/* Improved Disaster Response */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={disaster}
              isBlog={false}
              title="Improved Disaster Response"
              description="A cloud based webapp which is used to help people stuck in natural calamities. It uses geolocation to track users location and alert the nearest help and resource providers with all the necessary information."
              ghLink="https://github.com/Zephyrus02/Disaster-Support"
            />
          </Col>

          {/* Smart attendance monitoring */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={attendance}
              isBlog={false}
              title="Smart attendance monitoring"
              description="An autonomous attendance marking system based on fingerprint recognition and geolocation. The system uses the fingerprint of the student to mark the attendance and also monitors the students location while marking the attendance."
              ghLink="https://github.com/Zephyrus02/IOT-Project"
            />
          </Col>

          {/* Leaf Disease */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Potato Leaf Disease Classifier"
              description="Used the potaot disease dataset from Kaggle and trained a image classifer model using 'PyTorch' framework using CNN 3 classes of leaf disease state. The model was successfully able to detect diseased and healthy leaves. This was a collaboration project and we were able to achieve an accuracy of 89% by using developed pretrained model."
              ghLink="https://github.com/ParthDedhia02/Leaf-Disease-Detection"
            />
          </Col>

          {/* ValoSpike */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={valo}
              isBlog={false}
              title="ValoSpike"
              description="A valorant agent profile website made for fun with main focus on UI/UX. The website showcases all valorant agents with their agent category, agent description, utilities, utility description and their signature voicelines. This was a collaboration project and we were able to achieve a very attractive UI/UX design."
              ghLink="https://github.com/SujayGh0sh/valorant-agents"
              demoLink="https://valospike.vercel.app/"
            />
          </Col>

          {/* Driver Drowsiness Detection System */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={driver}
              isBlog={false}
              title="Driver Drowsiness Detection System"
              description="An alerting system in cars to detect drowsiness of the driver using OpenCV and Dlib library. The system uses the live feed from the camera mounted on the dashboard of the car to detect the facial landmarks of the driver and then predict the drowsiness of the driver. The system alerts the driver with a sound alarm if the driver is found to be drowsy."
              ghLink="https://github.com/Zephyrus02/Drowsiness-Detection-using-OpenCV"
            />
          </Col>
        </Row>
        {/* Publications Section */}
        <h1 className="project-heading" style={{ marginTop: "40px" }}>
          My <strong className="purple">Publications</strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are some of my research publications.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {/* Example Publication Card */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={IJFMR} // Use an appropriate image
              isBlog={false}
              title="Advancing IOT Interoperability: Dynamic Protocol Translation through Machine Learning For Enhanced Communication Efficiency"
              description="This study presents a pioneering methodology for Dynamic Protocol Translation in the Internet of Things (IoT), aiming to overcome challenges posed by diverse communication protocols among IoT devices. The primary objective is to develop a two-fold approach: first, acquiring data from IoT devices through their specific protocols, preprocessing it for consistency, and employing Natural Language Processing (NLP) techniques for semantic extraction and normalization; second, implementing a machine learning model, incorporating neural networks, to discern correlations between normalized representations and target protocol structures. The emphasis is on rigorous testing, validation, & real-time translation capabilities. The main conclusions of the study demonstrate how well the suggested Logistic Regression model performed, with an accuracy of 96.76%, in contrast to an existing model (XML-JSON) that had an accuracy of 82.41%. The detailed evaluation metrics, which include F1 score, precision, and recall, demonstrate how well the suggested method works to solve protocol translation issues. The iterative feedback loop, real-time translation, and secure data transfer of the proposed system improve its adaptability and reliability. This research enhances the field of IoT communication by offering a comprehensive solution for smooth interoperability & communication efficiency in a range of IoT applications."
              visitLink="https://pdfs.semanticscholar.org/356c/1c24e5065a204c52a6efa2973fc88d9a709a.pdf"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={JIDSBDM} // Use an appropriate image
              isBlog={false}
              title="Waste Management Optimization Using Reinforcement Learning Algorithm"
              description="Urbanization and population growth have increased waste, creating an excellent challenge for waste management systems. In response to these challenges, this study investigates using Reinforcement Learning (RL) algorithms to optimize waste management in urban environments. The primary purpose of this study is to solve the problem of changing the waste collection process, which is essential in reducing operating costs and increasing overall profit, with the effects of waste management. The use of Q-learning, a reinforcement learning algorithm, forms the basis of our approach. Q-learning was chosen for its performance in handling arbitrary decisions and its ability to make weak decisions, perfectly adapting to the complexities and differences in the garbage collection period. Extensive testing and analysis demonstrate the effectiveness of the proposed support learning-based waste management optimization model. This research aims to use innovative technology to improve how we plan waste collection on the fly, making waste management more efficient and cost-effective."
              visitLink="https://matjournals.net/engineering/index.php/JIDSBDM/article/view/430" // Replace with actual publication link
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
