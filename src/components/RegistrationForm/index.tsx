"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/FormComponents/Input";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { RegistrationSchema } from "@/components/RegistrationForm/schema";
import { ServicesButtons } from "@/components/ServicesButtons";
import { signIn } from "next-auth/react";
import { getError } from "@/utils/getError";

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof RegistrationSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
    resolver: zodResolver(RegistrationSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof RegistrationSchema>> = async (
    data
  ) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
          errorData.errors.forEach((error: Error) => {
            toast.error(error.message);
          });

          return;
        }

        toast.error(errorData.message);
        return;
      }

      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
    } catch (error: unknown) {
      toast.error(getError(error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form} control={form.control}>
      <form
        name="registration-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6")}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create Your Account</h1>

          <p className="text-balance text-sm text-muted-foreground">
            Provide Your Details
          </p>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-2">
            <FormInput name="name" label="Name" control={form.control} />
          </div>

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

          <div className="grid gap-2">
            <FormInput
              type="password"
              label="Confirm password"
              name="confirmPassword"
              control={form.control}
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            Sign up
          </Button>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>

          <ServicesButtons />
        </div>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Log in
          </Link>
        </div>
      </form>
    </Form>
  );
}
