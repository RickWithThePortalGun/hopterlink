'use client'
import { getBusinessInfo } from '@/app/api/categories/categories'
import HeaderContainer from '@/components/HeaderContainer'

import AverageReview from '@/components/AverageReview'
import BusinessAdInfo from '@/components/BusinessAdInfo'
import BusinessCTA from '@/components/BusinessCTA'
import Crumbs from '@/components/Crumbs'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Typography from '@/components/ui/typography'
import {
  DollarSign,
  Link2,
  MapPin,
  MessageCircle,
  Share,
  StarIcon
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const Business = () => {
  const params = useParams<{ slug: string }>()
  const [businessInfo, setBusinessInfo] = useState<any>({})
  const fetchBusinessProfile = async (slug: string) => {
    const business = await getBusinessInfo(slug)
    setBusinessInfo(business)
  }
  useEffect(() => {
    const slug = params.slug
    const fetchData = async () => {
      try {
        await fetchBusinessProfile(slug)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    void fetchData()
  }, [])
  
  const [activeSection, setActiveSection] =
    useState('overview')
  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <div>{businessInfo?.description}</div>
      case 'menu':
        return <div>{businessInfo?.services}</div>
      case 'gallery':
        return <div>Gallery Content</div>
      case 'reviews':
        return <div></div>
      default:
        return null
    }
  }

  const getTabClass = (section: string) => {
    return section === activeSection
      ? 'bg-secondary rounded-full px-4 py-2 cursor-pointer'
      : 'px-4 py-2 cursor-pointer'
  }

  console.log(businessInfo)

  return (
    <HeaderContainer>
      <div
        className="flex flex-col h-full md:py-30 md:px-28 pt-11 pb-24 px-6
          w-full gap-12"
      >
        <div className="mt-10">
       <Crumbs businessInfo={businessInfo} />
        </div>
        <div
          className="mt-12 w-full flex-row max-md:flex-col flex justify-between
            items-center"
        >
          <Typography
            className="text-primary"
            variant={'h1'}
          >
            {businessInfo?.name}
          </Typography>
          <div>
            <div className="flex flex-col items-center gap-2">
              {businessInfo?.average_rating ? (
                <>
                  <div className="flex flex-col h-auto">
                    <AverageReview
                      value={businessInfo?.average_rating}
                    />
                  </div>
                  <Typography variant={'p'}>
                    {businessInfo?.reviews.length}{' '}
                     Reviews
                  </Typography>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-row justify-between'>
        <div className="gap-2 flex flex-col">
          <div className="flex flex-row gap-2 items-center">
            <MapPin />
            <Typography className="max-md:text-center">
              {businessInfo?.street_address}{' '}
              {businessInfo?.city}, {businessInfo?.state}
            </Typography>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Link2 />
            <Typography className="max-md:text-center">
              {businessInfo.website ? (
                <Link href={businessInfo?.website}>
                  {businessInfo?.website}{' '}
                </Link>
              ) : (
                ''
              )}
            </Typography>
          </div>
          <div>
            <Typography className="max-md:text-center">
              Opens {businessInfo?.hours}
            </Typography>
          </div>
        </div>
        <div className='flex flex-row gap-2 items-center'>
              <DollarSign/>
              {businessInfo?.price_range}
        </div>
        </div>
  

        <div
          className="flex flex-row items-center max-md:w-full gap-2 mt-2
            max-sm:flex-col"
        >
          <Button
            className="flex gap-2 items-center"
            variant={'outline'}
          >
            <StarIcon /> Add a review
          </Button>
          <Button
            className="flex gap-2 items-center"
            variant={'secondary'}
          >
            <MessageCircle /> Message
          </Button>
          <Button
            className="flex gap-2 items-center"
            variant={'secondary'}
          >
            <Share /> Share
          </Button>
        </div>
        <div className="flex-col flex gap-4">
          <div
            className="flex flex-row items-center gap-2 mt-6 w-[80%]
              justify-between"
          >
            <div
              className={getTabClass('overview')}
              onClick={() => {
                setActiveSection('overview')
              }}
            >
              Overview
            </div>
            <div
              className={getTabClass('menu')}
              onClick={() => {
                setActiveSection('menu')
              }}
            >
              Services
            </div>
            <div
              className={getTabClass('gallery')}
              onClick={() => {
                setActiveSection('gallery')
              }}
            >
              Gallery
            </div>
            <div
              className={getTabClass('reviews')}
              onClick={() => {
                setActiveSection('reviews')
              }}
            >
              Reviews
            </div>
          </div>
          <Separator />
          <div className="flex flex-row max-lg:flex-col items-start gap-4">
            <div className="w-2/3">{renderContent()}</div>
            <div className="flex flex-col gap-2">
              {businessInfo.name ? (
                <>
                  {' '}
                  <BusinessCTA
                    businessInfo={businessInfo}
                  />
                  <BusinessAdInfo
                    businessInfo={businessInfo}
                  />
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </HeaderContainer>
  )
}

export default Business
