import ProjectPage from '@/components/projects/ProjectPage';
import ProjectIFrame from '@/components/projects/ProjectIFrame';

export const metadata = {
    title: "Fractal Tree",
}

export default function Project() {

    return <ProjectPage
        title = "Fractal Tree"
        date = "2017 or 2018 ????"
    >

        <p>
            A procedural tree generator I made during a computer-generated art phase.
        </p>

        <p>
            Programmatically generated art is awesome because it's unique (practically impossible to replicate manually),
            has a very fast feedback loop (computers are fast),
            and often gives nice results from very simple rules (emergence!).
        </p>

        <p>
            <b>How it works: </b>
            Trees are generated starting with a single root branch at the bottom.
            Each branch will generate 1-4 slightly thinner child branches of random length and relative bend angles.
            Branches start brown and gradient towards green as they get further from the root.
            After 12 branches, child branches will stop generating.
        </p>

        <p><i>
            It's probably not coincidence that such simple recursive rules are able to generate
            realistic tree patterns.
        </i></p>

        <ProjectIFrame
            src="/projects/fractal-tree/index.html"
            className="w-[52rem] h-[50rem]"
        />



    </ProjectPage>

}
