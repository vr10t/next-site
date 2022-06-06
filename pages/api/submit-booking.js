import { supabase } from "../../utils/supabaseClient";
export default async function handler(req, res) {
  // Get body submitted in request's body.
  // const router =useRouter()
  const body = req.body;
  let { data, error } = await supabase
    .from("bookings")
    .insert([
      {
        pickup_location: body.location,
        dropoff_destination: body.destination,
        passengers: body.passengers,
        pickup_date: body.date,
        pickup_time: body.time,
        distance: body.distance,
        service: body.service,
      },
    ]);

  if (error) {
    console.warn(error.message);
    return res.status(401).json({ error: error.message });
  }
  // Send 200 success if there were no errors!
  // and also return a copy of the object we received from Supabase
  return res.status(200).json({ data: data });
}
