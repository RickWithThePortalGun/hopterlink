"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import {
  BellDot,
  Car,
  LogOut,
  MenuIcon,
  MessageCircle,
  MoonIcon,
  PlusCircle,
  Settings,
  SoupIcon,
  SunIcon,
  User,
  X,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Collection from "../Collection";
import Logo from "../Logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Header({ className }: SidebarProps) {
  const { theme, setTheme } = useTheme();
  const { status, data: session } = useSession();
  // console.log(session?.access_token)
  console.log(theme);
  const items = [
    {
      category: "Automotive",
      services: [
        "Auto Accessories",
        "Auto Dealers – New",
        "Auto Dealers – Used",
        "Detail & Carwash",
        "Gas Stations",
        "Motorcycle Sales & Repair",
        "Rental & Leasing",
        "Service, Repair & Parts",
        "Towing",
      ],
    },
    {
      category: "Business Support & Supplies",
      services: [
        "Consultants",
        "Employment Agency",
        "Marketing & Communications",
        "Office Supplies",
        "Printing & Publishing",
      ],
    },
    {
      category: "Computers & Electronics",
      services: [
        "Computer Programming & Support",
        "Consumer Electronics & Accessories",
      ],
    },
    {
      category: "Construction & Contractors",
      services: [
        "Architects, Landscape Architects, Engineers & Surveyors",
        "Blasting & Demolition",
        "Building Materials & Supplies",
        "Construction Companies",
        "Electricians",
        "Engineer, Survey",
        "Environmental Assessments",
        "Inspectors",
        "Plaster & Concrete",
        "Plumbers",
        "Roofers",
      ],
    },
    {
      category: "Education",
      services: [
        "Adult & Continuing Education",
        "Early Childhood Education",
        "Educational Resources",
        "Other Educational",
      ],
    },
    {
      category: "Entertainment",
      services: [
        "Artists, Writers",
        "Event Planners & Supplies",
        "Golf Courses",
        "Movies",
        "Productions",
      ],
    },
    {
      category: "Food & Dining",
      services: [
        "Desserts, Catering & Supplies",
        "Fast Food & Carry Out",
        "Grocery, Beverage & Tobacco",
        "Restaurants",
      ],
    },
    {
      category: "Health & Medicine",
      services: [
        "Acupuncture",
        "Assisted Living & Home Health Care",
        "Audiologist",
        "Chiropractic",
        "Clinics & Medical Centers",
        "Dental",
        "Diet & Nutrition",
        "Laboratory, Imaging & Diagnostic",
        "Massage Therapy",
        "Mental Health",
        "Nurse",
        "Optical",
        "Pharmacy, Drug & Vitamin Stores",
        "Physical Therapy",
        "Physicians & Assistants",
        "Podiatry",
        "Social Worker",
        "Animal Hospital",
        "Veterinary & Animal Surgeons",
      ],
    },
    {
      category: "Home & Garden",
      services: [
        "Antiques & Collectibles",
        "Cleaning",
        "Crafts, Hobbies & Sports",
        "Flower Shops",
        "Home Furnishings",
        "Home Goods",
        "Home Improvements & Repairs",
        "Landscape & Lawn Service",
        "Pest Control",
        "Pool Supplies & Service",
        "Security System & Services",
      ],
    },
    {
      category: "Legal & Financial",
      services: [
        "Accountants",
        "Attorneys",
        "Financial Institutions",
        "Financial Services",
        "Insurance",
        "Other Legal",
      ],
    },
    {
      category: "Manufacturing, Wholesale, Distribution",
      services: ["Distribution, Import/Export", "Manufacturing", "Wholesale"],
    },
    {
      category: "Merchants (Retail)",
      services: [
        "Cards & Gifts",
        "Clothing & Accessories",
        "Department Stores, Sporting Goods",
        "General",
        "Jewelry",
        "Shoes",
      ],
    },
    {
      category: "Miscellaneous",
      services: [
        "Civic Groups",
        "Funeral Service Providers & Cemeteries",
        "Miscellaneous",
        "Utility Companies",
      ],
    },
    {
      category: "Personal Care & Services",
      services: [
        "Animal Care & Supplies",
        "Barber & Beauty Salons",
        "Beauty Supplies",
        "Dry Cleaners & Laundromats",
        "Exercise & Fitness",
        "Massage & Body Works",
        "Nail Salons",
        "Shoe Repairs",
        "Tailors",
      ],
    },
    {
      category: "Real Estate",
      services: [
        "Agencies & Brokerage",
        "Agents & Brokers",
        "Apartment & Home Rental",
        "Mortgage Broker & Lender",
        "Property Management",
        "Title Company",
      ],
    },
    {
      category: "Travel & Transportation",
      services: [
        "Hotel, Motel & Extended Stay",
        "Moving & Storage",
        "Packaging & Shipping",
        "Transportation",
        "Travel & Tourism",
      ],
    },
  ];

  const getLogo = () => (
    <Link href="/" className="pointer flex items-center">
      <Logo />
    </Link>
  );

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
              setTheme("light");
            }}
          >
            Light
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setTheme("dark");
            }}
          >
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setTheme("system");
            }}
          >
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {status === "authenticated" && (
        <>
          {" "}
          <BellDot size={20} />
          <Collection />
        </>
      )}
      {status === "unauthenticated" && (
        <Link href="/login" target="_blank">
          <Typography variant="p">Sign in</Typography>
        </Link>
      )}
      {status === "unauthenticated" && (
        <Link href="/signup" target="_blank">
          <Button size="tiny" variant={"outline"}>
            Sign Up
          </Button>
        </Link>
      )}
      {status === "authenticated" && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="border-2 border-white cursor-pointer">
              <AvatarImage src={session?.picture} />
              <AvatarFallback>
                {session?.email || session?.user?.email} HU
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link className="" href="/account">
              <DropdownMenuItem className="flex flex-row items-center gap-4">
                <User size={14} /> Account
              </DropdownMenuItem>
            </Link>
            <Link className="" href="/messages">
              <DropdownMenuItem className="flex flex-row items-center gap-4">
                <MessageCircle size={14} /> Messages
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="flex flex-row items-center gap-4"
              onClick={() => {
                setTheme("system");
              }}
            >
              <Settings size={14} /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex flex-row items-center gap-4"
              onClick={() => {
                void signOut();
              }}
            >
              <LogOut size={14} /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );

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
                <NavigationMenuTrigger>Automotive </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2
                      lg:w-[600px]"
                  >
                    {items[0].services.map((service, index) => (
                      <NavigationMenuLink
                        key={index}
                        className={"flex-row flex gap-2"}
                      >
                        <PlusCircle /> {service}
                      </NavigationMenuLink>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Business Supplier</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    className="grid w-[200px] gap-3 p-4 md:w-[500px] md:grid-cols-2
                      lg:w-[600px]"
                  >
                    {items[1].services.map((service, index) => (
                      <NavigationMenuLink
                        key={index}
                        className={"flex-row flex gap-2"}
                      >
                        <SoupIcon /> {service}
                      </NavigationMenuLink>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Computers and Electronics
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    className="grid w-[400px] gap-3 p-4 md:w-[400px] md:grid-cols-2
                      lg:w-[600px]"
                  >
                    {items[2].services.map((service, index) => (
                      <>
                        <NavigationMenuLink
                          key={index}
                          className={"flex-row flex gap-2"}
                        >
                          <Car /> {service}
                        </NavigationMenuLink>
                      </>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    More
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </>
    );
  };

  return (
    <div
      className={cn(
        `flex md:h-12 h-14 items-center justify-center w-full
          border-b fixed z-50 bg-secondary`,
        className,
      )}
    >
      <div className="w-full max-w-[1440px] md:px-8 px-4">
        {/* Desktop */}
        <div className="flex items-center gap-x-8 w-full">
          <div className="md:flex-0 min-w-fit flex-1">{getLogo()}</div>
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
                  <div className="p-4 pb-0 space-y-4">{getHeaderItems()}</div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
}
