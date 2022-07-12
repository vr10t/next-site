import { StripeError } from "@stripe/stripe-js";
import { NextApiRequest, NextApiResponse } from "next";
import initStripe from "stripe";
import { buffer } from "micro";
import { getServiceSupabase } from "../../utils/supabaseClient";
export const config = { api: { bodyParser: false } };
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = getServiceSupabase();
  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: "2020-08-27",
  });
  const signature: any = req.headers["stripe-signature"];
  const signingSecret = process.env.STRIPE_SIGNING_SECRET!;
  const reqBuffer = await buffer(req);
  let event;
  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
  } catch (error: any) {
    res.status(400).send(`Webhook error: ${error.message}`);
  }
  switch (event?.type) {
    case "checkout.session.completed":
     try {
        
     } catch (error) {
         
     } await  supabase.from("bookings").select().then()
      break;

    default:
      break;
  }
  console.log({ event });
  res.send({ received: true });
};
export default handler;
