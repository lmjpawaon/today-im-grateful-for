import Link from 'next/link'
import React from 'react'

const AddButton: React.FC = () => {
  return (
    <div
    className="fixed bottom-8 right-8 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center text-xl cursor-pointer"
    style={{ zIndex: 999 }}
  >
    <Link href="/entry/create">
      +
    </Link>
  </div>
  )
}

export default AddButton