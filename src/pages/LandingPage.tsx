/* eslint-disable jsx-a11y/anchor-is-valid */
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { FC, Fragment } from "react";
import LogInButton from "../components/auth/logInButton";
import { navigation } from "../utils/navigationData";
import smartAdFinderLogo from '../shared/logo_transparent_crop.png';
import landingPic from '../shared/landing2.png';
import Tilt from 'react-parallax-tilt';
import SignUpButton from "../components/auth/signUpButton";



const LandingPage: FC<{}> = () => {

    return (
        <>
           <div className="relative overflow-hidden">



              {/* // * NAVBAR */}
            <Popover as="header" className="relative">
              <div className="bg-gray-900 pt-6">
                <nav
                  className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
                  aria-label="Global"
                >
                  <div className="flex items-center flex-1">
                    <div className="flex items-center justify-between w-full md:w-auto">
                      <img
                        className="h-8 w-auto sm:h-10"
                        src={smartAdFinderLogo}
                        alt=""
                      />
                      <div className="-mr-2 flex items-center md:hidden">
                        <Popover.Button className="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                          <span className="sr-only">Open main menu</span>
                          <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="hidden space-x-8 md:flex md:ml-10">
                      
                      {/* Tuka stoese nav */}
                    </div>
                  </div>
                  <div className="hidden md:flex md:items-center md:space-x-6">
                    <SignUpButton/>
                    <LogInButton/>
                  </div>
                </nav>
              </div>

              <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top md:hidden">
                  <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="px-5 pt-4 flex items-center justify-between">
                      <div>
                        <img
                          className="h-8 w-auto"
                          src="https://tailwindui.com/img/logos/workflow-mark-teal-500-cyan-600.svg"
                          alt=""
                        />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600">
                          <span className="sr-only">Close menu</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="pt-5 pb-6">
                      <div className="px-2 space-y-1">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                      <div className="mt-6 px-5">
                        <a
                          href="#"
                          className="block text-center w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700"
                        >
                          Start free trial
                        </a>
                      </div>
                      <div className="mt-6 px-5">
                        <p className="text-center text-base font-medium text-gray-500">
                          Existing customer?{' '}
                          <a href="#" className="text-gray-900 hover:underline">
                            Login
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>


            </Popover>

              {/* //* MAIN PART */}
            <div className="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
              <div className="mx-auto max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8">




                  {/* //* LEFT PART */}
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                    <div className="lg:py-24">
                      

                      {/* //* TITLE */}
                      <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                        <span className="block">Подобар начин на</span>
                        <span className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-green-400 sm:pb-5">
                          барање огласи
                        </span>
                      </h1>
                      <p className="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
                        Smart Ad Finder ги бара посакуваните огласи за вас. Внесете ваш оглас и бидете лесно пронајдени.
                      </p>

                      {/* //* LOGO */}
                      <div className="ml-10 mt-10 sm:mt-12 h-44 w-96 ">
                        {/* <img
                          className="h-16 mx-9 w-auto"
                          src={smartAdFinderLogo}
                          alt="smartAdFinderLogo"
                        /> */}

                        <Tilt transitionSpeed={200} >
                          {/* <div style={{ backgroundColor: 'darkgreen'}}> */}
                            <img
                              className="h-36 pt-4 mx-9 w-auto"
                              src={smartAdFinderLogo}
                              alt="smartAdFinderLogo"
                            />
                          {/* </div> */}
                        </Tilt>
                      </div>
                    </div>
                  </div>





                  {/* //* IMAGE */}
                  <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                    <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                      {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                      <img
                        className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                        // src="https://tailwindui.com/img/component-images/cloud-illustration-teal-cyan.svg"
                        src={landingPic}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

            

        </>
    )
}

export default LandingPage;