/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";
import Collection from "@/components/Collection";
import HeaderContainer from "@/components/HeaderContainer";
import ListItem from "@/components/ListItem";
import ShinyButton from "@/components/magicui/shiny-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/cards";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import Typography from "@/components/ui/typography";
import { useCategories } from "@/contexts/ReUsableData";
import { AvatarComponent } from "avatar-initials";
import axios from "axios";
import { Verified, VerifiedIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import colors from "tailwindcss/colors";

const Page = () => {
  const { status, data: session } = useSession() as unknown as {
    status: string;
    data: { access_token: string };
  };
  const {collections}=useCategories()
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<{
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    review_count: number;
    businesses: any[];
    reviews?: any[];
  } | null>(null);


  useEffect(() => {
    const fetchUserData = async () => {
      if (status === "authenticated") {
        try {
          const response = await axios.get('/api/account/');
          setUserInfo(response.data);
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
      <div className="flex flex-col items-center w-full h-fit justify-between">
      <div
          className="md:py-30 md:px-1.5 pb-24 px-6 flex flex-col w-full mt-24
            gap-12"
        >
          <div className="w-full flex items-start flex-row gap-6 max-lg:flex-col max-lg:items-center">
          <Image alt="Your profile picture" src={'https://github.com/shadcn.png'} className="rounded-full border-4 border-separate border-[#7a7a7]" width={200} height={200}/>
          <div className="w-full max-lg:items-center flex flex-col max-lg:flex-col-reverse">
            <div className="flex w-full justify-between flex-row max-lg:flex-col max-lg:gap-12 items-center">
            <Typography variant={"h1"} className="flex flex-row gap-2 items-center text-center">
              {userInfo?.first_name|| "John"} {userInfo?.last_name||"Doe"}<VerifiedIcon color={"rgba(122, 122, 122, 1)"}/>
            </Typography>
            <div className="flex flex-row max-lg:flex-col items-center gap-4">
<div className="flex flex-row items-center gap-4">
  <div className="flex flex-col gap-2 items-center">
  <Typography className="font-bold" variant={"h2"}>
  7
  </Typography>
  <p className="text-primary font-bold text-sm text-center">
  Businesses Reviewed
  </p>
</div>
<div className="flex flex-col gap-2 items-center">
  <Typography className="font-bold" variant={"h2"}>
  1
  </Typography>
  <p className="text-primary font-bold text-sm text-center">
  Business owned
  </p>
</div><div className="flex flex-col gap-2 items-center">
  <Typography className="font-bold" variant={"h2"}>
  {collections?.length}
  </Typography>
  <p className="text-primary font-bold text-sm text-center">
  Saved Businesses
  </p>
  </div>

</div>
            </div>
            </div>
           
            <div className="flex items-start max-lg:items-center mb-6 flex-col gap-2">
              <Typography variant={"p"} className="text-[#7a7a7a] text-center">
               {userInfo?.email}
              </Typography>
              <Typography variant={"h5"} className="text-center text-[#7a7a7a]">
         {userInfo?.bio || "Hey there, I'm a Hopterlinker!"}
            </Typography>
            </div>
          

          </div>
          </div>
          <div className="flex w-full items-end justify-end max-lg:justify-center">
<ShinyButton text="Edit your Profile" />
          </div>
          
        </div>
        <div
          className="md:py-30 md:px-1.5 pb-24 px-6 flex flex-row max-md:flex-col w-full
            gap-12"
        >
          <Card className="mt-2 p-4 w-[100%] overflow-hidden mb-4">
            <Typography className="mb-4" variant={"h2"}>
              Settings
            </Typography>
            <div
              style={{
                overflowY: "auto",
                paddingRight: "10px",
              }}
            >
              <ListItem title="Notifications" />
              <ListItem title="Privacy Settings" />
              <ListItem title="Language" />
              <ListItem title="Change Password" />
              <ListItem title="Delete Account" />
            </div>
          </Card>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Page;
