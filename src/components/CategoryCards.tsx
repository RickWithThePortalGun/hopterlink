"use client";
import React from "react";
import CategoriesSkeletonLoader from "./CategoriesSkeletonLoader";
import Typography from "./ui/typography";
import { useCategories } from "@/contexts/ReUsableData";
import Link from "next/link";
import Icon from "./Icon";
import { motion } from "framer-motion";

const CategoryCards = () => {
  const { categories, loading } = useCategories();

  // Framer Motion variants for staggering animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between each child animation
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    hover: {
      backgroundColor: "rgba(197, 94, 12, 1)", // Slight transparent shade of #c55e0c
      color: "#FFFFFF", // Text fades to white
      fontSize: 20,
      transition: {
        duration: 0.3, // Smooth transition
      },
    },
  };

  const iconJiggle = {
    rest: { x: 0 }, // Initial state
    hover: {
      x: [0, -5, 5, -5, 5, 0], // Jiggle animation
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      {loading ? (
        <CategoriesSkeletonLoader />
      ) : categories && categories.length ? (
        <motion.div
          className="grid w-full grid-cols-2 md:grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={cardVariants}>
              <Link href={`/categories/${category.id}`}>
                <motion.div
                  className="flex flex-col z-40 p-4 rounded-md bg-background border-[1px]
                  gap-6 items-center h-[150px] justify-center transition-all duration-300"
                  variants={cardVariants}
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                >
                  <motion.div
                    className="flex h-[50%] items-center justify-center"
                    variants={iconJiggle}
                  >
                    <Icon name={category.icon as string} size={26} />
                  </motion.div>
                  <div className="h-[50%] items-center flex justify-center">
                    <Typography
                      variant={"p"}
                      className="leading-1 tracking-tighter max-lg:text-xs"
                    >
                      {category.name}
                    </Typography>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p>No categories found</p>
      )}
    </>
  );
};

export default CategoryCards;
