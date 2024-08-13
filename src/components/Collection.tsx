import { useEffect, useState } from "react";
import { Credenza, CredenzaBody, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "./ui/credenza";
import { Bookmark, Link2, Trash } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import SwipeToRevealActions from "react-swipe-to-reveal-actions";
import { toast } from "./ui-hooks/use-toast";
import { useCategories } from "@/contexts/ReUsableData";
import Link from "next/link";
import AverageReview from "./AverageReview";
import axios from "axios";

const Collection = () => {
  const { collections, setCollections, collectionLoading } = useCategories();
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const deleteCollection = async (
    collectionId: string,
    businessName: string,
  ) => {
    try {
      await axios.post(`api/remove-from-collection/${collectionId}`);
      setCollections((prevBusinesses) =>
        prevBusinesses.filter(
          (business) => business.business.id.toString() !== collectionId,
        ),
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

  const shareCollection = (businessId: string) => {
    // TODO: Change this url at a later time
    const businessurl = "https://hopterlink.vercel.app/business/${businessId}";
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
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsWideScreen(window.innerWidth >= 1024);
    };

    const checkTouchDevice = () => {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };

    checkScreenSize();
    checkTouchDevice();

    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

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
            {isTouchDevice
              ? "Swipe left to remove or share your saved businesses."
              : "Hover over items to see actions."}
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          {collectionLoading ? (
            <div className={"flex flex-col gap-4 items-center"}>
              <Skeleton className="w-full h-24 rounded-md" />
              <Skeleton className="w-full h-24 rounded-md" />
              <Skeleton className="w-full h-24 rounded-md" />
            </div>
          ) : (
            <>
              {collections.length > 0 ? (
                <ul>
                  {collections.map((business, index) => (
                    <li key={index} className="my-2 collection-item">
                      {isTouchDevice ? (
                        <SwipeToRevealActions
                          hideDotsButton
                          actionButtons={[
                            {
                              content: (
                                <div className="flex items-center justify-center">
                                  <Trash color="#c55e0c" />
                                </div>
                              ),
                              onClick: () =>
                                deleteCollection(
                                  business.business.id.toString(),
                                  business.business.business_name,
                                ),
                            },
                            {
                              content: (
                                <div className="flex items-center justify-center">
                                  <Link2 color="#c55e0c" />
                                </div>
                              ),
                              onClick: () =>
                                shareCollection(business.business.id.toString()),
                            },
                          ]}
                          actionButtonMinWidth={70}
                        >
                          <Link
                            href={`/business/${business.business.id}`}
                            className="w-[100%] absolute top-0 right-0 left-0 bottom-0 items-center px-2 py-2 bg-background"
                          >
                            <div className="flex flex-row items-center gap-4 justify-between w-full">
                              {business.business.business_name}
                              {business.business.average_rating < 1 ? (
                                <p className="text-xs">No reviews</p>
                              ) : (
                                <AverageReview
                                  size={14}
                                  value={business.business.average_rating}
                                />
                              )}
                            </div>
                          </Link>
                        </SwipeToRevealActions>
                      ) : (
                        <div className="flex justify-between items-center w-full">
                          <Link
                            href={`/business/${business.business.id}`}
                            className="w-full items-center px-2 py-2 bg-background"
                          >
                            <div className="flex flex-row items-center gap-4 justify-between w-full">
                              {business.business.business_name}
                              {business.business.average_rating < 1 ? (
                                <p className="text-xs">No reviews</p>
                              ) : (
                                <AverageReview
                                  size={14}
                                  value={business.business.average_rating}
                                />
                              )}
                            </div>
                          </Link>
                          <div className="action-buttons py-2 px-2">
                            <Button
                              variant="secondary"
                              onClick={() =>
                                deleteCollection(
                                  business.business.id.toString(),
                                  business.business.business_name,
                                )
                              }
                            >
                              <Trash color="#c55e0c" />
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={() =>
                                shareCollection(business.business.id.toString())
                              }
                            >
                              <Link2 color="#c55e0c" />
                            </Button>
                          </div>
                        </div>
                      )}
                      <Separator />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No collections found.</p>
              )}
            </>
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
