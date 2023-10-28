import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '/components/layout';

import styles from './index.module.css';



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



export default function Projects() {

    return (<>
        <Head>
            <title>Projects</title>
        </Head>

        <Layout>
            <div>
                <h1>Projects</h1>

                <p>
                    An archive of some of the projects I mostly finished going all the way back to
                    when I first taught myself to code in ~2015.

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
                    years (decades?) from now, I thought I would put them all in one place.

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




                <div className={styles.flexGrid}>
                    <ProjectCard
                        link="/projects/soil-shoveller"
                        image="/projects/soil-shoveller/thumbnail.jpg"
                        title="Soil Shoveller"
                        desc="A really bad Cookie Clicker clone. Also probably one of the first things I ever coded."
                        date="2015"
                        builtWith="HTML + CSS + JS"
                    />

                    <ProjectCard
                        link="/projects/ev1"
                        image="/projects/ev1/thumbnail.png"
                        title="Evolution Simulator v1"
                        desc="The first version of my evolution simulations."
                        date="2015"
                        builtWith="HTML + CSS + JS"
                    />

                    <ProjectCard
                        link="/projects/pong"
                        image="/projects/pong/thumbnail.png"
                        title="Pong"
                        desc="My first pong."
                        date="2015"
                        builtWith="HTML + CSS + JS"
                    />

                    <ProjectCard
                        link="/projects/cat-simulator-2015"
                        image="/projects/cat-simulator-2015/thumbnail.jpg"
                        title="Cat Simulator 2015"
                        desc="very likely underwhelming"
                        date="2015"
                        builtWith="HTML + CSS + JS"
                    />

                    <ProjectCard
                        link="/projects/superboyboy"
                        image="/projects/superboyboy/thumbnail.png"
                        title="Super Boy Boy"
                        desc="A 2D platformer game from high school."
                        date="2016"
                        builtWith="Python + pygame"
                    />

                    <ProjectCard
                        link="/projects/fb-soccer-python"
                        image="/projects/fb-soccer-python/thumbnail.png"
                        title="FB Soccer Python"
                        desc="A python clone of the Facebook messenger soccer game."
                        date="2016"
                        builtWith="Python + pygame"
                    />

                    <ProjectCard
                        link="/projects/fractal-tree"
                        image="/projects/fractal-tree/thumbnail.png"
                        title="Fractal Tree"
                        desc="A procedural recursive tree generator."
                        date="2017 or 2018 ???"
                        builtWith="HTML + CSS + JS"
                    />

                    <ProjectCard
                        link="/projects/image-circle-tiler"
                        image="/projects/image-circle-tiler/thumbnail.png"
                        title="Image Circle Tiler"
                        desc="A programmatic art image circle effect."
                        date="2017 or 2018 ???"
                        builtWith="HTML + CSS + JS"
                    />

                    <ProjectCard
                        link="/projects/image-pixel-sorter"
                        image="/projects/image-pixel-sorter/thumbnail.png"
                        title="Image Pixel Sorter"
                        desc="Have you ever wondered what it looks like to sort all the pixels in an image for some reason?"
                        date="2017 or 2018 ???"
                        builtWith="HTML + CSS + JS"
                    />
                </div>


            </div>
        </Layout>
    </>);

}
