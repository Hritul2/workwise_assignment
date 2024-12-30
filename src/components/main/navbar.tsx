"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100">
      <div className="text-xl font-bold">Hritul_Workwise_Assignment</div>
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <span className="text-sm text-black">{session?.user?.email}</span>
            <Button onClick={() => signOut()} variant="outline">
              Sign Out
            </Button>
          </>
        ) : (
          <span className="text-sm text-gray-500">Not logged in</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
