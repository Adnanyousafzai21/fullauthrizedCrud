"use client";

import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Uplaodfile from '@/components/uplaodfile';
import { baseUrl } from '@/config/constant';
import Navbar from '@/components/navbar';
import { themeContext } from '@/components/contextaPI';

const Dashboard = () => {
    const { theme } = useContext(themeContext)
    const route = useRouter();
    const { id } = useParams() || {};
    const { handleSubmit, register, setValue, formState: { errors } } = useForm()
const token = typeof window !=="undefined"? localStorage.getItem("token"):null
    const [priveFile, setPriveFile] = useState([]);

    const gettodbyid = async () => {
        if (!id) return;
        try {
            const res = await fetch(`${baseUrl}/api/todo/getlltodos?id=${id}`,{
                headers:{"Authorization":`Bearer ${token}`}
            })
            if (res.ok) {
                const resData = await res.json();
                setPriveFile(resData.todo.file || [])
                setValue("subject", resData.todo.subject || "")
                setValue("description", resData.todo.description || "")
            } else {
                console.error("Failed to fetch todo data:", res.statusText)
            }
        } catch (error) {
            console.error("Error fetching todo data:", error);
        }
    };

    useEffect(() => {
        gettodbyid()
    }, [id]);

    const onSubmit = async (formData) => {
        try {
            const res = await fetch(`${baseUrl}/api/todo/todocreate?id=${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    file: priveFile,
                }),
            });

            if (res.ok) {
                setValue("subject", "")
                setValue("description", "")
                route.push('/activityList');
            } else {
                console.error("Failed to update todo", res.statusText);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <Navbar>
            <div className={` ${theme ? "text-textcolor1 bg-bgColor1 " : "text-textColor2 bg-bgColor2"} w-full flex justify-center items-center`}>
                <div className="lg:w-[40%] md:w-[60%] w-[95%] m-auto mt-10 p-5">
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-5 justify-center items-center'>
                        <h2 className='text-center'>Update Your Data</h2>
                        <div className="flex flex-col gap-2 w-full text-textColor2">
                            <div className="rounded-4 h-[40px] bg-primaryColor overflow-hidden w-full rounded-md">
                                <input
                                    type="text"
                                    className='w-full h-full bg-transparent px-2 outline-none'
                                    placeholder='Enter Subject'
                                    {...register("subject", { required: "The subject is required" })}
                                />
                            </div>
                            {errors.subject && <p className='text-secondrayColor'>{errors.subject.message}</p>}
                        </div>
                        <div className="flex flex-col gap-2 w-full text-textColor2">
                            <div className="rounded-4 h-[100px] bg-primaryColor overflow-hidden w-full rounded-md">
                                <textarea
                                    className='w-full h-full bg-transparent p-2 outline-none'
                                    placeholder='Enter Description'
                                    {...register("description", { required: "The description is required" })}
                                />
                            </div>
                            {errors.description && <p className='text-secondrayColor'>{errors.description.message}</p>}
                        </div>
                        <div className="rounded-4 bg overflow-hidden w-full rounded-md">
                            <Uplaodfile previewUrl={priveFile} setPriveFile={setPriveFile} />
                        </div>
                        <div className="rounded-4 bg overflow-hidden w-full rounded-md bg-secondrayColor h-[40px] cursor-pointer text-white">
                            <input type="submit" className='w-full h-full cursor-pointer' value="Update" />
                        </div>
                    </form>
                </div>
            </div>
        </Navbar>)
};

export default Dashboard;
