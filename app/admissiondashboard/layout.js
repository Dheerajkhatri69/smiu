import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admissiondashboard/app-sidebar";


const SettingsLayout = ({ children }) => {
    return (
        <>
            <SidebarProvider>  {/* Context provider wrapping the entire layout */}
                <AppSidebar />
                <div className="w-full">
                    <SidebarInset className="bg-primary">
                        <header className="flex h-16 shrink-0 items-center bg-background/50 m-2 rounded-lg gap-2">
                            <div className="flex items-center gap-2 px-4">
                                <SidebarTrigger className="-ml-1" />
                            </div>
                        </header>
                        {children} {/* This will render the content of each page */}
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </>
    );
};

export default SettingsLayout;
