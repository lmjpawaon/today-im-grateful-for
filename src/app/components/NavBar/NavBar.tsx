import Link from 'next/link';
import React from 'react'

const NavBar:React.FC = () => {
    return (
        <nav className="bg-secondary p-4 text-white text-center">
          <h1 className="text-2xl font-bold"><Link href="/">{"Today I'm Grateful For"}</Link></h1>
        </nav>
    );
}

export default NavBar