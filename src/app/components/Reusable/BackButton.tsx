import Link from 'next/link'
import React from 'react'

const BackButton = () => {
  return (
    <Link href="/">
    <div className="absolute top-4 left-4 cursor-pointer">
        <div className="bg-primary text-white w-14 h-10 rounded-full flex items-center justify-center">
          <span className="text-xl">{"<"}</span>
          <span className="ml-2">Back</span>
        </div>
      </div>
  </Link>
  )
}

export default BackButton