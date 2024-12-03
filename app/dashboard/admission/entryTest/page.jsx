"use client";

import { QuizShow } from '@/components/adminDeshboard/admission/quizShow'
import { GlowingStarsBackgroundCard, GlowingStarsDescription, GlowingStarsTitle } from '@/components/ui/glowing-stars';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [entryTest, setEntryTest] = useState([]);
  useEffect(() => {
    getEntryTest();
  }, []);

  const getEntryTest = async () => {
    try {
      const response = await fetch("/api/admission/entryTestQ/entryTest");
      if (!response.ok) {
        throw new Error("Failed to fetch Entry Test state");
      }
      const data = await response.json();
      setEntryTest(data.result);
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <div className='z-10 m-2'>
      <div className='flex flex-wrap'>
        {entryTest.map((item, index) => (
          <div key={index}>
            <Link href={`/dashboard/admission/entryTest/${item.quizNo}`}>
              <QuizShow quizNO={item.quizNo} quizDiscription={item.quizDiscription} />
            </Link>
          </div>
        ))}
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
                  <CirclePlus size={50} />
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