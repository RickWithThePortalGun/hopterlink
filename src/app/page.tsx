import Cards from "@/components/Cards";
import HeaderContainer from "@/components/HeaderContainer";
import Typography from "@/components/ui/typography";
import {
  ChevronRight,
  Share,
  Share2Icon,
  Shield,
  Star,
  Timer,
  Waves,
} from "lucide-react";
import Feature from "./feature";

import CategoryCards from "@/components/CategoryCards";
import ImageCarousel from "@/components/ImageCarousel";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import Particles from "@/components/magicui/particles";
import SearchComponent from "@/components/SearchComponent";
import { FlipWords } from "@/components/ui/flip-words";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import GoogleTranslate from "@/GoogleTranslate";
import Gallery from "@/components/Gallery";
import { ShootingStars} from "@/components/magicui/shooting-stars";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { StarsBackground } from "@/components/magicui/stars-background";

export default function Home() {
  const projects = [
    {
      title: "Multi Spectrum",
      description:
        "We offers everything from essentials to specialized services, supporting both consumers and providers on a single platform.",
      icon:<Share2Icon/>
    },
    {
      title: "Effortless",
      description:
        "Our intuitive interface allows users to easily navigate, find services, and interact with providers.",
      icon:<Waves/>
    },
    {
      title: "Security",
      description:
        "Our platform uses advanced encryption and secure payment gateways to protect your data and transactions.",
      icon:<Shield/>
    }
  ];
  const words = ["Find", "Review", "Hire"];
  const images = [
    {
      image: "/Electrician Photos Emmages.jpg",
    },
    {
      image: "/side-view-man-working-as-plumber.jpg",
    },
    {
      image: "/IMG_0933.JPG",
    },
    {
      image: "/Mechanic Photos Olly.jpg",
    },
    {
      image: "/Electrician Photos Cristian Rojas.jpg",
    },
  ];

  return (
    <>
      <HeaderContainer>
        <div
          className="flex flex-col h-full md:py-30 md:px-1.5 pt-11 pb-24 px-6
            w-full items-center text-center gap-12"
        >
          <div
            className="flex max-lg:flex-col flex-row gap-4 w-full items-center
              h-fit mt-12"
          >
            <div
              className="w-full max-md:w-full items-start max-lg:items-center flex-col p-2 gap-6 justify-center h-fit
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
                  <span className="max-md:text-sm">
                    ✨ Introducing Hopterlink
                  </span>
                  <ChevronRight />
                </AnimatedShinyText>
              </div>
              <div className="max-w-4xl text-6xl max-md:text-3xl text-primary font-extrabold tracking-tight text-start max-md:text-center">
                <FlipWords words={words} />
                Service Providers
              </div>
              <p className="max-w-4xl text-xl max-md:text-sm text-start max-md:text-center tracking-normal text-neutral-400">
                Connecting You to Quality Services, One Click at a Time{" "}
              </p>
              <div className="flex gap-4 items-center max-lg:justify-center mt-6 w-full">
                <SearchComponent />
              </div>
            </div>
            <div className="flex items-center justify-center w-full max-w-[500px]">
              <Gallery noNavigation images={images} autoplayDelay={5000} />
            </div>
          </div>
          <div className="flex flex-col md:pt-24 md:gap-36 gap-24 mt-12 items-center">
            <div className="flex flex-col gap-12 items-center">
              <Typography className="max-w-2xl text-primary" variant="h1">
                Our Vision
              </Typography>
              <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 max-w-full items-center justify-center my-12">
            <Typography className="max-w-2xl text-primary" variant="h1">
              Recent Activity
            </Typography>
            {/* //Cards */}
            <Cards />
          </div>
          <Separator />
          <div className="flex flex-col max-w-full gap-6 items-center">
            <Typography className="max-w-2xl text-primary" variant="h1">
              Categories
            </Typography>
            <CategoryCards />
          </div>
        </div>
              <ShootingStars />
              <StarsBackground />
      </HeaderContainer>
    </>
  );
}
