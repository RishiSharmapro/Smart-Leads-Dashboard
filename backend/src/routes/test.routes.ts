import express, { Response } from "express";

import authMiddleware, {
  AuthRequest,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/me",
  authMiddleware,
  (req: AuthRequest, res: Response) => {
    res.json({
      message: "Protected Route Accessed",
      user: req.user,
    });
  }
);

export default router;