import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectIFrame from '@/components/projects/ProjectIFrame';

export const metadata = getProjectMetadata("dvd-face");


export default function Project() {

    return <ProjectPage projectId="dvd-face">

        <p>
            Remember the <a
                href="https://www.youtube.com/watch?v=m8NAlDOCG6g"
            >DVD screensaver</a> animation?
        </p>

        <p className='italic'>
            You will need a webcam for this program to work.
        </p>


        <ProjectIFrame
            src="/projects/dvd-face/src/index.html"
            className="w-[44rem] h-[46rem] mt-6"
        />


        <h2>
            Technology
        </h2>

        <p>
            Built with raw JavaScript and the HTML Canvas.
        </p>

        <p>
            Face detection achieved using the <a
                href="https://justadudewhohacks.github.io/face-api.js/docs/index.html"
            >face-api.js</a> library which runs a 190kB Tensorflow model from 2019
            with ~635kB of minified JS code.

            Not too bad for a whole package that falls under 1MB.
        </p>


    </ProjectPage>

}
