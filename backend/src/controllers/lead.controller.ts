import { Request, Response } from "express";

import Lead from "../models/Lead.js";

import { AuthRequest } from "../middleware/auth.middleware.js";

export const createLead = async (req: AuthRequest, res: Response) => {
    try {
        const { name, email, status, source } = req.body;

        if (!name || !email || !source) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // create if not exists
        const existingLead = await Lead.findOne({ email });

        if (existingLead) {
            return res.status(400).json({
                message: "Lead with this email already exists",
            });
        }

        const lead = await Lead.create({
            name,
            email,
            status,
            source,
            createdBy: req.user!.id,
        });

        res.status(201).json({
            message: "Lead created successfully",
            lead,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
};

export const getLeads = async (req: Request, res: Response) => {
    try {
        const { status, source, search, sort, page = 1 } = req.query;

        const query: any = {};

        // FILTERS
        if (status) {
            query.status = status;
        }

        if (source) {
            query.source = source;
        }

        // SEARCH
        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    email: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        // SORT
        let sortOption = {};

        if (sort === "latest") {
            sortOption = { createdAt: -1 };
        }

        if (sort === "oldest") {
            sortOption = { createdAt: 1 };
        }

        // PAGINATION
        const limit = 10;

        const currentPage = Number(page);

        const skip = (currentPage - 1) * limit;

        const totalLeads = await Lead.countDocuments(query);

        const leads = await Lead.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            leads,

            pagination: {
                total: totalLeads,
                page: currentPage,
                pages: Math.ceil(totalLeads / limit),
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
};

export const getSingleLead = async (req: Request, res: Response) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found",
            });
        }

        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
};

export const updateLead = async (req: Request, res: Response) => {
    try {
        const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found",
            });
        }

        res.status(200).json({
            message: "Lead updated",
            lead,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
};

export const deleteLead = async (
    req: Request,
    res: Response
) => {
    try {
        const lead = await Lead.findByIdAndDelete(
            req.params.id
        );

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found",
            });
        }

        res.status(200).json({
            message: "Lead deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
};