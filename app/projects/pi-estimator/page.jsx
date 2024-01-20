import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectIFrame from '@/components/projects/ProjectIFrame';

export const metadata = getProjectMetadata("pi-estimator");

export default function Project() {

    return <ProjectPage projectId="pi-estimator">
        <p>
            A small web app that estimates a few d.p. of the constant π (pi).
        </p>

        <ProjectIFrame
            src="/projects/pi-estimator/index.html"
            className="w-[64rem] h-[56rem]"
        />

    </ProjectPage>
}
