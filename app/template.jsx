"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { animatePageIn } from "@/utils/animations";

export default function Template({ children }) {
  const pathname = usePathname(); // Retrieve the current URL pathname

  useEffect(() => {
    if (pathname === "/") {
      animatePageIn(); // Run animation only when on the root page
    }
  }, [pathname]);

  // Ensure the template renders only on the root page ('/')
  if (pathname !== "/") {
    return children; // Prevent rendering for other routes
  }

  return (
    <div>
      {/* Animated banners */}
      <div
        id="banner-1"
        className="min-h-screen bg-primary-foreground z-50 fixed top-0 left-0 w-1/4"
      />
      <div
        id="banner-2"
        className="min-h-screen bg-primary-foreground z-50 fixed top-0 left-1/4 w-1/4"
      />
      <div
        id="banner-3"
        className="min-h-screen bg-primary-foreground z-50 fixed top-0 left-2/4 w-1/4"
      />
      <div
        id="banner-4"
        className="min-h-screen bg-primary-foreground z-50 fixed top-0 left-3/4 w-1/4"
      />
      {/* Children content */}
      {children}
    </div>
  );
}
