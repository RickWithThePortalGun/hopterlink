"use client";
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
import { Key, useEffect, useState } from "react";
import { useCategories } from "@/contexts/ReUsableData";
import { Subcategory } from "@/constants/constants";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import axios from "axios";

interface Props {
  params: { id: string }; // Use id instead of slug
}

const Page = ({ params }: Props) => {
  const { categories, loading: categoriesLoading } = useCategories();
  const [category, setCategory] = useState<any>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<any>(null);
  const [subcategoryData, setSubcategoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategory = () => {
      const id = parseInt(params.id, 10);
      const categoryData = categories.find((cat) => cat.id === id);
      setCategory(categoryData ?? null);
      if (categoryData && categoryData.subcategories.length > 0) {
        setSelectedSubcategory(categoryData.subcategories[0].id);
      }
    };
    if (!categoriesLoading) {
      fetchCategory();
    }
  }, [params.id, categories, categoriesLoading]);

  const handleBusinessClick = (item: { slug: string }) => {
    router.push(`/business/${item.slug}`);
  };

  const handleSubcategoryClick = async (subcategoryId: number) => {
    setSelectedSubcategory(subcategoryId);
    setLoading(true);
    setError(null);
    try {
      console.log(params.id);
      const response = await axios.get(
        `/api/categories/${params.id}/subcategories/${subcategoryId}`,
      );
      if (!response) {
        throw new Error("Failed to fetch data");
      }
      setSubcategoryData(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const displayData = selectedSubcategory ? subcategoryData : [];
  return (
    <HeaderContainer>
      <div className="flex flex-col h-full md:py-10 md:px-16 pt-11 pb-24 px-8 w-full text-center gap-12">
        <div className="flex flex-col gap-6 items-start mt-12">
          <div className="flex-col flex gap-4 items-center mt-6 md:flex-row w-full">
            <SearchComponent />
          </div>
          <Separator />
          {category ? (
            <Typography
              className="w-full text-start animate-fade animate-duration-1000"
              variant="h2"
            >
              {category?.name} businesses on Hopterlink
            </Typography>
          ) : (
            <Skeleton className="h-20 w-full my-6 rounded-md bg-secondary items-start p-4" />
          )}
        </div>
        <div className="flex flex-row max-lg:flex-col w-full gap-6 items-start mt-6">
          <div className="w-1/4 flex flex-col gap-4 items-end max-lg:w-full max-md:items-end mt-6 md:flex-row">
            {category ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="border-2 border-secondary flex flex-row gap-4 items-center text-xs justify-center w-fit px-4 h-10 rounded-full">
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
            ) : (
              <Skeleton className="h-10 w-[50%] my-6 rounded-md bg-secondary items-start p-4" />
            )}
          </div>
          <div className="flex-row flex gap-4 items-start mt-6 md:flex-row w-full">
            {categoriesLoading || !category ? (
              <SearchLoaders />
            ) : (
              <div className="w-full">
                <div className="flex flex-row gap-2 items-center">
                  Sponsored Ads <Info size={14} />
                </div>
                <ScrollArea className="w-full whitespace-nowrap rounded-md border-none flex items-center scroll-smooth">
                  <div className="flex flex-row gap-2 items-center mt-4 mb-4">
                    {category.subcategories.map(
                      (subcategory: Subcategory, index: number) => (
                        <motion.div
                          key={subcategory.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.5 }}
                          onClick={() =>
                            handleSubcategoryClick(subcategory.category)
                          }
                          className={`cursor-pointer p-2 border-[1px] rounded-full whitespace-nowrap ${
                            selectedSubcategory === subcategory.id
                              ? "border-[#c55e0c]"
                              : "border-gray-300"
                          }`}
                        >
                          <p className="text-xs">{subcategory.name}</p>
                        </motion.div>
                      ),
                    )}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <div className="mt-6">
                  {loading ? (
                    <SearchLoaders />
                  ) : error ? (
                    <Typography className="text-red-500">{error}</Typography>
                  ) : (
                    displayData?.map((item: any) => (
                      <div
                        key={item.id}
                        onClick={() => handleBusinessClick({ slug: item.name })}
                        className="cursor-pointer"
                      >
                        <DetailCard
                          loading={categoriesLoading}
                          review_count={item.id} // Adjust based on your actual data
                          price_range={"$$"} // Adjust based on your actual data
                          tags={["tag1", "tag2"]} // Adjust based on your actual data
                          stars={4.5} // Adjust based on your actual data
                          name={item.name}
                          hours={"9am - 5pm"} // Adjust based on your actual data
                          description={item.display_name}
                        />
                        <Separator />
                      </div>
                    ))
                  )}
                </div>
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