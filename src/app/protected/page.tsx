"use client";
import { SignInButton, useUser } from "@clerk/nextjs";

export default function ProtectedPage() {
  const { user } = useUser();

  if (!user) return (<div>Please Sign In to View this Page <SignInButton /></div>);
  console.log(user);
  return (
    <div>
      <h1>Protected Page</h1>
      <h1>Welcome, {user.firstName}!</h1>
      <img src={user.imageUrl} alt="Profile" />
    </div>
  );
}