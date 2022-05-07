import ServicesItem from "./ServicesItem"
import { FaMapMarkedAlt } from "@react-icons/all-files/fa/FaMapMarkedAlt";
import { FaPlaneDeparture } from "@react-icons/all-files/fa/FaPlaneDeparture";
import { FaRoute } from "@react-icons/all-files/fa/FaRoute";
import { FaTaxi } from "@react-icons/all-files/fa/FaTaxi";

export default function Services(){
    return(
      <>
        <div className="lg:text-center mx-4">
          <h2 className="text-base text-sky-700 font-semibold tracking-wide uppercase">
            Our benefits
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Find out why people choose us
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-700 lg:mx-auto">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
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
      </>
    )
}