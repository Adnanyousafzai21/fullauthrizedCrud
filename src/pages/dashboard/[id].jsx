"use client"

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import Uplaodfile from '@/components/uplaodfile'
import { baseUrl } from '@/config/constant'



const Dashboard = () => {
    const route = useRouter()
    const router = useParams()
    const { id } = router

    const [priveFile, setPriveFile] = useState([])
    // const [temprivfile, settemprivFile]=useState([])

    console.log("thsi is privewfile", priveFile)
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    useEffect(() => {
        // setpriveFile(temprivfile)
        console.log("Updated temprivfile:", priveFile);
    }, [priveFile]);



    const gettodbyid = async () => {
        const res = await fetch(`${baseUrl}/api/todo/getlltodos?id=${id}`,
        )
        if (res.ok) {
            const resData = await res.json()
            setPriveFile(resData.todo.file)
            console.log("resData in query ", resData.todo.file)
            setValue("subject", resData.todo.subject);

            setValue("description", resData.todo.description);
        }
    }
    useEffect(() => {
        gettodbyid()
    }, [])
    const onSubmit = async (formData) => {
        try {
            const res = await fetch(`${baseUrl}/api/todo/todocreate?id=${id}`, {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    file: priveFile,
                }),
            });

            if (res.ok) {
                const resData = await res.json();
                console.log("Todo updated successfully", resData);
                setValue("subject", ""),
                    setValue("description", ""),
                    setpriveFile([])
                route.push('/activitesList')
            } else {
                console.error("Failed to update todo", res.statusText);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <>
            <div className='w-full flex justify-center items-center'>
                <div className="lg:w-[40%] md:w-[60%] w-[95%] m-auto mt-10 p-5 ">
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col  gap-5 justify-center items-center'>
                        <h2 className='text-center text-[] '>
                            Enter your data
                        </h2>
                        <div className="flex flex-col gap-2 w-full ">
                            <div className="rounded-4 h-[40px] bg overflow-hidden w-full bg-primaryColor rounded-md "  >
                                <input type="text" className='w-full h-full bg-transparent px-2 outline-none' placeholder='Enter Subject'{...register("subject", { required: "The subject is required" })} />
                            </div>
                            {errors.subject && <p className='text-secondrayColor'>{errors.subject.message}</p>}
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <div className="rounded-4 h-[100px] bg overflow-hidden w-full bg-primaryColor rounded-md ">
                                <textarea className='w-full h-full bg-transparent p-2 outline-none' placeholder='Enter Description'{...register("description", { required: "The  description is required" })} ></textarea>
                            </div>
                            {errors.description && <p className='text-secondrayColor'>{errors?.description.message}</p>}
                        </div>
                        <div className="rounded-4  bg overflow-hidden w-full rounded-md">
                            <Uplaodfile previewUrl={priveFile} setPriveFile={setPriveFile} />
                        </div>
                        <div className="rounded-4  bg overflow-hidden w-full rounded-md bg-secondrayColor h-[40px] cursor-pointer text-white">
                            <input type="submit" className='w-full h-full ' value="Update" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Dashboard