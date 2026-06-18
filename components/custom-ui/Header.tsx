"use client"
import { currentUser } from '@/lib/constant';
import { Bell, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { SidebarTrigger, useSidebar } from '../ui/sidebar';

const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
};

const formatToday = () =>
    new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

const Header = () => {
    const { open } = useSidebar()
    const firstName = currentUser?.name?.split(' ')[0] || '';

    return (
        <header className={`h-18 fixed top-0 w-full z-10 ${open ? "max-w-[calc(100%-16.25rem)]" : "max-w-[calc(100%-3rem)]"} border-b bg-white flex items-center justify-between px-6 shrink-0`}>

            <div className='flex items-center gap-2'>
                <SidebarTrigger />
                <div>
                    <div className="text-sm font-semibold text-slate-900 tracking-tight">
                        {greeting()}{firstName && `, ${firstName}`} 👋
                    </div>
                    <div className="text-xs text-slate-500">{formatToday()}</div>
                </div>
            </div>

            <div className="flex items-center gap-1">
                <Button
                    variant='ghost'
                    size='icon-lg'
                    title="Search"
                >
                    <Search size={17} />
                </Button>
                <Button
                    variant='ghost'
                    size='icon-lg'
                    title="Notification"
                    className='relative'
                >
                    <Bell size={17} />
                    <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 rounded-full ring-2 ring-white" />
                </Button>
            </div>
        </header>
    );
};

export default Header;
