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

            Takes a few minutes - it's O(n^2) after all.
        </p>

        <p>
            Not really sure why I made this.
        </p>

        <br/>
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


        <ProjectPage.IFrame
            src="/projects/image-pixel-sorter/index.html"
            className={styles.iframe}
        />



    </ProjectPage>

}
