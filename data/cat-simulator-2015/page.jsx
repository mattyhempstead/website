
import { ProjectPage, ProjectIFrame } from '@/components/projects/ProjectPage';

export const metadata = {
    title: "Cat Simulator 2015",
}

export default function Project() {

    return <ProjectPage
        title="Cat Simulator 2015"
        date = "2015"
    >

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
