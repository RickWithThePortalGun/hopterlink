import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import axios from "axios";
import { Toast } from "./ui/toast";
import { toast } from "./ui-hooks/use-toast";

// Validation schema using zod
const schema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
});

type FormData = z.infer<typeof schema>;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // Handle form submission
    setLoading(true);
    try {
      const response = await axios.post("/api/password-reset/", data);
      if (response.status === 200) {
        toast({
          title: "Password reset sent",
          description:
            "Your password reset email has been successfully sent. Check your spam or junk folder if you can't find it in your inbox.",
        });
      }
    } catch (error) {
      toast({
        title: "Password reset failed",
        description: "Something went wrong. Please try again later.",
      });
    }
    setLoading(false);
    console.log(data);
    // Add your password reset logic here, such as calling an API
  };

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <div className="flex justify-end w-full text-xs text-[#c55e0c] my-4 cursor-pointer">
          Forgot your password
        </div>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Forgot Password</CredenzaTitle>
          <CredenzaDescription>
            Don't worry! It happens. We'll get you right back in.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 z-50">
            <div>
              <Label>Email</Label>
              <Input {...register("email")} placeholder="Email" />
              {errors.email && (
                <div className="w-full justify-end flex mt-2 text-xs text-red-500">
                  {errors.email.message}
                </div>
              )}
            </div>
            <Button type="submit" variant={"default"} className="w-full">
              <div className="text-white">Send Password Reset Email</div>
            </Button>
          </form>
        </CredenzaBody>
        <CredenzaFooter className="justify-center flex w-full">
          <p className="text-xs">Ensure you have access to this email.</p>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default ForgotPassword;
