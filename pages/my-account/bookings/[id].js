import { useRouter } from "next/router";
import { getBookingById } from "../../../utils/supabase-helpers";
import Layout from "../../../src/components/layout";
import Sidebar from "../../../src/components/Account/Sidebar";
export default function handler(){
    let data
const router = useRouter()
console.log(router.query);
const qid = router.query.id
qid&& getBookingById(qid).then(res=>data=res)

// const { id,
//     created_at,
//     location,
//     destination,
//     date,
//     passengers,
//     distance,
//     service,
//     return_date,
//     flight_number,
//     first_name,
//     email,
//     phone,
//     last_name,
//     time,
//     return_time,
//     luggage,
//     return_luggage,
//     plane_arriving_from,
//     airline_name,
//     return_first_name,
//     return_email,
//     return_phone,
//     return_service,
//     return_last_name,
//     return_passengers,
//     return_location,
//     return_destination,
//     user_id,}=data
return <>
     <Layout title="My Account">
        <div className="flex">
          <Sidebar />
          <div  className="w-full h-screen  items-center bg-red-600 flex flex-col gap-4 pt-10 -z-20">
           
            <div className="">
{data.date}{data.time}
            </div>
          </div>
        </div>{" "}
      </Layout>
</>
}