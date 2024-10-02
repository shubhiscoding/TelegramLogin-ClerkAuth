"use client";
import { SignInButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  return (
    <div className="main">
      {!user && (<><p>Please Sign In</p><SignInButton /></>)}
      {user && (
        <div>
          <h1>Welcome, {user.fullName}!!</h1>
          <img src={user.imageUrl} alt="Profile" />
        </div>
      )}
    </div>
  );
}
