import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Navbar = ({ children }) => {
    const router = useRouter()
    const logout = () => {
        localStorage.removeItem("token")
        router.push("/login")
    }
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    useEffect(() => {
    token === null && router.push("/login")
    },[token])
    return (

        <>
            <div className='w-full h-[60px] z-50 flex justify-between items-center overflow-hidden sticky top-0 shadow-[1px_1px_5px_2px_rgba(150,150,150,0.1)] px-5 py-2'>
                <h2 className="text-[25px] font-[800] text-secondrayColor hidden md:block ">
                    FullAthurizedCrud
                </h2>
                <div className="flex gap-5 justify-center items center ">
                    <Link href="/dashboard">Dashboard</Link>
                    <Link href="/activityList">ActivityList</Link>
                    <button className="" onClick={logout}>logOut</button>
                </div>
            </div>
           <div className='w-full'>{children}</div>
        </>
    )
}

export default Navbar
