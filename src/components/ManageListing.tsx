"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "./ui/credenza";
import ShinyButton from "./magicui/shiny-button";
import { Switch } from "@/components/ui/switch";
import ListItem from "./ListItem";
import Link from "next/link";

const ManageListing = () => {

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <div className="flex items-center gap-4">
          <ShinyButton text="Manage your business" />
        </div>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Manage your listing</CredenzaTitle>
          <CredenzaDescription>
            Make changes to your business.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
         <>
         <div className="flex items-center justify-between">
        Availability Status               <Switch />

         </div>
         <div className="flex items-center justify-between my-2">
        Let users see your contact information               <Switch />

         </div>
         <div>
          <Link href={"/manage-your-business"}>
          <ListItem title="Edit your business profile"/>
          </Link>
         </div>

         </>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
};

export default ManageListing;
