import { AccessToken, AgentDispatchClient } from "livekit-server-sdk";

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Method Not Allowed" });
  }

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

    console.log("🎫 Generating token for:", { roomName, participantName });

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

    // Dispatch agent if requested
    if (dispatchAgent) {
      try {
        const agentDispatchClient = new AgentDispatchClient(
          livekitUrl.replace("wss:", "https:"),
          apiKey,
          apiSecret
        );

        console.log("🤖 Dispatching agent to room:", roomName);

        await agentDispatchClient.createDispatch(roomName, "CA_EGo3ovUmGWRt", {
          metadata: JSON.stringify({ user: participantName }),
        });

        console.log("✅ Agent dispatched successfully");
      } catch (agentError) {
        console.error("⚠️ Agent dispatch failed:", agentError.message);
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
}
