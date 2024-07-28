import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import middleware from "./middleware/middleware";
import { login, register } from "./routes/users";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/login", (req: Request, res: Response) => {
  res.json({ token: "test123" });
});

app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});

// call middleware
app.use("/api", async (req: Request, res: Response, next: NextFunction) => {
  middleware(req, res, next);
});

// test to make sure middleware works
app.get("/api/info", (req: Request, res: Response) => {
  return res.json({ message: "Hello, world!" });
});

// Login
app.post("/login", async (req: Request, res: Response) => {
  login(req, res);
});

// Register
app.post("/register", async (req: Request, res: Response) => {
  register(req, res);
});
