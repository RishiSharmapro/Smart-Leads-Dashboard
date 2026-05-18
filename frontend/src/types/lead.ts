export interface Lead {
  _id: string;

  name: string;

  email: string;

  status: "new" | "contacted" | "qualified" | "lost";

  source: "website" | "instagram" | "referral";

  createdAt: string;
}