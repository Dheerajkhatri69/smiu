// app/adminDashboard/layout.js
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <SidebarProvider> {/* Context provider wrapping the entire layout */}
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
    );
};

export default DashboardLayout;
