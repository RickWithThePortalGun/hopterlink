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
  const { categories } = useCategories();
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [logo, setLogo] = useState(null); // To store the selected logo file
  const [uploadedImages, setUploadedImages] = useState([]); // To store the selected uploaded images

  const {
    register,
    handleSubmit,
    setValue,
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
    formData.append("is_kyc_verified", true); // Assuming these are constants
    formData.append("is_active", true);
    formData.append("is_deleted", true);
    formData.append("toc_accepted", true);
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
        console.log("Form submitted successfully");
      } else {
        console.log(response);
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("An error occurred while submitting the form", error);
    }
    console.log("function ran");
  };

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleImagesChange = (e) => {
    setUploadedImages(Array.from(e.target.files));
  };

  return (
    <HeaderContainer>
      <div className="p-20 max-md:p-6 mt-20 min-w-full">
        <div className="pb-10">
          <Typography variant={"h1"} className="my-2">
            Create a Business Account on Hopterlink
          </Typography>
          <Typography variant={"h4"} className="text-[#eee]">
            Offer services and products to fellow hopterlinkers
          </Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                {" "}
                {errors.industry_subcategory.message}
              </div>
            )}
          </div>

          <div>
            <Label>Website</Label>
            <Input {...register("website")} placeholder="Website" />
            {errors.website && (
              <div className="w-full justify-end flex mt-2 text-xs text-primary">
                {" "}
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
                {" "}
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
                {" "}
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
                {" "}
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
                {" "}
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
                {" "}
                {errors.business_reg_no.message}
              </div>
            )}
          </div>

          <div>
            <Label>Logo</Label>
            <Input type="file" onChange={handleFileChange} />
          </div>

          <div>
            <Label>Uploaded Images</Label>
            <Input type="file" multiple onChange={handleImagesChange} />
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
                {" "}
                {errors.acceptTerms.message}
              </div>
            )}
          </div>

          <div className="flex justify-center items-center w-full">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </HeaderContainer>
  );
};

export default App;