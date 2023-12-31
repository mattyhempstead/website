import ProjectPage from '@/components/projects/ProjectPage';
import ProjectIFrame from '@/components/projects/ProjectIFrame';

export const metadata = {
    title: "Pi Estimator",
}

export default function Project() {

    return <ProjectPage
        title = "Pi Estimator"
        date = "2017 or 2018 ????"
    >

        <p>
            A small web app that estimates a few d.p. of the constant π (pi).
        </p>


        <ProjectIFrame
            src="/projects/pi-estimator/index.html"
            className="w-[64rem] h-[56rem]"
        />

    </ProjectPage>
}
