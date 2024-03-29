import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectIFrame from '@/components/projects/ProjectIFrame';

export const metadata = getProjectMetadata("soil-shoveller");

export default function Project() {

    return <ProjectPage projectId="soil-shoveller">
        <p>
            This game from 2015 might be the first program I ever completed and shared with others.
        </p>

        <p>
            Cookie clicker had gone viral a couple years earlier and
            inspired a number of other idle games that we were all playing
            at the time on our
            hand-me-down <abbr title="myself on an iPhone 4; my first phone">smartphones</abbr>.

            For some reason I then decided to create a soil-based version (probably a mixture of
            wanting alliteration and playing too much Minecraft).
        </p>

        <p>
            The whole thing is a single HTML file that contains a mixture of raw HTML/CSS/JS,
            which I remember bringing to school on a USB and distributing it to my friends where we
            would play it in class instead of doing work.
        </p>

        <p>
            It should probably be noted I originally only added up to the "Soil Bulldozer",
            but when competition had people reaching that milestone I outsourced the naming
            of additional auto-shovellers to my friends (thus the breakdown in consistency
            and questionable choices).

        </p>

        {/* <br/><br/> */}

        <ProjectIFrame
            src="/projects/soil-shoveller/soilshoveller.html"
            className="w-[50rem] h-[82rem]"
        />

        {/* <p>
            I actually think this is a good first project.
            TODO: Fill this out.
        </p> */}



    </ProjectPage>

}