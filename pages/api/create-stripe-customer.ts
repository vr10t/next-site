import { NextApiRequest, NextApiResponse } from "next";
import initStripe from "stripe";
import { supabase } from "../../utils/supabaseClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send("You are not authorized to call this API");
  }
  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: "2020-08-27",
  });
  const customer = await stripe.customers.create({
    email: req.body.record.email,
  });
  await supabase
    .from("profiles")
    .update({ stripe_customer: customer.id })
    .eq("id", req.body.record.id);
  res.send({ message: `stripe customer created: ${customer.id}` });
};
export default handler;
