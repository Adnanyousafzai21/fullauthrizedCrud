"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineMailOutline } from 'react-icons/md';
import Image from 'next/image';
import { baseUrl } from '@/config/constant';

const OtpCode = () => {
    const Router = useRouter();
    const { handleSubmit, register, formState: { errors } } = useForm();
    const email = localStorage.getItem("email")
    console.log("email", email)
    const onsubmit = async (data) => {

        const res = await fetch(`${baseUrl}/api/user//otpmessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ otpcode: data.otpcode, email: email })
        })

        if (res.ok) {
            const resData = res.json()
            console.log("res.message", resData)
            Router.push("/resetPassword")
        }
    }

    return (
        <div className="flex justify-between items-center flex-col md:flex-row md:h-screen">
            <div className="md:w-[50%] flex items-start justify-center">
                <Image src="/images/9.jpg" alt="" className='md:w-[80%] sm:w-[60%] w-[300px]' />
            </div>
            <div className="md:w-[50%] flex items-start flex-col gap-y-10 justify-center">
                <h2 className='text-[20px] font-[600] text-[#111111]'>Reset Password</h2>
                <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col gap-y-5 '>
                    <div className="flex flex-col gap-y-2">
                        <div className="flex justify-start items-center w-[300px] rounded-md gap-2 px-2 h-[40px] bg-[#FCEDE8]">
                            <MdOutlineMailOutline className='text-[25px]' />
                            <input
                                type="text"
                                placeholder="Enter six-digit OTP code"
                                {...register("otpcode", { required: "**OTP is required" })}
                                className='outline-none w-full h-full bg-transparent'
                            />
                        </div>
                        {errors.otpcode?.message && <span className="text-red-500">{errors.otpcode.message}</span>}
                    </div>
                    <div className="overflow-hidden w-[300px] rounded-md h-[40px]">
                        <input type="submit" value="Send" className='text-[20px] w-full h-full border-none outline-none font-[400] text-white bg-[#E4421B]' />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OtpCode;
