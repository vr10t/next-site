import ServicesItem from "../ServicesItem/ServicesItem";
import { FaMapMarkedAlt } from "@react-icons/all-files/fa/FaMapMarkedAlt";
import { FaPlaneDeparture } from "@react-icons/all-files/fa/FaPlaneDeparture";
import { FaRoute } from "@react-icons/all-files/fa/FaRoute";
import { FaTaxi } from "@react-icons/all-files/fa/FaTaxi";
import Features from "./Features";
import Image from "next/image";

// import tailwindcss from 'tailwindcss'
export default function Welcome() {
  return (
    <div id="about" className="max-w-screen bg-gray-100">
      <div className="flex flex-col justify-center">
        <hr></hr>
        <h1 className="relative ml-2 px-4 md:ml-10 mt-12  pt-20 font-bold text-4xl sm:text-5xl  ">
          About us...
          
        </h1>
      </div>

      {/* <div className="h-20 bg-gray-50"></div> */}

      <div className=" px-4  py-16 sm:flex flex-col items-center lg:flex-row">
        <div className="lg:block hidden rounded-xl mx-4  lg:w-2/5  justify-start">
          <Image className="rounded-xl" src="/promo-6.webp" alt="..." width={1000} height={1300} />
        </div>
        <div className="max-w-screen   ml-1 md:ml-4 text-indent-sm w-fit lg:w-1/2 lg:justify-end">
          <h2 className="mb-4 ">
            {" "}
            Most Trusted Cab Taxi Company in Hemel Hempstead
          </h2>
          <h3 className="mb-4">
            <p>
              We offer a reliable and trustworthy minicab service all over
              London. Book online or call our friendly team on (123) 456-78-90 .
            </p>
          </h3>
          <h5 className="mb-4">
            <p className="mb-4">
              We have over 100 experienced minicab drivers fully licenced and
              PCO registered covering all London Postcodes and London Airports.
              These include London City Airport, London Gatwick Airport, London
              Heathrow Airport, London Luton Airport and London Stansted
              Airport.
            </p>
            <p className="mb-4">
              Luton Minicab care deeply about the reliable service that our
              clients get, whenever you book. Whether your booking is made
              online or by phone your journey is important to us and we will
              endeavour to ensure that every trip made with us is satisfactory.
            </p>
          </h5>
        </div>
      </div>
      <div className="max-w-screen md:mx-10 grid md:grid-cols-2 lg:grid-cols-4">
        <ServicesItem
          title="Address Pickup"
          text="We always pick up our clients on time, 24/7 availability."
          icon={<FaMapMarkedAlt className="" />}
        />
        <ServicesItem
          title="Airport Transfer"
          text="GetCab specialized in 24 hours airport transfer service."
          icon={<FaPlaneDeparture className="" />}
        />
        <ServicesItem
          title="Long Distance"
          text="We offer you a long distance taxi service to anywhere."
          icon={<FaRoute className="" />}
        />
        <ServicesItem
          title="Taxi Tours"
          text="We offer taxi tours of various durations and complexity."
          icon={<FaTaxi className="" />}
        />
      </div>
      <Features />
    </div>
  );
}
