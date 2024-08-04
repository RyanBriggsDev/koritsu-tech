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

    // Take email and look up user
    const data: User[] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (data.length === 0)
      return res.status(404).json({ error: "User not found" });

    const user = data[0];

    // If user exists, check password
    const matched = bcrypt.compareSync(password, user.password as string);
    if (!matched) return res.status(401).json({ error: "Invalid password" });

    // If password matches, create token and prepare user data
    const token = jwt.sign(
      {
        id: user.id,
        accountId: user.accountId,
        exp: Math.floor(Date.now() / 1000) + 24 * (60 * 60),
      },
      process.env.JWT_SECRET!
    );

    // Prepare user data to return, excluding sensitive information
    const userData = {
      email: user.email,
      name: user.name,
      // Add any other non-sensitive fields you want to return
    };

    return res.json({ token, user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// register
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    // Check if user exists
    if (password != confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const hashed = bcrypt.hashSync(password, 10);
    const data: User[] = await db
      .insert(users)
      .values({ name, email, password: hashed })
      .returning();
    return res.json(data[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
