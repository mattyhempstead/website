import Layout from '/components/layout';

import ProjectPage from '/components/projects/ProjectPage';

import styles from './index.module.css';


export default function Project() {

    return <ProjectPage
        title = "Image Circle Tiler"
        date = "2017 or 2018 ????"
    >

        <p>
            An image circle effect thing I made during a computer-generated art phase.
        </p>

        <p>
            <b>How it works: </b>

            Image is downsampled and pixel colours are averaged and replaced with circles of that colour.
            The size of the circle is set proportional to the square root of the brightness of the pixel group,
            to ensure the area of the circle scales linearly with brightness.
        </p>

        <ProjectPage.IFrame
            src="/projects/image-circle-tiler/index.html"
            className={styles.iframe}
        />



    </ProjectPage>

}
