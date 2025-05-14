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
import emailjs from "@emailjs/browser";

function Chatbot() {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [healthStatus, setHealthStatus] = useState("checking"); // possible values: "online", "offline", "checking"
  const webchatRef = useRef(null);

  // Using import.meta.env instead of process.env for Vite projects
  const clientId = import.meta.env.VITE_BOTPRESS_CLIENT_ID || "";

  // Contact form states
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [attachments, setAttachments] = useState([]);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Add a reference to the file input element
  const fileInputRef = useRef(null);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success", // 'success' or 'error'
  });

  // Function to show toast message
  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });

    // Auto-hide toast after 5 seconds
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 5000);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  // Update removeAttachment to reset the file input
  const removeAttachment = (index) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);

    // Reset the file input to clear its display text
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("sending");

    try {
      const apiUrl = `${import.meta.env.VITE_EMAIL_SERVICE_API}/send-mail`;

      // Create form data
      const formData = new FormData();
      formData.append("name", contactForm.name);
      formData.append("email", contactForm.email);
      formData.append("subject", contactForm.subject);
      formData.append("message", contactForm.message);

      // Add attachments
      attachments.forEach((file) => {
        formData.append("attachments", file);
      });

      // Send data to the API
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send email");
      }

      // Show success toast
      showToast("Your message has been sent successfully!", "success");

      // Reset form
      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setAttachments([]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setSubmitStatus("success");
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      showToast("Failed to send message. Please try again later.", "error");
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  // Helper function to convert file to base64
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Add drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if leaving the actual drop zone (not its children)
    if (e.currentTarget.contains(e.relatedTarget)) return;

    setIsDragging(false);
  };

  // Update handleDrop to reset the file input
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setAttachments([...attachments, ...droppedFiles]);

      // Reset the file input to clear its display text
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Optional: Show a brief success message or animation
      const dropFeedback = document.createElement("div");
      dropFeedback.className = "drop-success";
      dropFeedback.textContent = `${droppedFiles.length} file(s) added`;
      e.currentTarget.appendChild(dropFeedback);

      setTimeout(() => {
        e.currentTarget.removeChild(dropFeedback);
      }, 2000);
    }
  };

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
          await fetch(
            `https://cdn.botpress.cloud/webchat/v1/status/${clientId.trim()}`,
            {
              method: "GET",
            }
          );

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
        setHealthStatus((prevStatus) =>
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
            {status === "online"
              ? "Chatbot Online"
              : status === "offline"
              ? "Chatbot Offline"
              : "Connecting..."}
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
    botConversationDescription:
      "Ask me anything about Aneesh's skills, projects, or experience!",
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

        {/* Contact Me Section */}
        <Row style={{ justifyContent: "center", padding: "50px 10px" }}>
          <Col md={8}>
            <h1 className="project-heading">
              Contact <strong className="purple">Me</strong>
            </h1>
            <p style={{ color: "white" }}>
              Have a question or want to work together? Feel free to reach out!
            </p>

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
                  <Form.Group className="mb-3" controlId="contactName">
                    <Form.Label className="text-light">Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={contactForm.name}
                      onChange={handleFormChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="contactEmail">
                    <Form.Label className="text-light">
                      Your Email address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Your email"
                      value={contactForm.email}
                      onChange={handleFormChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Subject field remains the same */}
              <Form.Group className="mb-3" controlId="contactSubject">
                <Form.Label className="text-light">Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={contactForm.subject}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="contactMessage">
                <Form.Label className="text-light">Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  rows={4}
                  placeholder="Your message"
                  value={contactForm.message}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="contactAttachments">
                <Form.Label className="text-light">
                  Attachments
                  <small className="ms-2 text-light-50">
                    (Drag & drop files anywhere on the form)
                  </small>
                </Form.Label>
                <div className="file-input-wrapper">
                  <Form.Control
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="file-input"
                  />
                  <div className="file-status">
                    {attachments.length > 0 ? (
                      <span className="file-count-text">
                        {attachments.length}{" "}
                        {attachments.length === 1 ? "file" : "files"} selected
                      </span>
                    ) : (
                      <span className="no-file-text">No files selected</span>
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  {attachments.length > 0 && (
                    <div className="attachment-list">
                      {attachments.map((file, index) => (
                        <div key={index} className="attachment-item">
                          <span className="text-light">{file.name}</span>
                          <Button
                            variant="link"
                            size="sm"
                            className="text-danger p-0 ms-2"
                            onClick={() => removeAttachment(index)}
                          >
                            ✕
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="contact-submit-btn"
                disabled={submitStatus === "sending"}
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

              {submitStatus === "success" && (
                <div className="alert alert-success mt-3">
                  Your message has been sent successfully!
                </div>
              )}

              {submitStatus === "error" && (
                <div className="alert alert-danger mt-3">
                  Failed to send message. Please try again later.
                </div>
              )}
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Toast notifications */}
      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ zIndex: 1100 }}
      >
        <Toast
          show={toast.show}
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
          bg={toast.type === "success" ? "success" : "danger"}
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
