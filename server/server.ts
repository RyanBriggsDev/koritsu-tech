import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get("/login", (req: Request, res: Response) => {
  res.json({ token: "test123" });
});

app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}/login`);
});
