import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { FaBars } from "@react-icons/all-files/fa/FaBars";
import { Button } from "flowbite-react";
import { useRouter } from "next/router";
import { FaAngleDown } from "@react-icons/all-files/fa/FaAngleDown";
import { useAuthContext } from "../../context/state";
import Initial from "../Account/Initial";
import Profile from "../Account/Profile";
import { getPublicUser , signOut } from "../../../utils/supabase-helpers";
import { listenForOutsideClicks } from "../../../utils/misc";

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const router = useRouter();
  const user = useAuthContext();
  const navRef = useRef(null);
  const triggerRef = useRef(null);
  const [listening, setListening] = useState(false);
  const user_id = "";
  // try {
    
    
  // } catch (error) {
    
  // }
  
  function cleanup() {
    document.removeEventListener("click");
  }
  // useEffect(
  //   listenForOutsideClicks(
  //     listening,
  //     setListening,
  //     navRef,
  //     setExpanded,
  //     cleanup,
  //     triggerRef
  //   )
  // );
  console.log(expanded);
  useEffect(() => {
    
    
    console.log(router.asPath, "router as path");
  }, [user]);
  const fullName =user?.user_metadata.full_name || `${user?.first_name  } ${  user?.last_name}`
    

  function handleClick() {
    setExpanded(!expanded);
  }

  return (
    <header className="shadow-sm">
      <div className="max-w-screen  items-center  shadow flex fixed bg-gray-100 w-screen z-[22] ">
        <div className="flex justify-between items-center h-20 p-4 mr-4 w-full lg:gap-10">
          <div className="flex  ">
            <span className="w-20 h-10 bg-gray-200 rounded-lg md:flex" />
          </div>

          <nav className="hidden justify-center gap-10 self-center  text-sm font-medium md:flex grow">
            <Link href="/#">
              <a className="block self-center text-lg font-medium text-gray-800 no-underline rounded-md">
                Home
              </a>
            </Link>
            <Link href="/#about">
              <a className="block self-center text-lg font-medium text-gray-800 no-underline rounded-md">
                About
              </a>
            </Link>
            <Link href="/#FAQ">
              <a className="block self-center  text-lg font-medium text-gray-800 no-underline rounded-md">
                FAQ
              </a>
            </Link>
            <Link href="/#contact">
              <a className="block  self-center text-lg font-medium text-gray-800 no-underline rounded-md">
                Contact
              </a>
            </Link>
          </nav>

          {user ? (
            <div className="hidden w-16 h-16 md:flex">
              <Profile />
            </div>
          ) : (
            <div className="hidden justify-end space-x-4 mr-4  md:flex">
              <Link href={`/signin?referrer=${router.asPath} `}>
                <a className="px-5 py-2 font-medium text-gray-800 no-underline bg-gray-100 text-md hover:text-gray-500">
                  Log in
                </a>
              </Link>
              <Link href="/signup">
                <a className="flex self-center px-5 py-2 font-medium text-white no-underline bg-sky-600 rounded-lg shadow-md text-md hover:bg-sky-700">
                  Sign up
                </a>
              </Link>
            </div>
          )}

          <div className="md:hidden">
            <button
              ref={triggerRef}
              onClick={handleClick}
              className="p-2 text-gray-600 bg-gray-100 rounded-lg"
              type="button">
              <span className="sr-only">Open menu</span>
              <FaBars />
            </button>
          </div>
        </div>
        {expanded && (
          <nav
            // ref={navRef}
            className="md:hidden flex flex-col gap-2 pt-2 shadow w-3/4 h-screen items-start pr-2 right-0 top-20 pl-4 fixed bg-gray-100   z-[23]">
            <Link href="/#">
              <a className="block px-3 py-2 w-full text-lg font-medium text-gray-800 no-underline rounded-md hover:text-gray-900 hover:bg-gray-200">
                Home
              </a>
            </Link>
            <Link href="/#about">
              <a className="block px-3 py-2 w-full text-lg font-medium text-gray-800 no-underline rounded-md hover:text-gray-900 hover:bg-gray-200">
                About
              </a>
            </Link>
            <Link href="/#FAQ">
              <a className="block px-3 py-2 w-full text-lg font-medium text-gray-800 no-underline rounded-md hover:text-gray-900 hover:bg-gray-200">
                FAQ
              </a>
            </Link>
            <Link href="/#contact">
              <a className="block px-3 py-2 w-full text-lg font-medium text-gray-800 no-underline rounded-md hover:text-gray-900 hover:bg-gray-200">
                Contact
              </a>
            </Link>
            {user ? (
              <div className="flex flex-col w-full">
                <details className="list-disc text-red-50 marker:hidden">
                  <summary className="flex justify-between px-3 py-2 mb-2 w-full font-medium list-none text-gray-900 cursor-pointer hover:bg-gray-200 hover:rounded-md">
                    {fullName} <FaAngleDown aria-hidden className="z-0 self-center"/>
                  </summary>
                  <span className="w-full   h-[1px]  self-center bg-black/20" />
                  <div className="flex flex-col gap-2">
                    <Link href="/my-account"><a className="flex justify-start px-3 py-2 font-normal text-gray-900 cursor-pointer peer hover:rounded-md hover:bg-gray-200">
                      My account
                    </a></Link>
                    <Link href="/my-account/bookings"><a className="flex justify-start px-3 py-2 font-normal text-gray-900 cursor-pointer peer hover:rounded-md hover:bg-gray-200">
                      My bookings
                    </a></Link>
                  </div>
                </details>

                <div
                  onClick={() =>{ signOut(); router.push("/")}}
                  className="flex flex-col items-start px-3 py-2 text-red-500 cursor-pointer group peer hover:rounded-md hover:bg-gray-200">
                  Sign out
                </div>
              </div>
            ) : (
              <div className="flex gap-6 justify-center w-full">
                <Link href="/signin">
                  <a className="block self-center px-4 py-2 text-lg font-medium text-gray-800 no-underline rounded-md hover:text-gray-900 hover:bg-gray-200">
                    Sign in
                  </a>
                </Link>
                <div className="flex">
                  <Link href="/signup">
                    <a className="p-2 px-4 font-medium text-white no-underline bg-sky-600 rounded-lg  text-md">
                      Sign up
                    </a>
                  </Link>
                </div>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
