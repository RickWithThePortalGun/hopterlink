import { Stars } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from './ui/avatar'
import Typography from './ui/typography'

const Cards = (props: Props) => {
  return (
    <>
      <div
        className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-2
          auto-rows-auto gap-4"
      >
        <div
          className="flex flex-col z-40 p-4 rounded-md bg-background border-[1px]
            gap-6 text-left min-w-[300px] md:items-start items-center"
        >
          <div className="flex flex-row gap-4 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0 leading-tight">
              <Typography variant={'p'} className="text-sm">
                Kaamilah S. wrote a review
              </Typography>
              <Typography variant={'p'} className="text-xs">
                Just now
              </Typography>
            </div>
          </div>
          <div>
            <div className="w-56 h-20 bg-red-300" />
          </div>
          <div className="justify-start flex flex-col gap-4">
            <Typography
              variant={'h5'}
              className="font-bold"
            >
              Imperial Vintage Guitars
            </Typography>
            <div className="flex flex-row gap-2">
              <Stars color="#fafafa" />
              <Stars color="#fafafa" />
              <Stars color="#fafafa" />
              <Stars color="#fafafa" />
            </div>
            <Typography variant={'p'} className="text-md">
              Great selection and knowledgable staff.
              Definitely coming here for all my...
            </Typography>
          </div>
        </div>
        <div
          className="flex flex-col z-40 p-4 rounded-md bg-background border-[1px]
            gap-6 text-left max-w-72 md:items-start items-center"
        >
          <div className="flex flex-row gap-4 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0 leading-tight">
              <Typography variant={'p'} className="text-sm">
                Kaamilah S. wrote a review
              </Typography>
              <Typography variant={'p'} className="text-xs">
                Just now
              </Typography>
            </div>
          </div>
          <div>
            <div className="w-56 h-20 bg-red-300" />
          </div>
          <div className="justify-start flex flex-col gap-4">
            <Typography
              variant={'h5'}
              className="font-bold"
            >
              Imperial Vintage Guitars
            </Typography>
            <div className="flex flex-row gap-2">
              <Stars color="#fafafa" />
              <Stars color="#fafafa" />
              <Stars color="#fafafa" />
              <Stars color="#fafafa" />
            </div>
            <Typography variant={'p'} className="text-md">
              Great selection and knowledgable staff.
              Definitely coming here for all my...
            </Typography>
          </div>
        </div>
        <div
          className="flex flex-col z-40 p-4 rounded-md bg-background border-[1px]
            gap-6 text-left w-full md:items-start items-center"
        >
          <div className="flex flex-row gap-4 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0 leading-tight">
              <Typography variant={'p'} className="text-sm">
                Kaamilah S. wrote a review
              </Typography>
              <Typography variant={'p'} className="text-xs">
                Just now
              </Typography>
            </div>
          </div>
          <div>
            <div className="w-56 h-20 bg-red-300" />
          </div>
          <div className="justify-start flex flex-col gap-4">
            <Typography
              variant={'h5'}
              className="font-bold"
            >
              Imperial Vintage Guitars
            </Typography>
            <div className="flex flex-row gap-2">
              <Stars color="#fafafa" />
              <Stars color="#fafafa" />
              <Stars color="#fafafa" />
              <Stars color="#fafafa" />
            </div>
            <Typography variant={'p'} className="text-md">
              Great selection and knowledgable staff.
              Definitely coming here for all my...
            </Typography>
          </div>
        </div>{' '}
        <div
          className="flex flex-col z-40 p-4 rounded-md bg-background border-[1px]
            gap-6 text-left w-full md:items-start items-center"
        >
          <div className="flex flex-row gap-4 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0 leading-tight">
              <Typography variant={'p'} className="text-sm">
                Kaamilah S. wrote a review
              </Typography>
              <Typography variant={'p'} className="text-xs">
                Just now
              </Typography>
            </div>
          </div>
          <div>
            <div className="w-56 h-20 bg-red-300" />
          </div>
          <div className="justify-start flex flex-col gap-4">
            <Typography
              variant={'h5'}
              className="font-bold"
            >
              Imperial Vintage Guitars
            </Typography>
            <div className="flex flex-row gap-2">
              <Stars color="#fafafa" />
              <Stars color="#fafafa" />
              <Stars color="#fafafa" />
              <Stars color="#fafafa" />
            </div>
            <Typography variant={'p'} className="text-md">
              Great selection and knowledgable staff.
              Definitely coming here for all my...
            </Typography>
          </div>
        </div>{' '}
        <div
          className="flex flex-col z-40 p-4 rounded-md bg-background border-[1px]
            gap-6 text-left w-full md:items-start items-center"
        >
          <div className="flex flex-row gap-4 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0 leading-tight">
              <Typography variant={'p'} className="text-sm">
                Kaamilah S. wrote a review
              </Typography>
              <Typography variant={'p'} className="text-xs">
                Just now
              </Typography>
            </div>
          </div>
          <div>
            <div className="w-56 h-20 bg-red-300" />
          </div>
          <div className="justify-start flex flex-col gap-4">
            <Typography
              variant={'h5'}
              className="font-bold"
            >
              Imperial Vintage Guitars
            </Typography>
            <div className="flex flex-row gap-2">
              <Stars color="#fafafa" />
              <Stars color="#fafafa" />
              <Stars color="#fafafa" />
              <Stars color="#fafafa" />
            </div>
            <Typography variant={'p'} className="text-md">
              Great selection and knowledgable staff.
              Definitely coming here for all my...
            </Typography>
          </div>
        </div>
        {/* Add more card items here as needed */}
      </div>
    </>
  )
}

export default Cards
