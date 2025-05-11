"use client"
import React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
}   from "@/components/ui/sidebar";  
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Settings2Icon, Video, Videotape, WalletCards } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const MenuOptions = [
    {
        title: 'Dashboard',
        icon: LayoutDashboard,
        path: '/workspace'
    },
    {
        title: 'Create Ad',
        icon: Video,
        path: '/workspace/create-ad'
    },
    {
        title: 'My Videos',
        icon: Videotape,
        path: '/workspace/my-videos'
    },
    {
        title: 'Billings',
        icon: WalletCards,
        path: '/workspace/billing'
    },
    {
        title: 'Settings',
        icon: Settings2Icon,
        path: '/workspace/settings'
    },

]

function AppSidebar() {
    const path = usePathname();
    console.log(path);
    return (
        <Sidebar>
            <SidebarHeader className={' flex items-center my-5 '}>
                <Image src= {'/logo.svg'} alt='logo' width={200} height={100} />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className={'text-[18px] mt-5'}>
                    <Button > + Create New Ad </Button>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel className={'font-bold text-[17px] text-purple-700'}>
                        Applications
                    </SidebarGroupLabel>
                    <SidebarContent>
                        <SidebarMenu>
                            {MenuOptions.map ((menu, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton asChild className={'p-5'}>
                                    <Link href={menu.path}
                                          className={`flex font-bold items-center text-[15px] transition-all duration-200 rounded-md
                                          ${path === menu.path ? 'text-primary bg-green-200' : 'text-purple-600'}
                                         hover:bg-green-400 hover:text-purple-600 focus:bg-green-400 focus:text-blue-700`}
                                        >
                                            <menu.icon className='h-10 w-12'/>
                                            <span> {menu.title} </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <p>Make Your Ads Easier and Innovating</p>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar;