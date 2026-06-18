"use client"

import {
    LayoutDashboard,
    ArrowLeftRight,
    Folder,
    Target,
    Sparkles,
    Wallet,
    LogOut,
} from "lucide-react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"
import { currentUser } from "@/lib/constant"


const navItems = [
    {
        href: "/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        href: "/transactions",
        label: "Transactions",
        icon: ArrowLeftRight,
    },
    {
        href: "/categories",
        label: "Categories",
        icon: Folder,
    },
    {
        href: "/budgets",
        label: "Budgets",
        icon: Target,
    },
    {
        href: "/insights",
        label: "AI Insights",
        icon: Sparkles,
    },
]


export function AppSidebar() {

    const pathname = usePathname()

    const initial = currentUser.name[0].toUpperCase()


    return (
        <Sidebar collapsible="icon" className='border-r data-[state=collapsed:w-20!'>
            {/* Header */}
            <SidebarHeader className=" border-b h-18 flex justify-center">
                <div className=" flex items-center gap-3 px-3 group-data-[collapsible=icon]:justify-center">
                    <div className=" flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-400 to-violet-600">
                        <Wallet size={18} className="text-white" />
                    </div>
                    <span className="font-bold group-data-[collapsible=icon]:hidden ">
                        ExpenseAI
                    </span>
                </div>
            </SidebarHeader>

            {/* Content */}
            <SidebarContent className="pt-3">
                <SidebarMenu className="px-3">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <SidebarMenuItem key={item.href} >
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.label}
                                    isActive={pathname === item.href}
                                    className="h-10 rounded-3xl px-4! text-slate-700 hover:bg-slate-100 data-[active=true]:bg-slate-100 ">
                                    <Link href={item.href}>
                                        <Icon size={20} className="text-xl!" />
                                        <span>  {item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>

            </SidebarContent>
            {/* Footer */}
            <SidebarFooter>
                <div className=" flex items-center gap-3 rounded-xl p-2 hover:bg-slate-100 justify-center ">
                    <div className=" h-10 w-10 shrink-0 rounded-full bg-linear-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-semibold">
                        {initial}
                    </div>
                    <div className=" flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                        <p className="text-sm font-semibold truncate">{currentUser.name}</p>
                        <p className=" text-xs text-muted-foreground truncate"> {currentUser.email} </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className=" group-data-[collapsible=icon]:hidden"
                    >
                        <LogOut size={16} className="text-muted-foreground"
                        />
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}