import { FC, Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import {
  XIcon,
} from '@heroicons/react/outline';
import NavItem from "./NavItem";
import { useRUIIS_ZustandStore } from "../../../utils/zustandStores/renderUserInterestsInfoStore";
import { useUI_ZustandStore } from "../../../utils/zustandStores/userInfoStore";
import shallow from 'zustand/shallow';
import { navigation } from "../../../utils/navigationData";
import smartAdFinderLogo from '../../../shared/logo_transparent_crop.png';
import userAvatarLogo from '../../../shared/User_Avatar_Outline.png';



function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}



const Navbar: FC<{}> = () => {


    const [ menuSidebarOpen, setMenuSidebarOpen ] = useRUIIS_ZustandStore(state => [state.menuSidebarOpen, state.setMenuSidebarOpen], shallow);
    const [ auth0UserInfo ] = useUI_ZustandStore(state => [state.auth0UserInfo], shallow);


    // * Logic for highliting selected page in nav
    navigation.map(nv => {
      if(nv.href === window.location.href.split('/')[3]){
        nv.current = true;
        return nv;
      } else return nv;
    });



    
    return (
        <>


          <div>

              <Transition.Root show={menuSidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 md:hidden" onClose={setMenuSidebarOpen}>
                  <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                  </Transition.Child>

                  <div className="fixed inset-0 flex z-40">
                    <Transition.Child
                      as={Fragment}
                      enter="transition ease-in-out duration-300 transform"
                      enterFrom="-translate-x-full"
                      enterTo="translate-x-0"
                      leave="transition ease-in-out duration-300 transform"
                      leaveFrom="translate-x-0"
                      leaveTo="-translate-x-full"
                    >
                      <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-green-700">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-in-out duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in-out duration-300"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                              type="button"
                              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                              onClick={() => setMenuSidebarOpen(false)}
                            >
                              <span className="sr-only">Close sidebar</span>
                              <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                            </button>
                          </div>
                        </Transition.Child>
                        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                          <div className="flex-shrink-0 flex items-center px-4">
                            <img
                              className="h-16 mx-14 w-auto"
                              // src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                              src={smartAdFinderLogo}
                              alt="smartAdFinderLogo"
                            />
                          </div>
                          <nav className="mt-5 px-2 space-y-1">
                            {navigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-green-800 text-white'
                                    : 'text-gray-300 hover:bg-green-800 hover:text-white',
                                  'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    item.current ? 'text-white' : 'text-gray-300 group-hover:text-gray-300',
                                    'mr-4 flex-shrink-0 h-6 w-6'
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                            ))}
                          </nav>
                        </div>
                        <div className="flex-shrink-0 flex bg-green-800 p-4">
                          <a href="/settings" className="flex-shrink-0 group block">
                            <div className="flex items-center">
                              <div>
                                <img
                                  className="inline-block h-10 w-10 rounded-full"
                                  src={userAvatarLogo}
                                  alt="User logo"
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-base font-medium text-white">{auth0UserInfo.name}</p>
                                <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">Види профил</p>
                              </div>
                            </div>
                          </a>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
                  </div>
                </Dialog>
              </Transition.Root>


              {/* Static sidebar for desktop */}
              <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">

                <div className="flex-1 flex flex-col min-h-0 bg-green-700">
                  <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-4">
                      <img
                        className="h-16 mx-9 w-auto"
                        // src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                        src={smartAdFinderLogo}
                        alt="smartAdFinderLogo"
                      />
                    </div>
                    <nav className="mt-5 flex-1 px-2 space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-green-800 text-white' : 'text-gray-300 hover:bg-green-800 hover:text-white',
                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-white' : 'text-gray-300 group-hover:text-gray-300',
                              'mr-3 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>

                  {/* Profile section */}
                  <div className="flex-shrink-0 flex bg-green-800 p-4">
                    <a href="/settings" className="flex-shrink-0 w-full group block">
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block h-9 w-9 rounded-full"
                            src={userAvatarLogo}
                            alt="User logo"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-white">{auth0UserInfo.name}</p>
                          <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">Види профил</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

              </div>

          </div>
        
        </>
    )
}

export default Navbar;