import { useRouter } from "next/router";
import { useEffect } from "react";
import { signOut } from "../../../utils/supabase-helpers";

export default function Dropdown(props) {
  const router = useRouter();
  return (
    <div
      hidden={props.show}
      className={`${
        props.show ? "flex" : "hidden"
      } flex-col gap-2 absolute px-2 py-2 right-2 rounded-lg bg-gray-100 top-20`}>
      <div className="flex flex-col group justify-start px-4 font-medium text-gray-900  hover:rounded-md">
        {props.name}
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
  );
}
