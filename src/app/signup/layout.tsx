"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/");
  }
  return <main>{children}</main>;
};

export default SignupLayout;
