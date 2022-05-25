export default function Contact() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <section id="contact" className="bg-gray-100">
      <h1 className="relative text-gray-900 px-4 md:ml-10   pt-20 font-bold text-4xl sm:text-5xl  ">
        Contact us...
      </h1>
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:py-12 lg:col-span-2">
            <p className="max-w-xl text-lg">
              We would love the hear from you. If you have any enquiries or
              suggestions, please use the form attached.
            </p>

            <div className="mt-8">
              <a href="/#" className="text-2xl font-bold text-cyan-600">
                {" "}
                0151 475 4450{" "}
              </a>

              <address className="mt-2 not-italic">
                123, Lorem Street, Hemel Hempstead, Beds, HP1 ABC
              </address>
            </div>
          </div>

          <div className="p-8 bg-neutral-50 rounded-lg shadow-md lg:p-12 lg:col-span-3">
            <form
              action="https://formspree.io/f/mvolvklo"
              method="POST"
              className="space-y-4">
              <div>
                <label className="sr-only" aria-required htmlFor="name">
                  Name
                </label>
                <input
                  required
                  className="w-full bg-neutral-50 p-3 text-sm border-gray-200 rounded-lg"
                  placeholder="Name"
                  type="text"
                  name="Name"
                  id="name"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label aria-required className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <input
                    required
                    className="w-full p-3 text-sm bg-neutral-50 border-gray-200 rounded-lg"
                    placeholder="Email address"
                    type="email"
                    id="email"
                    name="Email"
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    className="w-full p-3 text-sm bg-neutral-50 border-gray-200 rounded-lg"
                    placeholder="Phone Number"
                    type="tel"
                    id="phone"
                    name="Phone"
                  />
                </div>
              </div>

              <div>
                <label aria-required className="sr-only" htmlFor="message">
                  Message
                </label>
                <textarea
                  required
                  className="w-full bg-neutral-50 p-3 text-sm border-gray-200 rounded-lg"
                  placeholder="Message"
                  rows="8"
                  id="message"
                  name="Message"></textarea>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-white hover:bg-sky-600 transition-all duration-500 bg-sky-500 rounded-lg sm:w-auto">
                  <span className="font-medium"> Send Enquiry </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 ml-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
