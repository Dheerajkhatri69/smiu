'use client'
import { cn } from "@/lib/utils";
import { Logo } from "../Logo/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EllipsisVertical } from "lucide-react";

import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Twitter = ({ className, ...props }) => (
    <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
    >
        <g>
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"></path>
        </g>
    </svg>
);

const Verified = ({ className, ...props }) => (
    <svg
        aria-label="Verified Account"
        viewBox="0 0 24 24"
        className={className}
        {...props}
    >
        <g fill="currentColor">
            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
        </g>
    </svg>
);

const truncate = (str, length) => {
    if (!str || str.length <= length) return str;
    return `${str.slice(0, length - 3)}...`;
};

const Skeleton = ({ className, ...props }) => (
    <div className={cn("rounded-md bg-primary/10", className)} {...props} />
);

const TweetSkeleton = ({ className, ...props }) => (
    <div
        className={cn(
            "flex size-full max-h-max min-w-72 flex-col gap-2 rounded-lg border p-4",
            className
        )}
        {...props}
    >
        <div className="flex flex-row gap-2">
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-20 w-full" />
    </div>
);

const TweetNotFound = ({ className, ...props }) => (
    <div
        className={cn(
            "flex size-full flex-col items-center justify-center gap-2 rounded-lg border p-4",
            className
        )}
        {...props}
    >
        <h3>Tweet not found</h3>
    </div>
);

const TweetHeader = ({ status, user }) => (
    <div className="flex flex-row justify-between tracking-tight">
        <div className="flex items-center space-x-2">
            <Avatar>
                <AvatarImage src={user.image} />
                <AvatarFallback>{user.fname.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="flex items-center whitespace-nowrap font-semibold">
                    {truncate(user.fname + " " + user.lname, 20)}
                    {status.personalData ? <Verified className="ml-1 inline size-4 text-blue-500" /> : null}
                    {status.guardiansData ? <Verified className="ml-1 inline size-4 text-blue-500" /> : null}
                    {status.degreeProgramInformation ? <Verified className="ml-1 inline size-4 text-blue-500" /> : null}
                    {status.academicData ? <Verified className="ml-1 inline size-4 text-blue-500" /> : null}
                    {status.finalStepUploadDocuments ? <Verified className="ml-1 inline size-4 text-blue-500" /> : null}
                </p>
                <div className="flex items-center space-x-1">
                    <p
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-gray-500 transition-all duration-75"
                    >
                        @{truncate(user.email, 16)}
                    </p>
                </div>
            </div>
        </div>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <EllipsisVertical cursor="pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-primary/80">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CreditCard />
                        <span>Billing</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Keyboard />
                        <span>Keyboard shortcuts</span>
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Users />
                        <span>Team</span>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <UserPlus />
                            <span>Invite users</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                    <Mail />
                                    <span>Email</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <MessageSquare />
                                    <span>Message</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <PlusCircle />
                                    <span>More...</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        <Plus />
                        <span>New Team</span>
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Github />
                    <span>GitHub</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LifeBuoy />
                    <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                    <Cloud />
                    <span>API</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    </div>
);

const TweetBody = ({ tweet, user }) => (
    <div className="break-words leading-normal tracking-tighter">
        <p
            className="text-sm font-normal text-gray-500"
        >
            <span>Full Name: </span>
            <span
                className="text-sm font-normal"
            >{user.fname + " " +user.mname + " " +user.lname}</span>
        </p>
        <p
            className="text-sm font-normal text-gray-500"
        >
            <span>Father: </span>
            <span
                className="text-sm font-normal"
            >{user.fathersName}</span>
        </p>
        <p
            className="text-sm font-normal text-gray-500"
        >
            <span>CNIC: </span>
            <span
                className="text-sm font-normal"
            >{user.cnic}</span>
        </p>
        <p
            className="text-sm font-bold text-gray-500"
        >
            <span>Mobile: </span>
            <span
                className="text-sm"
            >{user.mobile}</span>
        </p>
    </div>
);

const TweetMedia = ({ tweet }) => (
    <div className="flex flex-1 items-center justify-center">
        {tweet.video && (
            <video
                poster={tweet.video.poster}
                autoPlay
                loop
                muted
                playsInline
                className="rounded-xl border shadow-sm"
            >
                <source src={tweet.video.variants[0].src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        )}
        {tweet.photos && (
            <div className="relative flex transform-gpu snap-x snap-mandatory items-center gap-4 overflow-x-auto rounded-xl border">
                {tweet.photos.map((photo, idx) => (
                    <a key={idx} href={photo.href} target="_blank" rel="noreferrer">
                        <img
                            alt={photo.alt}
                            src={photo.url}
                            height={photo.height}
                            width={photo.width}
                            className="snap-start"
                        />
                    </a>
                ))}
            </div>
        )}
    </div>
);
export const Tweet = (props) => {

    const enrichedTweet = {
        user: {
            name: "user name",
            screen_name: "000",
            url: "#",
            profile_image_url_https:
                "https://utfs.io/f/gIwxHZcSzCKXDJKbMQALmoPlHaeWnNZdEF9OY6qTAwtzjGCR",
            verified: true,
            is_blue_verified: false,
        },
        verified: {
            personalData: false,
            guardiansData: false,
            degreeProgramInformation: true,
            academicData: true,
            finalStepUploadDocuments: true
        },
        entities: [
            {
                type: "text",
                text: "Email: ",
            },
            {
                type: "url",
                text: "dheerajkum888@gmail.com",
                href: "#",
            },
            {
                type: "text",
                text: " and follow us for updates ",
            },
            {
                type: "mention",
                text: "@OpenAI",
                href: "https://twitter.com/OpenAI",
            },
            {
                type: "text",
                text: "!",
            },
        ],
    };

    return (
        <div className={`flex  ${props.all.finalStepUploadDocuments ? "bg-green-200" : props.all.degreeProgramInformation ? "" : props.all.personalData ? "bg-orange-200" : ""} backdrop-blur-lg border border-white/40 shadow-lg bg-background/50 rounded-3xl size-full flex-col gap-2 border-black p-4`}>
            <TweetHeader tweet={enrichedTweet} status={props.all} user={props.user} />
            <TweetBody tweet={enrichedTweet} user={props.user} />
            {/* <TweetMedia tweet={enrichedTweet} /> */}
        </div>
    );
};


