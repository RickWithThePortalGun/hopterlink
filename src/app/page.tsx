import GridPattern from '@/components/magicui/animated-grid-patter'
import ShinyButton from '@/components/magicui/shiny-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Typography from '@/components/ui/typography'
import { Shield, Star, Timer } from 'lucide-react'
import Link from 'next/link'
import Feature from './feature'
import HeaderContainer from '@/components/HeaderContainer'

export default function Home() {
  return (
    <>
      <HeaderContainer>
          <div
            className="flex flex-col h-full md:py-36 md:px-32 pt-11 pb-24 px-8
              w-full items-center text-center gap-12"
          >
            <GridPattern
              maxOpacity={0.4}
              strokeDasharray={4}
              numSquares={8}
              duration={0.5}
            />
            <div className="flex flex-col gap-6 items-center mt-12">
              <Typography
                className="max-w-4xl "
                variant="h1"
              >
                Find, Review, and Connect with Local Gems.
              </Typography>
              <Typography
                className="max-w-2xl"
                variant="h5"
              >
                Every review tells a story, every story
                shapes a community.
              </Typography>
              <div className="flex-col flex gap-4 items-center mt-6 md:flex-row w-full">
                <Input
                  className="w-full focus:ring-transparent"
                  type="search"
                  placeholder="things to do, nail salons, restaurants, spas.."
                />
                <Link
                  href="https://map.sistilli.dev/public/coding/SaaS+Boilerplate"
                  target="_blank"
                >
                  <ShinyButton text="Search" />
                </Link>
              </div>
              {/* <Image
            width={1024}
            height={632}
            alt="Pandem.dev hero image"
            src="/hero1.png"
          /> */}
            </div>
            <div className="flex flex-col md:pt-24 md:gap-36 gap-24 items-center">
              <div className="flex flex-col gap-12 items-center">
                <Typography
                  className="max-w-2xl"
                  variant="h1"
                >
                  A whole ton of benefits!
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
              <div className="flex flex-col gap-6 max-w-2xl items-center">
                <Typography
                  className="max-w-2xl"
                  variant="h1"
                >
                  Recent Activity
                </Typography>
                {/* //Cards */}
              </div>
              <div className="flex flex-col gap-6 items-center">
                <Typography
                  className="max-w-2xl"
                  variant="h1"
                >
                  Get in touch
                </Typography>
                <div>Book a demo, or hop on a call</div>
                <Link
                  href="https://map.sistilli.dev/public/coding/SaaS+Boilerplate"
                  target="_blank"
                >
                  <Button size="tiny" variant="ghost">
                    {`Book now`}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          </HeaderContainer>
    </>
  )
}
