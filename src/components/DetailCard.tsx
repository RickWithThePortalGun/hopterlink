import Image from 'next/image'
import React from 'react'
import Typography from './ui/typography'
import { BadgeInfo } from 'lucide-react'

interface Props {
  name: string
  loading: boolean
  description: string
  hours: string
}

const DetailCard = ({
  name,
  loading,
  description,
  hours
}: Props) => {
  return (
    <>
      <div
        className="h-fit w-[80] my-8 rounded-md flex flex-row items-start
          bg-transparent hover:border-secondary border-[1px]
          border-transparent hover:transition hover:ease-in-out
          hover:shadow-secondary ease-in-out hover:shadow-md p-4"
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
          <div
            className="rounded-[18px] bg-teal-400/10 border-none mt-[5px] w-fit
              py-2"
          >
            <p className="text-center text-teal-300 text-xs px-2">
              {hours}
            </p>
          </div>
          {description ? (
            <div className="flex flex-row items-center gap-2">
              {' '}
              <BadgeInfo size={16} />
              <p
                className="text-start line-clamp-2 md:line-clamp-3 lg:line-clamp-2
                  w-full"
              >
                {description}
              </p>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  )
}

export default DetailCard
