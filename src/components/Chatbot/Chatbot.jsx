// src/components/Chatbot/Chatbot.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import Particle from "../Particle";
import "./Chatbot.css";
import { Webchat, WebchatProvider, getClient } from "@botpress/webchat";
import bitmoji from "/Assets/bitmoji.png";
import { AiOutlineClose } from "react-icons/ai";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

// LiveKit Imports
import "@livekit/components-styles";
import {
  LiveKitRoom,
  useVoiceAssistant,
  VoiceAssistantControlBar,
  useTranscriptions,
  useChat,
  RoomAudioRenderer,
} from "@livekit/components-react";

function VoiceAssistantView({ onDisconnect }) {
  const { agentState, toggleVAD } = useVoiceAssistant();
  const { chatMessages } = useChat();
  const { interim } = useTranscriptions();
  const transcriptContainerRef = useRef(null);

  useEffect(() => {
    if (transcriptContainerRef.current) {
      transcriptContainerRef.current.scrollTop =
        transcriptContainerRef.current.scrollHeight;
    }
  }, [chatMessages, interim]);

  const getStatusText = () => {
    switch (agentState) {
      case "listening":
        return "I'm listening...";
      case "thinking":
        return "Thinking...";
      case "speaking":
        return "Speaking...";
      default:
        return "Ready to talk";
    }
  };

  const getOrbClass = () => {
    switch (agentState) {
      case "listening":
        return "listening";
      case "thinking":
        return "thinking";
      case "speaking":
        return "speaking";
      default:
        return "idle";
    }
  };

  return (
    <div className="voice-assistant-interface">
      <div className="voice-orb-container">
        <div className={`voice-orb ${getOrbClass()}`}></div>
        <p className="status-text">{getStatusText()}</p>
      </div>

      {/* <div className="transcript-container" ref={transcriptContainerRef}>
        {chatMessages.length === 0 && !interim && (
          <div className="empty-transcript">
            <p>Start speaking to begin the conversation...</p>
          </div>
        )}
        {chatMessages.map((msg, i) => (
          <div
            key={i}
            className={`transcript-message ${
              msg.from?.identity === "user" ? "user-message" : "agent-message"
            }`}
          >
            <div className="message-label">
              {msg.from?.identity === "user" ? "You" : "Agent"}
            </div>
            <div className="message-content">{msg.message}</div>
          </div>
        ))}
        {interim && (
          <div className="transcript-message user-message interim">
            <div className="message-label">You</div>
            <div className="message-content">{interim}</div>
          </div>
        )}
      </div> */}

      <div className="voice-controls">
        <button
          onClick={toggleVAD}
          className="lk-button"
          aria-label="Toggle Microphone"
          title="Toggle Microphone"
        >
          {agentState !== "idle" ? (
            <FaMicrophone size="1.5em" />
          ) : (
            <FaMicrophoneSlash size="1.5em" />
          )}
        </button>
        <button
          onClick={onDisconnect}
          className="lk-button"
          aria-label="Disconnect"
          title="Disconnect"
        >
          <AiOutlineClose size="1.5em" />
        </button>
      </div>
    </div>
  );
}

function Chatbot() {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [healthStatus, setHealthStatus] = useState("checking");
  const [mailingServiceStatus, setMailingServiceStatus] = useState("checking");
  const webchatRef = useRef(null);

  const clientId = import.meta.env.VITE_BOTPRESS_CLIENT_ID || "";

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [attachments, setAttachments] = useState([]);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // LiveKit Voice Agent states
  const [voiceAgentToken, setVoiceAgentToken] = useState("");
  const [voiceAgentConnected, setVoiceAgentConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectToVoiceAgent = async () => {
    console.log("🎤 Starting voice agent connection...");
    setIsConnecting(true);

    try {
      const tokenUrl = "http://localhost:3001/api/token";
      const requestData = {
        roomName: "CA_EGo3ovUmGWRt",
        participantName: `user-${Date.now()}`,
        dispatchAgent: true,
      };

      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `Failed to get token: ${response.status} - ${
            errorData.message || "Unknown error"
          }`
        );
      }

      const { token } = await response.json();
      console.log("✅ Token received successfully");
      setVoiceAgentToken(token);
      setVoiceAgentConnected(true);
    } catch (error) {
      console.error("❌ Failed to connect to voice agent:", error);
      showToast(
        `Could not connect to Voice Assistant: ${error.message}`,
        "error"
      );
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectVoiceAgent = () => {
    console.log("🔌 Disconnecting voice agent...");
    setVoiceAgentConnected(false);
    setVoiceAgentToken("");
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 5000);
  };

  const checkMailingServiceHealth = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_EMAIL_SERVICE_API}/health`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
        }
      );
      if (response.ok) setMailingServiceStatus("online");
      else setMailingServiceStatus("offline");
    } catch (error) {
      if (error.message.includes("CORS") || error.message.includes("fetch")) {
        setMailingServiceStatus("cors-error");
      } else {
        setMailingServiceStatus("offline");
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm({ ...contactForm, [name]: value });
  };

  const handleFileChange = (e) => {
    setAttachments([...attachments, ...Array.from(e.target.files)]);
  };

  const removeAttachment = (index) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("sending");
    try {
      const formData = new FormData();
      formData.append("name", contactForm.name);
      formData.append("email", contactForm.email);
      formData.append("subject", contactForm.subject);
      formData.append("message", contactForm.message);
      attachments.forEach((file) => formData.append("attachments", file));

      const response = await fetch(
        `${import.meta.env.VITE_EMAIL_SERVICE_API}/send-mail`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to send email");

      showToast("Your message has been sent successfully!", "success");
      setContactForm({ name: "", email: "", subject: "", message: "" });
      setAttachments([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setSubmitStatus("success");
    } catch (error) {
      showToast("Failed to send message. Please try again later.", "error");
      setSubmitStatus("error");
    } finally {
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) {
      setAttachments([...attachments, ...Array.from(e.dataTransfer.files)]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (!clientId) {
      setError("Botpress configuration error");
      setHealthStatus("offline");
      setLoading(false);
      return;
    }
    try {
      setClient(getClient({ clientId: clientId.trim() }));
      const checkConnection = async () => {
        try {
          await fetch(
            `https://cdn.botpress.cloud/webchat/v1/status/${clientId.trim()}`
          );
          setHealthStatus("online");
        } catch (err) {
          setHealthStatus("offline");
        }
      };
      checkConnection();
      const timeoutId = setTimeout(() => {
        setHealthStatus((prev) => (prev === "checking" ? "offline" : prev));
      }, 10000);
      setLoading(false);
      return () => clearTimeout(timeoutId);
    } catch (err) {
      setError("Failed to initialize chat");
      setHealthStatus("offline");
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    checkMailingServiceHealth();
    const interval = setInterval(checkMailingServiceHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const HealthIndicator = ({ status, service = "Chatbot" }) => {
    const getStatusText = () =>
      ({
        online: `${service} Online`,
        offline: `${service} Offline`,
        checking: "Connecting...",
        "cors-error": `${service} (CORS Issue)`,
      }[status] || "Unknown Status");

    return (
      <div className="health-indicator-container">
        <div
          className={`health-indicator ${
            status === "cors-error" ? "checking" : status
          }`}
        >
          <span className="health-indicator-dot"></span>
          <span className="health-indicator-text">{getStatusText()}</span>
        </div>
      </div>
    );
  };

  const configuration = {
    color: "#623686",
    showConversationButtons: false,
    hideWidget: true,
    stylesheet:
      "https://webchat-styler.botpress.app/prod/code/90a3fa05-7d4e-49c6-bbe8-7912c8c202d9/v28875/style.css",
    botAvatarUrl: bitmoji,
    botName: "Aneesh's Assistant",
    botConversationDescription:
      "Ask me anything about Aneesh's skills, projects, or experience!",
  };

  return (
    <Container fluid className="chatbot-section">
      <Particle />
      <Container>
        {/* Voice Agent Section */}
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col md={8}>
            <h1 className="project-heading">
              Talk with My <strong className="purple">Voice Agent</strong>
            </h1>
            <p style={{ color: "white" }}>
              Click the button below to start a real-time voice conversation
              with my AI agent.
            </p>

            {!voiceAgentConnected ? (
              <div className="voice-agent-start">
                <Button
                  onClick={connectToVoiceAgent}
                  className="voice-start-button"
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Connecting...
                    </>
                  ) : (
                    "Start Voice Assistant"
                  )}
                </Button>
              </div>
            ) : (
              <div className="voice-agent-active">
                <LiveKitRoom
                  serverUrl={import.meta.env.VITE_LIVEKIT_URL}
                  token={voiceAgentToken}
                  connect={true}
                  audio={true}
                  video={false}
                  onConnected={() => {
                    console.log("✅ Connected to LiveKit room");
                  }}
                  onDisconnected={(reason) => {
                    console.log("🔌 Disconnected from LiveKit room:", reason);
                    setVoiceAgentConnected(false);
                  }}
                  onError={(error) => {
                    console.error("❌ LiveKit room error:", error);
                    showToast("Connection error occurred", "error");
                    setVoiceAgentConnected(false);
                  }}
                >
                  <RoomAudioRenderer />
                  <VoiceAssistantView onDisconnect={disconnectVoiceAgent} />
                </LiveKitRoom>
              </div>
            )}
          </Col>
        </Row>

        {/* Botpress Chatbot Section */}
        <Row style={{ justifyContent: "center", padding: "50px 10px" }}>
          <Col md={8}>
            <h1 className="project-heading">
              Chat with My <strong className="purple">AI Assistant</strong>
            </h1>
            <p style={{ color: "white" }}>
              Ask anything about my education, experience, projects, or
              interests!
            </p>
            <HealthIndicator status={healthStatus} service="Chatbot" />
            {loading ? (
              <div className="text-center my-5">
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : client ? (
              <WebchatProvider client={client} configuration={configuration}>
                <div className="custom-chatbot-container">
                  <div className="webchat-container">
                    <Webchat ref={webchatRef} className="webchat-frame" />
                  </div>
                </div>
              </WebchatProvider>
            ) : null}
          </Col>
        </Row>

        {/* Contact Me Section */}
        <Row style={{ justifyContent: "center", padding: "50px 10px" }}>
          <Col md={8}>
            <h1 className="project-heading">
              Contact <strong className="purple">Me</strong>
            </h1>
            <p style={{ color: "white" }}>
              Have a question or want to work together? Feel free to reach out!
            </p>
            <HealthIndicator
              status={mailingServiceStatus}
              service="Email Service"
            />
            <Form
              className={`contact-form ${isDragging ? "dragging" : ""}`}
              onSubmit={handleSubmit}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="drag-drop-overlay">
                <div className="drag-drop-message">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <span>Drop files here to upload</span>
                </div>
              </div>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-light">Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleFormChange}
                      placeholder="Enter your name"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-light">Your Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleFormChange}
                      placeholder="Enter your email"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label className="text-light">Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleFormChange}
                  placeholder="Enter subject"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-light">Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  rows={4}
                  value={contactForm.message}
                  onChange={handleFormChange}
                  placeholder="Enter your message"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-light">Attachments</Form.Label>
                <div className="file-input-wrapper">
                  <Form.Control
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="file-input"
                  />
                  <div className="file-status">
                    <span
                      className={
                        attachments.length > 0
                          ? "file-count-text"
                          : "no-file-text"
                      }
                    >
                      {attachments.length > 0
                        ? `${attachments.length} file(s) selected`
                        : "No files selected"}
                    </span>
                  </div>
                </div>
                {attachments.length > 0 && (
                  <div className="attachment-list mt-2">
                    {attachments.map((file, index) => (
                      <div key={index} className="attachment-item">
                        <span className="text-light">{file.name}</span>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-danger p-0 ms-2"
                          onClick={() => removeAttachment(index)}
                          title="Remove file"
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="contact-submit-btn"
                disabled={
                  submitStatus === "sending" ||
                  mailingServiceStatus === "offline"
                }
              >
                {submitStatus === "sending" ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ zIndex: 1100 }}
      >
        <Toast
          show={toast.show}
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
          bg={toast.type}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">
              {toast.type === "success" ? "Success" : "Error"}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default Chatbot;
