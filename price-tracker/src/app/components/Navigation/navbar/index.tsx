import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

const Navbar = () => {
  return (
    <>
      <div className="w-full h-20 bg-amber-700 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Logo />
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/shoppinglists">
                  <p>Shopping Lists</p>
                </Link>
              </li>
              <li>
                <Link href="/aboutus">
                  <p>About Us</p>
                </Link>
              </li>
              <li>
                <Link href="/userpage">
                  <p>User Profile</p>
                </Link>
              </li>
            </ul>
            <Button />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;