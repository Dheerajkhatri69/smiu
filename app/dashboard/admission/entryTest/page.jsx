"use client";

import { QuizShow } from '@/components/adminDeshboard/admission/quizShow'
import { GlowingStarsBackgroundCard, GlowingStarsDescription, GlowingStarsTitle } from '@/components/ui/glowing-stars';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [existData, setExistData] = useState([]); // Original data
  useEffect(() => {
    getEntryTestQ();
  }, []);

  const getEntryTestQ = async () => {
      try {
          const response = await fetch("/api/admission/entryTestQ");
          if (!response.ok) {
              throw new Error("Failed to fetch admission state");
          }
          const data = await response.json();
          console.log(data.result)
          // Store data.result in state
          setExistData(data.result);
          // setFilteredData(data.result); // Initialize filteredData with all data
      } catch (error) {
          alert(error.message);
      }
  };

  return (
    <div className='z-10 m-2'>
      <div className='flex flex-wrap'>
        <QuizShow quizNO={1} />
        <Link href={"/dashboard/admission/entryTest/addTest"}>
          <div className="flex items-center justify-center antialiased">
            <GlowingStarsBackgroundCard>
              <GlowingStarsTitle>Create New Test</GlowingStarsTitle>
              <div className="flex justify-between items-end">
                <GlowingStarsDescription>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </GlowingStarsDescription>
                <div
                  className="h-8 w-8 rounded-full text-black flex items-center justify-center">
                  <CirclePlus size={50}/>
                </div>
              </div>
            </GlowingStarsBackgroundCard>
          </div>
        </Link>

      </div>
    </div>
  )
}

export default Page