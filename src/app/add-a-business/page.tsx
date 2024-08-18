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
import { useState, useEffect, ChangeEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Subcategory } from "@/constants/constants";
import HeaderContainer from "@/components/HeaderContainer";
import Typography from "@/components/ui/typography";
import axios from "axios";
import { toast } from "@/components/ui-hooks/use-toast";
import { useRouter } from "next/navigation";
import { RotatingLines } from "react-loader-spinner";
import Particles from "@/components/magicui/particles";
import { FileUpload } from "@/components/ui/file-upload";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    .min(1, "[#c55e0c] Business Phone is required")
    .regex(/^[0-9]{10,15}$/, "Phone number is not valid")
    .describe("[#c55e0c] Business Phone"),
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
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
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
        (category) => category.id.toString() === selectedIndustry
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
      values.industry_subcategory?.toString() || ""
    );
    formData.append("website", values.website);
    formData.append("business_phone_1", values.business_phone_1);
    formData.append("business_phone_2", values.business_phone_2 || "");
    formData.append(
      "min_delivery_time_in_days",
      values.min_delivery_time_in_days.toString()
    );
    formData.append(
      "max_delivery_time_in_days",
      values.max_delivery_time_in_days.toString()
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
          Object.entries(errorData.details || {}).forEach(
            ([field, messages]) => {
              const errorMessage = Array.isArray(messages)
                ? messages.join(", ")
                : messages;
              setError(field, {
                type: "manual",
                message: errorMessage,
              });
            }
          );

          toast({
            title: "Error",
            description:
              errorData?.details?.error || "An unexpected error occurred",
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
        description: `${error}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  const getImageData = (event: ChangeEvent<HTMLInputElement>) => {
    const dataTransfer = new DataTransfer();
    Array.from(event.target.files!).forEach((image) =>
      dataTransfer.items.add(image)
    );

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(files[0]);

    return { files, displayUrl };
  };

  const [preview, setPreview] = useState("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files, displayUrl } = getImageData(event);
    setPreview(displayUrl);
    setLogo(event?.target?.files[0]);
  };

  const handleImagesChange = (newFiles) => {
    setUploadedImages((prevUploadedImages) => [
      ...prevUploadedImages,
      ...newFiles,
    ]);
  };
  const [checked, setChecked] = useState(false);
  function handleCheckBoxChange(e) {
    setChecked(e.target.checked);
  }
  useEffect(() => {
    console.log(uploadedImages);
  }, [uploadedImages]);

  return (
    <HeaderContainer>
      <div className="p-20 max-md:p-6 mt-20 min-w-full relative">
        <div className="pb-10">
          <Typography variant={"h1"} className="my-2 text-center">
            Create a Business Account on Hopterlink
          </Typography>
          <Typography variant={"h4"} className="text-[#c55e0c] text-center">
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
              <div className="w-full justify-end flex mt-2 text-xs text-[#c55e0c]">
                {errors.email.message}
              </div>
            )}
          </div>

          <div>
            <Label>Business Name</Label>
            <Input {...register("business_name")} placeholder="Business Name" />
            {errors.business_name && (
              <div className="w-full justify-end flex mt-2 text-xs text-[#c55e0c]">
                {errors.business_name.message}
              </div>
            )}
          </div>

          <div>
            <Label>Description</Label>
            <Textarea {...register("description")} placeholder="Description" />
            {errors.description && (
              <div className="w-full justify-end flex mt-2 text-xs text-[#c55e0c]">
                {errors.description.message}
              </div>
            )}
          </div>

          <div>
            <Label>Location</Label>
            <Input {...register("location")} placeholder="Location" />
            {errors.location && (
              <div className="w-full justify-end flex mt-2 text-xs text-[#c55e0c]">
                {errors.location.message}
              </div>
            )}
          </div>
          <div className="lg:flex lg:items-center lg:flex-row gap-8 lg:w-full flex-grow">
            <div className="lg:w-1/2">
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
                <div className="w-full justify-end flex mt-2 text-xs text-[#c55e0c]">
                  {errors.industry.message}
                </div>
              )}
            </div>

            <div className="max-lg:mt-4 lg:w-1/2">
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
                <div className="w-full justify-end flex mt-2 text-xs text-[#c55e0c]">
                  {errors.industry_subcategory.message}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label>Website</Label>
            <Input {...register("website")} placeholder="Website" />
            {errors.website && (
              <div className="w-full justify-end flex mt-2 text-xs text-[#c55e0c]">
                {errors.website.message}
              </div>
            )}
          </div>
          <div className="lg:flex lg:items-center lg:flex-row gap-8 lg:w-full flex-grow">
            <div className="lg:w-1/2">
              <Label>[#c55e0c] Business Phone</Label>
              <Input
                {...register("business_phone_1")}
                placeholder="[#c55e0c] Business Phone"
              />
              {errors.business_phone_1 && (
                <div className="w-full justify-end flex mt-2 text-xs text-[#c55e0c]">
                  {errors.business_phone_1.message}
                </div>
              )}
            </div>

            <div className="max-lg:mt-4 lg:w-1/2">
              <Label>Secondary Business Phone</Label>
              <Input
                {...register("business_phone_2")}
                placeholder="Secondary Business Phone"
              />
              {errors.business_phone_2 && (
                <div className="w-full justify-end flex mt-2 text-xs text-[#c55e0c]">
                  {errors.business_phone_2.message}
                </div>
              )}
            </div>
          </div>
          <div className="lg:flex lg:items-center lg:flex-row gap-8 lg:w-full flex-grow">
            <div className="lg:w-1/2">
              <Label>Minimum Delivery Time (in days)</Label>
              <Input
                type="number"
                {...register("min_delivery_time_in_days", {
                  valueAsNumber: true,
                })}
                placeholder="Min Delivery Time"
              />
              {errors.min_delivery_time_in_days && (
                <div className="w-full justify-end flex mt-2 text-xs text-[#c55e0c]">
                  {errors.min_delivery_time_in_days.message}
                </div>
              )}
            </div>

            <div className="max-lg:mt-4 lg:w-1/2">
              <Label>Maximum Delivery Time (in days)</Label>
              <Input
                type="number"
                {...register("max_delivery_time_in_days", {
                  valueAsNumber: true,
                })}
                placeholder="Max Delivery Time"
              />
              {errors.max_delivery_time_in_days && (
                <div className="w-full justify-end flex mt-2 text-xs text-[#c55e0c]">
                  {errors.max_delivery_time_in_days.message}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label>Business Registration Number</Label>
            <Input
              {...register("business_reg_no")}
              placeholder="Business Registration Number"
            />
            {errors.business_reg_no && (
              <div className="w-full justify-end flex mt-2 text-xs text-[#c55e0c]">
                {errors.business_reg_no.message}
              </div>
            )}
          </div>

          <div>
            <Label>Logo</Label>
            <Avatar className="w-24 h-24 my-4 justify-center flex">
              <AvatarImage src={preview} onLoad={() => <RotatingLines />} />
              <AvatarFallback>Logo</AvatarFallback>
            </Avatar>
            <Input type="file" onChange={handleFileChange} />
            {errors.logo && (
              <div className="w-full justify-end flex mt-2 text-xs text-[#c55e0c]">
                {errors.logo.message}
              </div>
            )}
          </div>

          <div>
            <Label>Uploaded Images</Label>
            <FileUpload
              filetype="business images"
              onChange={handleImagesChange}
            />
            {errors.uploaded_images && (
              <div className="w-full justify-end flex mt-2 text-xs text-[#c55e0c]">
                {errors.uploaded_images.message}
              </div>
            )}
          </div>

          <div>
            <Label className="flex items-center gap-4">
              <input
                type="checkbox"
                {...register("acceptTerms")}
                className="text-[#c55e0c]"
              />
              Accept terms and conditions
            </Label>
            {errors.acceptTerms && (
              <div className="w-full justify-end flex mt-2 text-xs text-[#c55e0c]">
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
