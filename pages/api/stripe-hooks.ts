import { StripeError } from '@stripe/stripe-js';
import { NextApiRequest, NextApiResponse } from 'next';
import initStripe from 'stripe';
import { buffer } from 'micro';
import Cors from 'micro-cors';
import { PostgrestResponse } from '@supabase/supabase-js';
import { getServiceSupabase } from '../../utils/supabaseClient';

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});
export const config = { api: { bodyParser: false } };
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = getServiceSupabase();
  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2020-08-27',
  });
  const signature: any = req.headers['stripe-signature'];
  const signingSecret = process.env.STRIPE_SIGNING_SECRET!;
  const reqBuffer = await buffer(req);
  let event;
  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
  } catch (error: any) {
    res.status(400).send(`Webhook error: ${error.message}`);
  }
  switch (event?.type) {
    
    case 'checkout.session.completed':
      // Handle the checkout.session.completed event
      try {
        // confirm booking in bookings table
        // get checkout session object
        const session = await stripe.checkout.sessions.retrieve((event.data.object as any).id);
        const {bookingId} = session.metadata!;
        const booking = await supabase
          .from('bookings')
          .select('*')
          .eq('id', bookingId);
        if ((booking as unknown as string[]).length === 0) {
          res.status(404).send('Booking not found');
        } else {
          await supabase
            .from('bookings')
            .update({
              status: 'Confirmed',
            })
            .eq('id', bookingId);
          res.status(200).send('Booking confirmed');
        }
      } catch (error) {
        res.status(500).send(error);
      }

      break;
    case 'checkout.session.expired':
      // Handle the checkout.session.expired event
      try {
        const session = await stripe.checkout.sessions.retrieve((event.data.object as any).id);
        const {bookingId} = session.metadata!;

        const booking = await supabase
          .from('bookings')
          .select('*')
          .eq('id', bookingId);
        if ((booking as unknown as string[]).length === 0) {
          res.status(404).send('Booking not found');
        } else {
          await supabase.from('bookings').delete().eq('id', bookingId);
          res.status(200).send('Booking cancelled');
        }
      } catch (error) {
        res.status(500).send(error);
      }
      break;
    default:
      // Unexpected event type
      res.status(400).end();

      break;
  }
  console.log({ event });
  res.send({ received: true });
};
export default cors(handler as any);
