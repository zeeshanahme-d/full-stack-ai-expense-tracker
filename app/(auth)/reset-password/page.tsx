"use client"
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link.js';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SigninPage = () => {
    const [form, setForm] = useState({ newPassword: '', confirmPassword: '' });
    const [loading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        const data = new FormData(form);

        console.log(Object.fromEntries(data.entries()));

    };

    return (
        <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">New Password</h2>
            <p className="text-slate-500 mb-10">Choose a secure password for your account.</p>

            <form onSubmit={onSubmit} className="space-y-5">

                <div className="relative">
                    <Input
                        name='newPassword'
                        label='New password *'
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        id='reset-new-password'
                        minLength={6}
                        value={form.newPassword}
                        onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                        className='pr-12!'
                        placeholder="At least 8 characters"
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword((v) => !v)}
                        className="cursor-pointer absolute right-4 top-14.5 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                        tabIndex={-1}
                    >
                        {showNewPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </button>
                </div>

                <div className="relative">
                    <Input
                        name='confirmPassword'
                        id='reset-confirm-password'
                        label='Confirm password *'
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        className='pr-12!'
                        placeholder="At least 8 characters"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        className="cursor-pointer absolute right-4 top-14.5 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                        tabIndex={-1}
                    >
                        {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </button>
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-5"
                >
                    {loading ? (
                        <>
                            <Spinner className="mr-2" />
                            Resetting Password...
                        </>
                    ) : (
                        "Reset Password"
                    )}
                </Button>
            </form>

            <p className="text-center mt-8 text-sm text-slate-500">
                Back to{' '}
                <Link href="/sign-in" className="text-primary font-semibold hover:text-primary-hover transition hover:underline">
                    Sign In
                </Link>
            </p>
        </div>
    );
};

export default SigninPage;
