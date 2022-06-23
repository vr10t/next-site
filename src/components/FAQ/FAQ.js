import Question from "./Question";

export default function FAQ() {
  return (
    <div id="FAQ" className="bg-gray-100">
      <div className="px-4 py-16 h-max mx-auto max-w-screen-2xl sm:px-6 lg:px-8 ">
        <div className="items-end justify-between sm:flex">
          <div className="max-w-xl">
            <h2 className="text-4xl text-gray-900 font-bold tracking-tight sm:text-5xl">
              Frequently Asked Questions...
            </h2>{" "}
            <p className="max-w-lg mt-8  text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur praesentium natus sapiente commodi. Aliquid sunt
                tempore iste repellendus explicabo dignissimos placeat, autem
                harum dolore reprehenderit quis! Quo totam dignissimos earum.
              </p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Question
          q="How do I make a booking?"
          a="You can book on our website or by calling us on 020 1234 5678"
        />
        <Question
          q="How do I cancel a booking?"
          a="You can cancel a booking on our website by clicking on your upcoming journey and selecting ‘cancel’ or follow the link on your booking confirmation email and this will allow you to cancel the booking."
        />
        <Question
          q="What is your cancelation policy?"
          a="You can cancel your booking free of charge within 24 hours. If you cancel any time after 24 hours have passed, a cancellation fee will apply. "
        />
        <Question
          q="Lorem ipsum dolor sit amet consectetur adipisicing?"
          a="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis
      molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt
      voluptate dicta quo officiis explicabo consequuntur distinctio corporis
      earum similique!"
        />
        <Question
          q="Lorem ipsum dolor sit amet consectetur adipisicing?"
          a="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis
      molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt
      voluptate dicta quo officiis explicabo consequuntur distinctio corporis
      earum similique!"
        />
      </div>
    </div>
  );
}
