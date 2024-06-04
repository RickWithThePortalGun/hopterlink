'use client'
import Cards from '@/components/Cards'
import HeaderContainer from '@/components/HeaderContainer'
import GridPattern from '@/components/magicui/animated-grid-patter'
import ShinyButton from '@/components/magicui/shiny-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Typography from '@/components/ui/typography'
import { Shield, Star, Timer } from 'lucide-react'
import Link from 'next/link'
import { getCategories } from './api/categories/categories'
import Feature from './feature'

import CategoriesSkeletonLoader from '@/components/CategoriesSkeletonLoader'
import { useEffect, useState } from 'react'

export default function Home() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true) // Set loading to true initially

  const fetchCategories = async () => {
    try {
      const result: any[] = await getCategories()
      setCategories(result)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCategories()
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    void fetchData()
  }, [])
  return (
    <>
      <HeaderContainer>
        <div
          className="flex flex-col h-full md:py-30 md:px-28 pt-11 pb-24 px-6
            w-full items-center text-center gap-12"
        >
          <GridPattern
            maxOpacity={0.4}
            strokeDasharray={4}
            numSquares={8}
            duration={0.5}
          />
          <div className="flex flex-col gap-6 items-center mt-12">
            <Typography className="max-w-4xl " variant="h1">
              Find, Review, and Connect with Local Gems.
            </Typography>
            <Typography className="max-w-2xl" variant="h5">
              Every review tells a story, every story shapes
              a community.
            </Typography>
            <div className="flex-col flex gap-4 items-center mt-6 md:flex-row w-full">
              <Input
                className="w-full focus:ring-transparent"
                type="search"
                placeholder="things to do, nail salons, restaurants, spas.."
              />
              <Link href="/categories" target="_blank">
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
          <div className="flex flex-col gap-6 max-w-full items-center">
            <Typography className="max-w-2xl" variant="h1">
              Recent Activity
            </Typography>
            {/* //Cards */}
            <Cards />
          </div>
          <div className="flex flex-col max-w-full gap-6 items-center">
            <Typography className="max-w-2xl" variant="h1">
              Categories
            </Typography>
            {loading ? (
              <CategoriesSkeletonLoader />
            ) : categories.length > 0 ? (
              <div
                className="grid w-full grid-cols-2 max-md:grid-cols-2 lg:grid-cols-4
                  auto-rows-auto gap-4"
              >
                {categories.map((category) => {
                  if (category) {
                    return (
                      <Link
                        key={category.id}
                        href={`/categories/${encodeURIComponent(category?.name as string)}`}
                      >
                        <div
                          key={category.id}
                          className="flex flex-col z-40 p-4 rounded-md bg-background border-[1px]
                            gap-6 w-[200px] h-[200px] items-center justify-center"
                        >
                          <Typography variant={'h5'}>
                            {category.name}
                          </Typography>
                          <p
                            className="text-xs"
                          >
                            {category.description}
                          </p>
                        </div>
                      </Link>
                    )
                  } else {
                    return null
                  }
                })}
              </div>
            ) : (
              <p>No categories found</p> // Render a message if categories is empty
            )}
            <Typography className="max-w-2xl" variant="h1">
              Get in touch
            </Typography>
            <div>Book a demo, or hop on a call</div>
            <Link
              href="/"
              target="_blank"
            >
              <Button size="tiny" variant="ghost">
                {`Add a Business`}
              </Button>
            </Link>
          </div>
        </div>
      </HeaderContainer>
    </>
  )
}
