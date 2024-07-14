import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Stepper from "@keyvaluesystems/react-stepper";
import { PhoneInput } from "./ui/phone-input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { signUp } from "@/app/api/signup/signup";
import { toast } from "./ui-hooks/use-toast";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router=useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    password1: "",
    password2: "",
    // otp: "",
  });
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleInputChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const { firstName, lastName, phoneNo, email, password, confirmPassword } =
      formData;
    const isValid =
      firstName !== "" &&
      lastName !== "" &&
      phoneNo !== "" &&
      email !== "" &&
      password !== "" &&
      password === confirmPassword;
    setIsFormValid(isValid);
  };


  const handleSignUp = async () => {
    try {
        const response = await signUp(formData);
        console.log("SignUp Response:", response);
        toast({
          title: "Account Created Successfully",
          description: "You have successfully created an account on hopterlink",
        });
        setTimeout(() => {
          
          router.push("/login");

        }, 2000);
        
        setCurrentStepIndex(1);  // Move to the next step after successful signup
    } catch (error) {
        console.error("SignUp Error:", error);
        toast({
          title: "Error encountered",
          description: error as string,
        });
        // Handle error (e.g., show an error message to the user)
    }
};

  const handleOTPSubmit = () => {
    // Simulate OTP verification
    console.log("OTP:", formData.otp);
    setCurrentStepIndex(2); // Move to the next step after successful OTP verification
  };

  const steps = [
    {
      stepLabel: "Sign Up",
      completed: currentStepIndex > 0,
    },
    {
      stepLabel: "Verification",
      completed: currentStepIndex > 1,
    },
    {
      stepLabel: "Success",
      completed: currentStepIndex > 2,
    },
  ];

  const handleContinue = () => {
    console.log("FormData: ",formData)
    if (currentStepIndex === 0 && isFormValid) {
      handleSignUp();
    } else if (currentStepIndex === 1 && formData.otp.length === 6) {
      handleOTPSubmit();
    }
  };

  const styles = {
    LineSeparator: () => ({
      backgroundColor: "#028A0F",
    }),
    ActiveNode: () => ({
      backgroundColor: "#C55E0C",
    }),
    CompletedNode: () => ({
      backgroundColor: "#028A0F",
    }),
  };
  return (
    <div className="rounded-lg text-card-primary shadow-sm w-full max-w-sm">
      <Stepper
        steps={steps}
        currentStepIndex={currentStepIndex}
        orientation="horizontal"
        labelPosition="bottom"
        showDescriptionsForAllSteps={true}
        styles={styles}
      />
      {currentStepIndex === 0 && (
        <div className="rounded-lg text-card-primary shadow-sm w-full max-w-sm">
          <div
            className="flex flex-col text-center justify-center items-center
              space-y-1.5 p-6 my-6"
          >
            <h3 className="font-semibold tracking-tight text-2xl">Sign Up</h3>
            <p className="text-sm text-muted-foreground">
              Enter your details below to join Hopterlink.
            </p>
            <Link href={`/login`} className="text-xs text-[#c55e0c]">
              Already have an account?
            </Link>
          </div>
          <div className="p-6 pt-0 grid gap-4">
            <div className=" gap-2 flex flex-row ">
              <div className="">
                <Label
                  className="text-sm font-medium leading-none
                    peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="firstName"
                >
                  First Name
                </Label>
                <Input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input
                    bg-background px-3 py-2 text-sm ring-offset-background
                    file:border-0 file:bg-transparent file:text-sm
                    file:font-medium placeholder:text-muted-foreground
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-ring focus-visible:ring-offset-2
                    disabled:cursor-not-allowed disabled:opacity-50"
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  control-id="ControlID-1"
                />
              </div>
              <div>
                <Label
                  className="text-sm font-medium leading-none
                    peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="lastName"
                >
                  Last Name
                </Label>
                <Input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input
                    bg-background px-3 py-2 text-sm ring-offset-background
                    file:border-0 file:bg-transparent file:text-sm
                    file:font-medium placeholder:text-muted-foreground
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-ring focus-visible:ring-offset-2
                    disabled:cursor-not-allowed disabled:opacity-50"
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  control-id="ControlID-1"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phoneNo">Phone Number</Label>
              <PhoneInput
                id="phoneNo"
                defaultCountry="NG"
                value={formData.phoneNo}
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    phoneNo: value,
                  });
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label
                className="text-sm font-medium leading-none
                  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="email"
              >
                Email
              </Label>
              <Input
                type="email"
                className="flex h-10 w-full rounded-md border border-input
                  bg-background px-3 py-2 text-sm ring-offset-background
                  file:border-0 file:bg-transparent file:text-sm
                  file:font-medium placeholder:text-muted-foreground
                  focus-visible:outline-none focus-visibe:ring-2
                  focus-visible:ring-ring focus-visible:ring-offset-2
                  disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                placeholder="johndoe@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                control-id="ControlID-2"
              />
            </div>
            <div className="grid gap-2">
              <Label
                className="text-sm font-medium leading-none
                  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="password"
              >
                Password
              </Label>
              <Input
                type="password"
                className="flex h-10 w-full rounded-md border border-input
                  bg-background px-3 py-2 text-sm ring-offset-background
                  file:border-0 file:bg-transparent file:text-sm
                  file:font-medium placeholder:text-muted-foreground
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-ring focus-visible:ring-offset-2
                  disabled:cursor-not-allowed disabled:opacity-50"
                id="password"
                placeholder="●●●●●●●●●"
                value={formData.password}
                onChange={handleInputChange}
                required
                control-id="ControlID-2"
              />
            </div>
            <div className="grid gap-2">
              <Label
                className="text-sm font-medium leading-none
                  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </Label>
              <Input
                type="password"
                className="flex h-10 w-full rounded-md border border-input
                  bg-background px-3 py-2 text-sm ring-offset-background
                  file:border-0 file:bg-transparent file:text-sm
                  file:font-medium placeholder:text-muted-foreground
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-ring focus-visible:ring-offset-2
                  disabled:cursor-not-allowed disabled:opacity-50"
                id="confirmPassword"
                placeholder="●●●●●●●●●"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                control-id="ControlID-2"
              />
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className="text-xs font-extrabold">
                Send me newsletters and promotional emails from hopterlink
              </p>
              <Switch />
            </div>

            <Button
              disabled={!isFormValid}
              onClick={handleSignUp}
              className="inline-flex items-center justify-center whitespace-nowrap
                rounded-md text-sm font-medium ring-offset-background
                transition-colors focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-ring
                focus-visible:ring-offset-2 disabled:pointer-events-none
                disabled:opacity-50 bg-primary text-primary-foreground
                hover:bg-primary/90 h-10 px-4 py-2 w-full"
              control-id="ControlID-3"
            >
              Continue
            </Button>
          </div>
        </div>
      )}
      {currentStepIndex === 1 && (
        <div className="rounded-lg text-card-primary shadow-sm w-full max-w-sm">
          <div
            className="flex flex-col text-center justify-center items-center
              space-y-1.5 p-6 my-6"
          >
            <h3 className="font-semibold tracking-tight text-2xl mb-12">
              Verify Your Account
            </h3>
            <div className="flex gap-4 justify-center w-full">
              {/* <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot
                    index={0}
                    value={formData.otp[0] || ""}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        otp:
                          formData.otp.substring(0, 0) +
                          e.target.value +
                          formData.otp.substring(1),
                      });
                    }}
                  />
                  <InputOTPSlot
                    index={1}
                    value={formData.otp[1] || ""}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        otp:
                          formData.otp.substring(0, 1) +
                          e.target.value +
                          formData.otp.substring(2),
                      });
                    }}
                  />
                  <InputOTPSlot
                    index={2}
                    value={formData.otp[2] || ""}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        otp:
                          formData.otp.substring(0, 2) +
                          e.target.value +
                          formData.otp.substring(3),
                      });
                    }}
                  />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot
                    index={3}
                    value={formData.otp[3] || ""}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        otp:
                          formData.otp.substring(0, 3) +
                          e.target.value +
                          formData.otp.substring(4),
                      });
                    }}
                  />
                  <InputOTPSlot
                    index={4}
                    value={formData.otp[4] || ""}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        otp:
                          formData.otp.substring(0, 4) +
                          e.target.value +
                          formData.otp.substring(5),
                      });
                    }}
                  />
                  <InputOTPSlot
                    index={5}
                    value={formData.otp[5] || ""}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        otp: formData.otp.substring(0, 5) + e.target.value,
                      });
                    }}
                  />
                </InputOTPGroup>
              </InputOTP> */}
            </div>
            <div className="mt-12">
              <p className="text-grey-500 text-xs mt-12">
                We just sent a verification code to your phone number. Please
                enter the code below.
              </p>
            </div>

            <Button
              // disabled={formData.otp.length !== 6}
              onClick={handleContinue}
              className="inline-flex items-center justify-center whitespace-nowrap
                rounded-md text-sm font-medium ring-offset-background
                transition-colors focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-ring
                focus-visible:ring-offset-2 disabled:pointer-events-none
                disabled:opacity-50 bg-primary text-primary-foreground
                hover:bg-primary/90 h-10 px-4 py-2 w-full"
              control-id="ControlID-3"
            >
              Verify Account
            </Button>
          </div>
        </div>
      )}
      {currentStepIndex === 2 && (
        <div
          className="flex flex-col text-center justify-center items-center
            space-y-1.5 p-6 my-6"
        >
          <h3 className="font-semibold tracking-tight text-2xl mb-12">
            Account created successfully
          </h3>
          <p className="text-grey-500 text-xs mt-12">
            Your account has been created and verified successfully. We will now
            redirect you..
          </p>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
