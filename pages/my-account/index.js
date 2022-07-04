import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../src/context/state";
import Layout from "../../src/components/layout";
import Sidebar from "../../src/components/Account/Sidebar";
import { supabase } from "../../utils/supabaseClient";
import {
  getBookings,
  getBookingsForUser,
  getPublicUser,
} from "../../utils/supabase-helpers";
import Initial from "../../src/components/Account/Initial";

export default function MyAccount() {
  const session = useAuthContext();
  const [userDetails, setUserDetails] = useState();

  const user_id = session?.user.id;
  useEffect(() => {
    session && getPublicUser(user_id).then((data) => setUserDetails(data));
    console.log(userDetails);
    console.log(router.asPath, "router as path");
  }, [session]);
  const fullName =
    userDetails && userDetails[0]?.first_name + " " + userDetails[0]?.last_name;
  const initial = userDetails && userDetails[0]?.first_name.slice(0, 1);
  const email = userDetails && userDetails[0]?.email;
  const firstName = userDetails && userDetails[0]?.first_name;
  const lastName = userDetails && userDetails[0]?.last_name;
  const phone = userDetails && userDetails[0]?.phone;

  const router = useRouter();
  useEffect(() => {
    console.log(session);
    if (!session) {
      // router.push("/signin")
      return;
    }
    getBookingsForUser(user_id).then((res) => {
      console.log(res[0].bookings);
      getBookings().then((resp) => console.log(resp));
    });
  }, [session]);

  return (
    <>
      <Layout title="My Account">
        <div className="flex">
          <Sidebar />
          <div className="flex flex-col gap-4 items-center pt-10 w-full h-screen bg-gray-100 -z-20">
            <div
              className={`flex justify-center items-center pb-2 w-32 h-32 text-5xl font-medium rounded-full cursor-pointer select-none bg-black/10 text-black/80`}>
              {initial}
            </div>{" "}
            <div className="">
              <p className="">
                {firstName} {lastName}
              </p>
              <p className="">{email}</p>
              <p className="">{phone}</p>
            </div>
          </div>
        </div>{" "}
      </Layout>
    </>
  );
}
