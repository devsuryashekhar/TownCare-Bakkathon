import jwt from "jsonwebtoken";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

import User from "../models/User.js";
import bcrypt from "bcryptjs";

const otpStore = {}; // { phone: "123456" }

// SIGNUP
export const signup = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    await newUser.save();

    // Create token
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET || "SECRET",
      { expiresIn: "1h" }
    );

    res.status(201).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET || "SECRET",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// SEND OTP
export const sendOtp = async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[phone] = otp;

  const awsRegion = process.env.AWS_REGION || "ap-south-1";
  const smsEnabled = process.env.AWS_SNS_ENABLED !== "false";

  if (smsEnabled) {
    try {
      const snsClient = new SNSClient({ region: awsRegion });
      const normalizedPhone = phone.startsWith("+")
        ? phone
        : phone.length === 10
          ? `+91${phone}`
          : `+${phone}`;
      const command = new PublishCommand({
        PhoneNumber: normalizedPhone,
        Message: `Your TownCare verification code is ${otp}.`,
      });
      await snsClient.send(command);
      return res.json({ success: true, message: "OTP sent via SMS." });
    } catch (error) {
      console.error("AWS SNS error:", error);
    }
  }

  const responsePayload = {
    success: true,
    message: "OTP generated. SMS provider not configured.",
  };

  if (process.env.RETURN_DEV_OTP === "true") {
    responsePayload.otp = otp;
  }

  res.json(responsePayload);
};

// VERIFY OTP
export const verifyOtp = (req, res) => {
  const { phone, otp } = req.body;

  if (otpStore[phone] !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  delete otpStore[phone];
  res.json({ success: true });
};
