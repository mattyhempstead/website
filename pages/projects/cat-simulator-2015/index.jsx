import Layout from '/components/layout';

import ProjectPage from '/components/projects/ProjectPage';

import styles from './index.module.css';


export default function Project() {

    return <ProjectPage title="Cat Simulator">

        <h1>Cat Simulator 2015</h1>
        <p className={styles.date}>2014</p>

        <p>
            Not my finest work, but it might be the first game(?) I ever put on my website
            after learning to code so I'm gonna archive it here.
        </p>

        <ProjectPage.IFrame
            src="/projects/cat-simulator-2015/index.html"
            className={styles.iframe}
        />




    </ProjectPage>

}
