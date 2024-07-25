import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";

interface Props {
  businessInfo?: any;
}

const Crumbs = ({ businessInfo }: Props) => {
  console.log(businessInfo);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
        <BreadcrumbLink href={`/categories/${businessInfo?.industry.id}`} className="max-sm:text-xs ">
        {businessInfo?.industry["name"]}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/categories/${businessInfo?.industry.id}`} className="max-sm:text-xs ">
            {businessInfo?.industry_subcategory["name"]}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="max-sm:text-xs">
            {" "}
            {businessInfo?.business_name}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Crumbs;
