"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { Separator } from "@/components/ui/separator";
import {
  CompassIcon,
  HomeIcon,
  LogOut,
  TicketMinusIcon,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userSlice";

const Header: React.FC = () => {

  const {id} = useAppSelector((state)=>state.user)

  const dispatch = useAppDispatch()

  const logout =  () => {
    localStorage.removeItem("token");
    dispatch(logoutAction());
  };

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // // Toggle login state
  // const toggleLogin = () => {
  //   setIsLoggedIn(!isLoggedIn);
  // };

  // const isLoggedOut = !isLoggedIn;

  // useEffect(() => {
  //   // Logic to determine if user is logged in or not
  //   // For demonstration purposes, I'm assuming user is logged out initially
  //   setIsLoggedIn(false);
  // }, []);

  const SHEET_SIDES = ["top"] as const;
  type SheetSide = (typeof SHEET_SIDES)[number];

  return (
    <div className="header  bg-marine-800">
      <div className="container mx-auto ">
        <div className="flex items-center justify-between py-3 lg:px-4">
          <div className="item-center flex justify-between gap-10">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={150}
                height={40}
                className="h-[45px]"
              />
            </Link>

            <div className="relative my-auto hidden lg:block">
              <input
                type="text"
                placeholder="Search"
                className="w-[400px] rounded-md border border-gray-300 px-3 py-1 focus:border-blue-500 focus:outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                <FaSearch />
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center justify-between gap-3 lg:block">
              <div className="flex items-center">
                <Badge className="mx-1 bg-transparent ">
                  <TicketMinusIcon className="mr-2 h-4 w-4" />
                  <Link href="/">Create Event</Link>
                </Badge>

                <Badge className="mx-1 bg-transparent">
                  <CompassIcon className="mr-2 h-4 w-4" />
                  <Link href="/">Event Discover</Link>
                </Badge>

                {!Boolean(id) ? (
                  <div>
                    <Button
                      // onClick={toggleLogin}
                      variant="ghost"
                      className="mx-1 text-white"
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button
                      // onClick={toggleLogin}
                      variant="ghost"
                      className="mx-1 text-white"
                    >
                      <Link href="/register">Register</Link>
                    </Button>
                  </div>
                ) : (
                  <div>
                    {/* Tampilkan tombol logout */}
                    <Button
                      onClick={logout}
                      variant="ghost"
                      className="mx-1  text-white"
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Searchbar */}
            <div className="sm:block lg:hidden">
              {SHEET_SIDES.map((side) => (
                <Sheet key={side}>
                  <SheetTrigger asChild>
                    <FaSearch className="size-6" />
                  </SheetTrigger>
                  <SheetContent side={side} className="w-sreen h-[150px]">
                    <SheetHeader>
                      <SheetTitle>Find Your Event </SheetTitle>
                      <SheetDescription>
                        <input
                          type="text"
                          placeholder="Search"
                          className="w-[350px] rounded-md border border-gray-300 px-3 py-1 focus:border-blue-500 focus:outline-none"
                        />
                        <span className="absolute right-7 top-1/2 -translate-y-1/2 transform">
                          <FaSearch />
                        </span>
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4"></div>
                    <SheetFooter>
                      <div className="flex items-end justify-center gap-3">
                        <SheetClose asChild></SheetClose>
                      </div>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              ))}
            </div>
            <div className="sm:block lg:hidden">
              {/* Mobile navigation */}
              {!Boolean(id) ? (
                <Sheet>
                  <SheetTrigger asChild>
                    <RxHamburgerMenu className="size-7" />
                  </SheetTrigger>
                  <SheetContent className="w-[400px]">
                    <SheetHeader>
                      <SheetTitle>Log In to your Account </SheetTitle>
                      <SheetDescription>
                        To Access all features from Eventour
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4"></div>
                    <SheetFooter>
                      <div className="flex items-end justify-center gap-3">
                        <SheetClose asChild>
                          <Button
                            // onClick={toggleLogin}
                            className="w-[150px] bg-marine-500"
                            type="submit"
                          >
                            <Link href="/login">Login</Link>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button
                            // onClick={toggleLogin}
                            className="w-[150px] bg-marine-500"
                            type="submit"
                          >
                            <Link href="/register">Register</Link>
                          </Button>
                        </SheetClose>
                      </div>
                    </SheetFooter>

                    <Separator className="my-4" />
                    <div className="flex flex-col gap-4">
                      <Button variant="ghost" className="justify-normal">
                        <HomeIcon className="mr-2 h-4 w-4" />
                        <Link href="/">Home</Link>
                      </Button>
                      <Button variant="ghost" className="justify-normal">
                        <TicketMinusIcon className="mr-2 h-4 w-4" />
                        <Link href="/create-event">Create Your Event</Link>
                      </Button>
                      <Button variant="ghost" className="justify-normal">
                        <CompassIcon className="mr-2 h-4 w-4" />
                        <Link href="/">Even Discover</Link>
                      </Button>
                      <Button variant="ghost" className="justify-normal">
                        <UserRound className="mr-2 h-4 w-4" />
                        <Link href="/">Profile</Link>
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              ) : (
                <Sheet>
                  <SheetTrigger asChild>
                    <RxHamburgerMenu className="size-7" />
                  </SheetTrigger>
                  <SheetContent className="w-[400px]">
                    <SheetHeader>
                      <SheetTitle>Your Account </SheetTitle>
                      <SheetDescription>Welcome User</SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4"></div>
                    <SheetFooter></SheetFooter>

                    <Separator className="my-4" />
                    <div className="flex flex-col gap-4">
                      <Button variant="ghost" className="justify-normal">
                        <HomeIcon className="mr-2 h-4 w-4" />
                        <Link href="/">Dash Board</Link>
                      </Button>
                      <Button variant="ghost" className="justify-normal">
                        <UserRound className="mr-2 h-4 w-4" />
                        <Link href="/">Profile</Link>
                      </Button>
                      <Button variant="ghost" className="justify-normal">
                        <TicketMinusIcon className="mr-2 h-4 w-4" />
                        <Link href="/create-event">Create Your Event</Link>
                      </Button>
                      <Button variant="ghost" className="justify-normal">
                        <CompassIcon className="mr-2 h-4 w-4" />
                        <Link href="/">Even Discover</Link>
                      </Button>

                      <SheetFooter>
                      <SheetClose asChild>
                        <Button
                          onClick={logout}
                          variant="ghost"
                          className="justify-normal"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <Link href="/">Logout</Link>
                        </Button>
                      </SheetClose>
                      </SheetFooter>
                    </div>
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
