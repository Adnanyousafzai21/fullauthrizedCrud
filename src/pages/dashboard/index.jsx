"use client"

import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { baseUrl } from '../../config/constant'
import Uplaodfile from '@/components/uplaodfile'
import Navbar from '@/components/navbar'
import { themeContext } from '@/components/contextaPI'


const Dashboard = () => {
    const [priveFile, setPriveFile] = useState([])
    const { theme } = useContext(themeContext)
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        const payload = {
            subject: data.subject,
            description: data.description,
            file: priveFile
        }
        const res = await fetch(`${baseUrl}/api/todo/todocreate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })

        if (res.ok) {
            const resData = await res.json()
            console.log("resData", resData)
            setPriveFile([])
            setValue("subject", "")
            setValue("description", "")
        }
        console.log("payload", payload)
    }
    return (
        <Navbar>
            <div className={` ${theme ? "text-textcolor1 bg-bgColor1 " : "text-textColor2 bg-bgColor2"} w-full flex justify-center items-center `}>
                <div className="lg:w-[40%] md:w-[60%] w-[95%] m-auto mt-10 p-5 ">
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col  gap-5 justify-center items-center'>
                        <h2 className='text-center text-[22px] '>
                            Enter Your Activities Data
                        </h2>
                        <div className="flex flex-col gap-2 w-full text-textColor2 ">
                            <div className="rounded-4 h-[40px] bg overflow-hidden w-full bg-primaryColor rounded-md "  >
                                <input type="text" className='w-full h-full bg-transparent px-2 outline-none' placeholder='Enter Subject'{...register("subject", { required: "The subject is required" })} />
                            </div>
                            {errors.subject && <p className='text-secondrayColor'>{errors.subject.message}</p>}
                        </div>
                        <div className="flex flex-col gap-2 w-full text-textColor2 ">
                            <div className="rounded-4 h-[100px] bg overflow-hidden w-full bg-primaryColor rounded-md ">
                                <textarea className='w-full h-full bg-transparent p-2 outline-none' placeholder='Enter Description'{...register("description", { required: "The  description is required" })} ></textarea>
                            </div>
                            {errors.description && <p className='text-secondrayColor'>{errors?.description.message}</p>}
                        </div>
                        <div className="rounded-4  bg overflow-hidden w-full rounded-md ">
                            <Uplaodfile previewUrl={priveFile} setPriveFile={setPriveFile} />
                        </div>
                        <div className="rounded-4  bg overflow-hidden w-full rounded-md bg-secondrayColor h-[40px] cursor-pointer text-white">
                            <input type="submit" className='w-full h-full cursor-pointer ' value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </Navbar>
    )
}
export default Dashboard