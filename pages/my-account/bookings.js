import {useRouter} from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "../../src/context/state";
import Layout from "../../src/components/layout";
import Sidebar from "../../src/components/Account/Sidebar";
export default function MyAccount(){
    const session = useAuthContext()
const router=useRouter()
useEffect(()=>{
if(!session){
    // router.push("/signin")
    return
}
},[])

return (
    <>
    <Layout title="My Bookings">
    <Sidebar />
        {}
        </Layout>
    </>
)

}