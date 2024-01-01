import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectVideo from '@/components/projects/ProjectVideo';

export const metadata = getProjectMetadata("superboyboy");

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

        <p className='mb-0'>
            Its also funny just how transparently this game was a product of its time (Year 9, 2016):
        </p>
        <ul className="mt-0 mb-8 list-disc [&>li]:mb-1">
            <li>
                Game mechanics heavily "inspired" by <a href="https://en.wikipedia.org/wiki/Super_Meat_Boy">Super Meat Boy</a>
            </li>
            <li>
                Music stolen from <a href="https://www.youtube.com/@h3h3productions">h3h3productions</a>
            </li>
            <li>
                Ironic sound effects
            </li>
            <li>
                I think Shrek 
                was <a href="https://media.tenor.com/-elkIMkKKAUAAAAC/shrek-is-love-shrek-is-life-shrek-meme.gif">memeing</a> quite 
                hard at the time which explains the Shrek font on the home screen.
            </li>
        </ul>

        <p>
            The original source code can be found on <a href="https://github.com/mattyhempstead/super-boy-boy/">Github</a>.
        </p>

        <p className='mt-12'>
            I've also recorded a quick video playthrough demo and embedded it below, visual archives are much
            better than source code for visual things.
        </p>

        <ProjectVideo
            videoUrl = 'https://www.youtube.com/embed/gGjgDWL3VS8?si=tVQftyfa4I9wNvOJ'
            caption = {<div>Playthrough demo of Super Boy Boy</div>}
        />

    </ProjectPage>
}
