import "dotenv/config";
import { Request, Response } from "express";
import { db, User, users } from "../schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    // Take email and look up user
    const data: User[] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (!data) return res.status(404).json({ error: "User not found" });
    // If user exists, check password
    const matched = bcrypt.compareSync(password, data[0].password as string);
    if (!matched) return res.status(401).json({ error: "Invalid password" });
    // If password matches, return token
    const token = jwt.sign(
      {
        id: data[0].id,
        accountId: data[0].accountId,
        exp: Math.floor(Date.now() / 1000) + 24 * (60 * 60),
      },
      process.env.JWT_SECRET!
    );
    return res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// register
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword } = req.body;
    // Check if user exists
    if (password != confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const hashed = bcrypt.hashSync(password, 10);
    const data: User[] = await db
      .insert(users)
      .values({ email, password: hashed })
      .returning();
    return res.json(data[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
