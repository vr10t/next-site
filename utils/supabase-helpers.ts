import useSWR from 'swr';
import { supabase, getServiceSupabase } from './supabaseClient';
import { fetchGetJSON } from './api-helpers';
import { AppData } from '../src/context/state';
import { Booking } from '../pages/my-account/bookings';

export async function handleSignup(ev: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}) {
  console.log(ev);
  const res = await fetch('/api/register', {
    body: JSON.stringify({
      first_name: ev.first_name!,
      last_name: ev.last_name,
      email: ev.email,
      phone: ev.phone,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  const { user, error,session } = await res.json();
  return { user, error,session };
  
}
export function getBookings(userBookings: string[]) {
  const { data, error } = useSWR([`/api/get-bookings`, userBookings], fetcher);
console.log(data,error,userBookings);

  return {
    data,
    isLoading: !error && !data,
    isError: {error,userBookings},
  };
}
export function getBookingById(id: string) {
  const { data, error } = useSWR([`/api/get-booking-id`, id], fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
export async function getBookingsForUser(uid: string) {
  const res = await fetch('/api/user-data', {
    headers: {
      'Content-Type': 'application/json',
      id: uid,
    },
  });
  const { data, error } = await res.json();
  if (data) {
    const {bookings} = data[0];
    return { bookings };
  }
  return { error };
}
const fetcher = (url: string, id: string) =>
  fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json', id }),
    credentials: 'same-origin',
  }).then((res) => res.json());

export async function updateUserBookings(
  uid: string,
  bid: string,
  prev?: string[]
) {
  const previousBookings = prev?prev[0]:''
  const res = await fetch('/api/update-bookings', {
    body: JSON.stringify({
      userId: uid,
      bookingId: bid,
      previousBookings,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  const { data, error } = await res.json();
  return {data,error}
}
export async function updateUserDetails(
  uid: string,
  values: {
    id: string | undefined;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    bookings: string[];
  }
) {
  const { data, error, status } = await supabase
    .from('profiles')
    .update(values)
    .eq('user_id', uid);

  if (error) return { error, status };
  if (data) {
    return { data, status };
  }
}
export async function deleteUserBooking(
  uid: string,
  bid: string,
  prev: string[]
) {
  // where prev is all user bookings
  const index = prev.findIndex((val) => val === bid);
  prev.splice(index, 1);
  const { data, error } = await supabase
    .from('profiles')
    .update({ bookings: [prev] })
    .eq('user_id', uid)
    .single();
  if (error) return error;
  if (data) {
    return data;
  }
}
export async function createUserBookings(uid: string, bid: string) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ bookings: [bid] })
    .eq('user_id', uid);
  return { data, error };
}

export async function registerPublicUser(ev: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  booking_id: string;
}) {
  const res = await fetch('/api/register-user', {
    body: JSON.stringify({
      first_name: ev.first_name,
      last_name: ev.last_name,
      email: ev.email,
      phone: ev.phone,
      booking_id: ev.booking_id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  const { data, error } = await res.json();
  if (error) {
    return error;
  }
  if (data) {
    return data;
  }
}
export async function handleSubmitBooking(ev: AppData) {
  console.log(ev);
  const res = await fetch('/api/submit-booking', {
    body: JSON.stringify({
      first_name: ev.first_name,
      last_name: ev.last_name,
      email: ev.email,
      phone: ev.phone,
      return_first_name: ev.return_first_name,
      return_last_name: ev.return_last_name,
      return_email: ev.return_email,
      return_phone: ev.return_phone,
      location: ev.location,
      destination: ev.destination,
      passengers: ev.passengers,
      date: ev.date,
      time: ev.time,
      return_date: ev.return_date,
      flight_number: ev.flight_number,
      distance: ev.distance,
      service: ev.service,
      return_time: ev.return_time,
      plane_arriving_from: ev.plane_arriving_from,
      airline_name: ev.airline_name,
      return_location: ev.return_location,
      return_destination: ev.return_destination,
      total_trip_price: ev.total_trip_price,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  const { data, error } = await res.json();
  return { data, error };
}
export async function deleteBooking(id: string) {
  const { data, error } = await supabase
    .from('bookings')
    .delete()
    .match({ id });
  if (data) {
    return data;
  } 
    return error.message;
  
}
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return error;
}
