/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";
import HeaderContainer from "@/components/HeaderContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/cards";
import Typography from "@/components/ui/typography";
import { Settings, Verified } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  type AwaitedReactNode,
  type JSXElementConstructor,
  type Key,
  type ReactElement,
  type ReactNode,
  type ReactPortal,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import NumberTicker from "@/components/magicui/number-ticker";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ReviewsCard from "@/components/ReviewsCard";
import Collection from "@/components/Collection";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

const Page = () => {
  const { status, data: session } = useSession() as unknown as {
    status: string;
    data: { access_token: string };
  };
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<{
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    review_count: number;
    businesses: any[];
    reviews?: any[];
  } | null>(null);

  const getUserinfo = async () => {
    const uri = `auth/user/`;
    if (!session?.access_token) {
      throw new Error("User not authenticated or access token not found");
    }

    const axiosInstance = axios.create({
      baseURL: "http://127.0.0.1:8000/api/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    try {
      const { data } = await axiosInstance.get(uri);
      return data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (status === "authenticated") {
        try {
          const response = await getUserinfo();
          setUserInfo(response.user);
          console.log(response);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    void fetchUserData();
  }, [status]);
  const loadingStates = [
    {
      text: `Getting your account information..`,
    },
    {
      text: `Recieving information..`,
    },
    {
      text: `Rendering information..`,
    },
  ];
  if (loading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        {/* Core Loader Modal */}
        <MultiStepLoader
          loadingStates={loadingStates}
          loading={loading}
          duration={1000}
        />
      </div>
    );
  }
  return (
    <HeaderContainer>
      <div className="flex flex-col">
        <div
          className="md:py-30 md:px-1.5 pt-11 pb-24 px-6 flex flex-row max-md:flex-col w-full
            gap-12 mt-12"
        >
          <div className="w-[40%] max-md:w-full">
            <Card className="p-2 flex items-center flex-col">
              <div className="relative items-center justify-center my-12 flex rounded-full w-40 h-40">
                <Image
                  className="absolute rounded-full"
                  fill
                  objectFit="cover"
                  src="/Beverly-Naya.jpeg"
                  alt={"profile picture"}
                />
              </div>
              <Typography variant={"h2"} className="text-center">
                {userInfo?.first_name} {userInfo?.last_name}
              </Typography>
              <div className="flex justify-center items-center gap-2">
                <Verified size={14} />
                <p className="text-center text-xs"> {session?.user.email}</p>
              </div>
              <div className="my-6 flex flex-col gap-2">
                <p className="text-center text-xs font-bold">Abuja, Nigeria</p>
                <p className="text-center">6 years , 1 month</p>
              </div>
            </Card>
            <div className="w-full flex flex-row items-center gap-2 my-4">
              <Button className="w-full" variant={"outline"}>
                Edit your Profile
              </Button>
              {/* <Button>
                <Settings />
              </Button> */}
              <Button variant={"outline"}>
                <Collection />
              </Button>
            </div>
          </div>
          <div className="w-[60%] flex flex-col justify-between max-md:w-full">
            <div className="flex flex-col gap-2">
              <Card className="p-4 h-fit flex justify-between flex-col">
                <Typography variant={"h4"} className="text-start">
                  About You
                </Typography>
                <p className="mt-4 text-xs">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Delectus, quae quaerat. Sed ad, impedit maiores nobis aperiam
                  vero obcaecati blanditiis adipisci architecto recusandae hic
                  ab odio corporis, esse cumque velit.
                </p>
              </Card>
            </div>
            {/* <div className="h-full mt-6 p-2 flex flex-row gap-2">
              <Card className="w-[50%]  p-4 flex flex-col items-center justify-center">
                <Typography variant={"h4"} className="text-start">
                  Businesses Reviewed
                </Typography>

                {userInfo?.review_count === 0 ? (
                  <Typography variant={"h2"} className="text-center mt-6">
                    0
                  </Typography>
                ) : (
                  <Typography variant={"h2"} className="text-center mt-6">
                    <NumberTicker value={userInfo?.review_count ?? 0} />
                  </Typography>
                )}
              </Card>
              <Card className="w-[50%] flex flex-col items-center justify-center p-4">
                <Typography variant={"h4"} className="text-start">
                  Businesses Owned
                </Typography>
                {userInfo?.businesses.length > 0 ? (
                  <Typography variant={"h2"} className="text-center mt-6">
                    <NumberTicker value={userInfo?.businesses?.length ?? 0} />
                  </Typography>
                ) : (
                  <Typography variant={"h2"} className="text-center mt-6">
                    0
                  </Typography>
                )}
              </Card>
            </div> */}
          </div>
        </div>
        <div
          className="md:py-30 md:px-1.5 pb-24 px-6 flex flex-row max-md:flex-col w-full
            gap-12"
        >
          <Card className="mt-2 p-4 w-[50%] max-md:w-full h-[600px] overflow-hidden mb-4">
            <Typography className="mb-4" variant={"h2"}>
              Settings
            </Typography>
            <div
              style={{
                height: "500px",
                overflowY: "auto",
                paddingRight: "10px",
              }}
            ></div>
          </Card>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Page;
