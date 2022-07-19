import React, { useState } from "react";
import Link from "next/link";
import Auth from "../SignUp";

export default function Navbar({ children}) {
  const [expanded, setExpanded] = useState(false);
 
  function handleClick() {
    setExpanded(!expanded);
  }
 

  return (
    <div>
      <nav className=" relative bg-gradient-to-r from-cyan-600 to-sky-900  z-10 shadow-lg ">
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
                      className=" no-underline text-slate-50  px-3 py-2 rounded-md text-md font-medium"
                      href="/#">
                      Home
                    </a>
                    <Link href="#about">
                      <a className="text-slate-50  no-underline px-3 py-2 rounded-md text-md font-medium">
                        About
                      </a>
                    </Link>
                    <Link href="#FAQ">
                      <a className="text-slate-50 no-underline px-3 py-2 rounded-md text-md font-medium">
                        FAQ
                      </a>
                    </Link>
                    <Link href="#contact">
                      <a className="text-slate-50 no-underline px-3 py-2 rounded-md text-md font-medium">
                        Contact
                      </a>
                    </Link>
                  </div>
                  <h3 className="hidden text-slate-50 lg:flex w-max md:col-end-4 -right-20 pl-20 my-auto">
                    (123) 456-78-90
                  </h3>
                  <div className="flex col-end-5   text-slate-50 ml-10 px-3 py-2 rounded-md text-lg font-bold" >
                  {children}
                  </div>
                  <div className="" />
                </div>
              </div>
            </div>
            <div className="block">
              <div className="ml-4 flex items-center md:ml-6" />
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
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {expanded && (
          <div className=" z-[22] transition-all duration-1000 ease-in-out md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/#">
                <a className="text-slate-50 no-underline block px-3 py-2 rounded-md text-base font-medium">
                  Home
                </a>
              </Link>
              <Link href="#about">
                <a className="text-slate-50 no-underline block px-3 py-2 rounded-md text-base font-medium">
                  About
                </a>
              </Link>
              <Link href="#FAQ">
                <a className="text-slate-50 no-underline block px-3 py-2 rounded-md text-base font-medium">
                  FAQ
                </a>
              </Link>
              <Link href="#contact">
                <a
                  className="text-slate-50 no-underline block px-3 py-2 rounded-md text-base font-medium"
                  href="/#">
                  Contact
                </a>
              </Link>
              <div  className="flex flex-col text-lg text-slate-50 no-underline px-3 py-4 rounded-md  font-medium">
                  {children}
                  </div>
            </div>
          </div>
        )}
      </nav>
     
    </div>
  );
}
