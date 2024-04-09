import type { Metadata } from 'next';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './index.module.css';

import ProjectsList from './ProjectsList';
import { getProjectsInProjectsList } from './projectsData';


export const metadata: Metadata = {
    title: "Projects",
    description: "A growing list of personal projects.",
}


export default function Projects() {
    return <>
        <div>
            <h1 className='mb-6'>Projects</h1>

            <p>
                An archive of <b>{getProjectsInProjectsList().length}</b> public projects I mostly finished going all the way back to
                when I first learned to code in ~2015.
            </p>

            <details className='mt-4'>
                <summary className='cursor-pointer italic'>Why document them?</summary>

                <div className='mt-2 pl-4 border-l-2 border-l-gray-500 ml-1 mb-4'>
                    <p
                        className='mt-0'
                        title="There are a few projects that appear to have been lost :'("
                    >
                        Some of these projects were created during my first few years of coding
                        (before I discovered Github) and whose only location until recently was
                        an unused Windows partition that would have inevitably been destroyed
                        at one point.
                    </p>

                    <p>
                        To ensure these projects are not lost to time and so I can look back at them
                        many years from now, I thought I would put them all in one place.
                    </p>
                </div>
            </details>

            {/* <span
                title="So really, this archive exists more for me than anyone else."
            >
            Also, lots of these are really not "projects" in the sense I was inspired for
            a few hours and put something small together, but rather than abandoning 
            them I'd rather just have everything in a place where I am OK with 
            low quality.
            </span> */}

            <ProjectsList />

        </div>
    </>;
}
