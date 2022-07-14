import { getServiceSupabase } from "../../utils/supabaseClient";

export default async function handler(req,res){
    const supabase = getServiceSupabase()
    const {data,error,status} = await supabase.from("bookings").select()
    if (status===200){
        return res.status(200).json({data})
    }
    
        return res.status(status).json({error:error.message})
    

}