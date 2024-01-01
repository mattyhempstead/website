import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectIFrame from '@/components/projects/ProjectIFrame';

export const metadata = getProjectMetadata("water");


export default function Project() {

    return <ProjectPage
        title="Water"
        date = "April 2019"
    >

        <p>
            A small attempt at water simulation using waves that propagate over a 2D grid.
        </p>

        <p>
            Click around on the water to add a drop.
        </p>

        <p>
            For the keyboard controls to work you may need to click the water first.
        </p>


        <ProjectIFrame
            src="/projects/water/src/index.html"
            className="w-[36rem] h-[46rem]"
        />


        <h2>
            Technology
        </h2>

        <p>
            Built with raw JavaScript using my own UI 
            library <a href="/projects/extra/canvas-lib">canvasLib</a>.
        </p>


    </ProjectPage>

}
