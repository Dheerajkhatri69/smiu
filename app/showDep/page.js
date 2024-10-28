"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const page = () => {
    const [deps, setDeps] = useState([]);

    const getDepartment = async () => {
        try {
            let data = await fetch("http://localhost:3000/api/departments");
            data = await data.json();
            if (data.success) {
                setDeps(data.result);
            } else {
                console.error('Failed to fetch departments');
            }
        } catch (error) {
            console.error('Error fetching department data:', error);
        }
    };

    useEffect(() => {
        getDepartment();
    }, []);

    return (
        <div className="mt-20 flex flex-col justify-center items-center container mx-auto">
            <Link href="/addDep" className="mb-5 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                ADD Department
            </Link>
            <h1 className="text-2xl font-bold mb-5">Departments</h1>
            <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2 text-left">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {deps.length > 0 ? (
                        deps.map((dep, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{dep.name}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="border px-4 py-2 text-center" colSpan="1">
                                No departments available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default page;
