"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validatePasswordStrength } from "@studio-os/shared/auth/password";

const passwordSchema = z
  .string()
  .superRefine((value, ctx) => {
    const result = validatePasswordStrength(value);
    if (!result.success) {
      result.errors.forEach((error) =>
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: error,
        }),
      );
    }
  });

const loginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: passwordSchema,
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: searchParams?.get("email") ?? "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: "/app",
      });

      if (!result) {
        setSubmitError("Unexpected error during sign in.");
        return;
      }

      if (result.error || !result.ok) {
        setSubmitError("Invalid email or password.");
        return;
      }

      router.push(result.url ?? "/app");
      router.refresh();
    } catch (error) {
      console.error("Login failed", error);
      setSubmitError("Unexpected error during sign in.");
    }
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in with your Studio OS credentials.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" {...register("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p className="text-sm text-red-600" id="email-error">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register("password")}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {errors.password && (
                <p className="text-sm text-red-600" id="password-error">
                  {errors.password.message}
                </p>
              )}
            </div>
            {submitError && <p className="text-sm text-red-600">{submitError}</p>}
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Password must be at least 12 characters and include uppercase, lowercase, number, and symbol.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
