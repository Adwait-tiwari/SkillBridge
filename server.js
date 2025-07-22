import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import livekitRoutes from './routes/livekit.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/livekit', livekitRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));