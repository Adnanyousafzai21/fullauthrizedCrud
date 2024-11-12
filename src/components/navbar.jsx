import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { FaMoon } from 'react-icons/fa6';
import { HiOutlineSun } from "react-icons/hi";
import { themeContext } from './contextaPI';
const Navbar = ({ children }) => {

    const {theme, setTheme}= useContext(themeContext)

    const router = useRouter()
    const logout = () => {
        localStorage.removeItem("token")
        router.push("/login")
    }
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    const Toglefunc = () => {
        setTheme(!theme)
    }

    useEffect(() => {
        token === null && router.push("/login")
    }, [token])
    return (
        <>
            <div className={` ${theme?"text-textcolor1 bg-bgColor1 ":"text-textColor2 bg-bgColor2"} gap-y-2 w-full h-[80px] md:h-[60px] z-50 flex justify-center md:justify-between flex-col md:flex-row items-center overflow-hidden sticky top-0 shadow-[1px_1px_5px_2px_rgba(150,150,150,0.1)] px-5 py-2`}>
                <h2 className="md:text-[22px] text-[19px] font-[800] text-secondrayColor  ">
                    FullAthurizedCrud
                </h2>
                <div className="flex gap-5 justify-center items center ">
                    <div className=" text-[25px] cursor-pointer" onClick={Toglefunc} title='Change the theme'>{
                      !theme?  <FaMoon/>:<HiOutlineSun />
                        }    </div>
                    <Link href="/dashboard" className='hover:text-secondrayColor '>Dashboard</Link>
                    <Link href="/activityList" className='hover:text-secondrayColor '>ActivityList</Link>
                    <button className="hover:text-secondrayColor" onClick={logout}>LogOut</button>
                </div>
            </div>
            <div className={`w-full min-h-[90.4vh] ${theme?"bg-bgColor1":"bg-bgColor2"}  `}>{children}</div>
        </>
    )
}

export default Navbar
