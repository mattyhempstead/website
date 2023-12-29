
import { ProjectPage, ProjectIFrame } from '@/components/projects/ProjectPage';

export const metadata = {
    title: "Image Evolution",
}

export default function Project() {

    return <ProjectPage
        title = "Image Evolution"
        date = "2017 or 2018 ????"
    >

        {/* I should record timelapse and make a gif of it */}

        <p>
            An evolution simulation that uses a genetic algorithm to evolves a couple
            hundred triangles to resemble a target image.
        </p>
        
        <br/>
        <br/>
        <br/>


        <div className="text-center mb-20">
            <iframe
                src="https://www.youtube.com/embed/4MDPtMcYv0I?si=2H9ExSW5VXijGOdu"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                className='border-0 w-[560px] h-[315px] mx-auto'
            />
            <p className='italic mt-2'>
                This 1 minute video shows a 4 hour timelapse of the evolution 
                <br/>
                simulation with over 2 million generations.
            </p>
        </div>


        <p>
            Program is embedded below, however it takes an hour or so to produce good results.
        </p>


        <ProjectIFrame
            src="/projects/image-evolution/index.html"
            className="w-[65rem] h-[73rem]"
        />


    </ProjectPage>

}
