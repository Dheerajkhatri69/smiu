"use client"; // This is a Client Component

import { usePathname } from "next/navigation";
import Navbar from "./newNavbar";

export default function ClientNavbar() {
  const pathname = usePathname();

  // Hide Navbar for /adminDashboard or /dashboard
  const hideNavbar = pathname.startsWith("/adminDashboard") || pathname.startsWith("/dashboard") || pathname.startsWith("/admissiondashboard");

  return !hideNavbar ? <Navbar /> : null;
}
