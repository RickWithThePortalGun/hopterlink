"use client";
import { getCategory } from "@/app/api/categories/categories";
import DetailCard from "@/components/DetailCard";
import HeaderContainer from "@/components/HeaderContainer";
import SearchComponent from "@/components/SearchComponent";
import SearchLoaders from "@/components/SearchLoaders";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { ChevronDown, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  params: { slug: string };
}

const Page = ({ params }: Props) => {
  const [category, setCategory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCategory = async (slug: string) => {
    try {
      const category = await getCategory(slug);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setCategory(category ?? []);
      console.log(category);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  const handleBusinessClick = (item: { slug: string }) => {
    router.push(`/business/${item.slug}`);
  };

  const slugify = (value: string) => {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  useEffect(() => {
    const decodedSlug = decodeURIComponent(params.slug);
    const slug = slugify(decodedSlug);
    const fetchData = async () => {
      try {
        console.log(slug);
        await fetchCategory(slug);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    void fetchData();
  }, [params.slug]);

  return (
    <HeaderContainer>
      <div
        className="flex flex-col h-full md:py-10 md:px-32 pt-11 pb-24 px-8
          w-full text-center gap-12"
      >
        <div className="flex flex-col gap-6 items-start mt-12">
          <div className="flex-col flex gap-4 items-center mt-6 md:flex-row w-full">
            <SearchComponent />
          </div>
          <Separator />
          <Typography className="max-w-2xl text-start" variant="h2">
            Top 10 best {decodeURIComponent(params.slug).replace(/-/g, " ")}{" "}
            businesses in the city.
          </Typography>
        </div>
        <div className="flex flex-row max-lg:flex-col w-full gap-6 items-start mt-6">
          <div
            className="w-1/4 flex flex-col gap-4 items-end max-lg:w-full
              max-md:items-end mt-6 md:flex-row"
          >
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div
                  className="border-2 border-secondary flex flex-row gap-4 items-center
                    text-xs justify-center w-fit px-4 h-10 rounded-full"
                >
                  <Typography>Recommended</Typography> <ChevronDown />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Recommended</DropdownMenuItem>
                <DropdownMenuItem>Most Reviewed</DropdownMenuItem>
                <DropdownMenuItem>Most Rated</DropdownMenuItem>
                <DropdownMenuItem>Alphabetical Order</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex-row flex gap-4 items-start mt-6 md:flex-row w-full">
            {loading ? (
              <SearchLoaders />
            ) : (
              <div className="w-full">
                <div className="flex flex-row gap-2 items-center">
                  Sponsored Ads <Info />
                </div>
                {category.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => {
                      handleBusinessClick({
                        slug: item.slug,
                      });
                    }}
                    className="cursor-pointer"
                  >
                    <DetailCard
                      loading={loading}
                      review_count={item.review_count}
                      price_range={item.price_range}
                      tags={item.tags}
                      stars={item.average_rating}
                      name={item.name}
                      hours={item.hours}
                      description={item.description}
                    />
                    <Separator />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Page;

export const priceRangeMapping = {
  $: {
    text: "Very Affordable",
    className: "text-green-500 text-xs",
  },
  $$: {
    text: "Affordable",
    className: "text-blue-500 text-xs",
  },
  $$$: {
    text: "Fair Price",
    className: "text-yellow-500 text-xs",
  },
  $$$$: {
    text: "Expensive",
    className: "text-orange-500 text-xs",
  },
  $$$$$: {
    text: "Very Expensive",
    className: "text-red-500 text-xs",
  },
};
