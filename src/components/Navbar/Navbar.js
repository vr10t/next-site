import React, { useState } from "react";
import Link from "next/link";
import Auth from "../Auth";
export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  function handleClick() {
    setExpanded(!expanded);
  }
  function handleLogin() {
    setShowModal(!showModal);
  }

  return (
    <div>
      <nav className=" relative bg-gradient-to-r from-cyan-500 to-sky-800  z-10 shadow-lg ">
        <div className="max-w-7xl  mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className=" flex items-center">
              <Link href="/">
                <a className="flex-shrink-0">
                  <img
                    className="h-auto w-24"
                    src="vercel.svg"
                    alt="Workflow"
                  />
                </a>
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 grid grid-cols-3 col-end-2">
                  <div className="my-auto">
                    <a
                      className=" no-underline text-stone-800  px-3 py-2 rounded-md text-md font-medium"
                      href="/#">
                      Home
                    </a>
                    <Link href="#about">
                      <a className="text-stone-800  no-underline px-3 py-2 rounded-md text-md font-medium">
                        About
                      </a>
                    </Link>
                    <Link href="#FAQ">
                      <a className="text-stone-800 no-underline px-3 py-2 rounded-md text-md font-medium">
                        FAQ
                      </a>
                    </Link>
                    <Link href="#contact">
                      <a className="text-stone-800 no-underline px-3 py-2 rounded-md text-md font-medium">
                        Contact
                      </a>
                    </Link>
                  </div>
                  <h3 className="flex col-end-4 -right-20 pl-20 my-auto">
                    (123) 456-78-90
                  </h3>
                  <button
                    className="flex col-end-7 relative top-1 -right-20 text-xl"
                    onClick={handleLogin}>
                    <a> Login </a>
                  </button>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="ml-4 flex items-center md:ml-6"></div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={handleClick}
                className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="h-8 w-8"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {expanded && (
          <div className={" md:hidden"}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/#">
                <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  Home
                </a>
              </Link>
              <Link href="#about">
                <a className="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium">
                  About
                </a>
              </Link>
              <Link href="#FAQ">
                <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  FAQ
                </a>
              </Link>
              <Link href="#contact">
                <a
                  className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  href="/#">
                  Contact
                </a>
              </Link>
            </div>
          </div>
        )}
      </nav>
      {showModal && (
        <div className="absolute  -top-20" onClick={handleLogin}>
        <div
         
          className=" fixed flex justify-center w-full h-[120vh] z-[9999] bg-black bg-opacity-50 ">
          <div className=" relative top-44">
            <Auth className=" h-32" />
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
