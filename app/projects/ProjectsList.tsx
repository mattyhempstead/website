'use client';

import styles from './index.module.css';

import { PROJECTS_LIST } from './projectsList';

import type { Metadata } from 'next';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';


type ProjectCardProps = {
    link: string;
    image: string;
    title: string;
    desc: string;
    date: string;
    builtWith: string;
};

const ProjectCard = ({ link, image, title, desc, date, builtWith }: ProjectCardProps) => {
    return (
        <a href={link}>
            <div className={styles.projectCard}>
                <div className={styles.projectCardImg}>
                    <Image
                        src={image}
                        alt={title}
                        layout="fill"
                    />
                </div>
                <div className="flex-grow p-3">
                    <div className='flex justify-between'>
                        <h3 className='text-2xl font-semibold'>{title}</h3>
                        <p className='pr-2 mt-0 italic text-gray-500'>{date}</p>
                    </div>
                    <p className='mt-0 font-normal'>{desc}</p>
                    <p className='mt-2 mb-0 font-bold text-green-800'>{builtWith}</p>
                </div>
            </div>
        </a>
    );
};


function getProjectDateSortFn(newestFirst=true) {
    // Sort by date created
    // Ties are broken on title alphabetical
    // Unknown dates get sort priority
    const f = (a:any, b:any) => {
        const yearDiff = a.date.year - b.date.year;
        if (yearDiff != 0) return yearDiff;

        // Months start at 1
        // Use 0 if undefined (unknown months sort earlier)
        const monthDiff = (a.date.month||0) - (b.date.month||0);
        if (monthDiff != 0) return monthDiff;

        // Alphabetical title if same date
        return (a.title > b.title) ? 1 : -1;
    };

    // Swap order of params if oldest first
    if (newestFirst) {
        return f;
    } else {
        return ((a:any,b:any) => f(b,a));
    }
}



export default function ProjectsList() {

    const [sortingMethod, setSortingMethod] = useState('default');
    const [sortedProjects, setSortedProjects] = useState(PROJECTS_LIST);

    useEffect(() => {
        console.log("Changing sorting method", sortingMethod);

        // Sort projects based on the selected method
        if (sortingMethod === 'date-asc') {
            const sortedByDate = [...PROJECTS_LIST].sort(getProjectDateSortFn(true));
            setSortedProjects(sortedByDate);
        } else if (sortingMethod === 'date-desc') {
            const sortedByDate = [...PROJECTS_LIST].sort(getProjectDateSortFn(false));
            setSortedProjects(sortedByDate);
        } else {
            setSortedProjects(PROJECTS_LIST); // Default order
        }

    }, [sortingMethod]); // Re-run the effect when sortingMethod changes


    return <>
        <div className='text-right'>
            <select
                value={sortingMethod}
                onChange={(e) => setSortingMethod(e.target.value)}
                className="p-1 mr-3 border-[1px] border-gray-400 rounded"
            >
                <option value="default">Default</option>
                <option value="date-desc">Date (newest first)</option>
                <option value="date-asc">Date (oldest first)</option>
            </select>
        </div>


        <div className={"mt-5 " + styles.flexGrid}>
            {sortedProjects.map(project => (
                <ProjectCard
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
