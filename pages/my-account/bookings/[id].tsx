import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { FaSquare } from '@react-icons/all-files/fa/FaSquare';
import { FaCircle } from '@react-icons/all-files/fa/FaCircle';
import dayjs from 'dayjs';
import useSWR from 'swr';
import { Spinner, Tooltip } from 'flowbite-react';
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../../../utils/supabaseClient';
import { formatAmountForDisplay } from '../../../utils/stripe-helpers';
import Map from '../../../src/components/Map';
import Sidebar from '../../../src/components/Account/Sidebar';
import Layout from '../../../src/components/layout';
import { getBookingById } from '../../../utils/supabase-helpers';

const fetcher = (url: string, id: string) =>
  fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json', id }),
    credentials: 'same-origin',
  }).then((res) => res.json());
const paymentFetcher = (url: string, id: string,secret:string) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      API_ROUTE_SECRET:secret,
      bookingId: id,
    }),
    credentials: 'same-origin',
    headers: new Headers({ 'Content-Type': 'application/json', id }),
  }).then((res) => res.json());
export default function handler() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [shouldFetchDirections, setShouldFetchDirections] = useState(false);

  const [booking, setBooking] = useState({
    id: '',
    created_at: '',
    location: '',
    destination: '',
    date: '',
    passengers: '',
    distance: '',
    service: '',
    return_date: '',
    flight_number: '',
    first_name: '',
    email: '',
    phone: '',
    last_name: '',
    time: '20:21',
    return_time: '',
    luggage: '',
    return_luggage: '',
    plane_arriving_from: '',
    airline_name: '',
    return_first_name: '',
    return_email: '',
    return_phone: '',
    return_service: '',
    return_last_name: '',
    return_passengers: '',
    return_location: '',
    return_destination: '',
    user_id: '',
    total: '',
    status: 'Pending',
  });

  const router = useRouter();
  // console.log(router.query);
  const qid: string | string[] | undefined = router.query.id;

  const { data, error } = useSWR([`/api/get-booking-id`, qid,], fetcher);
  const { data: paymentIntent, error: paymentError } = useSWR(
    [`/api/get-stripe-customer`, qid,process.env.API_ROUTE_SECRET],
    paymentFetcher
  );
  console.log(paymentIntent, paymentError);
  const last4 = paymentIntent?.paymentIntent?.charges?.data[0].payment_method_details.card.last4;
  
  let brand = paymentIntent?.paymentIntent?.charges?.data[0].payment_method_details.card.brand;
  const exp_month = paymentIntent?.paymentIntent?.charges?.data[0].payment_method_details.card.exp_month;
  const exp_year = paymentIntent?.paymentIntent?.charges?.data[0].payment_method_details.card.exp_year;
  const name = paymentIntent?.paymentIntent?.charges?.data[0].billing_details.name
  const paymentIntentId = paymentIntent?.paymentIntent?.id;
  const chargeId = paymentIntent?.paymentIntent?.charges?.data[0].id;
  const receiptUrl = paymentIntent?.paymentIntent?.charges?.data[0].receipt_url;
  // capitalize first letter of brand
  brand = brand?.charAt(0).toUpperCase() + brand?.slice(1);
  console.log(last4, brand);
  // make variable status color for "Pending", "Confirmed", "Cancelled", "Completed"
  let statusColor = '';
  if (booking?.status === 'Pending') {
    statusColor = 'amber-400';
  }
  if (booking?.status === 'Confirmed') {
    statusColor = 'green-500';
  }
  if (booking?.status === 'Cancelled') {
    statusColor = 'red-500';
  }
  if (booking?.status === 'Completed') {
    statusColor = 'blue-500';
  }

  useEffect(() => {
    console.log(data?.data, 'DATA', error);
  });
  useEffect(() => {
    if (data && Array.isArray(data.data)) setBooking(data.data[0]);
    console.log(booking, 'booking');
  }, [data, error]);
  const date = dayjs(booking?.date + booking?.time).format(
    'dddd, MMMM D, YYYY h:mm A'
  );
  console.log(
    dayjs().isBefore(dayjs(booking?.date + booking?.time).subtract(5, 'hours')),
    'IS IT BEFORE'
  );
  useEffect(() => {
    setOrigin(booking?.location);
    setDestination(booking?.destination);
  }, [booking]);
  const total = formatAmountForDisplay(booking?.total, 'GBP');
  async function handleCancelBooking() {
    console.log('cancel');
  
    // only allow cancelation if time left until booking date is greater than 5 hours
    if (
      dayjs().isBefore(
        dayjs(booking?.date + booking?.time).subtract(5, 'hours')
      )
    ) {
      const res = await fetch('/api/update-booking-id', {
        body: JSON.stringify({
          id: qid,
          query: { status: 'Cancelled' },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      const { data, error } = await res.json();
      console.log(data, error);
      if (data) {
        // process refund
        const res = await fetch('/api/process-refund', {
          body: JSON.stringify({
            chargeId,
            API_ROUTE_SECRET:process.env.API_ROUTE_SECRET,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
        const { data, error } = await res.json();
        console.log(data, error);
       if(data) {toast.success('Booking canceled succesfully', {
          duration: 4000,
          position: 'top-center',
        });
        ;}
        if (error){
          // update booking status to pending
          const res = await fetch('/api/update-booking-id', {
            body: JSON.stringify({
              id: qid,
              query: { status: 'Pending' },
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });
          const { data, error } = await res.json();
          console.log(data, error);

          toast.error('Something went wrong', {
            duration: 4000,
            position: 'top-center',
          });
        }
      }
      if (error) {
        toast.error('Something went wrong', {
          duration: 4000,
          position: 'top-center',
        });
      }
    }
    else {
      toast.error('You can only cancel a booking 5 hours in advance', {
        duration: 4000,
        position: 'top-center',
      });
    }

  }
  return (
    <Layout title='My Account'>
        <div className='flex'>
          <Toaster />
          <Sidebar />
          {data ? (
            <div className='w-full h-screen  items-center flex flex-col gap-4 pt-10 '>
              <div className='bg-gray-200 flex flex-col items-start px-4 gap-2 py-5 h-full rounded-lg w-11/12 '>
                <div className='text-3xl  text-gray-900 font-medium tracking-tight'>
                  Your booking details
                </div>
                
                <div className='flex items-start px-4   rounded-lg w-11/12 '>
                  <div className={`text-2xl uppercase text-${statusColor}`}>
                    {booking?.status}
                  </div>
                </div>
                <div className='text-md text-gray-900 font-medium tracking-tight w-full justify-between flex px-4'>
                  {date}
                  <p className=''>{total}</p>
                </div>
                <span className='bg-black/20 w-5/6 h-[1px]' />
                <div className='flex flex-col bg-gray-100 w-full px-4 py-4 rounded-lg'>
                  {/* <Map
              width="100%"
              height="100px"
            origin={origin}
            destination={destination}
            shouldFetchDirections={true} /> */}

                  <div className='flex my-10 '>
                    <div className='flex mt-2 pr-4 flex-col h-5/6'>
                      <FaCircle className='mt-2 text-sky-500 z-0'>.</FaCircle>
                      <div className='border-l-4 h-full self-center border-sky-600/20 border-dotted border-' />
                      <FaSquare className='text-sky-500 z-0' />
                    </div>
                    <div>
                      <div className='text-xl text-gray-900 font-medium tracking-tight'>
                        {booking?.location}{' '}
                      </div>
                      <div className='text-sm text-gray-900 font-normal tracking-normal'>
                        {dayjs(date).format('h:mm A')}{' '}
                      </div>
                      <div className='text-xl mt-5 text-gray-900 font-medium tracking-tight'>
                        {booking?.destination} {booking?.status}
                      </div>
                    </div>
                  </div>
                </div>
                <span className='bg-black/20 w-5/6 h-[1px]' />
                <div className='flex flex-col bg-gray-200 items-center w-full px-4 py-4 rounded-lg'>
                  {paymentIntent?.paymentIntent?.charges?<div className='flex my-10 '>
                    //nice ui for payment details  https://stripe.com/docs/payments/payment-intents/web-payment-intents#payment-details
                    <div className='flex mt-2 pr-4 flex-col h-5/6'>
                      <FaCircle className='mt-2 text-sky-500 z-0'>.</FaCircle>
                      <div className='border-l-4 h-full self-center border-sky-600/20 border-dotted border-' />
                      <FaSquare className='text-sky-500 z-0' />
                    </div>
                    
                    {brand} ending in {last4}
                    {exp_month}/{exp_year}
                    {name}
                    <Link href={(receiptUrl|| "/#") } target='_blank'>
                      <a>Receipt</a>

                    </Link>

                    <div className='flex mt-2 pr-4 flex-col h-5/6' />
                  </div>:<Spinner />}
                </div>

                <div className='flex justify-center gap-4 w-full'>
                  {/* <button className="bg-sky-500 text-gray-50 py-2 px-2 rounded-lg text-lg w-full">Edit booking</button> */}
                  <Tooltip
                    style='light'
                    className={`${
                      dayjs().isBefore(
                        dayjs(booking?.date + booking?.time).subtract(
                          5,
                          'hours'
                        )
                      )
                        ? 'hidden'
                        : 'flex'
                    }`}
                    content='You cannot cancel this booking.'
                  >
                    {' '}
                    {booking?.status!=='Cancelled'&&<button
                      disabled={
                        !dayjs().isBefore(
                          dayjs(booking?.date + booking?.time).subtract(
                            5,
                            'hours'
                          )
                        )
                      }
                      onClick={handleCancelBooking}
                      className='bg-red-500  disabled:bg-gray-500 text-gray-50 py-2 px-4 rounded-lg text-lg w-full'
                    >
                      Cancel booking
                    </button>}
                  </Tooltip>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex justify-center w-full mt-64'>
              <Spinner size='xl' />
            </div>
          )}
        </div>{' '}
      </Layout>
  );
}
