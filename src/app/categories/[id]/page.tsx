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
import { useEffect, useState } from "react";
import { useCategories } from "@/contexts/ReUsableData"; 
import { Subcategory } from "@/constants/constants";

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
      const response = await fetch(`/api/subcategory/${subcategoryId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setSubcategoryData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const displayData = selectedSubcategory ? subcategoryData : []
  return (
    <HeaderContainer>
      <div className="flex flex-col h-full md:py-10 md:px-32 pt-11 pb-24 px-8 w-full text-center gap-12">
        <div className="flex flex-col gap-6 items-start mt-12">
          <div className="flex-col flex gap-4 items-center mt-6 md:flex-row w-full">
            <SearchComponent />
          </div>
          <Separator />
          <Typography className="max-w-2xl text-start" variant="h2">
            {category?.name} businesses on Hopterlink
          </Typography>
        </div>
        <div className="flex flex-row max-lg:flex-col w-full gap-6 items-start mt-6">
          <div className="w-1/4 flex flex-col gap-4 items-end max-lg:w-full max-md:items-end mt-6 md:flex-row">
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
          </div>
          <div className="flex-row flex gap-4 items-start mt-6 md:flex-row w-full">
            {categoriesLoading || !category ? (
              <SearchLoaders />
            ) : (
              <div className="w-full">
                <div className="flex flex-row gap-2 items-center">
                  Sponsored Ads <Info />
                </div>
                <div className="flex flex-row gap-2 items-center mt-4">
                  {category.subcategories.map((subcategory:Subcategory) => (
                    <div
                      key={subcategory.id}
                      onClick={() => handleSubcategoryClick(subcategory.category)}
                      className={`cursor-pointer p-2 border-[1px] rounded-full whitespace-nowrap ${selectedSubcategory === subcategory.id ? 'border-[#c55e0c]' : 'border-gray-300'}`}
                    >
                      <p className="text-xs">{subcategory.name}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  {loading ? (
                    <SearchLoaders />
                  ) : error ? (
                    <Typography  className="text-red-500">{error}</Typography>
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
