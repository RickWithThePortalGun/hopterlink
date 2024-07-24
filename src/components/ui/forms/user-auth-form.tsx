/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import GoogleSignInButton from "@/components/github-auth-button";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui-hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    // .min(8, "Password must be at least 8 characters long")
    .max(64, "Password must be no longer than 64 characters"),
  // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  // // .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  // .regex(/\d/, "Password must contain at least one number")
  // .regex(
  //   /[^a-zA-Z0-9]/,
  //   "Password must contain at least one special character",
  // ),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: "",
    password: "", // Add the 'password' field to the default values
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true); // Set loading to true when submitting
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: callbackUrl ?? "",
      });

      if (result?.error) {
        if (result?.error === "CredentialsSignin") {
          toast({
            title: "Login Error",
            description: "Username or password is incorrect. Please try again.",
          });
        }
      } else if (result?.error) {
        toast({
          title: "Login Error",
          description: "Something went wrong. Please try again later.",
        });
      } else {
        toast({
          title: "Login Success",
          description: "You have successfully logged in.",
        });
        window.location.href = callbackUrl ?? "/";
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      toast({
        title: "Login Error",
        description: "There was an error logging in. Please try again.",
      });
    }
    setLoading(false); // Set loading to false after the sign-in process
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="ml-auto w-full" type="submit">
            <p className="">Continue With Email</p>
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GoogleSignInButton />
    </>
  );
}
