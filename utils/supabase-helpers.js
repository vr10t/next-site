import { supabase } from "./supabaseClient";
export function ev() {
  supabase.storage;
}
export async function handleSignup(ev) {
  console.log(ev);
  const res = await fetch("/api/register", {
    body: JSON.stringify({
      name: ev.name,
      email: ev.email,
      phone: ev.phone,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const { user } = await res.json();
  return user;
}
export async function handleSubmitBooking(ev) {
  console.log(ev);
  const res = await fetch("/api/submit-booking", {
    body: JSON.stringify({
      name: ev.name,
      email: ev.email,
      phone: ev.phone,
      location: ev.location,
      destination: ev.destination,
      passengers: ev.passengers,
      date: ev.date,
      time: ev.time,
      distance: ev.distance,
      duration: ev.duration,
      service: ev.service,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const { booking } = await res.json();
  console.log( booking);
}
