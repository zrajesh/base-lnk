'use client'

import React, { useEffect, useRef, useState, MutableRefObject } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const menuItems = [
  {
    name: 'Links',
    href: '/dashboard',
  },
  {
    name: 'Appearance',
    href: '/dashboard/appearance',
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
  },
]

interface NavBarProps {
    isLogin: boolean;
}

const NavBar = ({ isLogin }: NavBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(isLogin);
  const profileCard: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const router = useRouter();
  let userName: MutableRefObject<string> = useRef("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    setIsLoggedIn(isLogin);
  }, [isLogin]);
  if (isLoggedIn) {
    userName.current = localStorage.getItem("username") || "";
  }
  const logo_path = isLoggedIn ? "/dashboard" : "/";

  const logout = async () => {
    try {
        const response = await axios.get("/api/users/logout");
        console.log(response);
        toast.success(response.data.message);
        router.push("/login");
    } catch (error: any) {
        console.log("Logout Err: ", error);  
        toast.error(error.response.data.error)
    }
  }

  const toggleProfile = () => {
    const profileElement = profileCard.current;
    profileElement?.classList.toggle("hidden");    
  }
  
  return (
    <div className="relative w-full bg-[#fff]">
        <Toaster
          position="top-right" 
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
          }}
        />
      <div className="mx-auto relative flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <Image src="/brand.png" width={40} height={40} alt='Logo of baselnk' />
          </span>
          <Link href={logo_path} className="font-bold">BaseLnk</Link>
        </div>
        {
            isLoggedIn &&
            <div className="hidden grow items-start lg:flex">
                <ul className="ml-12 inline-flex space-x-8">
                {menuItems.map((item) => (
                <li key={item.name}>
                    <Link
                    href={item.href}
                    className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                    >
                    {item.name}
                    </Link>
                </li>
                ))}
                </ul>
            </div>
        }
        {
            isLoggedIn && 
            <div className="absolute right-14">
              <div className="relative">
              <div onClick={toggleProfile} className="bg-[#606967] cursor-pointer flex justify-center items-center rounded-full w-10 h-10 text-[#FFF]">
                <span className="text-lg font-semibold">
                {userName.current ? userName.current[0].toUpperCase() : "U"}
                </span>
              </div>
              <div
               ref={profileCard}
               className="hidden absolute top-12 right-2 p-5 bg-[#fff] h-56 w-60 overflow-y-auto rounded-2xl z-10 shadow-lg shadow-black-500/40">
                <div       
                //  onClick={logout}           
                 className="hover:bg-[#f6f7f5db] hover:rounded-xl cursor-pointer h-10 w-full flex items-center pl-5">
                  <Link 
                  className=""
                  href="#"
                  >Edit profile
                  </Link>
                </div>
                <div 
                 onClick={logout}                 
                 className="hover:bg-[#f6f7f5db] hover:rounded-xl cursor-pointer h-10 w-full flex items-center pl-5">
                  <Link                   
                  className=""
                  href="#"
                  >Logout
                  </Link>
                </div>
               </div>
              </div>
            </div>
        }
        <div className="flex">
        {
            !isLoggedIn &&
            <div className="hidden lg:block">
                <Link
                href="/login"
                className="block ml-3 text-center rounded-md mt-4 w-32 bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                Login
                </Link>
            </div>
        }
        {
            !isLoggedIn &&
            <div className="hidden lg:block">
                <Link
                href="/signup"
                className="block ml-3 text-center rounded-md mt-4 w-32 bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                Signup
                </Link>
            </div>
        }
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                  <span>
                    <Image src="/brand.png" width={40} height={40} alt='Logo of baselnk' />
                   </span>
                   <Link href={logo_path} className="font-bold">BaseLnk</Link>
                  </div>
                  <div className="mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                {
                    isLoggedIn &&
                    <div className="mt-6">
                        <nav className="grid gap-y-4">
                        {menuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                        >
                          <span className="ml-3 text-base font-medium text-gray-900">
                            {item.name}
                          </span>
                        </Link>
                        ))}
                        </nav>
                    </div>
                }                           
                {
                    !isLoggedIn && 
                    <>
                    <Link
                    href="/login"
                    className="block ml-3 text-center rounded-md mt-4 w-32 bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                    Login
                    </Link>
                    </>
                }
                {
                    !isLoggedIn && 
                    <>
                    <Link
                    href="/signup"
                    className="block ml-3 text-center rounded-md mt-4 w-32 bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                    Signup
                    </Link>
                    </>
                }            
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar;