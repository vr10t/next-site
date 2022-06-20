import React from "react";

import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import Link from "next/link";
export default function Footer() {
  return (
    <div className="shadow sticky z-[29]">
      <footer className="text-center text-white bg-gradient-to-br from-sky-500 to-sky-600">
        <div className="p-4">
          <section className="mb-4 ">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              distinctio earum repellat quaerat voluptatibus placeat nam,
              commodi optio pariatur est quia magnam eum harum corrupti dicta,
              aliquam sequi voluptate quas.
            </p>
          </section>

          <section className="text-center ">
            <div className="grid sm:grid-cols-2 md:grid-cols-4">
              <div className="mb-4 flex flex-col ">
                <p className="text-uppercase">Address</p>

                <p className="text-gray-50">
                  123, Lorem Street, Hemel Hempstead, Beds, HP1 ABC
                </p>
              </div>

              <div className="mb-4 flex flex-col">
                <p className="text-uppercase">Social</p>

                <section className="mb-2 flex justify-center ">
                  <a
                    className="float-left mt-2 mx-2 text-4xl text-gray-50 hover:text-gray-400"
                    href="#!"
                    role="button">
                    <FaFacebook />
                  </a>

                  <a
                    className="float-left mt-2 mx-2 text-4xl text-gray-50 hover:text-gray-400"
                    href="#!"
                    role="button">
                    <FaTwitter />
                  </a>

                  <a
                    className="float-left mt-2 mx-2 text-4xl text-gray-50 hover:text-gray-400"
                    href="#!"
                    role="button">
                    <FaInstagram />
                  </a>
                </section>
              </div>

              <div className="mb-4 flex flex-col">
                <p className="text-uppercase">Contact</p>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-gray-50 hover:text-gray-400">
                      (123) 456-78-90{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-gray-50 hover:text-gray-400">
                      contact@example.com
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mb-4 flex flex-col">
                <p className="text-uppercase">Useful Links</p>

                <ul className="list-unstyled mb-0">
                  <li>
                    <Link href="/terms-conditions">
                      <a className="text-gray-50 hover:text-gray-400">Terms of Service </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy">
                      <a className="text-gray-50 hover:text-gray-400">Privacy Policy</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#FAQ">
                      <a className="text-gray-50 hover:text-gray-400">FAQ</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          Copyright © 2022
        </div>
      </footer>
      <style jsx>{`
        a.hover{
          color:red;}
          `}
      </style>
    </div>
  );
}
