import { AppSidebar } from "@/components/custom-ui/AppSidebar";
import Header from "@/components/custom-ui/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";


export default function AuthLayout({ children, }: { children: React.ReactNode; }) {
    return (
        <TooltipProvider>
            <SidebarProvider style={
                {
                    "--sidebar-width-icon": "3.5rem",
                } as React.CSSProperties
            }>
                <AppSidebar />
                <main className="min-h-screen w-full overflow-hidden">
                    <Header />
                    <div className="flex w-full mt-16 h-[calc(100%-4.5rem)]">
                        <div className="flex-1 p-6">
                            {children}
                        </div>
                    </div>
                </main>
            </SidebarProvider>
        </TooltipProvider>

    );
}