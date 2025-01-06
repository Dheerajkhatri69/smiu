"use client"

import * as React from "react";
import { useSession } from "next-auth/react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  University,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo } from "./Logo/Logo";

export function AppSidebar({
  ...props
}) {
  const { data: session } = useSession(); // Get session data
  const [user, setUser] = React.useState(null); // Initialize with null

  React.useEffect(() => {
    if (session?.user) {
      setUser(session.user); // Update user state when session is available
    }
  }, [session]); // Use effect will run when session changes

  // Safeguard the user data access
  const userName = user ? `${user.fname || ""} ${user.lname || ""}`.trim() : "User";
  const userAvatar = user?.image || "/avatar.png"; // Use a default avatar if none provided

  const data = {
    user: {
      name: userName,
      email: user?.id || "No ID", // Safeguard for ID
      avatar: userAvatar,
    },
    navMain: [
      {
        title: "Admission",
        url: "#",
        isActive: true,
        icon: BookOpen,
        items: [
          {
            title: "Student Signup Email",
            url: "/dashboard/studentsignupEmail",
          },
          {
            title: "Signin Form",
            url: "/dashboard/studentsignupEmail/addstudentsignupEmail",
          },
          {
            title: "Admission Forms",
            url: "/dashboard/admission/admissionForms",
          },
          {
            title: "Entry Test",
            url: "/dashboard/admission/entryTest",
          },
          {
            title: "Merit List",
            url: "/dashboard/admission/meritList",
          },
        ],
      },
      {
        title: "Users",
        url: "/dashboard/users",
        icon: Bot,
        items: [
          {
            title: "Add User",
            url: "/dashboard/adduser",
          },
          {
            title: "Edit users",
            url: "/dashboard/users",
          },
        ],
      },
      {
        title: "Programs",
        url: "/dashboard/programs",
        icon: University,
        items: [
          {
            title: "Undergraduate Programs",
            url: "#",
          },
          {
            title: "Graduate Programs",
            url: "#",
          },
          {
            title: "Postgraduate Programs",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ],
    projects: [
      {
        name: "Department",
        url: "/dashboard/showDepartment",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  };

  return (
    <Sidebar variant="inset" {...props} className="bg-primary">
      <SidebarHeader className="bg-primary/30">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div>
                  <Logo size={50} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">SMIU</span>
                  <span className="truncate text-xs">Admin Dashboard</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-primary-foreground">
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="bg-primary/50">
        <NavUser user={data.user} className="bg-primary" />
      </SidebarFooter>
    </Sidebar>
  );
}
