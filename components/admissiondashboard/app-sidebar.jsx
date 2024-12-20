"use client"

import * as React from "react";
import {
    BookOpen,
    Bot,
    Download,
    Command,
    Frame,
    ClipboardMinus,
    LifeBuoy,
    Map,
    PieChart,
    Send,
    ClipboardType,
    Settings2,
    SquareTerminal,
} from "lucide-react";
import { RxAvatar } from "react-icons/rx";
// import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo } from "../Logo/Logo";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { useSession } from "next-auth/react";

export function AppSidebar({
    ...props
}) {
    const { data: session } = useSession(); // Get session data
    const [user, setUser] = React.useState(null); // Initialize with null
    const [avatar, setAvatar] = React.useState("/avatar.png")


    const getAvatar = async (formData) => {
        try {
            const personalDataExistResponse = await fetch("/api/admission/personaldataExiste", {
                method: "POST",
                body: JSON.stringify({ cnic: formData.cnic, email: formData.email }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const personalDataExistResult = await personalDataExistResponse.json();

            if (personalDataExistResult.exists) {
                setAvatar(personalDataExistResult.data.image)
                return; // Stop further processing if any field exists
            }


        } catch (error) {
            setMessage("Error: Please check your connection.");
        }
    }
    React.useEffect(() => {
        if (session?.user) {
            setUser(session.user); // Update user state when session is available
            getAvatar(session.user)

        }
    }, [session]); // Use effect will run when session changes
    // console.log(user);

    const useremail = user ? `${user.email || ""}` : "User";
    const usercnic = user && user.cnic ? user.cnic.slice(-5) : "User CNIC";


    const data = {
        user: {
            name: useremail,
            email: usercnic, // Safeguard for ID
            avatar: avatar,
        },
        navMain: [
            {
                title: "Admission Form",
                url: "/admissiondashboard",
                isActive: true,
                icon: ClipboardType,
                items: [
                    {
                        title: "1. Personal Data",
                        url: "/admissiondashboard/personaldata",
                    },
                    {
                        title: "2. Guardian's Data",
                        url: "/admissiondashboard/guardiansData",
                    },
                    {
                        title: "3. Degree Profram",
                        url: "/admissiondashboard/degreeProgramInformation",
                    },
                    {
                        title: "4. Academic Data",
                        url: "/admissiondashboard/academicData",
                    },
                    {
                        title: "5. Print & Preview",
                        url: "/admissiondashboard/printPreview",
                    },
                    {
                        title: "6. Final Step Upload Documents",
                        url: "/admissiondashboard/finalStepUploadDocuments",
                    },
                ],
            },
            {
                title: "Downloads Section",
                url: "/admissiondashboard/download",
                icon: Download,
            },
            {
                title: "Result Section",
                url: "#",
                icon: ClipboardMinus,
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
                name: "Design Engineering",
                url: "#",
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
                            <a href="/admissiondashboard">
                                <div>
                                    <Logo size={50} />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">SMIU</span>
                                    <span className="truncate text-xs">Admission Dashboard</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="bg-primary-foreground">
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter className="bg-primary/50">
                <NavUser user={data.user} className="bg-primary" />
            </SidebarFooter>
        </Sidebar>
    );
}
