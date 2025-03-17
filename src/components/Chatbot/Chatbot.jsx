// src/components/Chatbot/Chatbot.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import "./Chatbot.css";
import { Webchat, WebchatProvider, getClient } from "@botpress/webchat";
import bitmoji from "/Assets/bitmoji.png";

function Chatbot() {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Using import.meta.env instead of process.env for Vite projects
  const clientId = import.meta.env.VITE_BOTPRESS_CLIENT_ID || "";

  useEffect(() => {
    if (!clientId) {
      console.error("Botpress client ID is missing!");
      setError("Botpress configuration error");
      setLoading(false);
      return;
    }

    try {
      const botpressClient = getClient({
        clientId: clientId.trim(),
      });
      setClient(botpressClient);
      setLoading(false);
    } catch (err) {
      console.error("Error initializing Botpress client:", err);
      setError("Failed to initialize chat");
      setLoading(false);
    }
  }, [clientId]);

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
                    <Webchat className="webchat-frame" />
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
