'use client';

import ViewForm from "@/components/adminDeshboard/admission/viewForm";

const Page = ({ params }) => {

    return (
        <div>
            <ViewForm cnic={params.cnic}/>
        </div>

    );
};

export default Page;
