"use client";
import { useSignIn, useSignUp, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    TelegramLoginWidget: any;
    onTelegramAuth?: (user: any) => void;
  }
}

export default function SignInPage() {
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const { user: CreatedUser } = useUser();

  useEffect(() => {
    window.onTelegramAuth = async (user) => {
      try {
        const response = await fetch("/api/auth/telegram", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          throw new Error("Failed to authenticate with Telegram");
        }

        const userData = await response.json();
        if (!isSignInLoaded || !isSignUpLoaded) return;

        // Attempt to sign in first
        try {
          await signIn.create({
            identifier: userData.username,
            password: userData.id,
          });
          window.location.href = "/protected";
        } catch (err: any) {
          console.log(err.errors);
          // If sign-in fails, attempt sign-up
          if (err.errors[0]?.code === "form_identifier_not_found") {
            try {
              await signUp.create({
                username: userData.username,
                password: userData.id,
                firstName: userData.first_name,
                lastName: userData.last_name,
                redirectUrl: "/protected",
              });
              window.location.href = "/protected";
            } catch (signupError: any) {
              console.error("Signup error:", JSON.stringify(signupError, null, 2));
            }
          } else {
            console.error("Sign-in error:", JSON.stringify(err, null, 2));
          }
        }
      } catch (error) {
        console.error("Authentication error:", error);
      }
    };
  }, [isSignInLoaded, isSignUpLoaded, signIn, signUp]);

  return (
    <div>
      <h1>Sign In</h1>
      <Script
        async
        src="https://telegram.org/js/telegram-widget.js?22"
        data-telegram-login={process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME}
        data-size="large"
        data-onauth="onTelegramAuth(user)"
        data-request-access="write"
      />
    </div>
  );
}
