import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { signOut } from "../../../utils/supabase-helpers";
import { useAuthContext } from "../../context/state";
import { listenForOutsideClicks } from "../../../utils/misc";
import { getPublicUser } from "../../../utils/supabase-helpers";
export default function Profile() {
  const router = useRouter();
  const menuRef = useRef(null);
  const [userDetails,setUserDetails]= useState()
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () =>{ setIsOpen(!isOpen)};
  
  const session = useAuthContext();
  const user_id = session?.user.id
  
  useEffect(() => {
    session && getPublicUser(user_id).then((data) => setUserDetails(data));
    console.log(userDetails);
    console.log(router.asPath, "router as path");
  }, [session]);
  const fullName =
    userDetails && userDetails[0]?.first_name + " " + userDetails[0]?.last_name;
    const initial =userDetails&& userDetails[0]?.first_name.slice(0, 1);

  useEffect(
    listenForOutsideClicks(listening, setListening, menuRef, setIsOpen)
   
  );
  return (
    <>
      <div
        
        ref={menuRef}
        onClick={toggle}
        className={`select-none ${isOpen && "hi"} bg-black/10 rounded-full h-full w-full flex justify-center items-center pb-2 text-black/80 font-medium cursor-pointer text-5xl`}>
        {initial}
      </div>
      <div
       
        // hidden={isOpen}
        className={`${
         isOpen ? "flex" : "hidden"
        } flex-col gap-2 absolute px-2 py-2 right-2 rounded-lg bg-gray-100 top-20`}>
        <div className="flex flex-col group justify-start px-4 font-medium text-gray-900  hover:rounded-md">
          {fullName}
          <span className="w-3/4  h-[1px]  self-center bg-black/20" />
        </div>

        <div
          onClick={() => router.push("/my-account")}
          className="flex justify-start px-4 font-normal text-gray-900 cursor-pointer peer hover:rounded-md hover:bg-gray-200">
          My account
        </div>

        <div
          onClick={() => signOut()}
          className="flex flex-col group items-start px-4 text-red-500 cursor-pointer peer hover:rounded-md hover:bg-gray-200">
          <span className="w-3/4  h-[1px]  group-hover:invisible self-center bg-black/20" />{" "}
          Logout
        </div>
      </div>
    </>
  );
}
