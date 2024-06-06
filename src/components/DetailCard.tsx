import Image from 'next/image'
import React from 'react'
import Typography from './ui/typography'
import { BadgeInfo } from 'lucide-react'
import AverageReview from './AverageReview'
import { priceRangeMapping } from '@/app/categories/[slug]/page'

interface Props {
  name: string
  loading: boolean
  description: string
  hours: string
  stars:number
  price_range:string
}

const DetailCard = ({
  name,
  loading,
  description,
  hours,
  stars,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  price_range
}: Props) => {
  const priceRange =
    priceRangeMapping[
      price_range as keyof typeof priceRangeMapping
    ]

  return (
    <>
      <div
        className="h-fit w-[80] my-8 rounded-md flex flex-row items-start
          bg-transparent hover:border-secondary border-[1px]
          border-transparent hover:transition hover:ease-in-out
          ease-in-out p-4"
      >
        <div className="m-2">
          <Image
            src={`https://github.com/shadcn.png`}
            alt="image"
            width={150}
            height={150}
          />
        </div>
        <div className="w-2/3 m-2 pl-4 gap-2 flex flex-col">
          <Typography
            variant={'h3'}
            className="font-bold text-start"
          >
            {name}
          </Typography>
          <AverageReview value={stars} />
          <div
            className="rounded-[18px] bg-teal-400/10 border-none mt-[5px] w-fit
              py-2"
          >
            <p className="text-center text-teal-300 text-xs px-2">
              {hours}
            </p>
          </div>
          {description ? (
            <div className="flex flex-row items-start gap-2 mt-6">
              {' '}
              <BadgeInfo size={16} />
              <p
                className="text-start text-xs line-clamp-2 md:line-clamp-3
                  lg:line-clamp-2 w-full"
              >
                {description}
              </p>
            </div>
          ) : (
            ''
          )}
         <Typography variant={"p"} className={`${priceRange.className} text-bold text-center text-xs px-2`}> {priceRange.text}</Typography>
        </div>
      </div>
    </>
  )
}

export default DetailCard
