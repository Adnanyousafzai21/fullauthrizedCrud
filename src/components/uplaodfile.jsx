"use client"

import React from 'react'
import { BsEye } from 'react-icons/bs';
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from 'react-icons/md';
import cloudinaryUpload from './cloudinary';


const Uplaodfile = ({ previewUrl, setPriveFile }) => {
    console.log("preivew fiel ", previewUrl)
    const uplaodFile = async (e) => {
        const fileinput = e.target.files[0]
        const fileURL = await cloudinaryUpload(fileinput)
        console.log("fileUrl ", fileinput)
        setPriveFile((prev) => ([...prev, { file: fileinput, previewUrl: fileURL }]))
    }

        console.log("file input is privewURL", previewUrl)

    const Delete = (id) => {
        //@ts-ignore
        const updatedArray = previewUrl.filter((data, index) => id !== index)
        setPriveFile(updatedArray)

    }

    return (
        <>
            {previewUrl?.length > 0 && <div className="w-full flex flex-col gap-3  p-2 mb-1">
                {
                    previewUrl?.map((item, index) => (
                        <div className="flex gap justify-between items-center px-3 rounded-lg p-2 shadow-[1px_1px_5px_5px_rgba(150,150,150,0.1)] my-2 border-">
                            <div className="group w-14 h-14 rounded-[10px] overflow-hidden relative flex justify-center items-center cursor-pointer">
                                <img src={item?.previewUrl} alt="" className='w-full h-full rounded-[10px] absolute' />
                                <div className='hidden  w-full h-full  bg-primaryColor absolute opacity-50 group-hover:flex justify-center items-center'> </div>
                                <BsEye className='text-[#000000] absolute z-30  hidden group-hover:block text-2xl font-[800]' />
                            </div>
                            <p>{
                                item.file?.name.replace(/\.[^/.]+$/, "")
                            }</p>
                            <MdOutlineDeleteOutline className='text-[30px] text-secondrayColor cursor-pointer' onClick={() => Delete(index)} />
                        </div>
                    ))
                }
            </div>}

            <label htmlFor="uploadFile1"
                className="relative     bg-primaryColor  font-semibold border-secondrayColor  rounded w-full h-32 flex flex-col items-center justify-center cursor-pointer border-2  border-dashed mx-auto p-4">
                <IoCloudUploadOutline className='text-2xl' />
                <h2 className='text-[16px]'>Upload file</h2>
                <input type="file" id="uploadFile1" className="absolute h-full w-full z-0" style={{ visibility: "hidden" }} onChange={uplaodFile} />
                <p className="text-[8px] ">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>

            </label>
        </>
    )
}

export default Uplaodfile