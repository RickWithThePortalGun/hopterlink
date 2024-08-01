/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import axios from "axios";
import { Bookmark, Clock } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import AverageReview from "./AverageReview";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";

const RecentlyViewed = () => {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const { data: session } = useSession();

  const fetchRecents = async () => {
    try {
      const response = await axios.get("/api/recently-viewed/");
      console.log(response)
      setBusinesses(response.data.results);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    if (session) {
      void fetchRecents();
    }
  }, [session]);

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <div className="flex cursor-pointer flex-row items-center gap-2 pl-2 text-sm">
          <Clock size={14} /> Recently Viewed
        </div>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Recently Viewed</CredenzaTitle>
          <CredenzaDescription>
          Businesses you have recently visited would be listed here.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <ScrollArea className="h-96" >
          {businesses.length > 0 ? (
            <ul className="px-4 my-2">
              {businesses.map((business) => (
                <>
                  <Link href={`/business/${business.id}`} >
                  <div className="flex gap-1 flex-col">
                    <div className="flex flex-row items-center justify-between mt-2">
                      <li key={business.id} className="my-2">
                        {business.business_name}
                      </li>
                      { business.average_rating < 1 ? <p className="text-xs">No reviews</p>:<AverageReview
                        size={14}
                        value={business.average_rating}
                      /> }
                      {" "}
                    </div>
                    <div>
                      <p className="text-xs text-secondary-foreground">
                        {business.location}
                      </p>
                    </div>
                    </div>
                  </Link>
                  <Separator />
                </>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-center h-[100%] w-full">            <p className="text-primary-foreground">Explore Hopterlink's vast resources.</p></div>

          )}
          </ScrollArea>
        </CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button variant={"destructive"}>Close</Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default RecentlyViewed;
