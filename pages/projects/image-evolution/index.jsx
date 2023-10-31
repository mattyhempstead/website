import Image from 'next/image';

import Layout from '/components/layout';
import ProjectPage from '/components/projects/ProjectPage';

import styles from './index.module.css';


export default function Project() {

    return <ProjectPage
        title = "Image Evolution"
        date = "2017 or 2018 ????"
    >

        {/* I should record timelapse and make a gif of it */}

        <p>
            An evolution simulation that uses a genetic algorithm to evolves a couple
            hundred triangles to resemble a target image.
        </p>
        
        <br/>
        <br/>

        <p>
        </p>

        <div className={styles.video}>
            <iframe
                width="560" height="315"
                src="https://www.youtube.com/embed/4MDPtMcYv0I?si=2H9ExSW5VXijGOdu"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            />
            <p>
                This 1 minute video shows a 4 hour timelapse of the evolution 
                <br/>
                simulation with over 2 million generations.
            </p>
        </div>


        <p>
            Program is embedded below, however it takes an hour or so to produce good results.
        </p>

        {/* Example I recorded takes ~4 hours with >2mil generations */}

        <ProjectPage.IFrame
            src="/projects/image-evolution/index.html"
            className={styles.iframe}
        />


    </ProjectPage>

}
