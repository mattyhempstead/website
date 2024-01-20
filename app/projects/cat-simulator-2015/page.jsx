import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectIFrame from '@/components/projects/ProjectIFrame';

export const metadata = getProjectMetadata("cat-simulator-2015");

export default function Project() {

    return <ProjectPage projectId="cat-simulator-2015">
        <p>
            Not my finest work, but it might be the first game(?) I ever put on my website
            after learning to code so I'm gonna archive it here.
        </p>

        <ProjectIFrame
            src="/projects/cat-simulator-2015/index.html"
            className="w-[42rem] h-[44rem]"
        />

    </ProjectPage>
}
