"use client";
import Logo from "@/components/Logo";
import Particles from "@/components/magicui/particles";
import Typography from "@/components/ui/typography";
import axios from "axios";
import Lottie from "lottie-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import animationData from "@/constants/verified.json";
import Stepper from "@keyvaluesystems/react-stepper";
import { FidgetSpinner, RotatingLines } from "react-loader-spinner";
import { toast } from "@/components/ui-hooks/use-toast";
import { Button } from "@/components/ui/button";

type Props = {};

const VerifyEmail = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams<{ slug: string }>();
  const [token, setToken] = useState({
    key: params.slug,
  });
  useEffect(() => {
    const verifyAccount = async () => {
      try {
        setLoading(true);
        const verification = await axios.post("/api/verify-email/", {
          token,
        });
        if (verification.status === 200) {
          setLoading(false);
          toast({
            title: "Account Verified Successfully",
            description:
              "You have verified your account. You can now log in on Hopterlink services.",
          });
          setCurrentStepIndex(2);
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
        console.error("Error verifying account:", error);
      }
      setLoading(false);
    };
    void verifyAccount();
  }, []);
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
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
      stepLabel: "Activation",
      completed: currentStepIndex > 2,
    },
  ];

  return (
    <div
      className="w-screen h-dvh max-md:items-center max-md:justify-center
          flex flex-row"
    >
      <div className="bg-transparent w-1/2 max-lg:w-full">
        <div className="w-full h-screen flex items-center justify-center px-4">
          <div className="rounded-lg text-card-primary shadow-sm w-full max-w-sm">
            <Stepper
              steps={steps}
              currentStepIndex={currentStepIndex}
              orientation="horizontal"
              labelPosition="bottom"
              showDescriptionsForAllSteps={true}
              styles={styles}
            />
            {currentStepIndex === 1 && (
              <div className="rounded-lg text-card-primary w-full max-w-sm">
                <div
                  className="flex flex-col text-center justify-center items-center
              space-y-1.5 p-6 my-6"
                >
                  <h3 className="font-semibold tracking-tight text-2xl mb-12">
                    Verification
                  </h3>
                  <div className="flex gap-4 justify-center w-full py-10">
                    {/* Add your OTP inputs here */}
                    {/* <Lottie
                    animationData={animationData}
                    className="flex justify-center items-center"
                    loop={true}
                  /> */}
                    <RotatingLines
                      height="40"
                      width="40"
                      strokeColor="#c55e0c"
                    />
                  </div>
                  <div className="mt-12">
                    {error ? (
                      <p className="text-grey-500 text-md mt-6">
                        Verifying your account...
                      </p>
                    ) : (
                      <div className="flex flex-col items-center ">
                        <p>The verification link has expired.</p>
                        <Button>Resend Email</Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {currentStepIndex === 2 && (
              <>
                <div className="rounded-lg text-card-primary w-full max-w-sm">
                  <div
                    className="flex flex-col text-center justify-center items-center
              space-y-1.5 p-6 my-6"
                  >
                    <h3 className="font-semibold tracking-tight text-2xl mb-12">
                      Account Activated
                    </h3>
                    <div className="flex gap-4 justify-center w-full py-10">
                      <Lottie
                        animationData={animationData}
                        className="flex justify-center items-center h-20 w-20"
                        loop={2}
                      />
                    </div>
                    <div className="mt-12">
                      <p className="text-grey-500 text-md mt-6">
                        Your account has been activated! <br />
                        You can now log in on the Hopterlink app or stay on this
                        page and you will be redirected to the login page.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="bg-secondary max-lg:hidden w-1/2 relative">
        <Particles
          className="absolute top-0 bottom-0 left-0 right-0"
          color="#c55e0c"
          staticity={10}
        />
        <div className="top-10 right-10 absolute">
          <Logo />
        </div>
        <div
          className="relative flex h-full w-full items-center justify-center
              overflow-hidden md:shadow-xl"
        >
          <Typography
            variant={"h1"}
            className="z-10 whitespace-pre-wrap text-center font-medium
                tracking-tighter"
          >
            Hopterlink™
          </Typography>
        </div>{" "}
      </div>
    </div>
  );
};

export default VerifyEmail;