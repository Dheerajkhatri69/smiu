import { BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@radix-ui/react-dropdown-menu'
import React from 'react'

const Breadcrumb = ({ data }) => {
    return (
        <header className="flex shrink-0 items-center bg-black h-[100px] rounded-lg gap-2">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <nav>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">
                                Building Your Application
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {/* Replace BreadcrumbSeparator with a custom separator */}
                        <span className="hidden md:block mx-2 text-gray-400">/</span>
                        <BreadcrumbItem>
                            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </nav>
            </div>
        </header>
    )
}

export default Breadcrumb
