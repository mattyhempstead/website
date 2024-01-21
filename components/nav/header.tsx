'use client';

import React, { useState } from 'react';

import { IconBars } from '@/components/icons';
import CollapsibleNavMenu from './CollapsibleNavMobile';
import { getSocials } from './socials';
import { getRoutes } from './routes';



export default function Header() {

    const [isCollapsibleNavOpen, setCollapsibleNavOpen] = useState(false);

    const toggleCollapsibleNavOpen = () => {
        setCollapsibleNavOpen(!isCollapsibleNavOpen);
    }


    return <nav className={`
        sticky top-0 z-50 h-12 w-full
        bg-slate-500
        shadow-[0_2px_5px_rgba(0,0,0,0.2)]
        font-mono

        flex justify-between items-center

        [&_a]:text-black
        [&_a:hover]:text-gray-700
    `}>

        <div
            className='landscape:hidden px-4 h-full flex items-center cursor-pointer'
            onClick={toggleCollapsibleNavOpen}
        >
            <IconBars className='text-3xl text-black'/>
        </div>

        <div className='landscape:hidden'>
            <CollapsibleNavMenu isOpen={isCollapsibleNavOpen} setIsOpen={setCollapsibleNavOpen} />
        </div>


        <div className='pl-6 pr-6'>
            {/* <Link href="/">Matty Hempstead</Link> */}
            <a href="/" className='font-bold text-lg'>mattyhempstead.com</a>
        </div>

        <div className='portrait:hidden flex [&>div]:mx-8'>
            {getRoutes()}
        </div>

        <div className='portrait:hidden pr-4 flex justify-between w-44'>
            {getSocials()}
        </div>
    </nav>;
}

