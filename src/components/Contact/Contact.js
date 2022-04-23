

export default function Contact(){
    return (



<section id="contact" className="bg-gray-100">
<div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
    <div className="lg:py-12 lg:col-span-2">
      <p className="max-w-xl text-lg">
      If you would like to contact us please use the form below:
      </p>

      <div className="mt-8">
        <a href="/#" className="text-2xl font-bold text-pink-600"> 0151 475 4450 </a>

        <address className="mt-2 not-italic">123, Lorem Street, Hemel Hempstead, Beds, HP1 ABC</address>
      </div>
    </div>

    <div className="p-8 bg-white rounded-lg shadow-md lg:p-12 lg:col-span-3">
      <form action="" className="space-y-4">
        <div>
          <label className="sr-only" for="name">Name</label>
          <input className="w-full p-3 text-sm border-gray-200 rounded-lg" placeholder="Name" type="text" id="name" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="sr-only" for="email">Email</label>
            <input
              className="w-full p-3 text-sm border-gray-200 rounded-lg"
              placeholder="Email address"
              type="email"
              id="email"
            />
          </div>

          <div>
            <label className="sr-only" for="phone">Phone</label>
            <input
              className="w-full p-3 text-sm border-gray-200 rounded-lg"
              placeholder="Phone Number"
              type="tel"
              id="phone"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
          <div>
            <input className="sr-only" id="option1" type="radio" tabindex="-1" />
            <label for="option1" className="block w-full p-3 border border-gray-200 rounded-lg" tabindex="0">
              <span className="text-sm font-medium"> Option 1 </span>
            </label>
          </div>

          <div>
            <input className="sr-only" id="option2" type="radio" tabindex="-1" />
            <label for="option2" className="block w-full p-3 border border-gray-200 rounded-lg" tabindex="0">
              <span className="text-sm font-medium"> Option 2 </span>
            </label>
          </div>

          <div>
            <input className="sr-only" id="option3" type="radio" tabindex="-1" />
            <label for="option3" className="block w-full p-3 border border-gray-200 rounded-lg" tabindex="0">
              <span className="text-sm font-medium"> Option 3 </span>
            </label>
          </div>
        </div>

        <div>
          <label className="sr-only" for="message">Message</label>
          <textarea
            className="w-full p-3 text-sm border-gray-200 rounded-lg"
            placeholder="Message"
            rows="8"
            id="message"
          ></textarea>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="inline-flex items-center justify-center w-full px-5 py-3 text-white hover:bg-orange-500 transition-all duration-500 bg-orange-400 rounded-lg sm:w-auto"
          >
            <span className="font-medium"> Send Enquiry </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 ml-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
</section> 
   )
}