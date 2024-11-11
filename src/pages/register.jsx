"use client"

import React from 'react';
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useRouter } from 'next/navigation';
// import { SubmitHandler, useForm } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
  
import { baseUrl } from '@/config/constant';


const Register = () => {
    const Router = useRouter()


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {

        try {
            const payload = {
                username: data.username,
                email: data.email,
                password: data.password,
            };
            const response = await fetch(`${baseUrl}/api/user/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
            if (response.ok) {
                const data = response.json()
                console.log("response data is here", data)
                Router.push("/login")
            }

            console.log('Form submitted:', payload);
        } catch (error) {
            console.log("error while registering", error)
        }




    };

    return (
        <div className='flex w-full md:flex-row flex-col items-center justify-center md:h-screen overflow-hidden'>
            <div className="flex justify-start items-start md:w-[50%]">
                  <img src="/images/9.jpg" alt=""   className='md:w-[80%] sm:[60%] w-[300px]' />
            </div>
            <div className="flex gap-5 p-8 flex-col md:w-[50%]">
                <h2 className="text-[#111111] font-[600] text-[25px]">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 flex-col" autoComplete='off'>
                    {/* Username Field */}
                    <div className="flex flex-col gap-y-1">
                        <div className="rounded-md h-[40px] lg:w-[300px] flex justify-start items-center gap-x-2 bg-[#FCEDE8] px-2">
                            <FaRegUser className='text-[20px]' />
                            <input
                                type="text"
                                placeholder='User Name'
                                autoComplete='off'
                                {...register('username', { required: "**Username is required" })}
                                className='w-full h-full bg-transparent outline-none'
                            />
                        </div>
                        {errors.username && <span className="text-red-500">{errors.username.message}</span>}
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col gap-y-1">
                        <div className="rounded-md h-[40px] lg:w-[300px] flex justify-start items-center gap-x-2 bg-[#FCEDE8] px-2">
                            <MdOutlineMailOutline className='text-[20px]' />
                            <input
                                type="email"
                                placeholder='Email'
                                autoComplete='off'
                                {...register('email', { required: "**Email is required" })}
                                className='w-full h-full bg-transparent outline-none'
                            />
                        </div>
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-y-1">
                        <div className="rounded-md h-[40px] lg:w-[300px] flex justify-start items-center gap-x-2 bg-[#FCEDE8] px-2">
                            <RiLockPasswordLine className='text-[20px]' />
                            <input
                                type="password"
                                placeholder='Password'
                                autoComplete='off'
                                {...register('password', {
                                    required: "**Password is required",
                                    minLength: { value: 5, message: "**Password must be at least 5 characters" },
                                })}
                                className='w-full h-full bg-transparent outline-none'
                            />
                        </div>
                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="flex flex-col gap-y-1">
                        <div className="rounded-md h-[40px] lg:w-[300px] flex justify-start items-center gap-x-2 bg-[#FCEDE8] px-2">
                            <RiLockPasswordLine className='text-[20px]' />
                            <input
                                type="password"
                                autoComplete='off'
                                placeholder='Confirm Password'
                                {...register('confirmPassword', {
                                    required: "**Confirm Password is required",
                                    validate: value => value === watch('password') || "**Passwords do not match."
                                })}
                                className='w-full h-full bg-transparent outline-none'
                            />
                        </div>
                        {errors['confirmPassword'] && <span className="text-red-500">{errors['confirmPassword'].message}</span>}
                    </div>

                    {/* Submit Button */}
                    <div className="rounded-md overflow-hidden cursor-pointer h-[40px] lg:w-[300px]">
                        <input
                            type="submit"
                            value="Signup"
                            className=' cursor-pointer text-[20px] w-full h-full border-none outline-none font-[400] text-white bg-[#E4421B]'
                        />
                    </div>

                    <div className="gap-y-1  h-[40px] lg:w-[300px]">
                        <p className='text-center text-[#333333] text-[15px]'>If you have already registerd, <Link className='text-[#E4421B]' href="/login"> Log in</Link> </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
