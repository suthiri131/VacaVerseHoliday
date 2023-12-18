"use client";

import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
  Button,
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import appLogo from "../_assets/images/logo.png";
import searchImg from "../_assets/images/search.png";
import Image from "next/image";
import { useState } from "react";
// import "../Header/header.css";
import cart from "../_assets/images/cart.png";
export default function App() {
  const router = useRouter();
  // const isPageActive = (path) => router.pathname === path;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  const Logo = () => <Image src={appLogo} alt="Logo" width={64} height={32} />;
  const SearchIcon = () => (
    <Image src={searchImg} alt="Logo" width={20} height={20} />
  ); // Set width and height based on your design
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    search();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const search = () => {
    // Redirect to /Search with the query parameter
    router.push({
      pathname: "/Search",
      query: { q: query },
    } as any);
  };

  return (
    <div>
      <Navbar isBordered className="dark">
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <Link href="/">
              <Logo />
              <p className="font-bold text-inherit sm:block hidden md:block">
                VACAVERSE
              </p>
            </Link>
          </NavbarBrand>
          <NavbarContent className="sm:flex gap-3 itemNav">
            <NavbarItem>
              <Link href="/travel" color="foreground">
                Travel
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/post/feed" color="foreground">
                Feed
              </Link>
            </NavbarItem>
            <Badge content="99+" shape="circle" color="danger">
              <Button
                radius="full"
                isIconOnly
                aria-label="more than 99 notifications"
                variant="light"
              >
                <Image src={cart} alt="Cart" width={20} height={20} />
              </Button>
            </Badge>
          </NavbarContent>
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[18rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon />}
            type="search"
            
          />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">
                <Link href="/post/myPost" color="foreground">
                  My Posts
                </Link>
              </DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
