"use client"

import { useAuth } from "@/components/authProvider";

export default function Home() {
  const auth = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center 
    justify-between p-24">
      <div>
        {auth.isAuthenticated ? "Hello user": "Hello guest"}
      </div>
    </main>
  );
}
