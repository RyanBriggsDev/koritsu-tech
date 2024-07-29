import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const middleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      throw new Error();
    }
    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};

export default middleware;

//   app.get("/api/info", (req: Request, res: Response) => {
//     return res.json({ message: "Hello, world!" });
//   });
