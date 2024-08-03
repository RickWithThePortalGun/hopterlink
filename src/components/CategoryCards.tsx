"use client";
import React, { useEffect, useState } from "react";
import CategoriesSkeletonLoader from "./CategoriesSkeletonLoader";
import Typography from "./ui/typography";
import { getCategories } from "@/app/api/categories/categories";
import Link from "next/link";
import { useCategories } from "@/contexts/ReUsableData";
import Icon from "./Icon";

const CategoryCards = () => {
  // Set loading to true initially
  const { categories, loading } = useCategories();
  console.log(categories);

  return (
    <>
      {loading ? (
        <CategoriesSkeletonLoader />
      ) : // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
      categories && categories?.length ? (
        <div
          className="grid w-full grid-cols-2 md:grid-cols-2 lg:grid-cols-4
            auto-rows-auto gap-4"
        >
          {categories.map((category) => {
            if (category) {
              return (
                <Link key={category.id} href={`/categories/${category.id}`}>
                  <div
                    key={category.id}
                    className="flex flex-col z-40 p-4 rounded-md bg-background border-[1px]
                      gap-6 items-center h-[150px] justify-center"
                  >
                    <div className="flex h-[50%] items-center justify-center">
                      <Icon name={category.icon as string} size={26} />
                    </div>
                    <div className="h-[50%] items-center flex justify-center">
                      <Typography
                        variant={"p"}
                        className="leading-1 tracking-tighter max-lg:text-xs"
                      >
                        {category.name}
                      </Typography>
                    </div>
                  </div>
                </Link>
              );
            } else {
              return null;
            }
          })}
        </div>
      ) : (
        <p>No categories found</p> // Render a message if categories is empty
      )}
    </>
  );
};

export default CategoryCards;
