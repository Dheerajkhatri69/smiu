"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
const Page = () => {
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
    permanentAddress: "",
    choice01: "",
    choice02: "",
    choice03: "",
    choice04: "",
    choice05: "",
    choice06: "",
    choice07: "",
    choice08: "",
    degreeProgram: "",
    finance_scheme: false,
    immediate_family_to_attend_university: "",
    transport_facility: false,
    hsc_alevel_board: "",
    hsc_alevel_degree: "",
    hsc_alevel_examType: "",
    hsc_alevel_grade: "",
    hsc_alevel_group: "",
    hsc_alevel_institution: "",
    hsc_alevel_optainedMarks: "",
    hsc_alevel_passingYear: "",
    hsc_alevel_percentage: "",
    hsc_alevel_seatNo: "",
    hsc_alevel_startYear: "",
    hsc_alevel_totalMarks: "",
    ssc_olevel_board: "",
    ssc_olevel_degree: "",
    ssc_olevel_examType: "",
    ssc_olevel_grade: "",
    ssc_olevel_group: "",
    ssc_olevel_institution: "",
    ssc_olevel_optainedMarks: "",
    ssc_olevel_passingYear: "",
    ssc_olevel_percentage: "",
    ssc_olevel_seatNo: "",
    ssc_olevel_startYear: "",
    ssc_olevel_totalMarks: "",
  });

  const { data: session } = useSession(); // Get session data
  const [user, setUser] = useState(null); // Initialize with null

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user) {
        setUser(session.user); // Update user state when session is available
        try {
          await getPersonalData(session.user);
          await getGuardiansData(session.user);
          await getDegreeProgramInformation(session.user);
          await getAcademicData(session.user);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData(); // Call the async function
  }, [session]);

  const getPersonalData = async (formData) => {
    // const addstudentSignupEmail = async (formData) => {
    try {
      const personalDataExistResponse = await fetch("/api/admission/personaldataExiste", {
        method: "POST",
        body: JSON.stringify({ cnic: formData.cnic, email: formData.email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const personalDataExistResult = await personalDataExistResponse.json();

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

  const getGuardiansData = async (formData) => {
    // const addstudentSignupEmail = async (formData) => {
    try {
      const guardiansDataExistResponse = await fetch("/api/admission/guardiansData/guardiansDataExiste", {
        method: "POST",
        body: JSON.stringify({ cnic: formData.cnic, email: formData.email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const guardiansDataExistResult = await guardiansDataExistResponse.json();

      if (guardiansDataExistResult.exists) {

        setExistData((prevData) => ({
          ...prevData, // Keep the existing state
          ...guardiansDataExistResult.data // Add the new personalData
        }));
        return; // Stop further processing if any field exists
      }


    } catch (error) {
      console.log("Error: Please check your connection.");
    }
  };
  const getDegreeProgramInformation = async (formData) => {
    // const addstudentSignupEmail = async (formData) => {
    try {
      const degreeProgramInformationExistResponse = await fetch("/api/admission/degreeProgramInformation/degreeProgramInformationExiste", {
        method: "POST",
        body: JSON.stringify({ cnic: formData.cnic, email: formData.email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const degreeProgramInformationExistResult = await degreeProgramInformationExistResponse.json();

      if (degreeProgramInformationExistResult.exists) {

        setExistData((prevData) => ({
          ...prevData, // Keep the existing state
          ...degreeProgramInformationExistResult.data  // Add the new personalData
        }));
        return; // Stop further processing if any field exists
      }


    } catch (error) {
      console.log("Error: Please check your connection.");
    }
  };

  const getAcademicData = async (formData) => {
    // const addstudentSignupEmail = async (formData) => {
    try {
      const academicDataExistResponse = await fetch("/api/admission/academicData/academicDataExiste", {
        method: "POST",
        body: JSON.stringify({ cnic: formData.cnic, email: formData.email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const academicDataExistResult = await academicDataExistResponse.json();

      if (academicDataExistResult.exists) {
        setExistData((prevData) => ({
          ...prevData, // Keep the existing state
          ...academicDataExistResult.data // Add the new personalData
        }));
        return; // Stop further processing if any field exists
      }


    } catch (error) {
      console.log("Error: Please check your connection.");
    }
  };
  const form = useForm({
    defaultValues: {
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
      permanentAddress: "",
      choice01: "",
      choice02: "",
      choice03: "",
      choice04: "",
      choice05: "",
      choice06: "",
      choice07: "",
      choice08: "",
      degreeProgram: "",
      finance_scheme: false,
      immediate_family_to_attend_university: "",
      transport_facility: false,
      hsc_alevel_board: "",
      hsc_alevel_degree: "",
      hsc_alevel_examType: "",
      hsc_alevel_grade: "",
      hsc_alevel_group: "",
      hsc_alevel_institution: "",
      hsc_alevel_optainedMarks: "",
      hsc_alevel_passingYear: "",
      hsc_alevel_percentage: "",
      hsc_alevel_seatNo: "",
      hsc_alevel_startYear: "",
      hsc_alevel_totalMarks: "",
      ssc_olevel_board: "",
      ssc_olevel_degree: "",
      ssc_olevel_examType: "",
      ssc_olevel_grade: "",
      ssc_olevel_group: "",
      ssc_olevel_institution: "",
      ssc_olevel_optainedMarks: "",
      ssc_olevel_passingYear: "",
      ssc_olevel_percentage: "",
      ssc_olevel_seatNo: "",
      ssc_olevel_startYear: "",
      ssc_olevel_totalMarks: ""
    },
    mode: "onBlur", // Validate on blur
  });

  const useremail = user ? `${user.email || ""}` : "User";
  const usercnic = user ? `${user.cnic || ""}` : "User CNIC";


  return (
    <div className='relative overflow-hidden'>

      <div className="flex justify-center self-center z-10 m-2">
        <div className="backdrop-blur-lg border border-white/40 shadow-lg p-12 bg-primary-foreground/50 mx-auto rounded-3xl w-full">
          <div className="mb-7">
            <h3 className="font-semibold text-2xl text-gray-800 text-center">Admission Form</h3>
            <h6 className='text-green-400'>Your Admission form has been submitted successfully. Please Click Apllication Updates menu for further information on Application process.</h6>
          </div>
          <div className='flex gap-2 flex-wrap'>
            <Button variant="secondary" className="bg-green-400">Download Application Form</Button>
            <Button variant="secondary" className="bg-green-400">Download Fee Voucher</Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center self-center z-10 m-2">
        <div className="backdrop-blur-lg border border-white/40 shadow-lg p-12 bg-primary/80 mx-auto rounded-3xl w-full">
          <div className="mb-7">
            <h3 className="font-semibold text-2xl text-gray-800 text-center">Personal Data</h3>
          </div>

          <Form {...form}>
            <form className="space-y-8">
              <span className="lg:flex lg:space-x-8 justify-between items-center block space-y-8">
                <span className="flex flex-col space-y-8">

                  <Image
                    src={existData.image}
                    alt="Uploaded Image"
                    layout="intrinsic"
                    width={200} // Specify a width
                    height={200} // Specify a height
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </span>

                <span className="flex flex-col space-y-8 w-full">

                  <span className="lg:flex justify-between block items-end space-y-8">
                    <FormField
                      name="fname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="First Name" {...field}
                              value={existData.fname || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                              onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                              disabled={existData.state}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="mname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Middle Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Middle Name" {...field}
                              value={existData.mname || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                              onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                              disabled={existData.state}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="lname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Last Name" {...field}
                              value={existData.mname || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                              onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                              disabled={existData.state} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </span>

                  <span className="lg:flex justify-between block items-end space-y-8">
                    <FormField
                      name="fathersName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Father Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Father's Name" {...field}
                              value={existData.fathersName || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                              onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                              disabled={existData.state}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="fathersOccupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Father Occupation</FormLabel>
                          <FormControl>
                            <Input placeholder="Father's Occupation" {...field}
                              value={existData.fathersOccupation || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                              onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                              disabled={existData.state}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="nationality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nationality</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => field.onChange(value)}
                              value={field.value || existData.nationality}
                              disabled={existData.state}
                            >
                              <SelectTrigger className="w-[200px] bg-white/50" >
                                <SelectValue placeholder="Select Nationality" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pakistan">Pakistan</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  </span>
                  <span className="lg:flex  items-end justify-between block space-y-8">

                    <FormField
                      name="cnic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CNIC</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="XXXXX-XXXXXXX-X"
                              {...field}
                              value={usercnic}
                              disabled // This will disable the input field
                            />
                            {/* <Input placeholder="XXXXX-XXXXXXX-X"  {...field} /> */}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="you@example.com"
                              {...field}
                              value={useremail}
                              disabled
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </span>
                </span>

              </span>

              <span className="flex flex-col gap-8">

                <span className="lg:flex justify-between items-end block space-y-8">
                  <FormField
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <div className="relative max-w-sm">
                            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                              <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                              </svg>
                            </div>
                            <Input
                              placeholder="Select date"
                              {...field}
                              value={existData.dateOfBirth || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                              onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                              disabled={existData.state}
                            // Here you would handle the date picker logic, maybe using a library
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value || existData.gender}
                            disabled={existData.state}
                          >
                            <SelectTrigger className="w-[200px] bg-white/50">
                              <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="religion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Religion</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value || existData.religion}
                            disabled={existData.state}
                          >
                            <SelectTrigger className="w-[200px] bg-white/50">
                              <SelectValue placeholder="Select Religion" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="islam">Islam</SelectItem>
                              <SelectItem value="christianity">Christianity</SelectItem>
                              <SelectItem value="hinduism">Hinduism</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="maritalStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marital Status</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value || existData.maritalStatus}
                            disabled={existData.state}
                          >
                            <SelectTrigger className="w-[200px] bg-white/50">
                              <SelectValue placeholder="Select Marital Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Single">Single</SelectItem>
                              <SelectItem value="Married">Married</SelectItem>
                              <SelectItem value="Divorced">Divorced</SelectItem>
                              <SelectItem value="Widowed">Widowed</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </span>
                <span className="lg:flex justify-between items-end block space-y-8">
                  <FormField
                    name="domicile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Domicile</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value); // Update form state
                            }}
                            value={field.value || existData.domicile} // Ensure correct value from form state
                            disabled={existData.state}
                          >
                            <SelectTrigger className="w-[200px] bg-white/50">
                              <SelectValue placeholder="Select Domicile" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sindh_rural">Sindh Rural</SelectItem>
                              <SelectItem value="sindh_urban">Sindh Urban</SelectItem>
                              <SelectItem value="punjab">Punjab</SelectItem>
                              <SelectItem value="balochistan">Balochistan</SelectItem>
                              <SelectItem value="kpk">KPK</SelectItem>
                              <SelectItem value="gilgit_baltistan">Gilgit-Baltistan</SelectItem>
                              <SelectItem value="ajk">AJK</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="domicileDistrict"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Domicile District</FormLabel>
                        <FormControl>
                          <Input placeholder="Domicile District" {...field}
                            value={existData.domicileDistrict || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                            disabled={existData.state}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile</FormLabel>
                        <FormControl>
                          <Input placeholder="Mobile" {...field}
                            value={existData.mobile || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                            disabled={existData.state} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="homephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Home Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Home Phone" {...field}
                            value={existData.homephone || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                            disabled={existData.state}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </span>
                <FormField
                  name="postalAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Postal Address" {...field}
                          value={existData.postalAddress || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                          onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                          disabled={existData.state} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="permanentAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Permanent Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Permanent Address" {...field}
                          value={existData.permanentAddress || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                          onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                          disabled={existData.state} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </span>

            </form>
          </Form>
        </div>
      </div>

      <div className="flex justify-center self-center z-10 m-2">
        <div className="backdrop-blur-lg border border-white/40 shadow-lg p-12 bg-primary-foreground/50 mx-auto rounded-3xl w-full">
          <div className="mb-7">
            <h3 className="font-semibold text-2xl text-gray-800 text-center">Guardian/Sponsor Information</h3>
          </div>

          <Form {...form}>
            <form className="space-y-8">

              <span className="lg:flex lg:space-x-8 justify-between items-center block space-y-8">

                <span className="flex flex-col space-y-8 w-full">

                  <span className="lg:flex justify-between block items-end space-y-8">
                    <FormField
                      name="guardianName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Guardian/Sponsor Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Guardian/Sponsor Name" {...field}
                              value={existData.guardianName || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                              onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                              disabled={existData.state}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="occupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Occupation</FormLabel>
                          <FormControl>
                            <Input placeholder="Occupation" {...field}
                              value={existData.occupation || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                              onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                              disabled={existData.state}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="jobNature"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Nature</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value); // Update form state
                              }}
                              value={field.value || existData.jobNature} // Ensure correct value from form state
                              disabled={existData.state}
                            >
                              <SelectTrigger className="w-[200px] bg-white/50">
                                <SelectValue placeholder="Select Job Nature" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="government_job">Government Job</SelectItem>
                                <SelectItem value="private_job">Private Job</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  </span>

                  <span className="lg:flex justify-between block items-end space-y-8">
                    <FormField
                      name="relationshipWithApllicant"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Relationship With Apllicant</FormLabel>
                          <FormControl>
                            <Input placeholder="Relationship With Apllicant" {...field}
                              value={existData.relationshipWithApllicant || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                              onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                              disabled={existData.state}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="monthlyIncome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Income</FormLabel>
                          <FormControl>
                            <Input placeholder="Monthly Income" {...field}
                              value={existData.monthlyIncome || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                              onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                              disabled={existData.state}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile</FormLabel>
                          <FormControl>
                            <Input placeholder="Mobile number" {...field}
                              value={existData.mobile || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                              onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                              disabled={existData.state}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />


                  </span>
                  <span className="lg:flex  items-end justify-between block space-y-8">

                    <FormField
                      name="organization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization</FormLabel>
                          <FormControl>
                            <Input placeholder="Organization" {...field}
                              value={existData.organization || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                              onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                              disabled={existData.state}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="designation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Designation</FormLabel>
                          <FormControl>
                            <Input placeholder="Designation" {...field}
                              value={existData.designation || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                              onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                              disabled={existData.state}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </span>
                  <FormField
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Address" {...field}
                            value={existData.address || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                            disabled={existData.state}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </span>

              </span>
              <div className="mb-7">
                <h3 className="font-semibold text-2xl text-gray-800 text-center">Emergency Contect information</h3>
              </div>
              <span className="flex flex-col gap-8">

                <span className="lg:flex justify-between block items-end space-y-8">
                  <FormField
                    name="emergencyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Emergency Name" {...field}
                            value={existData.emergencyName || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                            disabled={existData.state}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="eRelationshipWithApllicant"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relationship With Apllicant</FormLabel>
                        <FormControl>
                          <Input placeholder="Relationship With Apllicant" {...field}
                            value={existData.eRelationshipWithApllicant || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                            disabled={existData.state}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="eMobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile</FormLabel>
                        <FormControl>
                          <Input placeholder="Mobile Number" {...field}
                            value={existData.eMobile || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                            disabled={existData.state}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </span>


                <FormField
                  name="eCompleteAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complete Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Complete Address" {...field}
                          value={existData.eCompleteAddress || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                          onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                          disabled={existData.state}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </span>

            </form>
          </Form>
        </div>
      </div>
      <div className="flex justify-center self-center z-10 m-2">
        <div className="backdrop-blur-lg border border-white/40 shadow-lg p-12 bg-primary-foreground/50 mx-auto rounded-3xl w-full">
          <div className="mb-7">
            <h3 className="font-semibold text-2xl text-gray-800 text-center">Degree Program Information</h3>
          </div>
          <Form {...form}>
            <form className="space-y-8">

              <span className="lg:flex lg:space-x-8 justify-between items-center block space-y-8">
                <span className="flex flex-col space-y-8 w-full">

                  <FormField
                    name="degreeProgram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Degree Program</FormLabel>
                        <FormControl>
                          <Select
                            value={existData.degreeProgram} // Ensure correct value from form state
                            disabled={existData.state}
                          >
                            <SelectTrigger className="w-full bg-white/50">
                              <SelectValue placeholder="--Select Degree Program--" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="undergraduate">Undergraduate</SelectItem>
                              <SelectItem value="graduate">Graduate</SelectItem>
                              <SelectItem value="postgraduate">Postgraduate</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <span className="lg:flex  items-end justify-between block space-y-8">
                    <FormField
                      name="choice01"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>1st Choice</FormLabel>
                          <FormControl>
                            <Select
                              value={existData.choice01} // Use value from form state, fallback to existData.choice01
                              disabled={existData.state}
                            >
                              <SelectTrigger className="w-full 2xl:w-[500px] lg:w-[300px] bg-white/50">
                                <SelectValue placeholder="--Select Program--" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={existData.choice01 || "null"}>
                                  {existData.choice01 || "null"}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="choice02"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>2nd Choice</FormLabel>
                          <FormControl>
                            <Select
                              value={existData.choice02} // Ensure correct value from form state
                              disabled={existData.state}
                            >
                              <SelectTrigger className="w-full 2xl:w-[500px] lg:w-[300px] bg-white/50">
                                <SelectValue placeholder="--Select Program--" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={existData.choice02 || "null"}>
                                  {existData.choice02 || "null"}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </span>
                  <span className="lg:flex  items-end justify-between block space-y-8">

                    <FormField
                      name="choice03"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>3rd Choice</FormLabel>
                          <FormControl>
                            <Select
                              value={existData.choice03} // Ensure correct value from form state
                              disabled={existData.state}
                            >
                              <SelectTrigger className="w-full 2xl:w-[500px] lg:w-[300px] bg-white/50">
                                <SelectValue placeholder="--Select Program--" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={existData.choice03 || "null"}>
                                  {existData.choice03 || "null"}
                                </SelectItem>

                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="choice04"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>4th Choice</FormLabel>
                          <FormControl>
                            <Select
                              value={existData.choice04} // Ensure correct value from form state
                              disabled={existData.state}

                            >
                              <SelectTrigger className="w-full 2xl:w-[500px] lg:w-[300px] bg-white/50">
                                <SelectValue placeholder="--Select Program--" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={existData.choice04 || "null"}>
                                  {existData.choice04 || "null"}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </span>
                  <span className="lg:flex  items-end justify-between block space-y-8">

                    <FormField
                      name="choice05"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>5th Choice</FormLabel>
                          <FormControl>
                            <Select
                              value={existData.choice05 || "null"} // Ensure correct value from form state
                              disabled={existData.state}
                            >
                              <SelectTrigger className="w-full 2xl:w-[500px] lg:w-[300px] bg-white/50">
                                <SelectValue placeholder="--Select Program--" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={existData.choice05 || "null"}>
                                  {existData.choice05 || "null"}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="choice06"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>6th Choice</FormLabel>
                          <FormControl>
                            <Select
                              value={existData.choice06 || "null"} // Ensure correct value from form state
                              disabled={existData.state}
                            >
                              <SelectTrigger className="w-full 2xl:w-[500px] lg:w-[300px] bg-white/50">
                                <SelectValue placeholder="--Select Program--" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={existData.choice06 || "null"}>
                                  {existData.choice06 || "null"}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </span>
                  <span className="lg:flex  items-end justify-between block space-y-8">

                    <FormField
                      name="choice07"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>7th Choice</FormLabel>
                          <FormControl>
                            <Select
                              value={existData.choice07 || "null"} // Ensure correct value from form state
                              disabled={existData.state}
                            >
                              <SelectTrigger className="w-full 2xl:w-[500px] lg:w-[300px] bg-white/50">
                                <SelectValue placeholder="--Select Program--" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={existData.choice07 || "null"}>
                                  {existData.choice07 || "null"}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="choice08"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>8th Choice</FormLabel>
                          <FormControl>
                            <Select
                              value={existData.choice08 || "null"} // Ensure correct value from form state
                              disabled={existData.state}
                            >
                              <SelectTrigger className="w-full 2xl:w-[500px] lg:w-[300px] bg-white/50">
                                <SelectValue placeholder="--Select Program--" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={existData.choice08 || "null"}>
                                  {existData.choice08 || "null"}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </span>

                </span>

              </span>
              <span className="flex flex-col gap-8">
                <FormField
                  name="finance_scheme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check the box if you are interested in Finance Scheme</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="finance_scheme"
                            checked={existData.finance_scheme}
                            className="bg-white"
                            disabled={existData.state}
                          />
                          <label
                            htmlFor="finance_scheme"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Slep Finance Scheme
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="transport_facility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check the box if you are interested in Transport Facility</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="transport_facility"
                            checked={existData.transport_facility}
                            className="bg-white"
                            disabled={existData.state}
                          />
                          <label
                            htmlFor="transport_facility"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Transport Facility
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="immediate_family_to_attend_university"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Are you the first person in your immediate family to attend university?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={existData.immediate_family_to_attend_university}
                          disabled={existData.state}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="yes"
                              id="immediate_family_yes"
                              className="bg-white text-black"
                            />
                            <Label htmlFor="immediate_family_yes">YES</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="no"
                              id="immediate_family_no"
                              className="bg-white text-black"
                            />
                            <Label htmlFor="immediate_family_no">NO</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </span>

            </form>
          </Form>

        </div>
      </div>

      <div className="flex justify-center self-center z-10 m-2">
        <div className="backdrop-blur-lg border border-white/40 shadow-lg p-12 bg-primary-foreground/50 mx-auto rounded-3xl w-full">
          <div className="mb-7">
            <h3 className="font-semibold text-2xl text-gray-800 text-center">SSC / O-LEVEL Eduction</h3>
          </div>

          <Form {...form}>
            <form className="space-y-8">

              <span className="lg:flex lg:space-x-8 justify-between items-center block space-y-8">

                <span className="flex flex-col space-y-8 w-full">

                  <span className="lg:flex justify-between block items-end space-y-8">

                    <FormField
                      name="ssc_olevel_degree"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Degree</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value); // Update form state
                              }}
                              value={field.value || existData.ssc_olevel_degree} // Ensure correct value from form state
                              disabled={existData.state}
                            >
                              <SelectTrigger className="w-[200px] bg-white/50">
                                <SelectValue placeholder="-Select Degree-" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ssc">SSC</SelectItem>
                                <SelectItem value="o_level">O-Level</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />


                    <FormField
                      name="ssc_olevel_group"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Group</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value); // Update form state
                              }}
                              value={field.value || existData.ssc_olevel_group} // Ensure correct value from form state
                              disabled={existData.state}
                            >
                              <SelectTrigger className="w-[200px] bg-white/50">
                                <SelectValue placeholder="-Select Group-" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="general_science">General Science</SelectItem>
                                <SelectItem value="science">Science</SelectItem>
                                <SelectItem value="humanities">Humanities</SelectItem>
                                <SelectItem value="computer_science">Computer Science</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="ssc_olevel_board"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Board</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => field.onChange(value)} // Correctly update form state
                              value={field.value || existData.ssc_olevel_board} // Ensure form state value is used
                              disabled={existData.state}
                            >
                              <SelectTrigger className="w-[200px] bg-white/50">
                                <SelectValue placeholder="-Select Board-" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="BISE Lahore Board">BISE Lahore Board</SelectItem>
                                <SelectItem value="BISE Gujranwala Board">BISE Gujranwala Board</SelectItem>
                                <SelectItem value="BISE Sahiwal Board">BISE Sahiwal Board</SelectItem>
                                <SelectItem value="BISE Bahawalpur Board">BISE Bahawalpur Board</SelectItem>
                                <SelectItem value="BISE DG Khan Board">BISE DG Khan Board</SelectItem>
                                <SelectItem value="BISE Faisalabad Board">BISE Faisalabad Board</SelectItem>
                                <SelectItem value="BISE Multan Board">BISE Multan Board</SelectItem>
                                <SelectItem value="BISE Rawalpindi Board">BISE Rawalpindi Board</SelectItem>
                                <SelectItem value="BISE Sargodha Board">BISE Sargodha Board</SelectItem>
                                <SelectItem value="BISE Federal Board">BISE Federal Board</SelectItem>
                                <SelectItem value="BISE Hyderabad Board">BISE Hyderabad Board</SelectItem>
                                <SelectItem value="BISE Larkana Board">BISE Larkana Board</SelectItem>
                                <SelectItem value="BISE MirpurKhas Board">BISE MirpurKhas Board</SelectItem>
                                <SelectItem value="BISE Sukkur Board">BISE Sukkur Board</SelectItem>
                                <SelectItem value="BSEK Karachi Board">BSEK Karachi Board</SelectItem>
                                <SelectItem value="BSEK Agha Khan Board">BSEK Agha Khan Board</SelectItem>
                                <SelectItem value="BISE Abbotabad Board">BISE Abbotabad Board</SelectItem>
                                <SelectItem value="BISE Bannu Board">BISE Bannu Board</SelectItem>
                                <SelectItem value="BISE Kohat Board">BISE Kohat Board</SelectItem>
                                <SelectItem value="BISE Malakand Board">BISE Malakand Board</SelectItem>
                                <SelectItem value="BISE Mardan Board">BISE Mardan Board</SelectItem>
                                <SelectItem value="BISE Peshawar Board">BISE Peshawar Board</SelectItem>
                                <SelectItem value="BISE Swat Board">BISE Swat Board</SelectItem>
                                <SelectItem value="BISE DI Khan Board">BISE DI Khan Board</SelectItem>
                                <SelectItem value="BISE Quetta Board">BISE Quetta Board</SelectItem>
                                <SelectItem value="BISE AJK Board">BISE AJK Board</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="ssc_olevel_institution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution</FormLabel>
                          <FormControl>
                            <Input placeholder="Institution" {...field}
                              value={existData.ssc_olevel_institution || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                              onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                              disabled={existData.state} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </span>

                  <span className="lg:flex justify-between block items-end space-y-8">
                    <FormField
                      name="ssc_olevel_seatNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Seat No</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Seat No" {...field}
                              value={existData.ssc_olevel_seatNo || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                              onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                              disabled={existData.state} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="ssc_olevel_examType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Exam Type</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value); // Update form state
                              }}
                              value={field.value || existData.ssc_olevel_examType} // Ensure correct value from form state
                              disabled={existData.state}
                            >
                              <SelectTrigger className="w-[200px] bg-white/50">
                                <SelectValue placeholder="-Select Exam Type-" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="annual">Annual</SelectItem>
                                <SelectItem value="Supplementary">Supplementary</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="ssc_olevel_startYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Year</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Start Year" {...field}
                              value={existData.ssc_olevel_startYear || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                              onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                              disabled={existData.state} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="ssc_olevel_passingYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passing Year</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Passing Year" {...field}
                              value={existData.ssc_olevel_passingYear || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                              onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                              disabled={existData.state} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </span>

                  <span className="lg:flex justify-between block items-end space-y-8">
                    <FormField
                      name="ssc_olevel_optainedMarks"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Optained Marks</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Optained Marks" {...field}
                              value={existData.ssc_olevel_optainedMarks || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                              onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                              disabled={existData.state} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="ssc_olevel_totalMarks"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Marks</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Total Marks" {...field}
                              value={existData.ssc_olevel_totalMarks || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                              onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                              disabled={existData.state} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="ssc_olevel_percentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Persentage</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Persentage" {...field}
                              value={existData.ssc_olevel_percentage || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                              onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                              disabled={existData.state} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="ssc_olevel_grade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Grade</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value); // Update form state
                              }}
                              value={field.value || existData.ssc_olevel_grade} // Ensure correct value from form state
                              disabled={existData.state}
                            >
                              <SelectTrigger className="w-[200px] bg-white/50">
                                <SelectValue placeholder="-Select Grade-" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="A-1">A-1</SelectItem>
                                <SelectItem value="A">A</SelectItem>
                                <SelectItem value="B">B</SelectItem>
                                <SelectItem value="C">C</SelectItem>
                                <SelectItem value="D">D</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </span>
                </span>

              </span>
              <div className="mb-7">
                <h3 className="font-semibold text-2xl text-gray-800 text-center">HSC / A-LEVEL Eduction</h3>
              </div>
              <span className="flex flex-col gap-8">

                <span className="lg:flex justify-between block items-end space-y-8">

                  <FormField
                    name="hsc_alevel_degree"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value); // Update form state
                            }}
                            value={field.value || existData.hsc_alevel_degree} // Ensure correct value from form state
                            disabled={existData.state}
                          >
                            <SelectTrigger className="w-[200px] bg-white/50">
                              <SelectValue placeholder="-Select Degree-" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hsc">HSC</SelectItem>
                              <SelectItem value="a_level">A-Level</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


                  <FormField
                    name="hsc_alevel_group"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Group</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value); // Update form state
                            }}
                            value={field.value || existData.hsc_alevel_group} // Ensure correct value from form state
                            disabled={existData.state}
                          >
                            <SelectTrigger className="w-[200px] bg-white/50">
                              <SelectValue placeholder="-Select Group-" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pre_engineering">Pre-Engineering</SelectItem>
                              <SelectItem value="pre_medical">Pre-Medical</SelectItem>
                              <SelectItem value="humanities">Humanities</SelectItem>
                              <SelectItem value="computer_science">Computer Science</SelectItem>
                              <SelectItem value="commerce">Commerce</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="hsc_alevel_board"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Board</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)} // Correctly update form state
                            value={field.value || existData.hsc_alevel_board} // Ensure form state value is used
                            disabled={existData.state}
                          >
                            <SelectTrigger className="w-[200px] bg-white/50">
                              <SelectValue placeholder="-Select Board-" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="BISE Lahore Board">BISE Lahore Board</SelectItem>
                              <SelectItem value="BISE Gujranwala Board">BISE Gujranwala Board</SelectItem>
                              <SelectItem value="BISE Sahiwal Board">BISE Sahiwal Board</SelectItem>
                              <SelectItem value="BISE Bahawalpur Board">BISE Bahawalpur Board</SelectItem>
                              <SelectItem value="BISE DG Khan Board">BISE DG Khan Board</SelectItem>
                              <SelectItem value="BISE Faisalabad Board">BISE Faisalabad Board</SelectItem>
                              <SelectItem value="BISE Multan Board">BISE Multan Board</SelectItem>
                              <SelectItem value="BISE Rawalpindi Board">BISE Rawalpindi Board</SelectItem>
                              <SelectItem value="BISE Sargodha Board">BISE Sargodha Board</SelectItem>
                              <SelectItem value="BISE Federal Board">BISE Federal Board</SelectItem>
                              <SelectItem value="BISE Hyderabad Board">BISE Hyderabad Board</SelectItem>
                              <SelectItem value="BISE Larkana Board">BISE Larkana Board</SelectItem>
                              <SelectItem value="BISE MirpurKhas Board">BISE MirpurKhas Board</SelectItem>
                              <SelectItem value="BISE Sukkur Board">BISE Sukkur Board</SelectItem>
                              <SelectItem value="BSEK Karachi Board">BSEK Karachi Board</SelectItem>
                              <SelectItem value="BSEK Agha Khan Board">BSEK Agha Khan Board</SelectItem>
                              <SelectItem value="BISE Abbotabad Board">BISE Abbotabad Board</SelectItem>
                              <SelectItem value="BISE Bannu Board">BISE Bannu Board</SelectItem>
                              <SelectItem value="BISE Kohat Board">BISE Kohat Board</SelectItem>
                              <SelectItem value="BISE Malakand Board">BISE Malakand Board</SelectItem>
                              <SelectItem value="BISE Mardan Board">BISE Mardan Board</SelectItem>
                              <SelectItem value="BISE Peshawar Board">BISE Peshawar Board</SelectItem>
                              <SelectItem value="BISE Swat Board">BISE Swat Board</SelectItem>
                              <SelectItem value="BISE DI Khan Board">BISE DI Khan Board</SelectItem>
                              <SelectItem value="BISE Quetta Board">BISE Quetta Board</SelectItem>
                              <SelectItem value="BISE AJK Board">BISE AJK Board</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="hsc_alevel_institution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution</FormLabel>
                        <FormControl>
                          <Input placeholder="Institution" {...field}
                            value={existData.hsc_alevel_institution || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                            disabled={existData.state} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </span>

                <span className="lg:flex justify-between block items-end space-y-8">
                  <FormField
                    name="hsc_alevel_seatNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seat No</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Seat No" {...field}
                            value={existData.hsc_alevel_seatNo || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                            disabled={existData.state} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="hsc_alevel_examType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exam Type</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value); // Update form state
                            }}
                            value={field.value || existData.hsc_alevel_examType} // Ensure correct value from form state
                            disabled={existData.state}
                          >
                            <SelectTrigger className="w-[200px] bg-white/50">
                              <SelectValue placeholder="-Select Exam Type-" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="annual">Annual</SelectItem>
                              <SelectItem value="Supplementary">Supplementary</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="hsc_alevel_startYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Year</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Start Year" {...field}
                            value={existData.hsc_alevel_startYear || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                            disabled={existData.state} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="hsc_alevel_passingYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Passing Year</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Passing Year" {...field}
                            value={existData.hsc_alevel_passingYear || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                            disabled={existData.state} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </span>

                <span className="lg:flex justify-between block items-end space-y-8">
                  <FormField
                    name="hsc_alevel_optainedMarks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Optained Marks</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Optained Marks" {...field}
                            value={existData.hsc_alevel_optainedMarks || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                            disabled={existData.state} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="hsc_alevel_totalMarks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Marks</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Total Marks" {...field}
                            value={existData.hsc_alevel_totalMarks || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                            disabled={existData.state} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="hsc_alevel_percentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Persentage</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Persentage" {...field}
                            value={existData.hsc_alevel_percentage || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                            disabled={existData.state} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="hsc_alevel_grade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grade</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value); // Update form state
                            }}
                            value={field.value || existData.hsc_alevel_grade} // Ensure correct value from form state
                            disabled={existData.state}
                          >
                            <SelectTrigger className="w-[200px] bg-white/50">
                              <SelectValue placeholder="-Select Grade-" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A-1">A-1</SelectItem>
                              <SelectItem value="A">A</SelectItem>
                              <SelectItem value="B">B</SelectItem>
                              <SelectItem value="C">C</SelectItem>
                              <SelectItem value="D">D</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                              <SelectItem value="result_awaiting">Result Awaiting</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </span>
              </span>

            </form>
          </Form>
        </div>
      </div>

    </div>
  )
}

export default Page;