import Cards from "@/components/Cards";
import HeaderContainer from "@/components/HeaderContainer";
import Typography from "@/components/ui/typography";
import { ChevronRight, Shield, Star, Timer } from "lucide-react";
import Feature from "./feature";

import CategoryCards from "@/components/CategoryCards";
import ImageCarousel from "@/components/ImageCarousel";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import Particles from "@/components/magicui/particles";
import SearchComponent from "@/components/SearchComponent";
import { FlipWords } from "@/components/ui/flip-words";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function Home() {
  const words = ["Find", "Review", "Hire"];

  return (
    <>
      <HeaderContainer>
        <div
          className="flex flex-col h-full md:py-30 md:px-1.5 pt-11 pb-24 px-6
            w-full items-center text-center gap-12"
        >
          <div
            className="flex max-md:flex-col flex-row gap-6 w-full items-center
              h-screen"
          >
            <Particles
              className="absolute inset-0"
              quantity={200}
              staticity={30}
              ease={80}
              refresh
              color="#c55e0c"
            />

            <div
              className="w-1/2 max-md:w-full items-start max-md:items-center flex-col p-2 gap-6 justify-center h-screen
                flex"
            >
              <div
                className={cn(
                  `group rounded-full border border-black/5 bg-neutral-100
                    text-base text-white transition-all ease-in
                    hover:cursor-pointer hover:bg-neutral-200
                    dark:border-white/5 dark:bg-neutral-900
                    dark:hover:bg-neutral-800`,
                )}
              >
                <AnimatedShinyText
                  className="inline-flex items-center justify-center px-4 py-1 transition
                    ease-out hover:text-neutral-600 hover:duration-300
                    hover:dark:text-neutral-400"
                >
                  <span className="max-md:text-sm">✨ Introducing Hopterlink</span>
                  <ChevronRight />
                </AnimatedShinyText>
              </div>
              <div className="max-w-4xl text-6xl max-md:text-3xl font-extrabold tracking-tight text-start max-md:text-center">
                <FlipWords words={words} />
                Local Gems.
              </div>
              <p className="max-w-4xl text-xl max-md:text-sm tracking-normal">
                Every review tells a story, every story shapes a community.
              </p>
              <div className="flex-col flex gap-4 items-center mt-6 md:flex-row w-full">
                <SearchComponent />
              </div>
              <div className="flex flex-row max-md:flex-col gap-4 max-md:text-xs items-center w-full">
                Popular Searches
                <p
                  className="px-2 py-1 bg-transparent border-primary border-[1px]
                    rounded-full text-xs"
                >
                  Website Designer
                </p>
                <p
                  className="px-2 py-1 bg-transparent border-primary border-[1px]
                    rounded-full text-xs"
                >
                  Software Developer
                </p>
                <p
                  className="px-2 py-1 bg-transparent border-primary border-[1px]
                    rounded-full text-xs"
                >
                  Cake
                </p>
              </div>
            </div>
            <div className={"flex items-center justify-center w-full"}>
              <ImageCarousel />
              </div>
          </div>
          <div className="flex flex-col md:pt-24 md:gap-36 gap-24 items-center">
            <div className="flex flex-col gap-12 items-center">
              <Typography className="max-w-2xl" variant="h1">
                Tons of benefits!
              </Typography>
              <div className="flex md:flex-row flex-col gap-12">
                <Feature
                  icon={<Timer size={24} />}
                  headline="Quick Decisions, Less Stress
                "
                  description="Find the best places fast—save time on choosing restaurants and services with trusted reviews.

                "
                />
                <Feature
                  icon={<Star size={24} />}
                  headline="Experience Excellence
                "
                  description="Find top-rated places and services tailored to your preferences.

                "
                />
                <Feature
                  icon={<Shield size={24} />}
                  headline="Trust in Every Click
                "
                  description="Top-notch security ensures your data and privacy are always protected.

                "
                />
              </div>
            </div>
          </div>
          <Separator />

          <div className="flex flex-col gap-6 max-w-full items-center my-12">
            <Typography className="max-w-2xl" variant="h1">
              Recent Activity
            </Typography>
            {/* //Cards */}
            <Cards />
          </div>
          <Separator />
          <div className="flex flex-col max-w-full gap-6 items-center">
            <Typography className="max-w-2xl" variant="h1">
              Categories
            </Typography>
            <CategoryCards />
          </div>
        </div>
      </HeaderContainer>
    </>
  );
}
