"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/components/LoginForm/schema";
import FormInput from "@/components/FormComponents/Input";
import { Form } from "@/components/ui/form";
import { getError } from "@/utils/getError";

export function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const callbackUrl = searchParams.get("callbackUrl") || "/board";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    defaultValues: {
      email: "test@test.test",
      password: "Test12345678",
    },
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = async (data) => {
    try {
      setIsSubmitting(true);

      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        redirectTo: callbackUrl,
      });
      setIsSubmitting(false);
      if (!response?.error) {
        toast.success("successfully logged in");
        router.push(callbackUrl);
      } else {
        form.reset({ password: "" });
        const message = "invalid email or password";
        toast.error(message);
      }
    } catch (error: unknown) {
      toast.error(getError(error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form} control={form.control}>
      <form
        name="login-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6")}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>

          <p className="text-balance text-sm text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-2">
            <FormInput
              name="email"
              type="email"
              label="Email"
              placeholder="m@example.com"
              control={form.control}
            />
          </div>
          <div className="grid gap-2">
            <FormInput
              type="password"
              label="Password"
              name="password"
              control={form.control}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Login
          </Button>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>

          <Button variant="outline" className="w-full">
            <Image src="/google.svg" alt="Google icon" width={24} height={24} />
            Google
          </Button>

          <Button variant="outline" className="w-full">
            <Image
              src="/apple.svg"
              alt="Apple icon"
              color="currentColor"
              width={24}
              height={24}
            />
            Apple
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/registration" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
