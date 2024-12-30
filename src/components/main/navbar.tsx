"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
      {/* Brand */}
      <div className="text-lg font-bold sm:text-xl lg:text-2xl whitespace-nowrap">
        Hritul_Workwise_Assignment
      </div>

      {/* Right Section */}
      <div className="flex flex-wrap items-center space-x-4 sm:space-x-6">
        {isAuthenticated ? (
          <>
            <span className="text-xs sm:text-sm lg:text-base text-black truncate max-w-[10rem] sm:max-w-none">
              {session?.user?.email}
            </span>
            <Button
              onClick={() => signOut()}
              variant="outline"
              className="text-xs sm:text-sm lg:text-base"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <span className="text-xs sm:text-sm lg:text-base text-gray-500">
            Not logged in
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
