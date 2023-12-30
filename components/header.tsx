import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

library.add(faEnvelope, faGithub, faFacebook, faLinkedin);


import styles from './header.module.css';




type SocialsLinkProps = {
    href: string;
    title: string;
    icon: IconDefinition;
};

const SocialsLink = ({ href, title, icon }: SocialsLinkProps) => {
    return (
        <a href={href} title={title}>
            <FontAwesomeIcon icon={icon} className='w-7 h-full px-[0.1rem]'/>
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

            <span>
                <a href="/blog">blog</a>
            </span>
            
            <span>
                <a href="/microblog">microblog</a>
            </span>
        </div>

        <div className='pr-4 flex justify-between w-44'>
            <SocialsLink
                href="mailto:matty.hempstead@gmail.com"
                title="Email"
                icon={faEnvelope}
            />
            <SocialsLink
                href="https://github.com/mattyhempstead"
                title="GitHub"
                icon={faGithub}
            />
            <SocialsLink
                href="https://www.linkedin.com/in/matty-hempstead-89a980191/"
                title="LinkedIn"
                icon={faLinkedin}
            />
            <SocialsLink
                href="https://www.facebook.com/mattyhempsteaddotcom/"
                title="Facebook"
                icon={faFacebook}
            />
        </div>
    </nav>;
}

