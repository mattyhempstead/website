import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '/components/layout';

import styles from './index.module.css';



const ProjectCard = ({ link, image, title, desc, date }) => {
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
                    <p><i>{date}</i></p>
                    <p>{desc}</p>
                </div>
            </div>
        </a>
    );
};



export default function Projects() {

    return (
        <>
            <Head>
                <title>Projects</title>
            </Head>

            <Layout>
                <div>
                    <h1>Projects</h1>

                    <p>
                        An archive of some of my projects going all the way back to when I first taught
                        myself to code in ~2015.

                        <br/><br/>

                        <span
                            title="There are a few projects that appear to have been lost :'("
                        >
                        Many of these were made in my first few years of coding (before
                        I discovered Github) and whose only location was until recently was the 
                        Desktop folder of a Windows partition that would have inevitably been
                        destroyed at one point.
                        </span>

                        <br/><br/>

                        To ensure these projects are not lost to time and so I can look back at them
                        years (decades?) from now, I thought I would put them all in one place.

                        <br/><br/>

                        <span
                            title="So really, this archive exists more for me than anyone else."
                        >
                        Also, lots of these are really not "projects" in the sense I was inspired for
                        a few hours and put something small together, but rather than abandoning 
                        them I'd rather just have everything in a place where I am OK with 
                        low quality.
                        </span>


                    </p>




                    <div className={styles.flexGrid}>
                        <ProjectCard
                            link="/projects/soil-shoveller"
                            image="/projects/soil-shoveller/thumbnail.jpg"
                            title="Soil Shoveller"
                            desc="A really bad Cookie Clicker clone. Also one of the first things I ever coded."
                            date="circa 2015"
                        />

                        <ProjectCard
                            link="/projects/ev1"
                            image="/projects/ev1/thumbnail.png"
                            title="Evolution Simulator v1"
                            desc="The first version of my evolution simulations."
                            date="2015"
                        />

                        <ProjectCard
                            link="/projects/test"
                            image="/images/alien-dance.gif"
                            title="Sample Project"
                            desc="This is a sample project description."
                            date="2023-10-19"
                        />

                    </div>


                </div>
            </Layout>
        </>
    );

}
