import { supabase } from "./supabaseClient";
export function ev() {
  supabase.storage;
}
export async function handleSignup(ev) {
  console.log(ev);
  const res = await fetch("/api/register", {
    body: JSON.stringify({
      first_name: ev.first_name,
      last_name: ev.last_name,
      email: ev.email,
      phone: ev.phone,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const { data,error } = await res.json();
  if(error){
    return error
  }
  if(data){
    return data
  }
}
export async function getBookings(){
  const { data,error}=await supabase.from("bookings").select()
  if(data){
    return data}

    else{return error}
}
export async function registerPublicUser(ev){
  const res = await fetch("/api/submit-booking", {
    body: JSON.stringify({ 
      first_name: ev.first_name,
      last_name: ev.last_name,
      email: ev.email,
      phone: ev.phone,
      booking_id:ev.booking_id
     }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const { data,error } = await res.json();
  if(error){
    return error
  }
  if(data){
    return data
  }
}
export async function handleSubmitBooking(ev) {
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
      return_date: ev.return_date,
      flight_number: ev.flight_number,
      distance: ev.distance,
      
      service: ev.service, 
    return_time: ev.return_time,
  plane_arriving_from: ev.plane_arriving_from,
  airline_name:ev.airline_name,
    return_location: ev.return_location,
    return_destination: ev.return_destination,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const { data,error } = await res.json();
  if(error){
    return error
  }
  if(data){
    return data
  }
  
}
export async function cancelBooking(id){
  const { data,error}=await supabase.from("bookings").delete().match({id:id})
   if(data){
    return data}

    else{return error.message}
}
