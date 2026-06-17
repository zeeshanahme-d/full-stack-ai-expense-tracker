"use client"
import { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link.js';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

const VerifyOtpPage = () => {
    const [loading] = useState(false);

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        const data = new FormData(form);

        console.log(Object.fromEntries(data.entries()));
    };

    return (
        <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Enter OTP</h2>
            <p className="text-slate-500 mb-10">We’ve sent you a verification OTP on your email.</p>

            <form onSubmit={onSubmit} className="space-y-5">

                <Field className="w-fit">
                    <FieldLabel htmlFor="digits-only">Enter OTP</FieldLabel>
                    <InputOTP id="digits-only" name='otp' maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                        </InputOTPGroup>
                    </InputOTP>
                </Field>

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-5"
                >
                    {loading ? (
                        <>
                            <Spinner />
                            Verifying OTP...
                        </>
                    ) : (
                        'Verify OTP'
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

export default VerifyOtpPage;
