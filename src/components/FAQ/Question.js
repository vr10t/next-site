
export default function Question(props) {
    return (
        <details className="p-6   border-l-4 shadow-sm border-sky-500  bg-gray-50 group" closed>
    <summary className="flex items-center justify-between cursor-pointer">
      <h5 className="text-lg font-medium hover:text-sky-500 text-gray-900">
        {props.q}
      </h5>

      <span
        className="flex-shrink-0 ml-1.5 p-1.5 text-gray-900 bg-white rounded-full sm:p-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 w-5 h-5  transition duration-300 group-open:-rotate-45"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </summary>

    <p className="mt-4 leading-relaxed text-gray-700">
      {props.a}
    </p>
  </details>
    )
}