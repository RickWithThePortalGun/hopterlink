import React from "react";
import { Card, CardContent, CardFooter } from "./ui/cards";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link2, Map, Phone } from "lucide-react";
import Link from "next/link";
import Typography from "./ui/typography";

interface Props {
  businessInfo: any;
}

const BusinessAdInfo = ({ businessInfo }: Props) => {
  return (
    <Card>
      <CardContent className="gap-4 flex flex-col pt-4">
        <div className="flex flex-row justify-between items-center">
          {businessInfo?.website ? (
            <Link href={businessInfo?.website} className="font-bold ">
              {businessInfo?.website}{" "}
            </Link>
          ) : (
            ""
          )}
          <Link2 />
        </div>
        <Separator />
        <div className="flex flex-row justify-between items-center">
          {businessInfo?.phone ? (
            <Link href={"tel:" + businessInfo?.phone}>
              {businessInfo?.phone}{" "}
            </Link>
          ) : (
            ""
          )}
          <Phone />
        </div>
        <Separator />
        <div className="gap-4 flex flex-col">
          <Typography className="" variant={"h5"}>
            Get Directions
          </Typography>
          <div className="flex flex-row items-center justify-between gap-2">
            <Typography className="" variant={"h5"}>
              {businessInfo?.street_address}{" "}
            </Typography>
            <Map />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Separator />{" "}
      </CardFooter>
    </Card>
  );
};

export default BusinessAdInfo;
