'use client'
import { Button } from '@nextui-org/react';
import React from "react";
import Link from "next/link";
import Image from 'next/image';
import LogoImage from "../../_assets/images/logo.png";

const Logo = () => (
  <Image
    src={LogoImage}
    alt="Logo"
    width={120} // Set the width of the logo image
    height={40} // Set the height of the logo image
  />
);

export default function Header() {
  return (
    <div className="w-full h-20 bg-emerald-800 sticky top-0">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <Logo />
          <ul className="hidden md:flex gap-x-6 text-white">
            <li>
              <Link href="/about">
                <p>About Us</p>
              </Link>
            </li>
            <li>
              <Link href="/services">
                <p>Services</p>
              </Link>
            </li>
            <li>
              <Link href="/contacts">
                <p>Contacts</p>
              </Link>
            </li>
          </ul>
          <Button />
        </div>
      </div>
    </div>
  );
}
