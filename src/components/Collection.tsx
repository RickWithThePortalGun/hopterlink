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
import { Bookmark, Link2, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import AverageReview from "./AverageReview";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import SwipeToRevealActions from "react-swipe-to-reveal-actions";
import { toast } from "./ui-hooks/use-toast";

const Collection = () => {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const { data: session } = useSession();

  const fetchCollection = async () => {
    try {
      const response = await axios.get("/api/collection/");
      setBusinesses(response.data);
      console.log(response)
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    if (session) {
      void fetchCollection();
    }
  }, [session,businesses]);
  console.log(businesses)
  const deleteCollection = async (collectionId: string, businessName: string) => {
    try {
      await axios.post(`/api/remove-from-collection/${collectionId}`);
      setBusinesses(prevBusinesses =>
        prevBusinesses.filter(business => business.business.id !== collectionId)
      );
      toast({
        title: "Removed from Collections",
        description: `${businessName} has been removed from your collection.`,
      });

    } catch (error) {
      toast({
        title: "Something went wrong",
        description:
          "There was an error removing this business from your collection. Please try again later.",
      });
    }
  };

  const shareCollection=(businessId:string)=>{
    // TODO: Change this url at a later time
    const businessurl=`https://hopterlink.vercel.app/businesses/${businessId}`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(businessurl).then(
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
  }

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <div className="flex items-center gap-4">
          <Bookmark size={20} />
        </div>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Your Saved Collections</CredenzaTitle>
          <CredenzaDescription>
            Swipe left to remove or share your saved businesses.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          {businesses.length > 0 ? (
            <ul>
              {businesses.map((business) => (
                <>
                  <SwipeToRevealActions
                    hideDotsButton
                    actionButtons={[
                      {
                        content: (
                          <div className="flex items-center justify-center">
                            <Trash color="#c55e0c" />
                          </div>
                        ),
                        onClick: () => deleteCollection(business.business.id.toString(), business.business.business_name),
                      },
                      {
                        content: (
                          <div className="flex items-center justify-center">
                            <Link2 color="#c55e0c"/>
                          </div>
                        ),
                        onClick: () => shareCollection(business.business.id.toString())
                      },
                    ]}
                    actionButtonMinWidth={70}
                  >
                    <Link href={`/business/${business.business.id}`} className="w-[100%] absolute top-0 right-0 left-0 bottom-0 items-center px-2 py-2 bg-background">
                      <div className="flex flex-row items-center gap-4 justify-between w-full">
                        <li key={business.business.id} className="my-2">
                          {business.business.business_name}
                        </li>
                        <AverageReview
                          size={14}
                          value={business.business.average_rating}
                        />{" "}
                      </div>
                    </Link>
                  </SwipeToRevealActions>
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
