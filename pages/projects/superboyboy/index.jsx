import Layout from '/components/layout';

import ProjectPage from '/components/projects/ProjectPage';

import styles from './index.module.css';


export default function Project() {

    return <ProjectPage
        title="Super Boy Boy"
        date = "May 2016"
    >

        <p>
            A platformer game I made in high school with Python and <a href="https://www.pygame.org/wiki/about">pygame</a>.
        </p>

        <p>
            All the graphics were hand drawn in Microsoft Paint and the music was most definitely stolen
            from a popular youtuber at the time.
            Sound effects are just a crappy text-to-speech saying words like "click" and "jump" which
            I'm sure was hilarious at the time (and still a bit funny tbh).
        </p>

        <p>
            Its also funny just how transparently this game was a product of its time (Year 9, 2016):
        </p>
        <ul className={styles.list}>
            <li>Mechanics inspired by <a href="https://en.wikipedia.org/wiki/Super_Meat_Boy">Super Meat Boy</a></li>
            <li>Music stolen from <a href="https://www.youtube.com/@h3h3productions">h3h3productions</a></li>
            <li>Ironic sound effects</li>
            <li>And the Shrek font on the home screen? I think Shrek was <a href="https://media.tenor.com/-elkIMkKKAUAAAAC/shrek-is-love-shrek-is-life-shrek-meme.gif">memeing</a> quite hard at the time.</li>
        </ul>

        <p>
            The original source code can be found on <a href="https://github.com/mattyhempstead/super-boy-boy/">Github</a>.
        </p>

        <p>
            I've also recorded a quick video playthrough demo and embedded it below, because visual archives are much
            better than source code for visual things.
        </p>

        <div className={styles.video}>
            <iframe
                width="560" height="315"
                src="https://www.youtube.com/embed/gGjgDWL3VS8?si=tVQftyfa4I9wNvOJ"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            />
            {/* <center><i>Playthrough demo of Super Boy Boy</i></center> */}
        </div>



    </ProjectPage>

}
