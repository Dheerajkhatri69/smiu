"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Navbar() {
  const [DepMenu, setDepMenu] = useState([]);
  const navItems = [
    { label: "Home", link: "/" },
    { label: "Departments", link: "/dep", children: DepMenu },
    {
      label: "Student",
      link: "#",
      children: [
        { name: "Final Term Examinations Spring 2024", link: "#" },
        { name: "Canvassing rules for Elections 2024-25", link: "#" },
        { name: "Student enrollment & Passout", link: "#" },
        { name: "SEEF Scholarship Program", link: "#" },
        { name: "Return Package", link: "#" },
        { name: "Academic Calendar", link: "#" },
        { name: "Students Societies", link: "#" },
        { name: "Scholarships", link: "#" },
        { name: "Ehsaas Scholarship", link: "#" },
        { name: "SAMS Portal", link: "#" },
        { name: "Examination System", link: "#" },
      ],
    },
    {
      label: "About",
      link: "#",
      children: [
        { name: "History of SMIU", link: "#" },
        { name: "About SMIU", link: "#" },
        { name: "Vice Chancellor's Message", link: "#" },
        { name: "The Founder", link: "#" },
        { name: "Future Project", link: "#" },
        { name: "Historical Land Marks", link: "#" },
        { name: "Statuary Bodies", link: "#" },
      ]

    },
  ];

  const [animationParent] = useAutoAnimate();
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("/api/departments");
        if (!response.ok) throw new Error("Failed to fetch departments");
        const data = await response.json();
        setDepMenu(data.result);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <div className="flex justify-between bg-background/50 border-b backdrop-blur z-50 w-full fixed top-0">
      <div className="mx-auto flex  w-full max-w-7xl justify-between p-4 py-1 text-sm  ">
        <section ref={animationParent} className="flex items-center gap-10">
          <Image src="/Logo/SMIULogo1.png" alt="Logo" width={80} height={80} />
          {isSideMenuOpen && <MobileNav closeSideMenu={() => setSideMenuOpen(false)} getnavItems={navItems} />}
          <div className="hidden md:flex items-center gap-4 transition-all">
            {navItems.map((d, i) => (
              <Link key={i} href={d.link ?? "#"} className="relative group px-2 py-3 transition-all">
                <p className="flex cursor-pointer font-bold items-center gap-2 text-black group-hover:text-black/80">
                  <span>{d.label}</span>

                  {d.children && <IoIosArrowDown className={`rotate-180 text-xl transition-all group-hover:rotate-0`} />}
                </p>
                {d.children && (
                  <div className="absolute right-0 top-10 hidden w-auto flex-col gap-1 rounded-lg bg-primary-foreground py-3 shadow-md transition-all group-hover:flex">
                    {d.children.map((ch, i) => (
                      <Link key={i} href={`/dep/${ch._id}`} className="flex cursor-pointer items-center py-1 pl-6 pr-8 text-black hover:font-bold transition-all duration-100">
                        <span className="whitespace-nowrap pl-3">
                          {ch.name.length > 22 ? `${ch.name.substring(0, 22)}...` : ch.name}
                        </span>

                      </Link>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>

        <section className="hidden md:flex items-center gap-2">
          <Link href='/CMS' >
            <button className="w-full max-w-[150px] font-bold rounded-xl bg-black text-primary px-4 py-2 transition-all hover:text-black hover:bg-primary">
              CMS
            </button>
          </Link>

          <Link href='/admissionPortal' >
            <button className="w-full max-w-[200px] font-bold rounded-xl bg-black text-primary px-4 py-2 transition-all hover:text-black hover:bg-primary">
              Admission
            </button>
          </Link>
        </section>

        <button className="text-black w-10 h-16 relative focus:outline-none md:hidden" onClick={() => setSideMenuOpen(!isSideMenuOpen)}>
          <span className="sr-only">Open main menu</span>
          <div className="block w-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span aria-hidden="true" className={`block absolute h-0.5 w-8 bg-current transform transition duration-500 ease-in-out ${isSideMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
            <span aria-hidden="true" className={`block absolute h-0.5 w-8 bg-current transform transition duration-500 ease-in-out ${isSideMenuOpen ? 'opacity-0' : ''}`}></span>
            <span aria-hidden="true" className={`block absolute h-0.5 w-8 bg-current transform transition duration-500 ease-in-out ${isSideMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
          </div>
        </button>
      </div>
    </div>
  );
}

function MobileNav({ getnavItems }) {
  return (
    <div className="fixed left-0 top-0 flex h-full min-h-screen w-full justify-end bg-black/60 md:hidden">
      <div className="h-full w-[65%] bg-primary-foreground px-4 py-4 rounded-tl-2xl rounded-bl-2xl">
        <div className="flex flex-col text-base gap-2 transition-all mt-10">
          {getnavItems.map((d, i) => (
            <SingleNavItem key={i} label={d.label} link={d.link}>
              {d.children}
            </SingleNavItem>
          ))}
        </div>
        <section className="flex flex-col gap-8 mt-4 items-center">
          <Link href='/CMS'>
            <button className="w-full max-w-[150px] font-bold rounded-xl bg-black text-primary px-4 py-2 transition-all hover:text-black hover:bg-primary">
              CMS
            </button>
          </Link>

          <Link href='/admissionPortal'>
            <button className="w-full max-w-[200px] font-bold rounded-xl bg-black text-primary px-4 py-2 transition-all hover:text-black hover:bg-primary">
              Admission
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
}

function SingleNavItem({ label, link, children }) {
  const [animationParent] = useAutoAnimate();
  const [isItemOpen, setItemOpen] = useState(false);

  return (
    <div ref={animationParent} className="relative px-2 py-3 transition-all">
      <Link href={link ?? "#"} onClick={() => setItemOpen(!isItemOpen)} className="flex cursor-pointer items-center gap-2 text-black font-extrabold group-hover:text-black">
        <span>{label}</span>
        {children && <IoIosArrowDown className={`text-xl font-bold transition-all ${isItemOpen ? "rotate-180" : ""}`} />}
      </Link>
      {isItemOpen && children && (
        <div className="w-auto flex-col gap-1 rounded-lg bg-primary py-3 transition-all flex">
          {children.map((ch, i) => (
            <Link key={i} href={`${link}/${ch._id}`} className="flex cursor-pointer items-center py-1 pl-6 pr-8 text-black hover:font-bold transition-all duration-300">
              <span className="whitespace-nowrap pl-3">
                {ch.name.length > 22 ? `${ch.name.substring(0, 22)}...` : ch.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
