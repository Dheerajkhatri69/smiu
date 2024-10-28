import Image from 'next/image'
import React from 'react'

export const Logo = ({ size }) => {
    return (
        <Image src="/Logo/SMIULogo1.png" alt="Logo" width={size} height={size} />

    )
}
