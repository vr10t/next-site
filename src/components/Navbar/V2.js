import Link from "next/link";
import { useState } from "react";
import { FaBars } from "@react-icons/all-files/fa/FaBars";
import {Button} from "flowbite-react"
export default function Navbar() {
  const [expanded, setExpanded] = useState(false);

  function handleClick() {
    setExpanded(!expanded);
  }

  return (
    <header className="shadow-sm">
      <div className="max-w-screen h-20 p-4 items-center  shadow flex fixed bg-gray-50 w-screen z-[22] ">
        <div className="flex justify-between items-center space-x-4 w-full lg:space-x-10">
          <div className="flex lg:w-0 lg:flex-1">
            <span className="w-20 h-10 bg-gray-200 rounded-lg md:flex"></span>
          </div>

          <nav className="hidden space-x-8 justify-center text-sm font-medium md:flex grow">
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

          <div className="hidden justify-center space-x-4 grow md:flex">
            <Link href="/signin">
              <a className="px-5 py-2 font-medium text-gray-800 no-underline bg-gray-50 text-md hover:text-gray-500">
                Log in
              </a>
            </Link>
            <Link href="/signup">
              <a className="flex px-5 py-2 text-md self-center font-medium text-white no-underline bg-sky-600 rounded-lg shadow-md hover:bg-sky-700">
                Sign up
              </a>
            </Link>
          </div>

          <div className="md:hidden ">
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
          <nav className="md:hidden shadow w-screen left-0 top-16 pl-4 fixed bg-gray-50  mt-3 z-[23]">
            <Link href="/#">
              <a className="block px-3 py-2 text-base font-medium text-gray-800 no-underline rounded-md hover:text-gray-600 hover:bg-gray-200">
                Home
              </a>
            </Link>
            <Link href="/#about">
              <a className="block px-3 py-2 text-base font-medium text-gray-800 no-underline rounded-md hover:text-gray-600 hover:bg-gray-200">
                About
              </a>
            </Link>
            <Link href="/#FAQ">
              <a className="block px-3 py-2 text-base font-medium text-gray-800 no-underline rounded-md hover:text-gray-600 hover:bg-gray-200">
                FAQ
              </a>
            </Link>
            <Link href="/#contact">
              <a className="block px-3 py-2 text-base font-medium text-gray-800 no-underline rounded-md hover:text-gray-600 hover:bg-gray-200">
                Contact
              </a>
            </Link>
            <Link href="/signin">
                <a className="block px-3 py-2 text-base font-medium text-gray-800 no-underline rounded-md hover:text-gray-600 hover:bg-gray-200">
                  Log in
                </a>
              </Link>
            <div className="flex gap-4 justify-start px-3 my-4">
            <Link href="/signup">
              <Button>
              
                <a className="font-medium text-white no-underline text-md">
                  Sign up
                </a>
              </Button></Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
