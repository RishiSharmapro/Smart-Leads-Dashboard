import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

import {
  createLead,
  getLeads,
  getSingleLead,
  updateLead,
  deleteLead,
} from "../controllers/lead.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createLead);
router.get("/", authMiddleware, getLeads);
router.get("/:id", authMiddleware, getSingleLead);
router.put("/:id", authMiddleware, updateLead);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteLead);

export default router;