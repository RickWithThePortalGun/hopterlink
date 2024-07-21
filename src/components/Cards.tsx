/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { getRecentReviews } from "@/app/api/categories/categories";
import formatTimeAgo from "@/constants/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AverageReview from "./AverageReview";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Typography from "./ui/typography";
import { Button } from "./ui/button";
import { Card } from "./ui/cards";
import RecentActivitySkeletonLoader from "./RecentActivitySkeletonLoader";
import Marquee from "react-fast-marquee";
import { Skeleton } from "./ui/skeleton";

const Cards = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Current page number
  const [hasMore, setHasMore] = useState(true); // Whether there are more reviews to load
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchRecentActivity(page);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    void fetchData(); // Removed void because it's unnecessary here
  }, [page]); // Fetch data when page changes

  const fetchRecentActivity = async (page: number) => {
    try {
      const result = await getRecentReviews(Number(page));
      if (result.results.length === 0) {
        setHasMore(false); // No more reviews to load
      } else {
        setReviews((prevReviews) => [...prevReviews, ...result.results]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoute = (item: { slug: any }) => {
    router.push(`/business/${item.slug}`);
  };

  const handleViewMore = () => {
    setPage((prevPage) => prevPage + 1); // Load next page of reviews
  };

  return (
    <>
      {reviews.length > 0 ? (
        <div
          className="grid w-full max-sm:grid-cols-1 max-md:grid-cols-2
            lg:grid-cols-4 auto-rows-auto gap-4"
        >
          {reviews.map((review) => (
            <div
              onClick={() => {
                handleRoute({ slug: review.business_slug });
              }}
              key={review.id}
              className="flex flex-col z-40 p-4 rounded-md bg-background border-[1px]
                gap-6 text-left md:items-start w-full items-center
                max-lg:items-start cursor-pointer"
            >
              <div className="flex flex-row gap-4 items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0 leading-tight">
                  <Typography
                    variant={"p"}
                    className="text-sm font-semibold flex flex-row gap-1"
                  >
                    {review.user_first_name} {review.user_last_name}{" "}
                    <p className="text-medium font-light">wrote a review</p>
                  </Typography>
                  <Typography variant={"p"} className="text-xs">
                    {formatTimeAgo(new Date(review.date))}
                  </Typography>
                </div>
              </div>
              <div>
                <Card /> {/* Placeholder for your Card component */}
              </div>
              <div className="justify-start flex flex-col gap-4">
                <Typography variant={"h5"} className="font-bold">
                  {review.business_name}
                </Typography>
                <div className="flex flex-row gap-2">
                  <AverageReview value={review.stars} size={14} />
                </div>
                <Typography variant={"p"} className="text-md">
                  {review.content}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Marquee autoFill className="gap-6 flex items-center">
          <Skeleton
            className="flex flex-col z-40 p-4 rounded-md gap-6 w-[200px] h-[200px]
          items-center justify-center mx-4"
          />
          <Skeleton
            className="flex flex-col z-40 p-4 rounded-md gap-6 w-[200px] h-[200px]
          items-center justify-center mx-4"
          />{" "}
          <Skeleton
            className="flex flex-col z-40 mx-4 p-4 rounded-md gap-6 w-[200px] h-[200px]
          items-center justify-center"
          />{" "}
          <Skeleton
            className="flex flex-col mx-4 z-40 p-4 rounded-md gap-6 w-[200px] h-[200px]
          items-center justify-center"
          />{" "}
        </Marquee>
      )}
      {/* {hasMore && (
        <Button onClick={handleViewMore} variant="outline">
          View More
        </Button>
      )} */}
    </>
  );
};

export default Cards;
