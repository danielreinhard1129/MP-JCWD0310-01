"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { FaSearch } from "react-icons/fa";

const Navigate: React.FC = () => {
  const [header, setHeader] = useState(false);

  const scrollHeader = () => {
    if (window.scrollY >= 20) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);

    return () => {
      window.removeEventListener("scroll", scrollHeader); // Corrected removeEventListener
    };
  }, []);

  return (
    <div className={header ? "border w-[100%] fixed bg-transparent backdrop-blur-md z-20" : "bg-blue-900"}>
      <div className="header container mx-auto lg:px-10">
        <div className="flex justify-between lg:px-8 py-3 items-center"> {/* Added items-center class */}
          <div>
            <Link href="/">
              <Image src="/" alt="Logo" width={150} height={40} className="h-[45px]" />
            </Link>
          </div>

          <div className="flex gap-3 items-center"> {/* Added flex and items-center classes */}
            {/* Search box with search icon */}
            <div className="hidden lg:block relative">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <FaSearch />
              </span>
            </div>

            <div className="hidden lg:block justify-between gap-3">
              <Button className="mx-1 bg-blue-500">
                <Link href="/">Home</Link>
              </Button>

              <Button className="mx-1 bg-blue-500">
                <Link href="/about">About</Link>
              </Button>

              <Button className="mx-1 bg-blue-500">
                <Link href="/products">Create Event</Link>
              </Button>

              <Button className="mx-1 bg-blue-500">
                <Link href="/products">Login</Link>
              </Button>

              <Button className="mx-1 bg-blue-500">
                <Link href="/team">Register</Link>
              </Button>
            </div>

            <div className="sm:block lg:hidden">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-xl bg-green-500">Menu</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          Home
                        </NavigationMenuLink>
                      </Link>

                      <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          About
                        </NavigationMenuLink>
                      </Link>
                      <Link href="/products" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          Create Event
                        </NavigationMenuLink>
                      </Link>

                      <Link href="/team" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          Login
                        </NavigationMenuLink>
                      </Link>

                      <Link href="/contact" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          Register
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigate;
