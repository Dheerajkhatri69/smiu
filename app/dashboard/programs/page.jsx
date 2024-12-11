'use client'
import { MagicCard } from '@/components/ui/magic-card'
import Link from 'next/link'
import React, { useState } from 'react'

const Page = () => {
  const [program, setProgram] = useState([
    {
      title: "Undergraduate Programs",
      link: "/dashboard/programs/Undergraduate"
    },
    {
      title: "Graduate Programs",
      link: "/dashboard/programs/Graduate"
    },
    {
      title: "Postgraduate Programs",
      link: "/dashboard/programs/Postgraduate"
    },
  ])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[40rem] mx-2">
      {program.map((e, index) => (
        <Link href={e.link} key={index}>
          <MagicCard
            className="cursor-pointer bg-background/50 flex-col items-center justify-center shadow-2xl whitespace-nowrap text-2xl sm:text-4xl"
            gradientColor={"#ffffff"}
          >
            {e.title}
          </MagicCard>
        </Link>
      ))}
    </div>
  )
}

export default Page
