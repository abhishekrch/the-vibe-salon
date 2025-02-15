import express, { Express, Request, Response } from "express";
import authRoutes from "./routes/authRoutes";
import { connectDB } from "./config/database";
import cookieParser from "cookie-parser";

const app: Express = express();
app.use(express.json()); // Parse JSON request bodies (POST/PUT)
app.use(cookieParser());

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from The Vibe Salon Backend");
});

app.use("/api/auth", authRoutes);

export default app;
