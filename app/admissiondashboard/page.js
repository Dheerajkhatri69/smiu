"use client"
import { AdmissionHero } from "@/components/admissiondashboard/admissionHero";
import { NotificationAddmiss } from "@/components/admissiondashboard/notification";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function Page() {

  const { data: session } = useSession(); // Get session data

  const [projects, setProjects] = useState([
    {
      title: "Personal Data",
      link: "admissiondashboard/personaldata",
      state: false,
      name: "personalData"
    },
    {
      title: "Guardians Data",
      link: "admissiondashboard/guardiansData",
      state: false,
      name: "guardiansData"
    },
    {
      title: "Degree Program Information",
      link: "admissiondashboard/degreeProgramInformation",
      state: false,
      name: "degreeProgramInformation"
    },
    {
      title: "Academic Data",
      link: "admissiondashboard/academicData",
      state: false,
      name: "academicData"
    },
    {
      title: "Final Step Upload Documents",
      link: "/admissiondashboard/finalStepUploadDocuments",
      state: false,
      name: "finalStepUploadDocuments"
    }
  ]);
  const getUserData = async (formData) => {
    try {
      const response = await fetch(`/api/admission/admissionstate/${formData.cnic}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // console.log("User data:", result.result);
        const apiResponse = result.result;
        const updatedProjects = projects.map(project => ({
          ...project,
          state: apiResponse[project.name] // Set state based on API data
        }));
        setProjects(updatedProjects);

        return ; // Return the result if data is successfully retrieved
      } else {
        console.log("No data found or an error occurred.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };



  useEffect(() => {
    if (session?.user) {
      getUserData(session.user)
    }
  }, [session]); // Use effect will run when session changes

  return (
    <div className="m-2">
      <AdmissionHero />
      <NotificationAddmiss projects={projects} />
    </div>
  );
}

export default Page;
