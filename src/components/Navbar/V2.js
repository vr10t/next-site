import Link from "next/link";
import { useState } from "react";
import {FaBars} from "@react-icons/all-files/fa/FaBars"
export default function Navbar() {
  const [expanded, setExpanded] = useState(false);

  function handleClick() {
    setExpanded(!expanded);
  }

  return (
    <header className="shadow-sm">
      <div className="max-w-screen h-20 p-4 mx-auto items-center flex fixed bg-gray-50 w-screen z-10 ">
        <div className="flex items-center justify-between space-x-4 lg:space-x-10">
          <div className="flex lg:w-0 lg:flex-1">
            <span className="md:flex  w-20 h-10 bg-gray-200 rounded-lg"></span>
          </div>

          <nav className="hidden space-x-8 text-sm font-medium md:flex">
            <Link href="/#">
              <a className="text-gray-800 no-underline block px-3 py-2 rounded-md text-base font-medium">
                Home
              </a>
            </Link>
            <Link href="/#about">
              <a className="text-gray-800 no-underline block px-3 py-2 rounded-md text-base font-medium">
                About
              </a>
            </Link>
            <Link href="/#FAQ">
              <a className="text-gray-800 no-underline block px-3 py-2 rounded-md text-base font-medium">
                FAQ
              </a>
            </Link>
            <Link href="/#contact">
              <a className="text-gray-800 no-underline block px-3 py-2 rounded-md text-base font-medium">
                Contact
              </a>
            </Link>
          </nav>

          <div className="items-end justify-end flex-1 hidden space-x-4 md:flex">
            <Link href="/signin">
              <a className="px-5 py-2 no-underline text-md font-medium text-gray-800 bg-gray-50   hover:text-gray-500">
                Log in
              </a>
            </Link>
            <Link href="/signup">
              <a className="px-5 py-2 no-underline text-sm font-medium text-white bg-sky-600 rounded-lg shadow-md hover:bg-sky-700">
                Sign up
              </a>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={handleClick}
              className="p-2 text-gray-600 bg-gray-100 rounded-lg"
              type="button">
              <span className="sr-only">Open menu</span>
              <FaBars />
            </button>
          </div>
        </div>
        {expanded && (
          <nav className="md:hidden w-screen left-0  pl-4 fixed bg-white  mt-3 z-[99]">
            <Link href="/#">
              <a className="text-gray-800 no-underline block px-3 py-2 rounded-md text-base font-medium">
                Home
              </a>
            </Link>
            <Link href="/#about">
              <a className="text-gray-800 no-underline block px-3 py-2 rounded-md text-base font-medium">
                About
              </a>
            </Link>
            <Link href="/#FAQ">
              <a className="text-gray-800 no-underline block px-3 py-2 rounded-md text-base font-medium">
                FAQ
              </a>
            </Link>
            <Link href="/#contact">
              <a className="text-gray-800 no-underline block px-3 py-2 rounded-md text-base font-medium">
                Contact
              </a>
            </Link>
            <div className="justify-center flex gap-4 my-4">
              <Link href="/signin">
                <a className="px-5 py-2 no-underline text-sm font-medium text-gray-500 bg-gray-100 rounded-lg shadow-md hover:bg-slate-300 hover:text-gray-500">
                  Log in
                </a>
              </Link>
              <Link href="/signup">
                <a className="px-5 py-2 no-underline text-sm font-medium text-white bg-sky-600 rounded-lg shadow-md hover:bg-sky-700">
                  Sign up
                </a>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
