import type { Request, Response, NextFunction } from "express";
import User from "../models/user.model.ts";
import { initiateOutboundCall } from "../services/vapi.service.ts";

// Convert phone number to E.164
const formatToE164 = (phone: string): string => {
  // Remove everything except digits
  const digits = phone.replace(/\D/g, "");

  // Example: assume US country code if missing
  if (digits.length === 10) {
    return `+1${digits}`;
  }

  return `+${digits}`;
};

// POST /api/vapi/call
export const startCall = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { phoneNumber, preferredCourse } = req.body;

    if (!phoneNumber) {
      res.status(400).json({
        success: false,
        message: "Phone number is required.",
      });
      return;
    }

    const formattedPhone = formatToE164(phoneNumber);

    // Basic E.164 validation
    const e164Regex = /^\+[1-9]\d{7,14}$/;

    if (!e164Regex.test(formattedPhone)) {
      res.status(400).json({
        success: false,
        message: "Invalid phone number format.",
      });
      return;
    }

    const currentUser = (req as any).user;

    const user = await User.findById(currentUser.userId).select(
      "name email"
    );

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });
      return;
    }

    const result = await initiateOutboundCall({
      phoneNumber: formattedPhone,
      userName: user.name,
      preferredCourse,
      userEmail: user.email || "",
    });

    res.status(200).json({
      success: true,
      message: "Call initiated. You will receive a call shortly.",
      data: {
        callId: result.id,
        status: result.status,
      },
    });
  } catch (error) {
    next(error);
  }
};