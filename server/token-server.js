import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { AccessToken, AgentDispatchClient } from "livekit-server-sdk";

dotenv.config({ path: ".env" });

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/token", async (req, res) => {
  try {
    const { roomName, participantName, dispatchAgent } = req.body;

    if (!roomName || !participantName) {
      return res
        .status(400)
        .json({ message: "Missing roomName or participantName" });
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const livekitUrl = process.env.VITE_LIVEKIT_URL;

    if (!apiKey || !apiSecret || !livekitUrl) {
      console.error("❌ Missing LiveKit credentials");
      return res.status(500).json({ message: "Server configuration error" });
    }

    // Create access token
    const token = new AccessToken(apiKey, apiSecret, {
      identity: participantName,
      name: participantName,
    });

    token.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    });

    const jwt = await token.toJwt();

    // Explicitly dispatch agent if requested
    if (dispatchAgent) {
      try {
        const agentDispatchClient = new AgentDispatchClient(
          livekitUrl.replace("wss:", "https:"), // Convert WebSocket URL to HTTP
          apiKey,
          apiSecret
        );

        console.log("🤖 Dispatching agent to room:", roomName);

        // Replace 'your-agent-name' with your actual agent name
        await agentDispatchClient.createDispatch(roomName, "CA_EGo3ovUmGWRt", {
          metadata: JSON.stringify({ user: participantName }),
        });

        console.log("✅ Agent dispatched successfully");
      } catch (agentError) {
        console.error(
          "⚠️ Agent dispatch failed (continuing anyway):",
          agentError.message
        );
        // Don't fail the token request if agent dispatch fails
      }
    }

    return res.json({ token: jwt });
  } catch (error) {
    console.error("❌ Error generating token:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error: " + error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Token server running on http://localhost:${port}`);
  console.log("📋 Environment variables loaded from .env.local");
});
