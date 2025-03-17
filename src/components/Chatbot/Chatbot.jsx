// src/components/Chatbot/Chatbot.jsx
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import "./Chatbot.css";
import { Webchat, WebchatProvider, getClient } from "@botpress/webchat";
import bitmoji from "/Assets/bitmoji.png";

function Chatbot() {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [healthStatus, setHealthStatus] = useState("checking"); // possible values: "online", "offline", "checking"
  const webchatRef = useRef(null);
  
  // Using import.meta.env instead of process.env for Vite projects
  const clientId = import.meta.env.VITE_BOTPRESS_CLIENT_ID || "";

  useEffect(() => {
    if (!clientId) {
      console.error("Botpress client ID is missing!");
      setError("Botpress configuration error");
      setHealthStatus("offline");
      setLoading(false);
      return;
    }

    try {
      // Create botpress client
      const botpressClient = getClient({
        clientId: clientId.trim(),
      });
      
      // Store the client in state
      setClient(botpressClient);
      
      // Since we can't use onEvent directly, we'll check connection status differently
      // First, assume the connection might succeed
      setHealthStatus("checking");
      
      // Set a timeout to check if we can get a response
      const checkConnection = async () => {
        try {
          // Try to ping the bot
          await fetch(`https://cdn.botpress.cloud/webchat/v1/status/${clientId.trim()}`, {
            method: 'GET',
          });
          
          // If fetch succeeds, we can assume the bot is online
          setHealthStatus("online");
          console.log("Botpress connected successfully");
        } catch (err) {
          console.error("Failed to connect to Botpress:", err);
          setHealthStatus("offline");
        }
      };
      
      checkConnection();
      
      // Set a timeout to consider it offline if no connection confirmation after 10 seconds
      const timeoutId = setTimeout(() => {
        setHealthStatus(prevStatus => 
          prevStatus === "checking" ? "offline" : prevStatus
        );
      }, 10000);
      
      setLoading(false);
      
      return () => clearTimeout(timeoutId);
    } catch (err) {
      console.error("Error initializing Botpress client:", err);
      setError("Failed to initialize chat");
      setHealthStatus("offline");
      setLoading(false);
    }
  }, [clientId]);

  // Health indicator component
  const HealthIndicator = ({ status }) => {
    return (
      <div className="health-indicator-container">
        <div className={`health-indicator ${status}`}>
          <span className="health-indicator-dot"></span>
          <span className="health-indicator-text">
            {status === "online" ? "Chatbot Online" : 
             status === "offline" ? "Chatbot Offline" : 
             "Connecting..."}
          </span>
        </div>
      </div>
    );
  };

  const configuration = {
    color: "#623686", // Using your purple theme color
    showConversationButtons: false,
    hideWidget: true, // We'll use our own toggle mechanism
    stylesheet:
      "https://webchat-styler.botpress.app/prod/code/90a3fa05-7d4e-49c6-bbe8-7912c8c202d9/v28875/style.css",
    botAvatarUrl: bitmoji, // Add the bot avatar using the imported image
    botName: "Aneesh's Assistant", 
    botConversationDescription: "Ask me anything about Aneesh's skills, projects, or experience!"
  };

  return (
    <Container fluid className="chatbot-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col md={8}>
            <h1 className="project-heading">
              Chat with My <strong className="purple">AI Assistant</strong>
            </h1>
            <p style={{ color: "white" }}>
              Ask anything about my education, experience, projects, or
              interests!
            </p>

            {/* Health status indicator */}
            <HealthIndicator status={healthStatus} />
            
            {loading ? (
              <div className="text-center my-5">
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 text-light">Loading chatbot...</p>
              </div>
            ) : error ? (
              <div className="alert alert-danger">
                {error}. Please try again later.
              </div>
            ) : client ? (
              <WebchatProvider client={client} configuration={configuration}>
                <div className="custom-chatbot-container">
                  <div className="webchat-container">
                    <Webchat 
                      ref={webchatRef}
                      className="webchat-frame" 
                      onReady={() => {
                        setHealthStatus("online");
                        console.log("Webchat ready and connected");
                      }}
                    />
                  </div>
                </div>
              </WebchatProvider>
            ) : null}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Chatbot;
