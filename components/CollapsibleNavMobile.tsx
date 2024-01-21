'use client';

import React from 'react';

import {
    Icon, IconBars, IconX,
    IconGitHub, IconFacebook, IconLinkedIn, IconEnvelope
} from '@/components/icons';

import styles from './CollapsibleNavMobile.module.css';

import { useEffect, useRef } from 'react';



type SocialsLinkProps = {
    href: string;
    title: string;
    IconComponent: Icon;
};

const SocialsLink = ({ href, title, IconComponent }: SocialsLinkProps) => {
    return (
        <a href={href} title={title} className=''>
            <IconComponent className='text-3xl px-[0.1rem]'/>
        </a>
    );
};


type CollapsibleNavMobileProps = {
    isOpen: boolean;

    // Technically I should only give this access to closing, and not both.
    setIsOpen: (isOpen: boolean) => void;
};

export default function CollapsibleNavMobile({ isOpen, setIsOpen }: CollapsibleNavMobileProps) {

    /*
        Disable mobile scrolling/swiping while this Nav is open.

        This prevents issues that arise when the use scrolls while in mobile mode and the
        page content behind it scrolls, causing the nav menu to slide around.

        TODO: This also prevents pinch zooming, which can be a problem if the user is zoomed
        in and then they open the menu, as they can no longer unzoom or slide around to access
        the button to exit the menu. I think others have fixed this by resetting the zoom
        with JS temporarily while the menu is open.
    */
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMobileScroll = (event:TouchEvent) => {
            event.preventDefault();
        };

        element.addEventListener('touchmove', handleMobileScroll, { passive: false });
        return () => {
            element.removeEventListener('touchmove', handleMobileScroll);
        };
    }, [isOpen]);



    return <div
        ref={ref}
        className={`
            fixed bottom-0 left-0 top-0 z-[50] w-[100vw] h-[100vh]
            bg-slate-300
            shadow-[2px_0_2px_0_black]
            p-8 pt-6

            ${styles.slide}
            ${isOpen ? styles.slideIn : styles.slideOut}
        `}
    >

        <div className='absolute top-0 right-0'>
            <IconX
                className='text-5xl text-black w-12 h-12 mt-4 mr-4 cursor-pointer'
                onClick={() => setIsOpen(false)}
            />
        </div>


        <div className=''>
            <a href="/" className='font-bold text-2xl'>mattyhempstead.com</a>
        </div>

        <div className='mt-24 text-3xl font-bold [&>div]:mt-6'>
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



        <div className='fixed bottom-0 left-0 w-full px-[20%] pb-24 flex justify-between'>
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



    </div>;
}

