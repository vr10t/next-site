import { getServiceSupabase } from "../../utils/supabaseClient";
import { withSentry } from '@sentry/nextjs';
async function handler(req, res) {
  // Get body submitted in request's body.
  // const router =useRouter()
  const supabase = getServiceSupabase()
  const body = req.body;

  let { data, error } = await supabase
    .from("users")
    .insert([
      {
        first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      phone: body.phone,
      bookings:[body.booking_id]
      },
    ]);

  if (error) {
    // console.warn(error);
    return res.status(401).json({ error:error});
  }
  // Send 200 success if there were no errors!
  // and also return a copy of the object we received from Supabase
  return res.status(200).json({ data: data });
}
export default withSentry(handler);