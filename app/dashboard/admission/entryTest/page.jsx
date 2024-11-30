import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div>Page
        <div>
            <Link href={"/dashboard/admission/entryTest/addTest"}>add test</Link>
        </div>
    </div>
  )
}

export default Page