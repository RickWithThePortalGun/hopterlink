/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import HeaderContainer from "@/components/HeaderContainer";

import AddAReview from "@/components/AddAReview";
import AverageReview from "@/components/AverageReview";
import BusinessAdInfo from "@/components/BusinessAdInfo";
import BusinessCTA from "@/components/BusinessCTA";
import Crumbs from "@/components/Crumbs";
import ReviewsCard from "@/components/ReviewsCard";
import SendAMesage from "@/components/SendAMesage";
import { toast } from "@/components/ui-hooks/use-toast";
import { Button } from "@/components/ui/button";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
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
import { useEffect, useState } from "react";
import Gallery from "@/components/Gallery";
import Image from "next/image";
import { RotatingLines } from "react-loader-spinner";

interface Props {
  params: { id: string }; // Use id instead of slug
}

const Business = ({ params }: Props) => {
  const {
    data: session,
  }: {
    status: string;
    data: { access_token: string };
  } = useSession();
  const [businessInfo, setBusinessInfo] = useState<any>({});
  const [reviews, setReviews] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [active, setActive] = useState(
    businessInfo.business_name ? businessInfo.images[0].image : "",
  );

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

  useEffect(() => {
    const id = params.id as string;
    const fetchData = async () => {
      try {
        setLoading(true);
        const business = await axios.get(`/api/business/${id}`);
        console.log("Fetched reviews: ", business.data.reviews);
        setReviews(business.data.reviews);
        console.log(reviews);
        setBusinessInfo(business.data);
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
  }, []);

  const [activeSection, setActiveSection] = useState("overview");
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <div>{businessInfo?.description}</div>;
      case "gallery":
        return (
          <>
            <Gallery images={businessInfo.images} />
            <div className="h-fit py-4 flex flex-row items-center gap-4">
              {businessInfo.images.map((image, index) => (
                <>
                  <div className="w-[100px] relative h-[100px]">
                    <Image
                      objectFit="cover"
                      alt="business-images"
                      fill
                      className="rounded-md"
                      onLoad={() => (
                        <RotatingLines strokeColor="#c55e0c" width="20" />
                      )}
                      src={image.thumbnail}
                    />
                  </div>
                </>
              ))}{" "}
            </div>
          </>
        );
      case "reviews":
        return (
          <div>
            {reviews?.length > 0 ? (
              <>
                {reviews
                  .slice()
                  .reverse()
                  .map((review: any) => (
                    <div key={review.id}>
                      <ReviewsCard review={review} />
                    </div>
                  ))}
              </>
            ) : (
              ""
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const getTabClass = (section: string) => {
    return section === activeSection
      ? "bg-secondary rounded-full max-lg:px-2 px-4 mb-2 py-2 max-md:text-xs max-w-full cursor-pointer"
      : "px-4 py-2 cursor-pointer max-md:text-xs";
  };

  const priceRange = businessInfo?.price_range;

  const handleAddToFavorites = async () => {
    try {
      await axios.post(`/api/add-to-collection/${params.id}`);
      setIsFavorite(true);
      toast({
        title: "Added to Collections",
        description: `${businessInfo.business_name} has been added to your collection.`,
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description:
          "There was an error adding this business to your collection. Please try again later.",
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
  const handleAddReview = (newReview: any) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };
  console.log(businessInfo);
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
          <div className="mt-10 z-48">
            {businessInfo.business_name ? (
              <div className="">
                <Crumbs businessInfo={businessInfo} />
              </div>
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
                {businessInfo?.average_rating >= 1 ? (
                  <>
                    <div className="flex flex-col h-auto">
                      <AverageReview
                        size={16}
                        value={businessInfo?.average_rating}
                      />
                    </div>
                    <Typography variant={"p"}>
                      {businessInfo?.reviews.length === 1
                        ? `${businessInfo?.reviews.length} Review`
                        : `${businessInfo?.reviews.length} Reviews`}
                    </Typography>
                  </>
                ) : (
                  <Typography variant={"p"}>No Reviews</Typography>
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
          <div className="flex flex-row max-lg:flex-col md:justify-between max-lg:gap-2 items-center mt-2">
            <div
              className="flex flex-row items-center max-md:w-full gap-2
                max-sm:flex-col"
            >
              <AddAReview
                businessInfo={businessInfo}
                onReviewAdded={handleAddReview}
              />{" "}
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
              {businessInfo.in_collection || isFavorite ? (
                <Button
                  className="flex min-w-60 gap-2 items-center max-md:mt-2"
                  variant={"ghost"}
                  disabled
                >
                  <BookmarkCheck size={16} />
                  Added to Favorites
                </Button>
              ) : (
                <Button
                  className="flex min-w-60 gap-2 items-center max-md:mt-2"
                  variant={"secondary"}
                  onClick={handleAddToFavorites}
                >
                  <Bookmark size={16} />
                  Add to Collections
                </Button>
              )}
            </div>
          </div>
          <div className="flex-col flex max-w-full">
            <div className="flex flex-row items-center gap-2 max-md:gap-0 mt-6 max-w-full lg:justify-between">
              <div
                className={getTabClass("overview")}
                onClick={() => {
                  setActiveSection("overview");
                }}
              >
                Overview
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
            <Separator className="mb-2" />
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
