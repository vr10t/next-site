import Link from "next/link";
import { useRouter } from "next/router";
import {FaUser} from "@react-icons/all-files/fa/FaUser"
import {FaClipboardList} from "@react-icons/all-files/fa/FaClipboardList"
export default function Sidebar(props) {
  const router = useRouter();
  const path = router.pathname;
  const active = "bg-sky-600 text-gray-50 hover:bg-sky-500";
  const inactive = "text-gray-700 hover:text-gray-50 hover:bg-sky-500";
  const iconActive=" text-gray-50 "
  const iconInactive="text-gray-700 group-hover:text-gray-50"
 
  return (
    <div className="min-h-screen z-[21] bg-gray-100 w-[3.35rem]">
      <div className=" min-h-screen w-[3.35rem] overflow-hidden border-r hover:w-56 hover:bg-gray-50 hover:shadow-lg">
        <div className="flex h-screen flex-col justify-between pt-2 pb-6">
          <div>
            <div className="w-max p-2.5"></div>
            <ul className="mt-6 space-y-2 tracking-wide">
              <li className="min-w-max">
                <Link href="/my-account">
                  <a
                
                    aria-label="account"
                    className={`group relative flex items-center space-x-4  px-4 py-3 ${
                      path === "/my-account" ? active : inactive
                    }`}>
                    <FaUser aria-hidden className={`z-0 ml-[0.1rem] mr-2 text-lg ${path === "/my-account" ? iconActive : iconInactive} `} />
                    <span className="">My Account</span>
                  </a>
                </Link>
              </li>
              <li className="min-w-max">
                <Link href="/my-account/bookings">
                  <a
                  aria-label="bookings"
                    className={`group relative flex items-center space-x-4  px-4 py-3 ${
                      path === "/my-account/bookings" ? active : inactive
                    }`}>
                    <FaClipboardList aria-hidden className={`z-0 ml-[0.1rem] mr-2 text-lg ${path === "/my-account/bookings" ? iconActive : iconInactive} `} />
                    <span className="">
                      My Bookings
                    </span>
                  </a>
                </Link>
              </li>
              
              
              
            </ul>
          </div>
          <div className="w-max -mb-3">
            <a
              href="#"
              className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 group-hover:fill-cyan-600"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="group-hover:text-gray-700">Settings</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
