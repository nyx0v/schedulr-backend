import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

export class AuthMiddleware {
  static async hashPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = hashedPassword;
      next();
    } catch (error) {
      // Handle error
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

