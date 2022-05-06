import Services from "../Services/Services";
import Features from "./Features";
import Image from "next/image";
import promo6 from "../../../public/promo-6.webp"

// import tailwindcss from 'tailwindcss'
export default function Welcome() {
  return (
    <div id="about" className="max-w-screen bg-gray-100">
      <div className="flex flex-col justify-center">
        <hr></hr>
        <h1 className="relative text-gray-900 px-4 md:ml-10 mt-12  pt-20 font-bold text-4xl sm:text-5xl  ">
          About us...
          
        </h1>
      </div>

      {/* <div className="h-20 bg-gray-50"></div> */}

      <div className=" px-4  py-16 sm:flex flex-col items-center lg:flex-row">
        <div className="lg:block hidden rounded-xl mx-4  lg:w-2/5  justify-start">
          <Image className="rounded-xl" src={promo6} alt="..." width={1000} height={1300} />
        </div>
        <div className="max-w-screen md:ml-4  w-fit lg:w-1/2 lg:justify-end">
          <h1 className="mb-10 text-3xl xl:text-center text-gray-900 font-bold tracking-tight sm:text-4xl">
            {" "}
            Most Trusted Cab Taxi Company in Hemel Hempstead
          </h1>
          <h3 className="mb-4 text-xl text-gray-900 font-bold tracking-tight sm:text-2xl">
            <p>
              We offer a reliable and trustworthy minicab service all over
              London. Book online or call our friendly team on (123) 456-78-90 .
            </p>
          </h3>
          <h5 className="mb-4">
            <p className="mb-4 text-gray-500">
              We have over 100 experienced minicab drivers fully licenced and
              PCO registered covering all London Postcodes and London Airports.
              These include London City Airport, London Gatwick Airport, London
              Heathrow Airport, London Luton Airport and London Stansted
              Airport.
            </p>
            <p className="mb-4 text-gray-500">
              We care deeply about the reliable service that our
              clients get, whenever you book. Whether your booking is made
              online or by phone your journey is important to us and we will
              endeavour to ensure that every trip made with us is satisfactory.
            </p>
          </h5>
        </div>
      </div>
      <Services />
      <Features />
    </div>
  );
}
