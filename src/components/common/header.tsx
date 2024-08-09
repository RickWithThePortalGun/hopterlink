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
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import InitialsAvatar from "react-initials-avatar";
import "react-initials-avatar/lib/ReactInitialsAvatar.css";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Typography from "@/components/ui/typography";
import { Subcategory } from "@/constants/constants";
import { useCategories } from "@/contexts/ReUsableData";
import { cn } from "@/lib/utils";
import {
  Activity,
  BellDot,
  Bus,
  Car,
  Clock,
  Computer,
  File,
  Globe,
  Home,
  LogOut,
  MenuIcon,
  MessageCircle,
  MoonIcon,
  Pen,
  Plus,
  Settings,
  SunIcon,
  User,
  Weight,
  X,
} from "lucide-react";
import { RotatingLines } from "react-loader-spinner";
import Collection from "../Collection";
import Logo from "../Logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AvatarComponent } from "avatar-initials";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import ListItem from "../ListItem";
import SearchComponent from "../SearchComponent";
import { useRouter } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import { setAuthorizationToken } from "@/utils/http-request";
import RecentlyViewed from "../RecentlyViewed";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Header({ className }: SidebarProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { status, data: session } = useSession();

  // useEffect(() => {
  //   if (session && session.access_token) {
  //     setAuthorizationToken(session.access_token);
  //     console.log("token set")
  //   }
  // }, [session]);
  const avatarSrc =
    session?.picture ||
    "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"; // Default Gravatar image

  const { categories, loading } = useCategories();
  const [subcategories, setSubcategories] = useState<Subcategory[]>();

  const fetchSubcategories = (categoryId: number) => {
    setSubcategories([]);
    const category = categories.find((cat) => cat.id === categoryId);
    if (category) {
      setSubcategories(category.subcategories);
    }
  };
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
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {status === "authenticated" && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Activity size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex flex-row items-center gap-4">
                <Activity size={14} /> Activity Feed
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <RecentlyViewed />
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-row items-center gap-4">
                <File size={14} /> My Interest
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-row items-center gap-4">
                <PaperPlaneIcon size={14} /> Invite Friends
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Collection />
        </>
      )}
      {status === "unauthenticated" && (
        <>
          <Link href="/login" target="_blank">
            <Typography variant="p">Sign in</Typography>
          </Link>
          <Link href="/signup" target="_blank">
            <Button size="tiny" variant="outline">
              Sign Up
            </Button>
          </Link>
        </>
      )}
      {status === "authenticated" && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="bg-primary">
              <AvatarImage src={session?.user?.profile || ""} />
              <AvatarFallback>
                {session?.user?.first_name?.[0] || "H"}
                {session?.user?.last_name?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href="/account">
              <DropdownMenuItem className="flex flex-row items-center gap-4">
                <User size={14} /> Account
              </DropdownMenuItem>
            </Link>
            <Link href="/messages">
              <DropdownMenuItem className="flex flex-row items-center gap-4">
                <MessageCircle size={14} /> Messages
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="flex flex-row items-center gap-4"
              onClick={() => setTheme("system")}
            >
              <Settings size={14} /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex flex-row items-center gap-4"
              onClick={() => void signOut({ redirect: true })}
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
      <div className="flex gap-4 my-6 max-lg:hidden py-4">
        <div className="my-6">
          <SearchComponent />
        </div>
        {/* <DropdownMenu
          onOpenChange={() => {
            setSubcategories([]);
            fetchSubcategories(2);
          }}
        >
          <DropdownMenuTrigger onClick={() => fetchSubcategories(2)}>
            <p className="text-sm"> Automotive Services</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {loading ? (
              <div className="w-full h-full items-center justify-center flex">
                <RotatingLines width="20" strokeColor="#c55e0c" />
              </div>
            ) : (
              subcategories?.map((subcategory, index) => (
                <DropdownMenuItem key={index} className="flex-row flex gap-2">
                  <Car size={16} color="#e5e5e5" />{" "}
                  <p className="text-sm">{subcategory.name}</p>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu onOpenChange={() => fetchSubcategories(3)} modal>
          <DropdownMenuTrigger>
            <p className="text-sm"> Health and Wellness </p>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {loading ? (
              <div className="w-full h-full items-center justify-center flex">
                <RotatingLines width="20" strokeColor="#c55e0c" />
              </div>
            ) : (
              subcategories?.map((subcategory, index) => (
                <DropdownMenuItem key={index} className="flex-row flex gap-2">
                  <Plus color="#e5e5e5" size={16} /> {subcategory.name}
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu onOpenChange={() => fetchSubcategories(9)}>
          <DropdownMenuTrigger>
            <p className="text-sm"> Real Estate Services</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {loading ? (
              <div className="w-full h-full items-center justify-center flex">
                <RotatingLines strokeColor="#c55e0c" width="20" />
              </div>
            ) : (
              subcategories?.map((subcategory, index) => (
                <DropdownMenuItem key={index} className="flex-row flex gap-2">
                  <Home color="#e5e5e5" size={16} /> {subcategory.name}
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <p className="text-md"> More</p>{" "}
          </DropdownMenuTrigger>
        </DropdownMenu> */}
      </div>
    );
  };
  console.log(session?.user);
  return (
    <div
      className={cn(
        `flex md:h-12 py-8 h-14 items-center justify-center w-full border-b fixed z-50 bg-secondary`,
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
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <MenuIcon />
              </DrawerTrigger>
              <DrawerContent className="h-dvh justify-between flex items-start top-0 right-0 left-auto mt-0 w-64 rounded-none">
                <div className="mx-auto w-full p-5">
                  <DrawerHeader>
                    <DrawerClose asChild>
                      <div className="w-full flex items-end justify-end">
                        <X />
                      </div>
                    </DrawerClose>
                  </DrawerHeader>
                  <div className="mt-12">
                    <SearchComponent />
                  </div>
                  {status === "unauthenticated" ? (
                    <>
                      <div className="w-full flex justify-between items-center my-8">
                        <Button
                          onClick={() => router.push("/signup")}
                          className="w-full"
                        >
                          Join Hopterlink
                        </Button>
                      </div>{" "}
                      <Link href={"/login"}>
                        <ListItem title="Sign In" />
                      </Link>
                    </>
                  ) : (
                    ""
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <ListItem title="Browse Categories" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <ScrollArea className="h-96 w-48 rounded-md">
                        {categories.map((category, index) => (
                          <>
                            <DropdownMenuItem
                              key={index}
                              onClick={() =>
                                router.push(`/categories/${category.id}`)
                              }
                            >
                              <div className={"text-sm my-2"}>
                                {category.name}
                              </div>
                            </DropdownMenuItem>
                          </>
                        ))}
                      </ScrollArea>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Typography variant={"h4"} className="text-gray-500 mt-4">
                    General
                  </Typography>
                  <Link href={"/"}>
                    <ListItem title="Home" />
                  </Link>
                  <div className=" flex flex-row items-center justify-between">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <div className="flex flex-row gap-4 items-center">
                          <p>English</p>
                          <Globe size={16} />
                        </div>
                      </DropdownMenuTrigger>
                    </DropdownMenu>
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
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                          Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                          Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                          System
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* <div className="p-4 pb-0 space-y-4 grid grid-cols-1">
                    <DropdownMenu onOpenChange={() => fetchSubcategories(2)}>
                      <DropdownMenuTrigger
                        onClick={() => fetchSubcategories(2)}
                      >
                        <p className="text-md text-start">
                          {" "}
                          Automotive Services
                        </p>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {loading ? (
                          <div className="w-full h-full items-center justify-center flex">
                            <RotatingLines width="20" strokeColor="#c55e0c" />
                          </div>
                        ) : (
                          subcategories?.map((subcategory, index) => (
                            <DropdownMenuItem
                              key={index}
                              className="flex-row flex gap-2"
                            >
                              <Car size={16} color="#e5e5e5" />{" "}
                              <p className="text-sm">{subcategory.name}</p>
                            </DropdownMenuItem>
                          ))
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu
                      onOpenChange={() => fetchSubcategories(3)}
                      modal
                    >
                      <DropdownMenuTrigger>
                        <p className="text-md text-start">
                          {" "}
                          Health and Wellness{" "}
                        </p>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {loading ? (
                          <div className="w-full h-full items-center justify-center flex">
                            <RotatingLines width="20" strokeColor="#c55e0c" />
                          </div>
                        ) : (
                          subcategories?.map((subcategory, index) => (
                            <DropdownMenuItem
                              key={index}
                              className="flex-row flex gap-2"
                            >
                              <Plus color="#e5e5e5" size={16} />{" "}
                              {subcategory.name}
                            </DropdownMenuItem>
                          ))
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu onOpenChange={() => fetchSubcategories(10)}>
                      <DropdownMenuTrigger>
                        <p className="text-md text-start">
                          Technology and Gadgets
                        </p>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {loading ? (
                          <div className="w-full h-full items-center justify-center flex">
                            <RotatingLines strokeColor="#c55e0c" width="20" />
                          </div>
                        ) : (
                          subcategories?.map((subcategory, index) => (
                            <DropdownMenuItem
                              key={index}
                              className="flex-row flex gap-2"
                            >
                              <Computer color="#e5e5e5" size={16} />{" "}
                              {subcategory.name}
                            </DropdownMenuItem>
                          ))
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu onOpenChange={() => fetchSubcategories(11)}>
                      <DropdownMenuTrigger>
                        <p className="text-md text-start">
                          {" "}
                          Transportation and Moving
                        </p>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {loading ? (
                          <div className="w-full h-full items-center justify-center flex">
                            <RotatingLines strokeColor="#c55e0c" width="20" />
                          </div>
                        ) : (
                          subcategories?.map((subcategory, index) => (
                            <DropdownMenuItem
                              key={index}
                              className="flex-row flex gap-2"
                            >
                              <Bus color="#e5e5e5" size={16} />{" "}
                              {subcategory.name}
                            </DropdownMenuItem>
                          ))
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>{" "}
                    <DropdownMenu onOpenChange={() => fetchSubcategories(13)}>
                      <DropdownMenuTrigger>
                        <p className="text-md text-start">
                          {" "}
                          Fitness and Recreation
                        </p>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {loading ? (
                          <div className="w-full h-full items-center justify-center flex">
                            <RotatingLines strokeColor="#c55e0c" width="20" />
                          </div>
                        ) : (
                          subcategories?.map((subcategory, index) => (
                            <DropdownMenuItem
                              key={index}
                              className="flex-row flex gap-2"
                            >
                              <Weight color="#e5e5e5" size={16} />{" "}
                              {subcategory.name}
                            </DropdownMenuItem>
                          ))
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>{" "}
                    <DropdownMenu
                      modal={true}
                      onOpenChange={() => fetchSubcategories(15)}
                    >
                      <DropdownMenuTrigger>
                        <p className="text-md text-start">
                          {" "}
                          Writing and Content Creation
                        </p>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {loading ? (
                          <div className="w-full h-full items-center justify-center flex">
                            <RotatingLines strokeColor="#c55e0c" width="20" />
                          </div>
                        ) : (
                          subcategories?.map((subcategory, index) => (
                            <DropdownMenuItem
                              key={index}
                              className="flex-row flex gap-2"
                            >
                              <Pen color="#e5e5e5" size={16} />{" "}
                              {subcategory.name}
                            </DropdownMenuItem>
                          ))
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <p className="text-md text-start"> More</p>{" "}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Link href="/docs" legacyBehavior passHref>
                            <DropdownMenuItem
                              className={navigationMenuTriggerStyle()}
                            >
                              More
                            </DropdownMenuItem>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div> */}
                </div>
                <div className="mx-auto w-full p-5 flex flex-row gap-2 items-center justify-between">
                  {status === "authenticated" && (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant="secondary" size="sm">
                            <Activity size={20} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex flex-row items-center gap-4">
                            <Activity size={14} /> Activity Feed
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <RecentlyViewed />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex flex-row items-center gap-4">
                            <File size={14} /> My Interest
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex flex-row items-center gap-4">
                            <PaperPlaneIcon size={14} /> Invite Friends
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button variant="secondary" size="sm">
                        <Collection />
                      </Button>
                    </>
                  )}

                  {status === "authenticated" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Avatar>
                          <AvatarImage src={session?.user?.profile || ""} />
                          <AvatarFallback>
                            {session?.user?.first_name?.[0] || "H"}
                            {session?.user?.last_name?.[0] || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href="/account">
                          <DropdownMenuItem className="flex flex-row items-center gap-4">
                            <User size={14} /> Account
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/messages">
                          <DropdownMenuItem className="flex flex-row items-center gap-4">
                            <MessageCircle size={14} /> Messages
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          className="flex flex-row items-center gap-4"
                          onClick={() => setTheme("system")}
                        >
                          <Settings size={14} /> Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex flex-row items-center gap-4"
                          onClick={() => void signOut({ redirect: true })}
                        >
                          <LogOut size={14} /> Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
}
