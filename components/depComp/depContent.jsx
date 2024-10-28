import Image from "next/image";
import { FollowerPointerCard } from "../ui/following-pointer";

export function DepContent({ prmlink,prmTitle, prmImage, prmDes}) {

    const blogContent = {
        slug: prmTitle,
        date: "28th March, 2023",
        title: prmTitle,
        description: prmDes,
        image: prmImage,
        authorAvatar: prmImage,
    };
    const samlink = "<span className='text-2xl font-bold text-blue-600 p-4 rounded-lg shadow-lg bg-white'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>"
    
    return (
        (<div className="container mx-auto h-full">
            <FollowerPointerCard
                title={
                    <TitleComponent title={blogContent.author} />
                }>
                <div
                    className="relative overflow-hidden h-full rounded-2xl transition duration-200 group">
                    <ThreeDCardDemo image={prmImage} title={prmTitle}/>
                    <div className="p-4">
                        
                        <h2 className="font-normal my-4 text-sm text-black">
                            {blogContent.description}
                        </h2>
                        <div dangerouslySetInnerHTML={{ __html: prmlink }} />
                        {/* <div>{prmlink}</div> */}
                        {/* <h2 className="font-normal my-4 text-sm text-black">
                            {samlink}
                        </h2> */}
                        <div className="flex flex-row justify-between items-center mt-10">
                            <span className="text-sm text-gray-500">{blogContent.date}</span>
                            <div
                                className="relative z-10 px-6 py-2 bg-black text-white font-bold rounded-xl block text-xs">
                                Read More
                            </div>
                        </div>
                    </div>
                </div>
            </FollowerPointerCard>
        </div>)
    );
}

import { ThreeDCardDemo } from "./threeD";

const TitleComponent = ({
    title,
    avatar
}) => (
    <div className="flex space-x-2 items-center">
        <Image
            src={avatar}
            height="20"
            width="20"
            alt="thumbnail"
            className="rounded-full border-2 border-white" />
        <p>{title}</p>
    </div>
);
