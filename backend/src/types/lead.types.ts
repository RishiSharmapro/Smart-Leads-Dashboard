import { Types } from "mongoose";

export type LeadStatus = "new" | "contacted" | "qualified" | "lost";

export type LeadSource = "website" | "instagram" | "referral";

export interface ILead {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;

  createdBy: Types.ObjectId;
}