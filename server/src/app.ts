import express, { Express, Request, Response } from "express";
import authRoutes from "./routes/authRoutes";
import { connectDB } from "./config/database";

const app: Express = express();
app.use(express.json()); // Parse JSON request bodies (POST/PUT)

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from The Vibe Salon Backend");
});

app.use("/api/auth", authRoutes);

export default app;
