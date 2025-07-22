import express from 'express';
import dotenv from 'dotenv';
import { RoomServiceClient, AccessToken } from 'livekit-server-sdk';

dotenv.config();
const router = express.Router();

// ✅ Load environment variables
const apiKey = process.env.LIVEKIT_API_KEY;
const apiSecret = process.env.LIVEKIT_API_SECRET;
const livekitHost = process.env.LIVEKIT_URL;

if (!apiKey || !apiSecret || !livekitHost) {
    console.error("❌ LIVEKIT_API_KEY, LIVEKIT_API_SECRET, or LIVEKIT_URL is missing in your .env file.");
    throw new Error("LiveKit credentials not set.");
}

// ✅ Initialize Room Service Client
const roomService = new RoomServiceClient(livekitHost, apiKey, apiSecret);

// ----------------------
// ✅ Create Room Endpoint
// ----------------------
router.post('/create-room', async (req, res) => {
    const { roomName } = req.body;

    if (!roomName) {
        return res.status(400).json({ error: 'roomName is required' });
    }

    try {
        const room = await roomService.createRoom({
            name: roomName,
            emptyTimeout: 300, // seconds
            maxParticipants: 10,
        });

        console.log(`✅ Room created: ${room.name}`);
        res.status(200).json({ room });
    } catch (error) {
        console.error('❌ Room creation failed:', error.message);
        res.status(500).json({ error: 'Room creation failed', details: error.message });
    }
});

// ----------------------
// ✅ Generate Access Token Endpoint
// ----------------------
router.post('/get-token', async (req, res) => {
    const { roomName, userName } = req.body;

    if (!roomName || !userName) {
        console.error("❌ Missing roomName or userName in request body");
        return res.status(400).json({ error: 'roomName and userName are required' });
    }

    try {
        const token = new AccessToken(apiKey, apiSecret, {
            identity: userName,
            ttl: 60 * 60, // 1 hour
        });

        token.addGrant({
            roomJoin: true,
            room: roomName,
        });

        const jwt = await token.toJwt(); // ✅ Must await this

        if (typeof jwt !== 'string') {
            console.error('❌ Token generation error — not a string:', jwt);
            return res.status(500).json({ error: 'Generated token is not a valid string' });
        }

        console.log('✅ JWT token generated successfully');
        return res.status(200).json({ token: jwt });
    } catch (err) {
        console.error('❌ Token generation failed:', err.message);
        return res.status(500).json({ error: 'Failed to generate token', details: err.message });
    }
});

export default router;