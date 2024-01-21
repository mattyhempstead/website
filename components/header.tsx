'use client';

import React, { useState } from 'react';

import { Icon, IconBars, IconGitHub, IconFacebook, IconLinkedIn, IconEnvelope } from '@/components/icons';
import CollapsibleNavMenu from './CollapsibleNavMobile';

import styles from './header.module.css';



type SocialsLinkProps = {
    href: string;
    title: string;
    IconComponent: Icon;
};

const SocialsLink = ({ href, title, IconComponent }: SocialsLinkProps) => {
    return (
        <a href={href} title={title} className=''>
            <IconComponent className='text-2xl px-[0.1rem]'/>
        </a>
    );
};



export default function Header() {

    const [isCollapsibleNavOpen, setCollapsibleNavOpen] = useState(false);

    const toggleCollapsibleNavOpen = () => {
        setCollapsibleNavOpen(!isCollapsibleNavOpen);
    }


    return <nav className={`
        sticky top-0 z-50 h-12 w-full
        bg-slate-500
        shadow-[0_2px_5px_rgba(0,0,0,0.2)]

        flex justify-between items-center

        [&_a]:text-black
        [&_a:hover]:text-gray-700

        ${styles.header}
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
            <div>
                <a href="/">home</a>
            </div>

            <div>
                <a href="/projects">projects</a>
            </div>

            {/* <span>
                <a href="/blog">blog</a>
            </span>
            
            <span>
                <a href="/microblog">microblog</a>
            </span> */}
        </div>

        <div className='portrait:hidden pr-4 flex justify-between w-44'>
            <SocialsLink
                href="mailto:matty.hempstead@gmail.com"
                title="Email"
                IconComponent={IconEnvelope}
            />
            <SocialsLink
                href="https://github.com/mattyhempstead"
                title="GitHub"
                IconComponent={IconGitHub}
            />
            <SocialsLink
                href="https://www.linkedin.com/in/matty-hempstead-89a980191/"
                title="LinkedIn"
                IconComponent={IconLinkedIn}
            />
            <SocialsLink
                href="https://www.facebook.com/mattyhempsteaddotcom/"
                title="Facebook"
                IconComponent={IconFacebook}
            />
        </div>
    </nav>;
}

