import React, { useEffect, useState } from "react";
import { FilePlus2, ImageUp, X } from "lucide-react";
import Image from "next/image";

function UploadFiles({ videoData, onHandleInputChange }) {
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files)
        setFiles(prev=> [...prev, ...selectedFiles]);
    }

    const removeImage = (indexToRemove) => {
        const uploadedFiles = files.filter((_,index) => index!== indexToRemove);
        setFiles(uploadedFiles)
    }

    //const UploadImageToCloud = () => {
//
    //}
    
    useEffect(() => {
        files && onHandleInputChange('rawFiles', files)
    }, [files])

    return (
        <div className="p-5 shadow rounded-2xl mt-6">
            <h2 className="font-bold text-lg flex gap-2 items-center"> <ImageUp className='p-2 bg-blue-500 text-white h-10 w-10 rounded-md' /> Image/Video Upload </h2>
            <hr className="my-3"/>
            <div className=''>
                <label className=" text-gray-500 "> Upload Image or Video for your ads </label>
                <label htmlFor="fileUpload">
                    <div className="p-6 bg-secondary border-dashed mt-2 cursor-pointer rounded-2xl flex items-center flex-col">
                        <FilePlus2 className="h-10 w-10 text-gray-500" />
                        <h2> Click here to upload files </h2>
                    </div>
                </label>
                <input 
                    type="file" 
                    id="fileUpload" 
                    className="invisible" 
                    accept="image/*, video/*" 
                    multiple
                    onChange={handleFileChange}
                    />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2">
                {files.map((file,index)=>{
                    const previewUrl = URL.createObjectURL(file)
                    return (
                        <div key={index}>
                            <X 
                            className="absolute text-white text-sm" 
                            onClick={() => removeImage(index)} />
                            <Image 
                            src={previewUrl} 
                            alt="images" 
                            width={150} 
                            height={150}
                            className="w-[90px] h-[70px] object-cover rounded-lg" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UploadFiles