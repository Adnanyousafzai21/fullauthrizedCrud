"use client"

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdOutlineMailOutline } from 'react-icons/md'

import { baseUrl } from '@/config/constant';


const ResetPassword = () => {
    const Router = useRouter()
    const { handleSubmit, register, formState: { errors } } = useForm()
    const email = typeof window !== "undefined" ? localStorage.getItem("email") : null

    const onsubmit = async (data) => {

        const res = await fetch(`${baseUrl}/api/user/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newpassword: data.newpassword, email: email })
        })

        if (res.ok) {
            const resData = res.json()
            console.log("res.message", resData)
            Router.push("/login")
        }
    }
    return (
        <div className="flex justify-between  items-center flex-col md:flex-row md:h-screen">
            <div className="md:w-[50%] flex items-start justify-center mt-10">
                <img src="/images/9.jpg" alt="" className='md:w-[80%] sm:w-[60%] w-[300px]' />
            </div>
            <div className="md:w-[50%] flex items-start flex-col gap-y-10 justify-center">
                <h2 className='text-[20px] font-[600] text-[#111111] '> Reset Passsword</h2>
                <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col gap-y-5 '>
                    <div className="flex flex-col gap-y-2">
                        <div className="flex justify-start items-center w-[300px] rounded-md gap-2 px-2 h-[40px] bg-[#FCEDE8]">
                            <MdOutlineMailOutline className='text-[25px]' /> <input type="password" placeholder="Enter  new passowrd"{...register("newpassword", { required: "**passowrd required" })} className='outline-none w-full h-full bg-transparent ' />
                        </div>
                        {errors.newpassword && <span className="text-red-500">{errors.newpassword.message}</span>}
                    </div>
                    <div className=" overflow-hidden  w-[300px] rounded-md  h-[40px] ">
                        <input type="submit" value="Send" className='cursor-pointer text-[20px] w-full h-full border-none outline-none font-[400] text-white bg-[#E4421B]' />
                    </div>
                </form>
            </div>

        </div>
    )
}

export default ResetPassword