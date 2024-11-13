import React from 'react'
import logo from '../assets/logo1.png'; // adjust path according to actual location



function HomeFooter() {
  return (
    <div>
      <section className="py-10 bg-green-50 sm:pt-16 lg:pt-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
            <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
              <img className="w-auto h-9" src={logo} alt="" />

              <p className="text-base leading-relaxed text-gray-600 mt-7">
                Study Buddy connects you with fellow learners to create and share study materials. Organize your notes, build flashcards, and discover helpful resources - all in one place.
              </p>

              <div className="mt-10">
                <a href="#" title="" className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-500 hover:bg-orange-600 focus:bg-orange-600" role="button">
                  Get Started
                </a>
              </div>

              <ul className="flex items-center space-x-3 mt-9">
                <li>
                  <a href="#" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                      ></path>
                    </svg>
                  </a>
                </li>

                {/* ... other social media icons ... */}

              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Company</p>

              <ul className="mt-6 space-y-4">
                <li>
                  <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">
                    About
                  </a>
                </li>

                <li>
                  <a href="/privacy" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">
                    Privacy Policy
                  </a>
                </li>

                 <li>
                  <a href="/ContactUs" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">
                    Privacy Policy
                  </a>
                </li>
                
                {/* ... other company links ... */}

              </ul>
            </div>

            {/* ... other grid columns ... */}

            <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
              <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Subscribe to newsletter</p>

              <form action="#" method="POST" className="mt-6">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                  />
                </div>

                <button type="submit" className="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <hr className="mt-16 mb-10 border-gray-200" />

          <p className="text-sm text-center text-gray-600">&copy; Copyright 2024, All Rights Reserved by Study Buddy</p>
        </div>
      </section>
    </div>
  )

}

export default HomeFooter
