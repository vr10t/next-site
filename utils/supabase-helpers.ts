import { supabase, getServiceSupabase } from "./supabaseClient";
import useSWR from "swr";
import { fetchGetJSON } from "./api-helpers";
import { AppData } from "../src/context/state";

export async function handleSignup(ev: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}) {
  console.log(ev);
  const res = await fetch("/api/register", {
    body: JSON.stringify({
      first_name: ev.first_name!,
      last_name: ev.last_name,
      email: ev.email,
      phone: ev.phone,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const { data, error } = await res.json();
  if (error) {
    return error;
  }
  if (data) {
    return data;
  }
}
export function getBookings() {
  const { data, error } = useSWR([`/api/get-bookings`, ""], fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export function getBookingById(id: string) {
  const { data, error } = useSWR([`/api/get-booking-id`, id], fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export async function getBookingsForUser(uid: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("bookings")
    .eq("user_id", uid);

  if (error) return null;
  if (data) {
    return data;
  }
}
const fetcher = (url: string, id: string) =>
  fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json", id: id }),
    credentials: "same-origin",
  }).then((res) => res.json());

export async function updateUserBookings(
  uid: string,
  bid: string,
  prev: string[]
) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ bookings: [prev + "," + bid] })
    .eq("user_id", uid)
    .single();
  if (error) return error;
  if (data) {
    return data;
  }
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
    .from("profiles")
    .update(values)
    .eq("user_id", uid);

  if (error) return { error: error, status: status };
  if (data) {
    return { data: data, status: status };
  }
}
export async function deleteUserBooking(
  uid: string,
  bid: string,
  prev: string[]
) {
  //where prev is all user bookings
  const index = prev.findIndex((val) => val === bid);
  prev.splice(index, 1);
  const { data, error } = await supabase
    .from("profiles")
    .update({ bookings: [prev] })
    .eq("user_id", uid)
    .single();
  if (error) return error;
  if (data) {
    return data;
  }
}
export async function firstUserBooking(uid: string, bid: string) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ bookings: [bid] })
    .eq("user_id", uid);
  if (error) return error;
  if (data) {
    return data;
  }
}

export async function registerPublicUser(ev: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  booking_id: string;
}) {
  const res = await fetch("/api/register-user", {
    body: JSON.stringify({
      first_name: ev.first_name,
      last_name: ev.last_name,
      email: ev.email,
      phone: ev.phone,
      booking_id: ev.booking_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
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
  const res = await fetch("/api/submit-booking", {
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
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const { data, error } = await res.json();
  if (error) {
    return error;
  }
  if (data) {
    return data;
  }
}
export async function cancelBooking(id:string) {
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .match({ id: id });
  if (data) {
    return data;
  } else {
    return error.message;
  }
}
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return error;
}
