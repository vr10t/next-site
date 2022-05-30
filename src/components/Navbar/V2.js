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
      <div className="max-w-screen h-20 p-4 mx-auto items-center flex fixed bg-gray-50 w-screen z-[22] ">
        <div className="flex justify-between items-center space-x-4 lg:space-x-10">
          <div className="flex lg:w-0 lg:flex-1">
            <span className="w-20 h-10 bg-gray-200 rounded-lg md:flex"></span>
          </div>

          <nav className="hidden space-x-8 text-sm font-medium md:flex">
            <Link href="/#">
              <a className="block px-3 py-2 text-base font-medium text-gray-800 no-underline rounded-md">
                Home
              </a>
            </Link>
            <Link href="/#about">
              <a className="block px-3 py-2 text-base font-medium text-gray-800 no-underline rounded-md">
                About
              </a>
            </Link>
            <Link href="/#FAQ">
              <a className="block px-3 py-2 text-base font-medium text-gray-800 no-underline rounded-md">
                FAQ
              </a>
            </Link>
            <Link href="/#contact">
              <a className="block px-3 py-2 text-base font-medium text-gray-800 no-underline rounded-md">
                Contact
              </a>
            </Link>
          </nav>

          <div className="hidden flex-1 justify-end items-end space-x-4 md:flex">
            <Link href="/signin">
              <a className="px-5 py-2 font-medium text-gray-800 no-underline bg-gray-50 text-md hover:text-gray-500">
                Log in
              </a>
            </Link>
            <Link href="/signup">
              <a className="px-5 py-2 text-sm font-medium text-white no-underline bg-sky-600 rounded-lg shadow-md hover:bg-sky-700">
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
              <a className="block px-3 py-2 text-base font-medium text-gray-800 no-underline rounded-md">
                Home
              </a>
            </Link>
            <Link href="/#about">
              <a className="block px-3 py-2 text-base font-medium text-gray-800 no-underline rounded-md">
                About
              </a>
            </Link>
            <Link href="/#FAQ">
              <a className="block px-3 py-2 text-base font-medium text-gray-800 no-underline rounded-md">
                FAQ
              </a>
            </Link>
            <Link href="/#contact">
              <a className="block px-3 py-2 text-base font-medium text-gray-800 no-underline rounded-md">
                Contact
              </a>
            </Link>
            <div className="flex gap-4 justify-center my-4">
              <Link href="/signin">
                <a className="px-5 py-2 text-sm font-medium text-gray-500 no-underline bg-gray-100 rounded-lg shadow-md hover:bg-slate-300 hover:text-gray-500">
                  Log in
                </a>
              </Link>
              <Link href="/signup">
                <a className="px-5 py-2 text-sm font-medium text-white no-underline bg-sky-600 rounded-lg shadow-md hover:bg-sky-700">
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
