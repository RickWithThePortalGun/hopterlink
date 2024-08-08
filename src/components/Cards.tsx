/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import formatTimeAgo from "@/constants/constants";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import AverageReview from "./AverageReview";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import Typography from "./ui/typography";

const Cards = () => {
  const [recent, setRecents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Current page number
  const [hasMore, setHasMore] = useState(true); // Whether there are more recent to load
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchRecentActivity(page);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    void fetchData();
  }, [page]);

  const fetchRecentActivity = async (page: number) => {
    try {
      const result = await axios.get("/api/recent-activity/");
      setRecents(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    }
  };

  const handleRoute = (item: { slug: any }) => {
    router.push(`/business/${item.slug}`);
  };

  const renderContent = (activity) => {
    switch (activity.activity_type) {
      case "review":
        return (
          <div className="flex flex-col gap-2">
            <Typography variant={"h5"} className="font-bold text-sm">
              {activity.content_object.user.email}
            </Typography>
            <div className="flex flex-row gap-2">
              <AverageReview value={activity.content_object.rating} size={14} />
            </div>
            <Typography variant={"p"} className="text-xs">
              {activity.content}
            </Typography>
          </div>
        );
      case "business":
        return (
          <div className="flex flex-col gap-2">
            <Typography variant={"h5"} className="font-bold text-sm">
              {activity.content_object.business_name}
            </Typography>
            <Typography variant={"p"} className="text-xs">
              {activity.content}
            </Typography>
            <Image
              src={
                activity.content_object.logo
                  ? activity.content_object.logo
                  : activity.content_object.images[0].thumbnail
              }
              width={64}
              height={64}
              alt="Business Logo"
              className="w-16 h-16 object-contain rounded-md"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {loading ? (
        <Marquee
          gradient
          gradientColor={"rgba(197, 94, 12, 0.03)"}
          autoFill
          pauseOnHover
          className="gap-6 flex items-center rounded-md"
        >
          <Skeleton
            className="flex flex-col z-40 p-4 rounded-md gap-6 w-[200px] h-[200px]
            items-center justify-center mx-4"
          />
          <Skeleton
            className="flex flex-col z-40 p-4 rounded-md gap-6 w-[200px] h-[200px]
            items-center justify-center mx-4"
          />
          <Skeleton
            className="flex flex-col z-40 mx-4 p-4 rounded-md gap-6 w-[200px] h-[200px]
            items-center justify-center"
          />
          <Skeleton
            className="flex flex-col mx-4 z-40 p-4 rounded-md gap-6 w-[200px] h-[200px]
            items-center justify-center"
          />
        </Marquee>
      ) : (
        <Marquee
          gradient
          gradientColor={"rgba(197, 94, 12, 0.05)"}
          autoFill
          pauseOnHover
          className="gap-6 flex items-center w-full rounded-md"
        >
          {recent.map((activity) => (
            <div
              onClick={() => {
                handleRoute({ slug: activity.content_object.id });
              }}
              key={activity.content_object.id}
              className="flex flex-col z-40 p-4 rounded-md bg-background border-[1px]
              gap-4 text-left w-[250px] h-[250px] items-start cursor-pointer mx-4"
            >
              <div className="flex flex-row gap-2 items-center">
                <Avatar className="rounded-md">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0 leading-tight">
                  <Typography
                    variant={"p"}
                    className="text-sm font-semibold flex flex-col items-start gap-1"
                  >
                    {activity.user.first_name ?? "Anonymous"}{" "}
                    {activity.user.last_name ?? "User"}
                    <p className="text-xs font-light">
                      {activity.activity_type === "review"
                        ? "reviewed a business"
                        : "created a business account"}
                    </p>
                  </Typography>
                </div>
              </div>
              <div className="flex flex-col flex-grow overflow-hidden">
                {renderContent(activity)}
              </div>
              <p className="text-xs text-primary mt-auto text-end w-full">
                {formatTimeAgo(new Date(activity.created_at))}
              </p>
            </div>
          ))}
        </Marquee>
      )}
    </>
  );
};

export default Cards;
