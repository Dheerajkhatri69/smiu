"use client";
import { Tweet } from "@/components/ui/TweetCard";
import { useEffect, useState } from "react";

export function CompAdmissionForms(prom) {
    const [existData, setExistData] = useState({
        state: false,
        fname: "",
        mname: "",
        lname: "",
        image: "",
        fathersName: "",
        fathersOccupation: "",
        nationality: "",
        cnic: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        religion: "",
        maritalStatus: "",
        domicile: "",
        domicileDistrict: "",
        mobile: "",
        homephone: "",
        postalAddress: "",
        permanentAddress: ""
    });

    useEffect(() => {
        getPersonalData(prom.item.cnic);
    }, []);

    // useEffect(() => {
    //     console.log(existData)
    // }, [existData]);

    
    const getPersonalData = async (fcnic) => {
        // const addstudentSignupEmail = async (formData) => {
        try {
            const personalDataExistResponse = await fetch("/api/admission/personaldataExiste/usingCnic", {
                method: "POST",
                body: JSON.stringify({ cnic: fcnic }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const personalDataExistResult = await personalDataExistResponse.json();
            console.log(personalDataExistResult.data)
            if (personalDataExistResult.exists) {
                setExistData((prevData) => ({
                    ...prevData, // Keep the existing state
                    ...personalDataExistResult.data  // Add the new personalData
                }));

                return; // Stop further processing if any field exists
            }


        } catch (error) {
            console.log("Error: Please check your connection.");
        }
    };



    return (
        <div key={prom.item._id}>
            {/* Pass data to Tweet components if necessary */}
            <Tweet all={prom.item} user={existData}/>
        </div>
    );
}
