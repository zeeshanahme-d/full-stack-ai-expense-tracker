"use client"
import { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link.js';

const ForgotePasswordPage = () => {
    const [form, setForm] = useState({ email: '' });
    const [loading] = useState(false);

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        const data = new FormData(form);

        console.log(Object.fromEntries(data.entries()));

    };

    return (
        <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Forgote Password</h2>
            <p className="text-slate-500 mb-10">Please enter the email associated with your account.</p>

            <form onSubmit={onSubmit} className="space-y-5">

                <Input
                    name="email"
                    type="email"
                    label='Email *'
                    id="forgote-email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                />

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-5"
                >
                    {loading ? (
                        <>
                            <Spinner />
                            Sending OTP...
                        </>
                    ) : (
                        'Send OTP'
                    )}
                </Button>
            </form>

            <p className="text-center mt-8 text-sm text-slate-500">
                Back to{' '}
                <Link href="/sign-in" className="text-primary font-semibold hover:text-violet-700 transition hover:underline">
                    Sign In
                </Link>
            </p>
        </div>
    );
};

export default ForgotePasswordPage;
