/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import { getBusinessInfo } from "@/app/api/categories/categories";
import HeaderContainer from "@/components/HeaderContainer";

import { priceRangeMapping } from "@/app/categories/[id]/page";
import AddAReview from "@/components/AddAReview";
import AverageReview from "@/components/AverageReview";
import BusinessAdInfo from "@/components/BusinessAdInfo";
import BusinessCTA from "@/components/BusinessCTA";
import Crumbs from "@/components/Crumbs";
import ReviewsCard from "@/components/ReviewsCard";
import SendAMesage from "@/components/SendAMesage";
import { toast } from "@/components/ui-hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import axios from "axios";
import {
  Bookmark,
  BookmarkCheck,
  Link2,
  MapPin,
  Share,
  Timer,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { type Key, useEffect, useState } from "react";
import { type Session } from "next-auth";
import Image from "next/image";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

interface Props {
  params: { id: string }; // Use id instead of slug
}

const Business = ({ params }: Props) => {
  const {
    data: session,
  }: {
    status: string;
    data: { access_token: string } | Session;
  } = useSession();
  const accessToken = session?.access_token ?? "";
  const [businessInfo, setBusinessInfo] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const copyToClipboard = (text: any) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        () => {
          toast({
            title: "Link Copied",
            description: "The business URL has been copied to your clipboard.",
          });
        },
        (err) => {
          toast({
            title: "Error",
            description: "Failed to copy the link. Please try again.",
          });
          console.error("Could not copy text: ", err);
        },
      );
    } else {
      toast({
        title: "Unsupported Browser",
        description: "Your browser does not support the clipboard feature.",
      });
    }
  };
  const handleShareClick = () => {
    const businessURL = window.location.href;
    copyToClipboard(businessURL);
  };

  // const checkFavorite = async (businessId: any) => {
  //   try {
  //     const response = await axios.get(
  //       `http://127.0.0.1:8000/favorites/check/${businessId}/`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${session?.access_token}`,
  //         },
  //       },
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error checking favorite:", error);
  //     throw error;
  //   }
  // };

  useEffect(() => {
    const id = params.id as string;
    const fetchData = async () => {
      try {
        setLoading(true);
        const business = await axios.get(`/api/business/${id}`);
        setBusinessInfo(business.data);
        console.log(businessInfo);
        // if (business.id) {
        //   const { is_favorite } = await checkFavorite(business.id);
        //   setIsFavorite(is_favorite);
        // }
      } catch (error) {
        console.error("Error fetching business detail:", error);
      }
      setLoading(false);
    };
    void fetchData();
  }, [params.id]);

  const [activeSection, setActiveSection] = useState("overview");
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <div>{businessInfo?.description}</div>;
      case "menu":
        return <div>{businessInfo?.services}</div>;
      case "gallery":
        return (
          <div>
            {businessInfo.images?.map(
              (image: any, index: Key | null | undefined) => (
                <Image
                  key={index}
                  src={image.image}
                  alt={businessInfo.name}
                  width={100}
                  height={100}
                />
              ),
            )}
          </div>
        );
      case "reviews":
        return (
          <div>
            {businessInfo?.reviews
              .slice()
              .reverse()
              .map((review: any) => (
                <div key={review.id}>
                  <ReviewsCard review={review} />
                </div>
              ))}
          </div>
        );
      default:
        return null;
    }
  };

  const getTabClass = (section: string) => {
    return section === activeSection
      ? "bg-secondary rounded-full px-4 py-2 cursor-pointer"
      : "px-4 py-2 cursor-pointer";
  };

  const priceRange = businessInfo?.price_range;

  const handleAddToFavorites = async () => {
    const axiosInstance = axios.create({
      baseURL: "http://127.0.0.1:8000/api/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
    try {
      await axiosInstance.post("http://localhost:8000/favorites/add/", {
        business_id: businessInfo.id,
      });
      setIsFavorite(true);
      toast({
        title: "Added to Favorites",
        description: `${businessInfo.name} has been added to your favorites.`,
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description:
          "There was an error adding this business to your favorites. Please try again later.",
      });
    }
  };
  const loadingStates = [
    {
      text: `Asking for information..`,
    },
    {
      text: `Recieving information..`,
    },
    {
      text: `Rendering information..`,
    },
  ];
  return (
    <HeaderContainer>
      {loading || !businessInfo.business_name ? (
        // <div className="h-screen w-screen flex items-center justify-center">
        //   <RotatingLines
        //     visible={true}
        //     width="35"
        //     strokeColor="#C55E0C"
        //     strokeWidth="5"
        //     animationDuration="0.75"
        //     ariaLabel="rotating-lines-loading"
        //   />
        // </div>
        <div className="w-full h-[60vh] flex items-center justify-center">
          {/* Core Loader Modal */}
          <MultiStepLoader
            loadingStates={loadingStates}
            loading={loading}
            duration={1000}
          />
        </div>
      ) : (
        <div
          className="flex flex-col h-full md:py-30 md:px-28 pt-11 pb-24 px-6
            w-full gap-12"
        >
          <div className="mt-10">
            {businessInfo.business_name ? (
              <Crumbs businessInfo={businessInfo} />
            ) : (
              ""
            )}
          </div>
          <div
            className="mt-12 w-full flex-row max-md:flex-col flex justify-between
              items-center"
          >
            <Typography className="text-primary" variant={"h1"}>
              {businessInfo?.business_name}
            </Typography>
            <div>
              <div className="flex flex-col items-center gap-2">
                {businessInfo?.average_rating ? (
                  <>
                    <div className="flex flex-col h-auto">
                      <AverageReview
                        size={16}
                        value={businessInfo?.average_rating}
                      />
                    </div>
                    <Typography variant={"p"}>
                      {businessInfo?.reviews.length} Reviews
                    </Typography>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="gap-2 flex flex-col">
              <div className="flex flex-row gap-2 items-center">
                <MapPin />
                <Typography
                  className="max-md:text-center text-xs"
                  variant={"p"}
                >
                  {businessInfo?.location}
                </Typography>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Link2 />
                <Typography className="max-md:text-center">
                  {businessInfo.website ? (
                    <Link href={businessInfo?.website}>
                      {businessInfo?.website}{" "}
                    </Link>
                  ) : (
                    ""
                  )}
                </Typography>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Timer />
                <Typography className="max-md:text-center">
                  Delivers in {businessInfo.min_delivery_time_in_days} to{" "}
                  {businessInfo.max_delivery_time_in_days} days
                </Typography>
              </div>
              {businessInfo.tags && businessInfo.tags.length > 0 && (
                <div className="w-full flex gap-2 flex-wrap">
                  {businessInfo.tags.map((tag: any) => (
                    <p
                      key={tag.slug}
                      className="max-w-[100px] truncate bg-teal-400/10 border-none mt-[5px]
                          text-[10px] px-2 py-1 rounded-[18px]"
                    >
                      {tag.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-row gap-2 items-center">
              {/* <DollarSign size={14} />
            {priceRange ? (
              <span className={className}>{text}</span>
            ) : (
              <span className="text-gray-500">
                Price range not available
              </span>
            )} */}
            </div>
          </div>
          <div className="flex flex-row max-md:flex-col items-center justify-between">
            <div
              className="flex flex-row items-center max-md:w-full gap-2 mt-2
                max-sm:flex-col"
            >
              <AddAReview businessInfo={businessInfo} />
              <SendAMesage businessInfo={businessInfo} />
              <Button
                className="flex gap-2 items-center min-w-60"
                variant={"secondary"}
                onClick={handleShareClick}
              >
                <Share size={16} /> Share
              </Button>
            </div>
            <div className="">
              {!isFavorite ? (
                <Button
                  className="flex min-w-60 gap-2 items-center max-md:mt-2"
                  variant={"secondary"}
                  onClick={handleAddToFavorites}
                >
                  <Bookmark size={16}/>
                  Add to Favorites
                </Button>
              ) : (
                <Button
                  className="flex gap-2 items-center"
                  variant={"ghost"}
                  disabled
                >
                  <BookmarkCheck size={16}/>
                  Added to Favorites
                </Button>
              )}
            </div>
          </div>
          <div className="flex-col flex gap-4">
            <div
              className="flex flex-row items-center gap-2 max-md:gap-0 mt-6  w-[55%]
                justify-between"
            >
              <div
                className={getTabClass("overview")}
                onClick={() => {
                  setActiveSection("overview");
                }}
              >
                Overview
              </div>
              <div
                className={getTabClass("menu")}
                onClick={() => {
                  setActiveSection("menu");
                }}
              >
                Services
              </div>
              <div
                className={getTabClass("gallery")}
                onClick={() => {
                  setActiveSection("gallery");
                }}
              >
                Gallery
              </div>
              <div
                className={getTabClass("reviews")}
                onClick={() => {
                  setActiveSection("reviews");
                }}
              >
                Reviews
              </div>
            </div>
            <Separator />
            <div className="flex flex-row max-lg:flex-col items-start gap-4">
              <div className="w-2/3 max-lg:w-full">{renderContent()}</div>
              <div className="flex flex-col gap-2">
                {businessInfo.business_name ? (
                  <>
                    {" "}
                    <BusinessCTA businessInfo={businessInfo} />
                    <BusinessAdInfo businessInfo={businessInfo} />
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </HeaderContainer>
  );
};

export default Business;
