"use client";
import { useQuery } from "@blitzjs/rpc";
import getUserProfile from "./queries/getUserProfile";

export default function UserProfile() {
  const [user, { isLoading, error }] = useQuery(getUserProfile, {});

  if (error) {
    console.error("Error fetching user profile:", error);
    return (
      <div>
        <h1>Error</h1>
        <p>Something went wrong while fetching your profile.</p>
        <button onClick={() => window.location.reload()}>Try again</button>
      </div>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <div>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
}