"use client"

import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { MdOutlineMailOutline } from 'react-icons/md'
import { baseUrl } from '../../../config/constant'
import { useRouter } from 'next/navigation'
import Image from 'next/image'


const Login = () => {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const onsubmit = async (data) => {

        const payload = {
            email: data.email,
            password: data.password
        }
        const response = await fetch(`${baseUrl}/api/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        if (response.ok) {
            const responseData = await response.json()
            console.log("responseDATA", responseData)
            localStorage.setItem("token", responseData.token)
            router.push("/dashboard")
        }

    }

    return (
        <div className=' flex flex-col md:flex-row justify-between items-center md:h-screen'>
            <div className="md:w-[50%] flex justify-start items-center h-full  ">
                <Image src="/images/9.jpg" alt="" className='md:w-[80%] sm:[60%] w-[300px]' />
            </div>
            <div className="md:w-[50%] flex flex-col gap-y-10 justify-start items-start">
                <h2 className="text-[25px] font-[400] text-[#111111]">Log in</h2>
                <form className='flex flex-col gap-y-5 ' onSubmit={handleSubmit(onsubmit)}>
                    <div className="flex flex-col gap-y-1">
                        <div className="flex justify-start items-center w-[300px] gap-x-2 rounded-md px-2 h-[40px] bg-[#FCEDE8]">
                            <MdOutlineMailOutline className='text-[25px]' /> <input type="email" placeholder="Email"{...register("email", { required: "**eamil required" })} className='outline-none w-full h-full bg-transparent ' />
                        </div>
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <div className="flex justify-start items-center w-[300px] gap-x-2 rounded-md px-2 h-[40px] bg-[#FCEDE8]">
                            <MdOutlineMailOutline className='text-[25px]' /> <input type="password" placeholder="passwor"{...register("password", { required: "**password required" })} className='outline-none w-full h-full bg-transparent ' />
                        </div>
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <Link href="/forgetPassword"><span className="text-[#E4421B]">Forget password</span></Link>
                    </div>
                    <div className=" overflow-hidden  w-[300px] rounded-md  h-[40px] ">
                        <input type="submit" value="Log In" className='cursor-pointer text-[20px] w-full h-full border-none outline-none font-[400] text-white bg-[#E4421B]' />
                    </div>
                    <div className=" gap-y-1">
                        <p className='text-center text-[#333333] text-[15px]'>If you don't have  registerd, <Link className='text-[#E4421B]' href="/register"> Register</Link> </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login