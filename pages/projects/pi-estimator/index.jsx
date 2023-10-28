import Image from 'next/image';

import Layout from '/components/layout';
import ProjectPage from '/components/projects/ProjectPage';

import styles from './index.module.css';


export default function Project() {

    return <ProjectPage
        title = "Pi Estimator"
        date = "2017 or 2018 ????"
    >

        <p>
            A small web app that estimates a few d.p. of the constant π (pi).
        </p>


        <ProjectPage.IFrame
            src="/projects/pi-estimator/index.html"
            className={styles.iframe}
        />


    </ProjectPage>

}
