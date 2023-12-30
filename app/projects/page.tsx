import type { Metadata } from 'next';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './index.module.css';

import ProjectsList from './ProjectsList';


export const metadata: Metadata = {
    title: "Projects"
}


export default function Projects() {
    return <>
        <div>
            <h1 className='mb-6'>Projects</h1>

            <p>
                An archive of some of the projects I mostly finished going all the way back to
                when I first learned to code in ~2015.

                <br/><br/>

                <span
                    title="There are a few projects that appear to have been lost :'("
                >
                Many of these were made in my first few years of coding (before
                I discovered Github) and whose only location was until recently was 
                an unused Windows partition that would have inevitably been
                destroyed at one point.
                </span>

                <br/><br/>

                To ensure these projects are not lost to time and so I can look back at them
                many years from now, I thought I would put them all in one place.

                <br/><br/>

                {/* <span
                    title="So really, this archive exists more for me than anyone else."
                >
                Also, lots of these are really not "projects" in the sense I was inspired for
                a few hours and put something small together, but rather than abandoning 
                them I'd rather just have everything in a place where I am OK with 
                low quality.
                </span> */}


            </p>

            <ProjectsList />

        </div>
    </>;
}
