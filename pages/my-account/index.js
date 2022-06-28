import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "../../src/context/state";
import Layout from "../../src/components/layout";
import Sidebar from "../../src/components/Account/Sidebar";
import { supabase } from "../../utils/supabaseClient";
export default function MyAccount() {
  const session = useAuthContext();
  const initial = session?.user.email.slice(0, 1);
  const email = session?.user.email;
  const firstName = session?.user.user_metadata?.firstName
  const lastName = session?.user.user_metadata?.lastName
  const phone = session?.user.phone;
  const id = session?.user.id
  console.log(initial);
  const user = async ()=>{
      
   let prev =  await supabase.from("users").select("bookings").eq("id", "86ceef51-5d75-44e3-973e-68c6cbf507f1")
   prev=prev?.body[0]?.bookings
   console.log(prev);
   await supabase.from("users").update({bookings:[prev + ","+"42"]}).eq("id", "86ceef51-5d75-44e3-973e-68c6cbf507f1").then(res=>console.log(res))
  }
  user()
  const router = useRouter();
  useEffect(() => {
      console.log(session);
    if (!session) {
      // router.push("/signin")
      return;
    }
  }, [session]);

  return (
    <>
      <Layout title="My Account">
        <div className="flex">
          <Sidebar />
          <div className="w-full h-screen  items-center bg-red-600 flex flex-col gap-4 pt-10 -z-20">
            <div className=" bg-gray-200 rounded-full h-32 w-32 flex justify-center items-center pb-2 text-black/80 font-medium  text-7xl">
              {initial}
            </div>
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
