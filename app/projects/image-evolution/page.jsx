
import { ProjectPage, ProjectIFrame } from '@/components/projects/ProjectPage';
import { ProjectVideo } from '@/components/projects/ProjectVideo';


export const metadata = {
    title: "Image Evolution",
}

export default function Project() {

    return <ProjectPage
        title = "Image Evolution"
        date = "2017 or 2018 ????"
    >
        <p>
            An evolution simulation that uses a genetic algorithm to evolves a couple
            hundred triangles to resemble a target image.
        </p>
        
        <br/>
        <br/>

        <ProjectVideo
            videoUrl = 'https://www.youtube.com/embed/4MDPtMcYv0I?si=2H9ExSW5VXijGOdu'
            caption = {<div>
                This 1 minute video shows a 4 hour timelapse of the evolution 
                <br/>
                simulation with over 2 million generations.
            </div>}
        />

        <p className='mt-16'>
            Program is embedded below, however it takes an hour or so to produce good results.
        </p>


        <ProjectIFrame
            src="/projects/image-evolution/index.html"
            className="w-[65rem] h-[73rem]"
        />


    </ProjectPage>

}
