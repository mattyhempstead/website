import Image from 'next/image';

import Layout from '/components/layout';
import ProjectPage from '/components/projects/ProjectPage';

import styles from './index.module.css';


export default function Project() {

    return <ProjectPage
        title = "Image Pixel Sorter"
        date = "2017 or 2018 ????"
    >

        <p>
            A small web app that performs a live bubble sort of the pixels in an image by their brightness (sum of RGB).
        </p>

        <p>
            It is unclear what inspired me to make this.
            {/* Not entirely sure why I made this. */}
        </p>

        <br/>

        <center>
            <Image
                className={styles.meme}
                src="/projects/image-pixel-sorter/interesting-meme.png"
                alt="Demo GIF"
                width={488}
                height={559}
            />
            <center><i><p>
                This is probably how it went.
            </p></i></center>
        </center>


        <p style={{marginTop: "4rem"}}>
            Application embedded below.
            <br/>
            Takes a few minutes - bubble sort is O(n^2) after all.
            <br/>
            <a href="https://youtu.be/fS3X7jCTIP4">Here</a> is a video demo to skip through if you don't want to wait.
        </p>

        <ProjectPage.IFrame
            src="/projects/image-pixel-sorter/index.html"
            className={styles.iframe}
        />



    </ProjectPage>

}
