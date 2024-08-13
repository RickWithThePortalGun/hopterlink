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
import { motion, AnimatePresence } from "framer-motion";
import Gallery from "@/components/Gallery";
import Image from "next/image";
import { RotatingLines } from "react-loader-spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import DotPattern from "@/components/magicui/dot-pattern";
import { useCategories } from "@/contexts/ReUsableData";
import BusinessOwner from "@/components/BusinessOwner";

interface Props {
  params: { id: string };
}

const Business = ({ params }: Props) => {
  const [businessInfo, setBusinessInfo] = useState<any>({});
  const [reviews, setReviews] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    const fetchData = async () => {
      try {
        setLoading(true);
        const business = await axios.get(`/api/business/${id}`);
        setReviews(business.data.reviews);
        setBusinessInfo(business.data);
      } catch (error) {
        console.error("Error fetching business detail:", error);
      }
      setLoading(false);
    };
    void fetchData();
  }, [params.id]);
  const handleReviewAdded = (newReview: any) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };
  return (
    <HeaderContainer>
      {loading || !businessInfo.business_name ? (
        <div className="w-full h-[60vh] flex items-center justify-center">
          <MultiStepLoader
            loadingStates={[
              { text: "Asking for information.." },
              { text: "Receiving information.." },
              { text: "Rendering information.." },
            ]}
            loading={loading}
            duration={1000}
          />
        </div>
      ) : (
        <motion.div
          className="flex flex-col h-full md:py-30 md:px-28 pt-11 pb-24 px-6 w-full gap-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mt-10 z-48"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {businessInfo.business_name && (
              <Crumbs businessInfo={businessInfo} />
            )}
          </motion.div>
          <motion.div
            className="mt-12 w-full flex-row max-md:flex-col gap-4 flex justify-between items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Typography className="text-primary" variant={"h1"}>
              {businessInfo?.business_name}
            </Typography>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center gap-2 max-md:mt-2">
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
            </motion.div>
          </motion.div>
          <motion.div
            className="flex flex-row justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="gap-2 flex flex-col">
              <motion.div
                className="flex flex-row gap-2 items-center"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <MapPin />
                <Typography
                  className="max-md:text-center text-xs"
                  variant={"p"}
                >
                  {businessInfo?.location}
                </Typography>
              </motion.div>
              <motion.div
                className="flex flex-row gap-2 items-center"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Link2 />
                <Typography className="max-md:text-center">
                  {businessInfo.website ? (
                    <Link href={businessInfo?.website}>
                      {businessInfo?.website}
                    </Link>
                  ) : (
                    ""
                  )}
                </Typography>
              </motion.div>
              <motion.div
                className="flex flex-row items-center gap-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
              >
                <Timer />
                <Typography className="max-md:text-center">
                  Delivers in {businessInfo.min_delivery_time_in_days} to{" "}
                  {businessInfo.max_delivery_time_in_days} days
                </Typography>
              </motion.div>
              {businessInfo.tags && businessInfo.tags.length > 0 && (
                <div className="w-full flex gap-2 flex-wrap">
                  {businessInfo.tags.map((tag: any) => (
                    <motion.p
                      key={tag.slug}
                      className="max-w-[100px] truncate bg-teal-400/10 border-none mt-[5px] text-[10px] px-2 py-1 rounded-[18px]"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: tag.index * 0.1 }}
                    >
                      {tag.name}
                    </motion.p>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
          <motion.div
            className="text-center text-sm font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {businessInfo?.description}
          </motion.div>
          <motion.div
            className="flex flex-row max-lg:flex-col md:justify-between max-lg:gap-2 items-center mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-row items-center max-md:w-full gap-2 max-sm:flex-col">
              <AddAReview
                onReviewAdded={handleReviewAdded}
                businessInfo={businessInfo}
              />
              <SendAMesage businessInfo={businessInfo} />
              <Button
                className="flex gap-2 items-center min-w-60"
                variant={"secondary"}
                onClick={() => {
                  const businessURL = window.location.href;
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(businessURL).then(
                      () => {
                        toast({
                          title: "Link Copied",
                          description:
                            "The business URL has been copied to your clipboard.",
                        });
                      },
                      () => {
                        toast({
                          title: "Error",
                          description:
                            "Failed to copy the link. Please try again.",
                        });
                      },
                    );
                  } else {
                    toast({
                      title: "Unsupported Browser",
                      description:
                        "Your browser does not support the clipboard feature.",
                    });
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share size={16} /> Share
              </Button>
            </div>
            <div>
              {businessInfo.in_collection || isFavorite ? (
                <Button
                  className="flex min-w-60 gap-2 items-center max-md:mt-2"
                  variant={"ghost"}
                  disabled
                  whileHover={{ scale: 1.05 }}
                >
                  <BookmarkCheck size={16} />
                  Added to Favorites
                </Button>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className="flex min-w-60 gap-2 items-center max-md:mt-2"
                    variant={"secondary"}
                    onClick={async () => {
                      setFavoriteLoading(true);
                      try {
                        await axios.post(`/api/add-to-collection/${params.id}`);
                        toast({
                          title: "Added to Collections",
                          description: `${businessInfo.business_name} has been added to your collection.`,
                        });
                        setIsFavorite(true);
                        setFavoriteLoading(false);
                      } catch (error) {
                        toast({
                          title: "Something went wrong",
                          description: `${error.response.data}`,
                        });
                        setFavoriteLoading(false);
                      }
                    }}
                  >
                    <Bookmark size={16} />
                    {favoriteLoading ? (
                      <RotatingLines width="20" strokeColor="#c55e0c" />
                    ) : (
                      "Add to Collections"
                    )}
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Tab section */}
          <div className="flex flex-row max-md:flex-col gap-2 w-full">
            <div className="flex-col flex max-md:w-full w-1/2">
              <Tabs defaultValue="gallery">
                <TabsList variant="solid">
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <div className="ml-2 mt-4">
                  <TabsContent
                    value="gallery"
                    className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Gallery images={businessInfo.images} />
                      <div className="h-fit py-4 flex flex-row items-center gap-4">
                        {businessInfo.images.map((image, index) => (
                          <motion.div
                            key={index}
                            className="w-[100px] relative h-[100px]"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Image
                              objectFit="cover"
                              alt="business-images"
                              fill
                              className="rounded-md"
                              onLoad={() => (
                                <RotatingLines
                                  strokeColor="#c55e0c"
                                  width="20"
                                />
                              )}
                              src={image.thumbnail}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </TabsContent>
                  <TabsContent
                    value="reviews"
                    className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                    >
                      {reviews?.length > 0 ? (
                        reviews
                          .slice()
                          .reverse()
                          .map((review: any) => (
                            <motion.div
                              key={review.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ReviewsCard review={review} />
                            </motion.div>
                          ))
                      ) : (
                        <div className="w-full h-full items-center justify-center">
                          <Typography variant={"p"}>
                            No reviews yet for {businessInfo.business_name}
                          </Typography>
                        </div>
                      )}
                    </motion.div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
            {/* End of Tab section */}

            <motion.div className="flex-col flex max-md:w-full w-1/2">
              <motion.div
                className="flex flex-row items-center max-md:gap-0 mt-6 lg:w-[1/2] gap-x-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              ></motion.div>
              <Separator className="mb-2 max-lg:flex hidden" />
              <div className="flex flex-row max-lg:flex-col items-start gap-4">
                <motion.div
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7 }}
                >
                  {businessInfo.business_name && (
                    <>
                      <BusinessOwner businessOwner={businessInfo?.owner} />
                      <BusinessCTA businessInfo={businessInfo} />
                      <BusinessAdInfo businessInfo={businessInfo} />
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </HeaderContainer>
  );
};

export default Business;
