// app/(auth)/layout.tsx

import AuthHero from "@/components/custom-ui/AuthHero";
import { Wallet } from "lucide-react";


export default function AuthLayout({ children, }: { children: React.ReactNode; }) {
    return (
        <main className="min-h-screen w-full flex items-center justify-center">
            <div className="min-h-screen flex w-full">

                <div className="flex-1 flex flex-col relative px-6 sm:px-10 lg:px-14 py-8 order-1">
                    <div className="flex justify-start items-center gap-2">
                        <div className="h-9 w-9 rounded-xl bg-linear-to-br from-violet-400 to-violet-600 flex items-center justify-center">
                            <Wallet size={18} className="text-white" />
                        </div>
                        <span className="font-bold text-xl text-slate-900">ExpenseAI</span>
                    </div>

                    <div className="flex-1 flex items-center justify-center py-10">
                        {children}
                    </div>

                    <div className="flex justify-start gap-6 text-xs text-slate-500">
                        <a className="hover:text-slate-900 transition cursor-pointer">Privacy Policy</a>
                        <a className="hover:text-slate-900 transition cursor-pointer">Terms</a>
                        <a className="hover:text-slate-900 transition cursor-pointer">FAQ</a>
                    </div>
                </div>

                <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] order-2">
                    <AuthHero headline="Empower" subheadline="Your financial future" />
                </div>
            </div>

        </main>
    );
}