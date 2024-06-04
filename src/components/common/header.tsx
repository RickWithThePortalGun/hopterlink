'use client'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger
} from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
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
import {
  Car,
  MenuIcon,
  MoonIcon,
  PlusCircle,
  SoupIcon,
  SunIcon,
  X
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Logo from '../Logo'

interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function Header({ className }: SidebarProps) {
  const { theme, setTheme } = useTheme()
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm">
            <SunIcon
              className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all
                dark:-rotate-90 dark:scale-0"
            />
            <MoonIcon
              className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0
                transition-all dark:rotate-0 dark:scale-100"
            />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setTheme('light')
            }}
          >
            Light
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setTheme('dark')
            }}
          >
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setTheme('system')
            }}
          >
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Link href="/login" target="_blank">
        <Typography variant="p">Add a business</Typography>
      </Link>
      <Link href="/login" target="_blank">
        <Typography variant="p">Sign in</Typography>
      </Link>
      <Link href="/signup" target="_blank">
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
        <div className="flex max-lg:hidden">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Health & Medicine{' '}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2
                      lg:w-[600px]"
                  >
                    {items[0].services.map(
                      (service, index) => (
                        <>
                          <NavigationMenuLink
                            key={index}
                            className={
                              'flex-row flex gap-2'
                            }
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
                      lg:w-[600px]"
                  >
                    {items[1].services.map(
                      (service, index) => (
                        <>
                          <NavigationMenuLink
                            key={index}
                            className={
                              'flex-row flex gap-2'
                            }
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
                      lg:w-[600px]"
                  >
                    {items[2].services.map(
                      (service, index) => (
                        <>
                          <NavigationMenuLink
                            key={index}
                            className={
                              'flex-row flex gap-2'
                            }
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
        </div>
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
      <div className="w-full max-w-[1440px] md:px-8 px-4">
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
