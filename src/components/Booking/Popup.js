export default function Popup(){
    return(
        <div className="p-8  bg-white border border-blue-100 shadow-lg rounded-2xl" role="alert">
  <div className="items-center sm:flex">
    <span className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-white bg-blue-400 rounded-full">
      
    </span>

    <p className="mt-3 text-2xl font-medium text-center tracking-tight sm:mt-0 sm:ml-3">Make bookings easier</p>
  </div>

  <p className="mt-4 text-gray-700">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ea quo unde vel adipisci blanditiis voluptates eum.
    Nam, cum minima?
  </p>

  <div className="mt-6 sm:flex">
    <a
      className="inline-block w-full px-5 py-3 text-sm font-semibold text-center text-white bg-blue-500 rounded-lg sm:w-auto"
      href=""
    >
      Take a Look
    </a>

    <a
      className="inline-block w-full px-5 py-3 mt-3 text-sm font-semibold text-center text-gray-500 rounded-lg bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto"
      href=""
    >
      Mark as Read
    </a>
  </div>
</div>
    )
}