"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useCategories } from "@/contexts/ReUsableData";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Subcategory } from "@/constants/constants";
import HeaderContainer from "@/components/HeaderContainer";
import Typography from "@/components/ui/typography";
import axios from "axios";
import { toast } from "@/components/ui-hooks/use-toast";
import { useRouter } from "next/navigation";
import { RotatingLines } from "react-loader-spinner";
import Particles from "@/components/magicui/particles";

const validationSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .describe("Email"),
  business_name: z
    .string()
    .min(1, "Business Name is required")
    .describe("Business Name"),
  description: z
    .string()
    .min(1, "Description is required")
    .describe("Description"),
  location: z.string().min(1, "Location is required").describe("Location"),
  industry: z.number().optional().describe("Industry"),
  industry_subcategory: z.number().optional().describe("Industry Subcategory"),
  website: z
    .string()
    .min(1, "Website is required")
    .url("Invalid URL")
    .describe("Website"),
  business_phone_1: z
    .string()
    .min(1, "Primary Business Phone is required")
    .regex(/^[0-9]{10,15}$/, "Phone number is not valid")
    .describe("Primary Business Phone"),
  business_phone_2: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Phone number is not valid")
    .optional()
    .describe("Secondary Business Phone"),
  min_delivery_time_in_days: z
    .number()
    .min(1, "Min Delivery Time is required")
    .describe("Min Delivery Time"),
  max_delivery_time_in_days: z
    .number()
    .min(1, "Max Delivery Time is required")
    .describe("Max Delivery Time"),
  business_reg_no: z
    .string()
    .optional()
    .describe("Business Registration Number"),
});

const App = () => {
  const router = useRouter();
  const { categories } = useCategories();
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [logo, setLogo] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (selectedIndustry) {
      const industry = categories.find(
        (category) => category.id.toString() === selectedIndustry,
      );
      if (industry && industry.subcategories) {
        setSubcategories(industry.subcategories);
      } else {
        setSubcategories([]);
      }
    } else {
      setSubcategories([]);
    }
  }, [selectedIndustry, categories]);

  const onSubmit = async (values) => {
    if (!logo) {
      toast({
        title: "Logo is required",
        description: "Please upload a logo before submitting the form.",
        variant: "destructive",
      });
      return;
    }

    if (uploadedImages.length === 0) {
      toast({
        title: "Images are required",
        description:
          "Please upload at least one image before submitting the form.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("logo", logo);
    formData.append("business_name", values.business_name);
    formData.append("description", values.description);
    formData.append("location", values.location);
    formData.append("industry", values.industry?.toString() || "");
    formData.append(
      "industry_subcategory",
      values.industry_subcategory?.toString() || "",
    );
    formData.append("website", values.website);
    formData.append("business_phone_1", values.business_phone_1);
    formData.append("business_phone_2", values.business_phone_2 || "");
    formData.append(
      "min_delivery_time_in_days",
      values.min_delivery_time_in_days.toString(),
    );
    formData.append(
      "max_delivery_time_in_days",
      values.max_delivery_time_in_days.toString(),
    );
    formData.append("business_reg_no", values.business_reg_no || "");
    uploadedImages.forEach((image, index) => {
      formData.append(`uploaded_images[${index}]`, image);
    });
    try {
      const response = await fetch("/api/create-a-business/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Business Creation Successful",
          description: "Your business has been successfully created",
        });
        setLoading(false);
        const responseData = await response.json();
        console.log(responseData);
        router.push(`/business/${responseData.id}`);
      } else {
        const status = response.status;
        const errorData = await response.json();
        let errorMessage = `An unexpected error occurred. Status: ${status}.`;

        if (errorData && typeof errorData === "object") {
          // Display errors under the relevant fields
          Object.entries(errorData.details || {}).forEach(
            ([field, messages]) => {
              setError(field, {
                type: "manual",
                message: messages.join(", "),
              });
            },
          );

          // Show a toast with a general error message
          toast({
            title: "Error",
            description: "There were some issues with your submission.",
            variant: "destructive",
          });

          console.error("Form submission failed", errorData);
        } else {
          errorMessage += " " + JSON.stringify(errorData);
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("An error occurred while submitting the form", error);
      toast({
        title: "Submission Error",
        description:
          "An unexpected error occurred. Please check your network and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleImagesChange = (e) => {
    setUploadedImages(Array.from(e.target.files));
  };

  return (
    <HeaderContainer>
      <div className="p-20 max-md:p-6 mt-20 min-w-full relative">
        <div className="pb-10">
          <Typography variant={"h1"} className="my-2 text-center">
            Create a Business Account on Hopterlink
          </Typography>
          <Typography variant={"h4"} className="text-primary text-center">
            Offer services and products to fellow hopterlinkers
          </Typography>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 z-50 text-[16px]"
        >
          <div>
            <Label>Business Email</Label>
            <Input {...register("email")} placeholder="Email" />
            {errors.email && (
              <div className="w-full justify-end flex mt-2 text-xs text-primary">
                {errors.email.message}
              </div>
            )}
          </div>

          <div>
            <Label>Business Name</Label>
            <Input {...register("business_name")} placeholder="Business Name" />
            {errors.business_name && (
              <div className="w-full justify-end flex mt-2 text-xs text-primary">
                {errors.business_name.message}
              </div>
            )}
          </div>

          <div>
            <Label>Description</Label>
            <Textarea {...register("description")} placeholder="Description" />
            {errors.description && (
              <div className="w-full justify-end flex mt-2 text-xs text-primary">
                {errors.description.message}
              </div>
            )}
          </div>

          <div>
            <Label>Location</Label>
            <Input {...register("location")} placeholder="Location" />
            {errors.location && (
              <div className="w-full justify-end flex mt-2 text-xs text-primary">
                {errors.location.message}
              </div>
            )}
          </div>

          <div>
            <Label>Industry</Label>
            <Select
              onValueChange={(value) => {
                setSelectedIndustry(value);
                setValue("industry", parseInt(value));
              }}
            >
              <SelectTrigger className="w-full mt-4">
                <SelectValue
                  placeholder="Select an Industry"
                  className="text-xs"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Industries on Hopterlink</SelectLabel>
                  {categories.map((category) => (
                    <SelectItem key={category.name} value={`${category.id}`}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.industry && (
              <div className="w-full justify-end flex mt-2 text-xs text-primary">
                {errors.industry.message}
              </div>
            )}
          </div>

          <div>
            <Label>Industry Subcategory</Label>
            <Select
              onValueChange={(value) =>
                setValue("industry_subcategory", parseInt(value))
              }
            >
              <SelectTrigger className="w-full mt-4">
                <SelectValue
                  placeholder="Select a subcategory"
                  className="text-xs"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {subcategories.map((subcategory) => (
                    <SelectItem
                      key={subcategory.name}
                      value={`${subcategory.id}`}
                    >
                      {subcategory.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.industry_subcategory && (
              <div className="w-full justify-end flex mt-2 text-xs text-primary">
                {errors.industry_subcategory.message}
              </div>
            )}
          </div>

          <div>
            <Label>Website</Label>
            <Input {...register("website")} placeholder="Website" />
            {errors.website && (
              <div className="w-full justify-end flex mt-2 text-xs text-primary">
                {errors.website.message}
              </div>
            )}
          </div>

          <div>
            <Label>Primary Business Phone</Label>
            <Input
              {...register("business_phone_1")}
              placeholder="Primary Business Phone"
            />
            {errors.business_phone_1 && (
              <div className="w-full justify-end flex mt-2 text-xs text-primary">
                {errors.business_phone_1.message}
              </div>
            )}
          </div>

          <div>
            <Label>Secondary Business Phone</Label>
            <Input
              {...register("business_phone_2")}
              placeholder="Secondary Business Phone"
            />
            {errors.business_phone_2 && (
              <div className="w-full justify-end flex mt-2 text-xs text-primary">
                {errors.business_phone_2.message}
              </div>
            )}
          </div>

          <div>
            <Label>Min Delivery Time (in days)</Label>
            <Input
              type="number"
              {...register("min_delivery_time_in_days", {
                valueAsNumber: true,
              })}
              placeholder="Min Delivery Time"
            />
            {errors.min_delivery_time_in_days && (
              <div className="w-full justify-end flex mt-2 text-xs text-primary">
                {errors.min_delivery_time_in_days.message}
              </div>
            )}
          </div>

          <div>
            <Label>Max Delivery Time (in days)</Label>
            <Input
              type="number"
              {...register("max_delivery_time_in_days", {
                valueAsNumber: true,
              })}
              placeholder="Max Delivery Time"
            />
            {errors.max_delivery_time_in_days && (
              <div className="w-full justify-end flex mt-2 text-xs text-primary">
                {errors.max_delivery_time_in_days.message}
              </div>
            )}
          </div>

          <div>
            <Label>Business Registration Number</Label>
            <Input
              {...register("business_reg_no")}
              placeholder="Business Registration Number"
            />
            {errors.business_reg_no && (
              <div className="w-full justify-end flex mt-2 text-xs text-primary">
                {errors.business_reg_no.message}
              </div>
            )}
          </div>

          <div>
            <Label>Logo</Label>
            <Input type="file" onChange={handleFileChange} />
            {errors.logo && (
              <div className="w-full justify-end flex mt-2 text-xs text-primary">
                {errors.logo.message}
              </div>
            )}
          </div>

          <div>
            <Label>Uploaded Images</Label>
            <Input type="file" multiple onChange={handleImagesChange} />
            {errors.uploaded_images && (
              <div className="w-full justify-end flex mt-2 text-xs text-primary">
                {errors.uploaded_images.message}
              </div>
            )}
          </div>

          <div>
            <Label className="flex items-center gap-4">
              <Checkbox
                {...register("acceptTerms")}
                onChange={(e) =>
                  setValue(
                    "acceptTerms",
                    (e.target as HTMLInputElement).checked,
                  )
                }
              />
              Accept terms and conditions
            </Label>
            {errors.acceptTerms && (
              <div className="w-full justify-end flex mt-2 text-xs text-primary">
                {errors.acceptTerms.message}
              </div>
            )}
          </div>

          <div className="flex justify-center items-center w-full">
            {loading ? (
              <RotatingLines strokeColor="#C55e0c" width="20" />
            ) : (
              <Button type="submit">Create Business Account</Button>
            )}
          </div>
        </form>
      </div>
    </HeaderContainer>
  );
};

export default App;
