
export default async function handler(req, res) {
 // Enable CORS
 res.setHeader("Access-Control-Allow-Origin", "*");
 res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
 res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");


 // Handle preflight requests
 if (req.method === "OPTIONS") {
   res.status(200).end();
   return;
 }


 if (req.method !== "GET") {
   res.setHeader("Allow", ["GET"]);
   return res.status(405).json({ message: "Method Not Allowed" });
 }


 try {
   console.log("🔍 Checking voice agent status...");


   const apiKey = process.env.LIVEKIT_API_KEY;
   const apiSecret = process.env.LIVEKIT_API_SECRET;
   const livekitUrl = process.env.VITE_LIVEKIT_URL;


   console.log("Environment check:", {
     hasApiKey: !!apiKey,
     hasApiSecret: !!apiSecret,
     hasLivekitUrl: !!livekitUrl,
   });


   if (!apiKey || !apiSecret || !livekitUrl) {
     console.log("❌ Missing credentials");
     return res.status(503).json({
       status: "offline",
       agentAvailable: false,
       message: "Missing LiveKit credentials",
     });
   }


   console.log("✅ Voice agent credentials available");
   res.setHeader("Content-Type", "application/json");
   return res.status(200).json({
     status: "online",
     agentAvailable: true,
     message: "Voice agent is ready",
   });
 } catch (error) {
   console.error("❌ Agent status check error:", error);
   res.setHeader("Content-Type", "application/json");
   return res.status(503).json({
     status: "offline",
     agentAvailable: false,
     message: error.message,
   });
 }
}
