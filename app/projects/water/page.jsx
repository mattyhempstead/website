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

        <p className='italic'>
            For the keyboard controls to work you may need to click the water first to focus on the embedded app.
        </p>


        <ProjectIFrame
            src="/projects/water/src/index.html"
            className="w-[36rem] h-[46rem]"
        />

        <h2>
            Algorithm / Mechanics
        </h2>

        <p>
            I just made it equivalent to a bunch oscillating particles with a fixed position in the plane, but free to move orthogonal (z-dimension).
            Each particle exert an attractive force on adjacent particles that applies over the z-dimension and is proportional to distance.
        </p>

        <p>
            There are probably better ways to do this which I could read about but that would ruin some of the challenge.
        </p>

        <h2>
            Technology
        </h2>

        <p>
            Built with raw JavaScript using my own UI 
            library <a href="/projects/extra/canvas-lib">canvasLib</a>.
        </p>


    </ProjectPage>

}
