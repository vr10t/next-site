import { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import { CURRENCY } from '../../../config/index';
import { formatAmountForStripe } from '../../../utils/stripe-helpers';
import { getServiceSupabase } from '../../../utils/supabaseClient';

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
});
const supabase = getServiceSupabase();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    //TODO: use amount from db
    //get total from supabase using bookingId
    const bookingId = req.body.bookingId;
    const { data: booking, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId);
    if (error) {
      res.status(500).send(error);
    }
    const amount = booking![0].total;
    // const amount = formatAmountForStripe(total, CURRENCY);
    const name: string = req.body.name;
    try {
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'book',
        payment_method_types: ['card'],
        line_items: [
          {
            name: `Booking for ${name}`,
            amount: formatAmountForStripe(amount, CURRENCY),
            currency: CURRENCY,
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/booking?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/booking`,
        metadata: { bookingId: req.body.bookingId },
      };
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);
      const bookingId = req.body.bookingId;
      const sessionId = checkoutSession.id;
      await supabase
        .from('bookings')
        .update({ status: 'pending' })
        .eq('id', bookingId);

      setTimeout(
        async () => {
          console.log('checking session status');

          const checkout_session = await stripe.checkout.sessions.retrieve(
            sessionId
          );

          if (checkout_session.payment_status === 'paid') {
            console.log('session paid');
            const { data, error, status } = await supabase
              .from('bookings')
              .update({ status: 'paid' })
              .eq('id', bookingId);
            if (error) {
              console.log(error, 'update error');
            }
            if (data) {
              console.log(data, 'update success');
            }
          } else {
            console.log('session not paid', checkout_session.payment_status);
            const { data, error, status } = await supabase
              .from('bookings')
              .delete()
              .eq('id', bookingId);

            if (error) {
              console.log(error, 'delete error');
            }
            if (data) {
              console.log(data, 'delete success');
            }
          }
        },
        // 1 hour
        3600000
      );
      res.status(200).json(checkoutSession);
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
export default handler;
