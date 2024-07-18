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
import { Bookmark } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import AverageReview from "./AverageReview";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const Collection = () => {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const { data: session } = useSession();

  const fetchFavorites = async () => {
    const axiosInstance = axios.create({
      baseURL: "http://127.0.0.1:8000/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
    try {
      const response = await axiosInstance.get("favorites/");
      setBusinesses(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    if (session) {
      void fetchFavorites();
    }
  }, [session]);

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <div className="flex flex-row items-center gap-4">
          <Bookmark size={20} />
        </div>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Your Saved Collections</CredenzaTitle>
          <CredenzaDescription>
            Click the 'Add to Collection' to save your favorite connections.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          {businesses.length > 0 ? (
            <ul>
              {businesses.map((business) => (
                <>
                  <Link href={`/business/${business.slug}`}>
                    <div className="flex flex-row items-center gap-4 justify-between">
                      <li key={business.id} className="my-2">
                        {business.name}
                      </li>
                      <AverageReview
                        size={14}
                        value={business.average_rating}
                      />{" "}
                    </div>
                  </Link>
                  <Separator />
                </>
              ))}
            </ul>
          ) : (
            <p>No businesses found.</p>
          )}
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

export default Collection;
