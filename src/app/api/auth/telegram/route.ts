import { createHash, createHmac } from 'crypto';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { objectToAuthDataMap, AuthDataValidator } from "@telegram-auth/server";
import { clerkClient } from '@clerk/nextjs/server';

export const POST = async (req: Request) => {
  try {
    const userData = await req.json();
    
    console.log("Request body:", JSON.stringify(userData));

    // Initialize the AuthDataValidator for Telegram
    const validator = new AuthDataValidator({
      botToken: process.env.TELEGRAM_BOT_TOKEN!,
    });

    // Map request body to the auth data map for validation
    const data = objectToAuthDataMap(userData || {});
    const user = await validator.validate(data);

    if (!user || user.id !== userData.id) {
      return NextResponse.json({ error: "User ID mismatch" }, { status: 401 });
    }
    
    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
};
