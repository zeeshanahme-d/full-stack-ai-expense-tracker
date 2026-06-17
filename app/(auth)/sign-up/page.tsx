"use client"
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { CURRENCIES } from '@/constant/Constant'
import { Eye, EyeOff } from 'lucide-react'
import { Field, FieldLabel } from '@/components/ui/field'

const SignupPage = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        currency: 'USD',
    });
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
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Sign Up</h2>
            <p className="text-slate-500 mb-10">Create your account in seconds</p>

            <form onSubmit={onSubmit} className="space-y-5">
                <Input
                    required
                    label='Full Name *'
                    name="fullName"
                    type="text"
                    id="signup-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Alex"
                />

                <Input
                    name="email"
                    type="email"
                    label='Email *'
                    id="signup-email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                />

                <div className="relative">
                    <Input
                        name='password'
                        label='Password *'
                        id='signup-password'
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

                <Field>
                    <FieldLabel htmlFor="signup-currency-select">
                        Currency *
                    </FieldLabel>
                    <Select defaultValue="USD" name='currency'>
                        <SelectTrigger className='w-full' id='signup-currency-select' >
                            <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent
                            position="popper"

                        >
                            <SelectGroup>
                                {CURRENCIES.map((c) => (
                                    <SelectItem key={c.value} value={c.value}>
                                        {c.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4"
                >
                    {loading ? (
                        <>
                            <Spinner />
                            Creating account...
                        </>
                    ) : (
                        'Create Account'
                    )}
                </Button>
            </form>

            <p className="text-center mt-8 text-sm text-slate-500">
                Already have an account?{' '}
                <Link href="/sign-in" className="text-primary font-semibold transition  hover:text-violet-700 hover:underline">
                    Sign In
                </Link>
            </p>
        </div>
    )
}

export default SignupPage