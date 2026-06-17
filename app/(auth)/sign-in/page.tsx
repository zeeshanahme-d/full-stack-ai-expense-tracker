"use client"
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link.js';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SigninPage = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        const data = new FormData(form);

        console.log(Object.fromEntries(data.entries()));

    };

    return (
        <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Sign In</h2>
            <p className="text-slate-500 mb-10">Please login to continue</p>

            <form onSubmit={onSubmit} className="space-y-5">

                <Input
                    name="email"
                    label='Email *'
                    type="email"
                    id="signin-email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                />

                <div className="relative">
                    <Input
                        name='password'
                        label='password *'
                        id='signin-password'
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className='pr-12!'
                        placeholder="At least 8 characters"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="cursor-pointer absolute right-4 top-14.5 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </button>
                </div>

                <div className='flex justify-end'>
                    <Link href="/forgote-password" className="text-primary font-semibold hover:text-violet-700 hover:underline transition">
                        Forgote Password
                    </Link>
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                >
                    {loading ? (
                        <>
                            <Spinner />
                            Signing in...
                        </>
                    ) : (
                        'Login'
                    )}
                </Button>
            </form>

            <p className="text-center mt-8 text-sm text-slate-500">
                No Account Yet?{' '}
                <Link href="/sign-up" className="text-primary font-semibold hover:text-primary-hover transition hover:underline">
                    Create New One
                </Link>
            </p>
        </div>
    );
};

export default SigninPage;
