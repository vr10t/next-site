import Question from "../src/components/FAQ/Question";

export default function FAQ() {
  return (
    <div id="FAQ" className="bg-gray-100">
      <div className="px-4 py-16 h-max mx-auto max-w-screen-2xl sm:px-6 lg:px-8 ">
        <div className="items-end justify-between sm:flex">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Frequently Asked Questions...
            </h2>{" "}
          </div>
        </div>
      </div>
      <div className="space-y-4">
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
