/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState, SetStateAction, MouseEvent, KeyboardEventHandler } from 'react';
import { FaAngleDown } from '@react-icons/all-files/fa/FaAngleDown';
import Link from 'next/link';
import { Loader } from '@googlemaps/js-api-loader';
import { useRouter } from 'next/router';
import { Checkbox, Spinner } from 'flowbite-react';
import toast, { Toaster } from 'react-hot-toast';
import { useAppContext, useAuthContext } from '../src/context/state';

import Layout from '../src/components/layout';
import Announcement from '../src/components/Announcement';
import Summary from '../src/components/Booking/Summary';

import PaymentSelect from '../src/components/Booking/PaymentSelect';
import ProgressIcons from '../src/components/Booking/ProgressIcons';

import Service from '../src/components/Booking/Service';
import getStripe from '../utils/getStripe';
import { fetchPostJSON } from '../utils/api-helpers';
import {
  deleteBooking,
  getBookingsForUser,
  handleSignup,
  handleSubmitBooking,
  updateUserBookings,
} from '../utils/supabase-helpers';
import FlightMonitoring from '../src/components/Booking/FlightMonitoring';
import ContactDetails from '../src/components/Booking/ContactDetails';
// import {google} from "googleapis"
export default function Booking() {
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    version: 'weekly',
    libraries: ['places'],
  });
  useEffect(() => {
    loader.load().then(() => {
      setMapsLoaded(true);
    });
  }, []);

  const router = useRouter();
  const { data, setData } = useAppContext();
  const user = useAuthContext();
  const [loading, setLoading] = useState(false);
  let distanceInMiles: number;
  const [farePrice, setFarePrice] = useState(4);
  const tripStartsAt = parseInt(data.date, 10);
  let tripPrice = 0;
  const [showBanner, setShowBanner] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const summaryClassNames = showSummary
    ? 'fixed flex  top-20  drop-shadow-xl w-screen text-gray-50 text-3xl justify-center bg-sky-500 h-8'
    : 'fixed flex drop-shadow-md items-center rotate-180 bottom-32 w-screen text-gray-50 text-3xl justify-center bg-sky-500 h-8';
  const [serviceSelected, setServiceSelected] = useState(null);
  const [returnServiceSelected, setReturnServiceSelected] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [returnInstructions, setReturnInstructions] = useState('');
  const [showReturnServices, setShowReturnServices] = useState(false);

  let parsedData: {
    location: string;
    destination: string;
    passengers: string;
    date: string;
    time: string;
    distance: string;
    duration: string;
    service: string;
    payment: string;
    return: boolean;
    return_date: string;
    return_time: string;
    flight_monitoring: boolean;
    airline_name: string;
    plane_arriving_from: string;
    flight_number: string;
    return_location: string;
    return_destination: string;
    return_passengers: string;
  };
  let BOOKING_DATA: typeof parsedData;

  useEffect(() => {
    parsedData = JSON.parse(window.localStorage.getItem('BOOKING_DATA')!);
    BOOKING_DATA =
      {
        location: data.location,
        destination: data.destination,
        passengers: data.passengers,
        date: data.date,
        time: data.time,
        distance: data.distance,
        duration: data.duration,
        service: data.service,
        payment: data.payment,
        return: data.return,
        return_date: data.return_date,
        return_time: data.return_time,
        flight_monitoring: data.flight_monitoring,
        airline_name: data.airline_name,
        plane_arriving_from: data.plane_arriving_from,
        flight_number: data.flight_number,
        return_location: data.return_location,
        return_destination: data.return_destination,
        return_passengers: data.return_passengers,
      } || parsedData;
    // data.return_location = returnLocation || data.return_location;
    // data.return_destination = returnDestination || data.return_destination;
    // data.instructions = instructions || data.instructions;
    // data.return_instructions = returnInstructions || data.return_instructions;
    // data.return_passengers = returnPassengers || data.return_passengers;
    console.log(data.return_location);
    setData(data);
  }, [instructions, returnInstructions]);
  useEffect(() => {
    if (user) {
      data.first_name = user?.first_name;
      data.last_name = user?.last_name;
      data.phone = user?.phone;
      data.email = user?.email;

      data.user_id = user?.id;
      setData(data);
      console.log(data);
    }
  }, [user]);

  function validateParsedData(obj: {
    location: string;
    destination: string;
    passengers: string;
    date: string;
    time?: string;
    distance?: string;
    duration?: string;
    service?: string;
    payment?: string;
    return?: boolean;
    return_date?: string;
    return_time?: string;
    flight_monitoring?: boolean;
    airline_name?: string;
    plane_arriving_from?: string;
    flight_number?: string;
    return_location?: string;
    return_destination?: string;
  }) {
    console.log(
      'validating',
      obj.location === undefined ||
        obj.destination === undefined ||
        obj.date === undefined ||
        obj.passengers === undefined
    );
    if (
      obj.location === undefined ||
      obj.destination === undefined ||
      obj.date === undefined ||
      obj.passengers === undefined
    ) {
      return false;
    }
    return true;
  }

  function setContextDataToLocalStorageData() {
    // check whether booking data is present
    parsedData = JSON.parse(window.localStorage.getItem('BOOKING_DATA')!);
    // console.log("parsedData:", parsedData);
    try {
      const parsedDataIsValid = validateParsedData(parsedData);
      if (parsedDataIsValid) {
        console.log('parsed data is valid. setting data...');
        data.location = parsedData.location;
        data.destination = parsedData.destination;
        data.passengers = parsedData.passengers;
        data.date = parsedData.date;
        data.time = parsedData.time;
        data.distance = parsedData.distance;
        data.duration = parsedData.duration;
        data.service = parsedData.service;
        data.payment = parsedData.payment;
        data.return = parsedData.return;
        data.return_date = parsedData.return_date;
        data.return_time = parsedData.return_time;
        data.flight_monitoring = parsedData.flight_monitoring;
        data.airline_name = parsedData.airline_name;
        data.plane_arriving_from = parsedData.plane_arriving_from;
        data.flight_number = parsedData.flight_number;
        data.return_location = parsedData.return_location;
        data.return_destination = parsedData.return_destination;

        data.return_passengers = parsedData.return_passengers;
        console.log('setting data parsing data');
        setData(data);
      }
    } catch (error) {
      console.log('parsed data is not valid. aborting...', parsedData);
    }
  }
  function setLocalStorageToBookingDataVar() {
    // console.log(BOOKING_DATA.distance !== undefined, "snjansj");
    if (BOOKING_DATA?.distance !== undefined) {
      console.log('setting booking data');
      window.localStorage.setItem('BOOKING_DATA', JSON.stringify(BOOKING_DATA));
    }
  }
  function setBookingDataVarToContextData() {
    BOOKING_DATA = {
      location: data.location,
      destination: data.destination,
      passengers: data.passengers,
      date: data.date,
      time: data.time,
      return: data.return,
      return_date: data.return_date,
      return_time: data.return_time,
      payment: data.payment,
      flight_monitoring: data.flight_monitoring,
      airline_name: data.airline_name,
      plane_arriving_from: data.plane_arriving_from,
      flight_number: data.flight_number,
      distance: data.distance,
      duration: data.duration,
      service: data.service,

      return_location: data.return_location,
      return_destination: data.return_destination,
      return_passengers: data.return_passengers,
    };
  }

  function savelocalStorage() {
    // setContextDataToLocalStorageData();

    if (!data.distance) {
      // setShowPopup(false);
      setContextDataToLocalStorageData();
    } else {
      setLocalStorageToBookingDataVar();
    }
  }
  function calculatePrice() {
    try {
      // Extract the float
      console.log(data.distance);
      const distanceInMilesString = data.distance.match(
        /[+-]?([0-9]*[.])?[0-9]+/
      )![0];
      distanceInMiles = parseFloat(distanceInMilesString);

      console.log(typeof distanceInMiles);
    } catch (error) {
      // console.log(error)
    }
    if (tripStartsAt >= 0 && tripStartsAt <= 7) {
      setFarePrice(6);
    }
    console.log(farePrice, distanceInMiles);
    tripPrice = Math.round(farePrice * distanceInMiles * 100) / 100;
    data.price_per_mile = farePrice;
    data.total_trip_price = tripPrice;
  }

  function verifyDataIsValidBeforeEnablingSubmitButton() {
    setCanSubmit(false);
    if (
      data.location !== undefined &&
      data.destination !== undefined &&
      data.passengers !== undefined &&
      data.date !== undefined &&
      data.service !== undefined &&
      data.payment !== undefined &&
      data.first_name !== undefined &&
      data.first_name !== '' &&
      data.last_name !== undefined &&
      data.last_name !== '' &&
      data.email !== undefined &&
      data.email !== '' &&
      data.phone !== undefined &&
      data.phone !== '' &&
      data.total_trip_price
    ) {
      console.log('setting data inside cansubmit', canSubmit);
      // setData(data)
      setCanSubmit(true);
    }
  }

  useEffect(() => {
    console.log(user, 'user');
    console.log(data.user_id, 'data.user_id');

    console.log('dataaaa', data);
    if (data.distance === undefined) {
      savelocalStorage();
    }

    console.log('BOOKING_DATA: ', BOOKING_DATA);

    calculatePrice();

    verifyDataIsValidBeforeEnablingSubmitButton();
  }, [data]);

  // useEffect(() => {
  //   savelocalStorage();

  // }, []);

  useEffect(() => {
    console.log('useEffect');
    setBookingDataVarToContextData();
    setLocalStorageToBookingDataVar();
  }, [data]);

  async function handleRedirectToCheckout() {
    // Create a Checkout Session.
    const response = await fetchPostJSON('/api/checkout_sessions', {
      name: data.destination,
      bookingId: data.id,
      customerId: user?.stripe_customer,
    });

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      // Make the id input from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
  }

  useEffect(() => {
    setServiceSelected(data.service as unknown as SetStateAction<null>);
    setReturnServiceSelected(
      data.return_service as unknown as SetStateAction<null>
    );
  }, []);
  const handleSelectService = (e:any): void => {
    if ((e.target as HTMLFormElement).id !== '') {
      setServiceSelected(
        (e.target as HTMLFormElement).id as unknown as SetStateAction<null>
      );
      data.service = (e.target as HTMLFormElement).id;
      console.log(data.service);
    }
    //
  };
  const handleSelectReturnService = (e: any): void => {
    if ((e.target as HTMLFormElement).id !== '') {
      setReturnServiceSelected(
        (e.target as HTMLFormElement).id as unknown as SetStateAction<null>
      );
      data.return_service = (e.target as HTMLFormElement).id;
      console.log(data.return_service);
    }
    //
  };

  async function submitBoookingForUser() {
    console.log(data);
    const response = await handleSubmitBooking(data);
    if (response.error) {
      console.error(response.error);
      toast.error('Something went wrong. Please try again later.', {
        duration: 4000,
      });
      setLoading(false);
      return;
    }
    // if data submitted successfully, get previous user bookings and add the new booking to the list
    if (response.data) {
      console.log('booking submitted successfully', response);
      const bookingId = response.data[0].id;
      data.id = bookingId;
      const { bookings, error } = await getBookingsForUser(user.id);

      console.log(bookings, error);

      const updatedBookings = await updateUserBookings(
        user.id,
        bookingId,
        bookings
      );
      console.log(updatedBookings);
      // if there is an error updating the user bookings, delete the booking
      if (updatedBookings.error) {
        await deleteBooking(bookingId);
        console.error('error updating user bookings');
        toast.error('Error updating user bookings', {
          duration: 4000,
        });
        setLoading(false);
        return;
      }
      toast.success('Booking submitted successfully', {
        duration: 4000,
      });

      handleRedirectToCheckout();
      setLoading(false);
    }
  }
  async function handleBooking() {
    setLoading(true);
    if (user) {
      submitBoookingForUser();
      return;
    }
    // register user

    const {
      user: res,
      error,
      session,
    } = await handleSignup({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
    });
    console.log(res, error, session);
    data.user_id = res?.id;

    if (res) {
      const { data: booking, error: bookingError } = await handleSubmitBooking(
        data
      );

      if (booking) {
        const bookingId = booking[0].id;
        data.id = bookingId;
        console.log(data.user_id, 'userId');
        const updatedBookings = await updateUserBookings(
          data.user_id,
          bookingId,
          ['']
        );
        console.log(updatedBookings);
        // if there is an error updating the user bookings, delete the booking
        if (updatedBookings.error) {
          await deleteBooking(bookingId);

          console.error('error updating user bookings');
          toast.error('Error updating user bookings', {
            duration: 4000,
          });
          setLoading(false);
        } else {
          console.log('user bookings updated successfully');
          if (data.payment === 'Cash') {
            toast.success('Booking submitted successfully', {
              duration: 4000,
            });
            setLoading(false);
          }
          if (data.payment === 'Card') {
            toast.success('Redirecting to payment...', {
              duration: 4000,
            });
            setLoading(false);
            handleRedirectToCheckout();
          }
        }
      } else {
        console.error(bookingError);
        toast.error(bookingError.message, {
          duration: 4000,
        });
        setLoading(false);
      }
    }
    if (error) {
      console.error(error);
      toast.error(error.message, {
        duration: 4000,
      });
      setLoading(false);
    }
  }
  function handleCheckboxClick(e: MouseEvent<HTMLInputElement>) {
    if ((e.target as HTMLInputElement).id === 'different_return_service') {
      if ((e.target as HTMLInputElement).checked) {
        setShowReturnServices(true);
      } else {
        setShowReturnServices(false);
        data.return_service = '';
      }
    }
  }

  return (
    <>
      <Layout>
        {!user && showBanner && (
          <Announcement onClick={() => setShowBanner(false)} />
        )}

        {/* <div
          className={`${
            showSummary ? '' : ''
          } mt-20 bg-gray-100 w-full lg:w-1/2 mx-auto h-32 flex items-center justify-center lg:justify-start  z-[7] text-4xl  font-medium text-center text-gray-800`}
        > */}
        {/* <p className='z-20'>You're almost there!</p> */}
        {/* </div> */}
        <Toaster />
        <div
          className={`${
            showSummary ? ' h-0 lg:h-auto' : ''
          }static mt-10  justify-center lg:justify-start lg:pl-[5%] xl:pl-[20%]  w-[95vw] sm:w-[97vw] mx-auto  max-w-screen bg-gray-100  flex flex-col lg:flex-row  `}
        >
          <div className='' />

          <div className='bg-fixed overscroll-none'>
            {showSummary && (
              <div className='flex bg-fixed lg:hidden'>
                <div className='overscroll-contain bg-fixed z-[21] top-20  fixed  left-0 h-screen overflow-auto'>
                  {mapsLoaded && <Summary onClick={handleBooking} />}
                </div>
              </div>
            )}

            <div className='lg:hidden  z-[21] h-20 fixed bottom-0 left-0  flex justify-center max-w-screen w-screen   bg-gray-100 '>
              <div
                role='button'
                tabIndex={0}
                onClick={() => setShowSummary(!showSummary)}
                onKeyDown={() => setShowSummary(!showSummary)}
                className={summaryClassNames}
              >
                <FaAngleDown />
              </div>
              {!showSummary && <ProgressIcons />}

              <button
                type='button'
                onClick={handleBooking}
                disabled={!canSubmit || loading}
                className='flex justify-center   items-center mx-12 my-2 w-full h-16 text-2xl font-medium text-center text-gray-50 bg-sky-500 rounded-lg disabled:bg-gray-500'
              >
                Book Now
                {loading && <Spinner className='relative left-10' size='md' />}
              </button>
            </div>
          </div>
          <div className='max-w-full xs:px-4 sm:px-8 lg:w-[32rem]'>
            <form  onKeyDown={handleSelectService} onClick={handleSelectService} className=''>
              <div className='w-full text-lg font-medium tracking-wider text-gray-600 bg-gray-100'>
                CHOOSE YOUR SERVICE
              </div>
              <Service
                name='Standard'
                for='Standard'
                image='standard'
                passengers='3'
                luggage='3'
                selected={serviceSelected === 'Standard'}
              />
              <Service
                name='Select'
                for='Select'
                image='select'
                passengers='5'
                luggage='4'
                selected={serviceSelected === 'Select'}
              />
              <Service
                name='MPV'
                for='MPV'
                image='MPV'
                passengers='5'
                luggage='4'
                selected={serviceSelected === 'MPV'}
              />
              <Service
                name='Bus'
                for='Bus'
                image='bus'
                passengers='16'
                luggage='16'
                selected={serviceSelected === 'Bus'}
              />
            </form>
            {data.return && (
              <div className='flex py-2 items-center justify-between'>
                <div className='gap-1 items-center flex'>
                  <Checkbox
                    onClick={handleCheckboxClick}
                    id='different_return_service'
                  />
                  <label
                    className='self-center text-base text-gray-900'
                    htmlFor='different_return_service'
                  >
                    Different service on return?
                  </label>
                </div>
              </div>
            )}
            {showReturnServices && (
              <form onKeyDown={handleSelectReturnService} onClick={handleSelectReturnService} className=''>
                <div className='w-full text-lg font-medium tracking-wider text-gray-600 bg-gray-100'>
                  RETURN SERVICE
                </div>
                <Service
                  name='Standard'
                  for='StandardReturn'
                  image='standard'
                  passengers='3'
                  luggage='3'
                  selected={returnServiceSelected === 'StandardReturn'}
                />
                <Service
                  name='Select'
                  for='SelectReturn'
                  image='select'
                  passengers='5'
                  luggage='4'
                  selected={returnServiceSelected === 'SelectReturn'}
                />
                <Service
                  name='MPV'
                  for='MPV'
                  image='MPV'
                  passengers='5'
                  luggage='4'
                  selected={serviceSelected === 'MPV'}
                />
                <Service
                  name='Bus'
                  for='BusReturn'
                  image='bus'
                  passengers='16'
                  luggage='16'
                  selected={returnServiceSelected === 'BusReturn'}
                />
              </form>
            )}

            {!user?.phone && (
              <section className=''>
                <div className='flex items-stretch w-full text-lg font-medium tracking-wider text-gray-600 bg-gray-100'>
                  <p className='grow'> PASSENGER DETAILS</p>
                  <span className='flex self-center tracking-tight text-sm'>
                    <p className=' mr-2  '> or </p>
                    <Link href='/signin?referrer=/booking'>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a className=' text-sky-600 hover:text-sky-400'>
                        Sign In
                      </a>
                    </Link>
                  </span>

                  {/* <div>or </div> */}
                </div>

                <div className='px- bg-gray-100 border-gray-400 shadow-sm lg:w-full '>
                  <div className='flex justify-between items-center cursor-pointer'>
                    <div className='w-full'>
                      <ContactDetails />
                    </div>
                  </div>
                </div>
              </section>
            )}
            {data.flight_monitoring && <FlightMonitoring />}
            <section className=''>
              <div className='w-full text-lg font-medium tracking-wider text-gray-600 bg-gray-100'>
                PAYMENT
              </div>
              <div className='flex flex-col justify-center p-6 bg-gray-100 border-gray-400 shadow-sm max-w-lg'>
                <PaymentSelect />
              </div>
            </section>
          </div>
          <div className='hidden sticky lg:flex float-right '>
            {mapsLoaded && <Summary onClick={handleBooking} />}
          </div>
          {/* <div className="hidden lg:flex">
            <div className=" z-[7] -top-20  lg:relative right-0 float-right h-screen lg:h-full min-w-max overflow-auto">
              
            </div>
          </div> */}
        </div>
        <div className={`${'h-40'} `} />
      </Layout>
      <div className={`${'h-40 lg:h-0'} `} />
    </>
  );
}
