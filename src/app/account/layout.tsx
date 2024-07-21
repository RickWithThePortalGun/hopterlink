"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/");
  }
  return <main>{children}</main>;
};

export default AccountLayout;
