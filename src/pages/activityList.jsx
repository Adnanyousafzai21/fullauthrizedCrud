"use client"

import React, { useEffect, useState } from 'react'
import { BsEye } from 'react-icons/bs'
import { baseUrl } from '@/config/constant'
import Image from 'next/image'
import PoopOver from '@/components/Poopover'
const ActivityList = () => {

    const [data, setdata] = useState([])

    console.log("daata", data)
    const getlltodos = async () => {
        const res = await fetch(`${baseUrl}/api/todo/getlltodos`)

        if (res.ok) {
            const resdata = await res.json()
            console.log("resdat is here", resdata)
            setdata(resdata.alltodos)


        }
    }

    useEffect(() => {
        getlltodos()
    }, [])

    return (
        <div className='w-full pt-10 flex justify-center items-center '>
            <div className="lg:w-[50%] md:w-[60%]  sm:w-[80%] w-[98%] p-2  sm:p-10 flex flex-col gap-3">
                {
                    data.length > 0 &&
                    data.map((item) => (
                        <div className="w-full flex relative flex-col  rounded-lg gap-y-4 shadow-[1px_1px_5px_5px_rgba(150,150,150,0.1)] px-5 py-5" key={item._id}>
                            <h2 className="text font text-[22px] leading-1 ">{item?.subject}</h2>
                            <p className='text-[14px] font-[400] leading-1'>{item?.description}</p>
                            {
                                item.file && item.file.length > 0 && (
                                    <div className="flex gap-3 justify-start flex-wrap cursor-pointer items-center">
                                        {item.file.map((filedata) => {
                                            { console.log("url priview", filedata.previewUrl) }
                                            return <div key={filedata?._id} className=" group flex justify-center items-center relative w-24 rounded-lg overflow-hidden h-24 border">
                                                <img
                                                    src={filedata?.previewUrl}
                                                    alt=""
                                                     
                                                    className='w-full h-full '
                                                />
                                                <div className="w-full h-full absolute bg-primaryColor group-hover:block hidden  opacity-60"></div>
                                                <BsEye className='text-[25px] font-bold absolute z-30 group-hover:block hidden' />

                                            </div>
                                        })}
                                    </div>
                                )
                            }
                            <div className="absolute right-3 flex gap-x-3 items-center">
                                <PoopOver item={item} getlltodos={getlltodos} />
                            </div>
                        </div>
                    ))

                }

            </div>

        </div >
    )
}

export default ActivityList