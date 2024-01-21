'use client';

import { IconCalendarDays } from '@/components/icons';


import { PROJECTS_DATA } from './projectsData';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import build from 'next/dist/build';


type ProjectCardProps = {
    link: string;
    image?: string;
    title: string;
    desc: string;
    date: string;
    builtWith: string[];
};

const ProjectCard = ({ link, image, title, desc, date, builtWith }: ProjectCardProps) => {
    return (
        <a href={link}>
            <div className={`
                flex mb-6 text-slate-300 bg-slate-800
                border-[0.2rem] border-slate-950
                shadow-[0_0_7px_rgba(0,0,0,0.5)]

                hover:bg-slate-700
                [&:hover_.project-card-image]:bg-[rgba(1,1,1,0.0)]

                overflow-auto
            `}>
                <div className={`
                    bg-gray-100 h-40 relative flex-[0_0_10rem]
                    border-r-[1px] border-gray-900
                `}>
                    {/* width: calc(100% - 0.6rem); */}
                    <Image
                        src={image || ""}
                        alt={title}
                        layout="fill"
                    />

                    {/* Overlay to make the images appear less bright/contrasting */}
                    <div
                        className={`
                            project-card-image

                            w-full h-full absolute bg-[rgba(1,1,1,0.2)]
                            shadow-[inset_0_0_1rem_black]
                        `}
                    ></div>
                </div>
                <div className="flex-grow p-3">
                    <div className='flex justify-between items-start'>
                        <h2 className='text-2xl font-semibold mt-0 mb-3'>{title}</h2>
                        <div className='pr-2 mt-0 italic text-gray-500 flex'>
                            <span>{date}</span>
                            <IconCalendarDays className='pl-[0.5rem]'/>
                        </div>
                    </div>
                    <p className='mt-0 mb-4 font-normal'>{desc}</p>

                    <div className='mt-0 mb-0 font-bold text-sm'>
                        {builtWith.map(bw => (
                            <span key={bw} className='mr-[0.4rem] px-[0.3rem] py-[0.15rem] rounded-lg text-black bg-blue-700'>{bw}</span>
                        ))}
                    </div>
                </div>
            </div>
        </a>
    );
};


function getProjectDateSortFn(newestFirst=true) {
    // Sort by date created (order based on newestFirst)
    // Ties are broken on title alphabetical
    // Unknown dates get sort priority

    let dateOrderFlip = newestFirst ? 1 : -1;

    return (a:any, b:any) => {
        const yearDiff = a.date.year - b.date.year;
        if (yearDiff != 0) return yearDiff * dateOrderFlip;

        // Months start at 1
        // Use 0 if undefined (unknown months sort earlier)
        const monthDiff = (a.date.month||0) - (b.date.month||0);
        if (monthDiff != 0) return monthDiff * dateOrderFlip;

        // Alphabetical title if same date
        return (a.title > b.title) ? 1 : -1;
    };
}


function getSortedProjects(sortingMethod: string) {
    // Sort projects based on the selected method
    let sortedProjects = [...Object.values(PROJECTS_DATA)].filter(p => p.includeInProjectsList);

    if (sortingMethod === 'date-asc') {
        sortedProjects.sort(getProjectDateSortFn(true));
    } else if (sortingMethod === 'date-desc') {
        sortedProjects.sort(getProjectDateSortFn(false));
    } else if (sortingMethod === 'title-asc') {
        sortedProjects.sort((a,b) => (a.title > b.title ? 1 : -1));
    } else {
        // Default order
    }

    return sortedProjects;
}


export default function ProjectsList() {

    const [sortingMethod, setSortingMethod] = useState('date-desc');
    const [sortedProjects, setSortedProjects] = useState(getSortedProjects(sortingMethod));

    useEffect(() => {
        console.log("Changing sorting method", sortingMethod);
        setSortedProjects(getSortedProjects(sortingMethod));
    }, [sortingMethod]);


    return <>
        <div className='text-right'>
            <select
                value={sortingMethod}
                onChange={(e) => setSortingMethod(e.target.value)}
                className={`
                    p-1 mr-0 bg-gray-700 text-gray-300
                    border-[1px] border-gray-400 rounded
                    hover:bg-gray-600
                `}
            >
                {/* <option value="default">Default</option> */}
                <option value="date-desc">Date (newest first)</option>
                <option value="date-asc">Date (oldest first)</option>
                <option value="title-asc">Alphabetical</option>
            </select>
        </div>


        <div className="mt-5 ">
            {sortedProjects.map(project => (
                <ProjectCard
                    key={project.title}
                    link={project.link}
                    image={project.image}
                    title={project.title}
                    desc={project.desc}
                    date={project.date.string}
                    builtWith={project.builtWith}
                />
            ))}
        </div>
    </>
}
