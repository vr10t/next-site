import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "../../src/context/state";
import Layout from "../../src/components/layout";
import Sidebar from "../../src/components/Account/Sidebar";
import { supabase } from "../../utils/supabaseClient";
import { getBookings, getBookingsForUser } from "../../utils/supabase-helpers";
import Initial from "../../src/components/Account/Initial";
export default function MyAccount() {
  const session = useAuthContext();
  
  const email = session?.user.email;
  const firstName = session?.user.user_metadata?.firstName
  const lastName = session?.user.user_metadata?.lastName
  const phone = session?.user.phone;
  const id = session?.user.id
  
  
  const router = useRouter();
  useEffect(() => {
      console.log(session);
    if (!session) {
      // router.push("/signin")
      return;
    }
    getBookingsForUser(id).then(
      res=>{console.log(res[0].bookings)
      getBookings().then(resp=>console.log(resp))}
      )
    
  }, [session]);
 
  return (
    <>
      <Layout title="My Account">
        <div className="flex">
          <Sidebar />
          <div  className="w-full h-screen  items-center bg-red-600 flex flex-col gap-4 pt-10 -z-20">
            <Initial />
            <div className="">
<p className="">{firstName }{lastName}</p>
<p className="">{email}</p>
<p className="">{phone}</p>
            </div>
          </div>
        </div>{" "}
      </Layout>
    </>
  );
}
