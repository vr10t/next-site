/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import {HiGlobeAlt} from "@react-icons/all-files/hi/HiGlobeAlt";
import{ HiScale} from "@react-icons/all-files/hi/HiScale";
import {HiLightningBolt} from "@react-icons/all-files/hi/HiLightningBolt";
import {HiAnnotation} from "@react-icons/all-files/hi/HiAnnotation";

import Feature from "./Feature";

export default function Example() {
  return (
    <div className="py-12 bg-gray-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-sky-700 font-semibold tracking-wide uppercase">
          PROFESSIONAL STANDARDS
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Easy to use, better service
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-700 lg:mx-auto">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <Feature
              name="Competitive rates "
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione."
              icon={<HiGlobeAlt  />} />
               
            
            <Feature
              name="No hidden fees"
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione."
              icon={ <HiScale />} />
            <Feature
              name="Quick response"
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione."
              icon={ <HiLightningBolt /> } />
            
            <Feature
              name="Mobile notifications"
              description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione."
              icon={ <HiAnnotation /> } />
            
          </dl>
        </div>
      </div>
    </div>
  );
}
