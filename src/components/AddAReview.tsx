/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { StarIcon } from "lucide-react";
import { Rating } from "react-simple-star-rating";
import { Button } from "./ui/button";
import { Card } from "./ui/cards";
import { Textarea } from "./ui/textarea";
import { type SetStateAction, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "./ui-hooks/use-toast";
import { useRouter } from "next/navigation";
interface Props {
  businessInfo: any;
}
const AddAReview = ({ businessInfo }: Props) => {
  const { data: session, status } = useSession();
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleRating = (rating: any) => {
    setRating(rating);
  };

  const handleReviewTextChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setReviewText(e.target.value);
  };

  const handleSubmitReview = async () => {
    const axiosInstance = axios.create({
      baseURL: "http://127.0.0.1:8000/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
    try {
      await axiosInstance.post("reviews/", {
        stars: rating,
        content: reviewText,
        business: businessInfo.id,
      });
      setIsOpen(false);
      toast({
        title: "Review Successfully Added",
        description: `Thank you for reviewing ${businessInfo.name}! We hope you had a wonderful experience with them.`,
      });
      router.refresh();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error Submitting Review",
        description: `${error}`,
      });
    }
  };
  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild>
        <Button className="flex gap-2 items-center" variant={"outline"}>
          <StarIcon /> Add a review
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>
            Review your experience with {businessInfo?.name}
          </CredenzaTitle>
          <CredenzaDescription>
            Make sure you have had some interaction with {businessInfo?.name}{" "}
            before you leave a review.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <Card className="p-4">
            <Rating
              SVGclassName={"inline-block"}
              emptyIcon={<StarIcon size={30} />}
              onClick={handleRating}
              fillIcon={<StarIcon size={30} />}
              fillColor="#c55e0c"
              showTooltip
              tooltipClassName="rating-tooltip"
              initialValue={1}
              tooltipStyle={{
                backgroundColor: "#c55e0c",
                borderRadius: "50px",
                fontSize: "12px",
                padding: "5px 10px",
                marginTop: "-10px", // Added 'px' for valid CSS unit
              }}
              tooltipDefaultText={`Rate ${businessInfo?.name}`}
              tooltipArray={[
                "Eww, No!",
                "Not Quite",
                "Meh, It’s Okay",
                "Pretty Good",
                "Absolutely Stellar!",
              ]}
              fillStyle={{ display: "-webkit-inline-box" }}
              emptyStyle={{ display: "flex" }}
              transition
            />
            <div className="my-6">
              <p className="mb-2 text-sm">
                A few things to consider in your review
              </p>
              <div className="flex flex-row items-center gap-2 text-sm">
                <p
                  className="text-[#c55e0c] text-xs border-[1px] border-[#c55e0c] p-1
                    rounded-full"
                >
                  Response
                </p>
                <p
                  className="text-[#c55e0c] text-xs border-[1px] border-[#c55e0c] p-1
                    rounded-full"
                >
                  Delivery Time
                </p>
                <p
                  className="text-[#c55e0c] text-xs border-[1px] border-[#c55e0c] p-1
                    rounded-full"
                >
                  Attitude
                </p>
              </div>
            </div>
            <Textarea
              className="border-0 h-[300px]"
              autoFocus
              required
              value={reviewText}
              onChange={handleReviewTextChange}
              placeholder="Write your review..."
            />
          </Card>
        </CredenzaBody>
        <CredenzaFooter>
          <Button
            variant={"default"}
            disabled={reviewText.length < 10}
            type="submit"
            onClick={handleSubmitReview}
          >
            Post Review
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default AddAReview;
