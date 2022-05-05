
import Review from "../Testimonial/Testimonial";


export default function Reviews() {
  return (
    <div className="">
      <section className="bg-gray-100">
        <div className="px-4 py-16 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
          <div className="items-end justify-between sm:flex">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Read trusted reviews from our customers
              </h2>

              <p className="max-w-lg mt-8  text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur praesentium natus sapiente commodi. Aliquid sunt
                tempore iste repellendus explicabo dignissimos placeat, autem
                harum dolore reprehenderit quis! Quo totam dignissimos earum.
              </p>
            </div>

            <a
              className="inline-flex no-underline items-center flex-shrink-0 px-5 py-3 mt-8 font-medium text-cyan-600 border border-cyan-600 rounded-full sm:mt-0 lg:mt-8 hover:bg-cyan-600 hover:text-white"
              href="/">
              Read all reviews
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 ml-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
            <Review
            title="Great company"
              author="Jennifer Hill"
              review="Such an easy company to deal with and they are all such nice people. We are a choir with need to be transported to venues. They go out of their way to accommodate us and we will certainly be using them for our transport needs in the future!"
            />

            <Review
            title="Friendly people"
              author="Pragna Dilip Trivedi"
              review="Malcolm drove 15 ladies for a yoga retreat in Scotland & everyone enjoyed the safe & smooth ride we all had. I would recommend the company , they are very friendly & easy to deal with 👌👌"
            />

            <Review
            title="Amazing service"
              author="Jignasa Odedra "
              review="Great services, we hired minibus for 3 nights to Scotland. I would highly recommend it. specially the Malcom, who drove to us, fantastic, friendly, easy going."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
