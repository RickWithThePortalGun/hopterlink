"use client";
import Logo from "@/components/Logo";
import Particles from "@/components/magicui/particles";
import { buttonVariants } from "@/components/ui/button";
import UserAuthForm from "@/components/ui/forms/user-auth-form";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import Ripple from '@/components/magicui/ripple';

// export const metadata: Metadata = {
//   title: 'Authentication',
//   description: 'Authentication forms built using the components.'
// };

export default function AuthenticationPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);
  return (
    <div
      className="relative h-screen flex-col items-center justify-center
        md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
    >
      <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 hidden md:right-8 md:top-8",
        )}
      >
        Login
      </Link>
      <div
        className="relative hidden h-full flex-col bg-muted p-10 text-white
          lg:flex dark:border-r"
      >
        <Particles
          className="absolute top-0 bottom-0 left-0 right-0"
          color="#c55e0c"
          staticity={10}
        />

        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <Typography variant={"h5"} className="text-accent-foreground">
              &ldquo;Hopterlink has saved me countless hours of work and helped
              me discover services faster than ever before.&rdquo;
            </Typography>
            <footer className="text-sm text-muted-foreground">
              Sofia Davis
            </footer>
          </blockquote>
        </div>
        {/* <Ripple/> */}
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div
          className="mx-auto flex w-full flex-col justify-center space-y-6
            sm:w-[350px]"
        >
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
            <p className="text-sm text-muted-foreground">
              Enter your details to log in to your account.
            </p>
            <Link href={`/signup`} className="text-xs text-[#c55e0c]">
              Don&apos;t have an account?
            </Link>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
