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
    console.log("useffect ran");
    const fetchUserData = async () => {
      if (status === "authenticated") {
        try {
          const response = await getUserinfo();
          setUserInfo(response);
          console.log(userInfo);
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
  console.log(userInfo);
  return (
    <HeaderContainer>
      <div className="flex flex-col">
        <div
          className="md:py-30 md:px-1.5 pt-11 pb-24 px-6 flex flex-row w-full
            gap-12 mt-12"
        >
          <div className="w-[40%]">
            <Card className="p-2">
              <div className="items-center justify-center flex rounded-full">
                <Image
                  className="rounded-full my-12"
                  width={200}
                  height={200}
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
                <p className="text-center text-xs"> {userInfo?.email}</p>
              </div>
              <div className="my-6 flex flex-col gap-2">
                <p className="text-center text-xs font-bold">Abuja, Nigeria</p>
                <p className="text-center">6 years , 1 month</p>
              </div>
            </Card>
            <div className="w-full flex flex-row items-center gap-2 my-4">
              <Button className="w-full" variant={"default"}>
                Edit your Profile
              </Button>
              <Button>
                <Settings />
              </Button>
              <Button>
                <Collection />
              </Button>
            </div>
          </div>
          <div className="w-[60%] flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <Card className="p-4 h-fit flex justify-between flex-col">
                <Typography variant={"h4"} className="text-start">
                  About You
                </Typography>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Delectus, quae quaerat. Sed ad, impedit maiores nobis aperiam
                  vero obcaecati blanditiis adipisci architecto recusandae hic
                  ab odio corporis, esse cumque velit.
                </p>
              </Card>
            </div>
            <div className="h-full mt-6 p-2 flex flex-row gap-2">
              <Card className="w-[50%] p-4 flex flex-col items-center justify-center">
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
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <Card className="mt-2 p-2 w-[50%] h-fit">
            <Typography className="mb-4 p-4" variant={"h2"}>
              Businesses
            </Typography>
            {userInfo?.businesses.map((business, index) => (
              <>
                {" "}
                <div
                  className="my-2 justify-between flex items-center"
                  key={index}
                >
                  <Link href={`/business/${business.slug}`}>
                    <p>{business.name}</p>
                  </Link>
                  <Button>
                    <Settings />
                  </Button>
                </div>
                <Separator />
              </>
            ))}
          </Card>
          <Card className="mt-2 p-4 w-[50%] h-[600px] overflow-hidden">
            <Typography className="mb-4" variant={"h2"}>
              Recent Reviews
            </Typography>
            <div
              style={{
                height: "500px",
                overflowY: "auto",
                paddingRight: "10px",
              }}
            >
              {userInfo?.reviews?.map(
                (
                  review: {
                    business_name:
                      | string
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<AwaitedReactNode>
                      | null
                      | undefined;
                  },
                  index: Key | null | undefined,
                ) => (
                  <>
                    <div className="flex justify-end">
                      <Link
                        href={`/business/${review?.business_slug as string}`}
                      >
                        <p
                          className="text-end text-xs px-2 py-1 rounded-full w-fit bg-[#c55e0c]
                            my-2"
                        >
                          {review.business_name}
                        </p>
                      </Link>
                    </div>
                    <ReviewsCard review={review} key={index} />
                  </>
                ),
              )}
            </div>
          </Card>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Page;
