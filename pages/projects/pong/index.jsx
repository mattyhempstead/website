import Layout from '/components/layout';

import ProjectPage from '/components/projects/ProjectPage';

import styles from './index.module.css';


export default function Project() {

    return <ProjectPage
        title="Pong"
        date = "2015 / 2016?"
    >
        <p>
            Just a browser-based pong clone from my early years of programming.
            One of the first ever games I built using 2D graphics.
        </p>

        <p>
            Use W+S keys to control player 1 (left) and Up+Down arrow keys to control player 2 (right).
        </p>

        <p>
            Built with raw HTML/CSS/JS using
            the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API">Canvas</a> element
            to render graphics.
        </p>

        <p>
            I had this on my website in high school and we used to chain 3 monitors together during
            computer class and play a very wide game of pong. Good fun.
        </p>

        <ProjectPage.IFrame
            src="/projects/pong/index.html"
            className={styles.iframe}
        />




    </ProjectPage>

}
