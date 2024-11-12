import React from 'react'
import { MdOutlineDeleteOutline, MdOutlineEdit } from 'react-icons/md'
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from 'next/link';
import { baseUrl } from '@/config/constant';

const PoopOver = ({ getlltodos, item }) => {

    const deleteTodo = async (_id) => {
        const res = await fetch(`${baseUrl}/api/todo/deltetodos`, {
            method: "post",
            headers: { "Content-Type": "application/json",
                "Authorization":`Bearer ${token}`
             },
            body: JSON.stringify({ _id })
        })
        if (res.ok) {
            const resData = await res.json()
            getlltodos()
            console.log("the todos is deleted successfully", resData)
        }
    }
    return (
        <div className=' group relative'>
            <button className=''><BsThreeDotsVertical className='text-[25px] ' /></button>
            <div className=" absolute top-[10px] right-0 gap-x-2 items-center justify-between p-3   w-24  group-hover:flex hidden  duration-300 border border-gray-200 rounded-lg ">
                <Link href={`/dashboard/${item._id}`}>
                    <MdOutlineEdit className="text-[25px] cursor-pointer text-sky-400" />
                </Link>
                <MdOutlineDeleteOutline className='text-[25px] text-secondrayColor cursor-pointer' onClick={() => deleteTodo(item._id)} />
            </div >
        </div >)
}

export default PoopOver