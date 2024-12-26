import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
import { AgentRouter } from './routes/agent.js';
import { DonorRouter } from './routes/donor.js';
import { AdminRouter } from './routes/admin.js';
import { DonationRouter } from './routes/donation.js';
import { ImageRouter } from './routes/image.js';

const app = express();

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "build")));

app.use(express.json());
app.use(cors({
    origin: ["https://charity-9.onrender.com", "http://localhost:3001"],
    credentials: true,
}));
app.use(cookieParser());
app.use('/agent', AgentRouter);
app.use('/donor', DonorRouter);
app.use('/admin', AdminRouter);
app.use('/donate', DonationRouter);
app.use('/images', ImageRouter);
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

mongoose.connect("mongodb+srv://mitvashah792:mitva317@mitvaserver.lq6hrao.mongodb.net/charity", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.listen(process.env.PORT, () => {
    console.log("server is running");
});
