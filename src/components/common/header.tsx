'use client'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import Typography from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger
} from '@/components/ui/drawer'
import {
  Car,
  MenuIcon,
  PlusCircle,
  SoupIcon,
  X
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Logo from '../Logo'

interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function Header({ className }: SidebarProps) {
  const { theme } = useTheme()
  console.log(theme)
  const items = [
    {
      category: 'Healthcare and Medical',
      services: [
        'Hospitals',
        'Clinics',
        'Dental Services',
        'Pharmacies',
        'Medical Equipment',
        'Health Insurance'
      ]
    },
    {
      category: 'Food and Beverage',
      services: [
        'Restaurants',
        'Cafes and Coffee Shops',
        'Bars and Pubs',
        'Catering Services',
        'Food Trucks',
        'Bakeries'
      ]
    },
    {
      category: 'Automotive',
      services: [
        'Car Dealerships',
        'Auto Repair and Maintenance',
        'Car Rentals',
        'Auto Parts and Accessories',
        'Car Washes'
      ]
    }
  ]
  const getLogo = () => (
    <Link href="/" className="pointer flex items-center">
      <Logo />
    </Link>
  )

  const getAuthButtons = () => (
    <div className="flex gap-3 items-center">
      <Link href="/login" target="_blank">
        <Typography variant="p">Add a business</Typography>
      </Link>
      <Link href="/login" target="_blank">
        <Typography variant="p">Sign in</Typography>
      </Link>
      <Link
        href="https://map.sistilli.dev/public/coding/SaaS+Boilerplate"
        target="_blank"
      >
        <Button size="tiny" variant={'secondary'}>
          Sign Up
        </Button>
      </Link>
    </div>
  )

  const getHeaderItems = () => {
    return (
      <>
        {/* {items.map((item) => {
          const selected =
            pathname === item.href ||
            pathname.includes(item.href)
          return (
            <Link
              href={item.href}
              className="pointer block w-fit"
              target={item.openInNewTab ? '_blank' : ''}
              key={item.title}
            >
              <Typography
                variant="p"
                className={cn(selected && 'text-primary')}
              >
                {item.title}
              </Typography>
            </Link>
          )
        })} */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Health & Medicine{' '}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul
                  className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2
                    lg:w-[600px] "
                >
                  {items[0].services.map(
                    (service, index) => (
                      <>
                        <NavigationMenuLink
                          className={'flex-row flex gap-2'}
                        >
                          <PlusCircle /> {service}
                        </NavigationMenuLink>
                      </>
                    )
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Food & Dining
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul
                  className="grid w-[200px] gap-3 p-4 md:w-[500px] md:grid-cols-2
                    lg:w-[600px] "
                >
                  {items[1].services.map(
                    (service, index) => (
                      <>
                        <NavigationMenuLink
                          className={'flex-row flex gap-2'}
                        >
                          <SoupIcon /> {service}
                        </NavigationMenuLink>
                      </>
                    )
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Automotive
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul
                  className="grid w-[400px] gap-3 p-4 md:w-[400px] md:grid-cols-2
                    lg:w-[600px] "
                >
                  {items[2].services.map(
                    (service, index) => (
                      <>
                        <NavigationMenuLink
                          className={'flex-row flex gap-2'}
                        >
                          <Car /> {service}
                        </NavigationMenuLink>
                      </>
                    )
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                More
              </NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </>
    )
  }

  return (
    <div
      className={cn(
        `flex md:h-12 h-14 items-center justify-center w-full
          border-b fixed z-50 bg-secondary`,
        className
      )}
    >
      <div className="w-full max-w-[1280px] md:px-8 px-4">
        {/* Desktop */}
        <div className="flex items-center gap-x-8 w-full">
          <div className="md:flex-0 min-w-fit flex-1">
            {getLogo()}
          </div>
          <div className="hidden md:flex flex items-center w-full">
            <div className="flex items-center gap-x-8 flex-1">
              {getHeaderItems()}
            </div>
            {getAuthButtons()}
          </div>
          {/* Mobile */}
          <div className="md:hidden flex gap-x-4 items-center">
            {/* {getAuthButtons()} */}
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <MenuIcon />
              </DrawerTrigger>
              <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-64 rounded-none">
                <div className="mx-auto w-full p-5">
                  <DrawerHeader>
                    <DrawerClose asChild>
                      <div className="w-full flex items-end justify-end">
                        <X />
                      </div>
                    </DrawerClose>
                  </DrawerHeader>
                  <div className="p-4 pb-0 space-y-4">
                    {getHeaderItems()}
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  )
}
