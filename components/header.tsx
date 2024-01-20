'use client';

import React from 'react';

import { Icon, IconBars, IconGitHub, IconFacebook, IconLinkedIn, IconEnvelope } from '@/components/icons';


import styles from './header.module.css';




type SocialsLinkProps = {
    href: string;
    title: string;
    IconComponent: Icon;
};

const SocialsLink = ({ href, title, IconComponent }: SocialsLinkProps) => {
    return (
        <a href={href} title={title} className=''>
            <span className='flex justify-center'>
                <IconComponent className='text-2xl px-[0.1rem]'/>
            </span>
        </a>
    );
};



export default function Header() {
    return <nav className={styles.header}>
        <div className='pl-6'>
            {/* <Link href="/">Matty Hempstead</Link> */}
            <a href="/" className='font-bold text-lg'>mattyhempstead.com</a>
        </div>

        <div className=''>
            <span>
                <a href="/">home</a>
            </span>

            <span>
                <a href="/projects">projects</a>
            </span>

            {/* <span>
                <a href="/blog">blog</a>
            </span>
            
            <span>
                <a href="/microblog">microblog</a>
            </span> */}
        </div>

        <div className='pr-4 flex justify-between w-44'>
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

