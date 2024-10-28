"use client";

import Link from 'next/link';
import React, { useState } from 'react';

const AddDepartmentPage = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");

    const addDepartment = async () => {
        console.log(name, description, link)
        let result = await fetch("http://localhost:3000/api/departments",{
            method:"POST",
            body:JSON.stringify({name,description,link})
        })
        result = await result.json()
        if(result.success){
            alert("Department add succussfully!")
        }
    };

    return (
        <div className="container mx-auto flex flex-col justify-center items-center mt-20">
            <Link href="/showDep" className="mb-5 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                Show Departments
            </Link>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="m-10 p-2 text-2xl rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter department name"
            />
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="m-10 p-2 text-2xl rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter department description"
            />
            <input
                type="text"
                onChange={(e) => setLink(e.target.value)}
                value={link}
                className="m-10 p-2 text-2xl rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter department link"
            />

            <button
                type="submit"  // Use type="submit" for button
                onClick={addDepartment}
                className="w-50 bg-blue-500 text-white text-2xl px-4 py-2 rounded hover:bg-blue-700"
            >
                Submit
            </button>

        </div>
    );
};

export default AddDepartmentPage;
