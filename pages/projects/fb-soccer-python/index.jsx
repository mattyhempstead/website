import Layout from '/components/layout';
import Image from 'next/image';

import ProjectPage from '/components/projects/ProjectPage';

import styles from './index.module.css';


export default function Project() {

    return <ProjectPage title="FB Soccer Python Clone">

        <h1>FB Soccer in Python</h1>
        <p className={styles.date}>June 2016</p>

        <p>
            A simple clone of the Facebook messenger soccer game I made in
            high school with Python and <a href="https://www.pygame.org/wiki/about">pygame</a>.
        </p>

        <p>
            Source code can be found on <a href="https://github.com/mattyhempstead/fb-soccer-python">Github</a>.
        </p>



        <br/>

        {/* <div className={styles.demo}> */}
        <center>
            <Image
                src="/projects/fb-soccer-python/demo.gif"
                alt="Demo GIF"
                width={474} // Set the width of the image
                height={716} // Set the height of the image
            />
        </center>
        {/* </div> */}



    </ProjectPage>

}
