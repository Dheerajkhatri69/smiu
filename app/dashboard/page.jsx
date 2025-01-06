"use client"
import { AdmissionHero } from "@/components/admissiondashboard/admissionHero";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function Page() {

  const { data: session } = useSession(); // Get session data


  const [user, setUser] = useState(null); // Initialize with null

  useEffect(() => {
    if (session?.user) {
      setUser(session.user); // Update user state when session is available
    }
  }, [session]); // Use effect will run when session changes

  // Safeguard the user data access
  const userName = user ? `${user.fname || ""} ${user.lname || ""}`.trim() : "User";

  return (
    <div className="m-2">
      <AdmissionHero username={userName} />
    </div>
  );
}

export default Page;
