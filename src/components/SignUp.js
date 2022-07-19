import { useState, useMemo } from "react";

import { useRouter } from "next/router";

export default function Auth(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(true);
  const success = false;
  useMemo(() => {
    setShowModal(!showModal);
  }, [props.show]);

  const handleLogin = async (ev) => {
    ev.preventDefault();
    const res = await fetch("/api/register", {
      body: JSON.stringify({
        email: ev.target.email.value,
        password: ev.target.password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { user } = await res.json();
    if (user) router.push(`/welcome?${user.email}`);
  };

  function handleCloseModal(ev) {
    if (ev.target.id == "modal") {
      console.log(ev.target);
      setShowModal(false);
    }
  }

  return (
    <>
      {success && (
        <div
          className="fixed top-20 z-50 p-4 text-green-700 bg-green-50 rounded border border-green-900/10"
          role="alert">
          <strong className="text-lg font-medium">
            {" "}
            Check your email for the login link!{" "}
          </strong>
        </div>
      )}
      {showModal && (
        <div className="absolute -top-10 transition-all  lg:-top-20">
          <div
            id="modal"
            onClick={handleCloseModal}
            className=" fixed flex justify-center w-full h-[120vh] z-[9999] bg-black bg-opacity-50 ">
            <div className="relative top-44  h-max">
              <div className="flex flex-col px-4 py-8 w-full max-w-md bg-gradient-to-br from-cyan-100 via-sky-100 to-fuchsia-200 rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
                <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl">
                  Create a new account
                </div>
                <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="#"
                    target="_blank"
                    className="text-sm text-blue-500 underline hover:text-blue-700">
                    Sign in
                  </a>
                </span>
                <div className="mt-8">
                  <form onSubmit={handleLogin} autoComplete="off">
                    <div className="flex flex-col mb-2">
                      <div className="flex relative">
                        <span className="inline-flex items-center px-3 text-sm text-gray-50 bg-sky-500 rounded-l-md shadow-sm">
                          <svg
                            width="15"
                            height="15"
                            fill="currentColor"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z" />
                          </svg>
                        </span>
                        <input
                          name="email"
                          type="email"
                          id="email"
                          className="flex-1 px-4 py-2 w-full text-base placeholder-gray-50 bg-gradient-to-r from-sky-400 to-cyan-500 rounded-r-lg shadow-sm appearance-none  focus-ring-full text-stone-50 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                          placeholder="Your email"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-6">
                      <div className="flex relative">
                        <span className="inline-flex items-center px-3 text-sm text-gray-50 bg-sky-500 rounded-l-md shadow-sm">
                          <svg
                            width="15"
                            height="15"
                            fill="currentColor"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z" />
                          </svg>
                        </span>
                        <input
                          name="password"
                          type="password"
                          id="password"
                          className="flex-1 px-4 py-2 w-full text-base placeholder-gray-50 bg-gradient-to-r from-sky-400 to-cyan-500 rounded-r-lg shadow-sm appearance-none  focus-ring-full text-stone-50 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                          placeholder="Your password"
                        />
                      </div>
                    </div>
                    <div className="flex items-center -mt-4 mb-6" />
                    <div className="flex w-full">
                      <button
                        type="submit"
                        className="flex relative justify-center py-2 mx-auto mt-9 w-44 h-12 text-xl font-bold align-middle bg-gradient-to-r from-sky-400 to-cyan-500 rounded-full shadow-md transition-all duration-1000 ease-in-out hover:to-cyan-600 hover:from-sky-500 text-stone-50">
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
                {/* <div className="flex justify-center items-center mt-6">
          <a
            href="#"
            target="_blank"
            className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700">
            <span className="ml-2">You don&#x27;t have an account?</span>
          </a>
        </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
