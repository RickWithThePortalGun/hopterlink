'use client'
import DetailCard from '@/components/DetailCard'
import HeaderContainer from '@/components/HeaderContainer'
import SearchLoaders from '@/components/SearchLoaders'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import Typography from '@/components/ui/typography'
import { ChevronDown, Info } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

interface Props {
  params: { slug: string }
}

const Page = ({ params }: Props) => {
  const searchParams = useSearchParams()
  const search = searchParams.get('query')

  return (
    <HeaderContainer>
      <div
        className="flex flex-col h-full md:py-10 md:px-32 pt-11 pb-24 px-8
          w-full text-center gap-12"
      >
        <div className="flex flex-col gap-6 items-start mt-12">
          
          <Typography
            className="max-w-2xl text-start"
            variant="h2"
          >
            Search Results for {search}</Typography>
        </div>
        <div className="flex flex-row max-lg:flex-col w-full gap-6 items-start mt-6">
          <div
            className="w-1/4 flex flex-col gap-4 items-end max-lg:w-full
              max-md:items-end mt-6 md:flex-row"
          >
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div
                  className="border-2 border-secondary flex flex-row gap-4 items-center
                    text-xs justify-center w-fit px-4 h-10 rounded-full"
                >
                  <Typography>Recommended</Typography>{' '}
                  <ChevronDown />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  Recommended
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Most Reviewed
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Most Rated
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Alphabetical Order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex-row flex gap-4 items-start mt-6 md:flex-row w-full">
            {loading ? (
              <SearchLoaders />
            ) : (
              <div className="w-full">
                <div className="flex flex-row gap-2 items-center">
                  Sponsored Ads <Info />
                </div>
                {category.map((item) => (
                  <>
                    <div
                      onClick={() => {
                        handleBusinessClick({
                          slug: item.slug
                        })
                      }}
                      className="cursor-pointer"
                    >
                      <DetailCard
                        loading={loading}
                        key={item.name}
                        name={item.name}
                        hours={item.hours}
                        description={item.description}
                      />
                      <Separator />
                    </div>
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </HeaderContainer>
  )
}

export default Page
