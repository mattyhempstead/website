import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '/components/layout';

import styles from './index.module.css';

import { PROJECTS_LIST } from './projectsList';


const ProjectCard = ({ link, image, title, desc, date, builtWith }) => {
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
                <div className={styles.projectCardText}>
                    <h3>{title}</h3>
                    <p>{date}</p>
                    <p>{desc}</p>
                    <p>{builtWith}</p>
                </div>
            </div>
        </a>
    );
};


function getProjectDateSortFn(newestFirst=true) {
    // Sort by date created
    // Ties are broken on title alphabetical
    // Unknown dates get sort priority
    const f = (a, b) => {
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
        return ((a,b) => f(b,a));
    }
}


export default function Projects() {

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



    return (<>
        <Head>
            <title>Projects</title>
        </Head>

        <Layout>
            <div>
                <h1>Projects</h1>

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


                <div className={styles.dropdownContainer}>
                    <select
                        value={sortingMethod}
                        onChange={(e) => setSortingMethod(e.target.value)}
                        className={styles.dropdown}
                    >
                        <option value="default">Default</option>
                        <option value="date-desc">Date (newest first)</option>
                        <option value="date-asc">Date (oldest first)</option>
                    </select>
                </div>


                <div className={styles.flexGrid}>
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


            </div>
        </Layout>
    </>);

}
