import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectImage from '@/components/projects/ProjectImage';

export const metadata = getProjectMetadata("fb-soccer-python");

export default function Project() {

    return <ProjectPage projectId="fb-soccer-python">
        <p>
            A simple clone of the Facebook messenger soccer game I made in
            high school with Python and <a href="https://www.pygame.org/wiki/about">pygame</a>.
        </p>

        <p>
            Source code can be found on <a href="https://github.com/mattyhempstead/fb-soccer-python">Github</a>.
        </p>

        <ProjectImage
            imageUrl="/projects/fb-soccer-python/demo.gif"
            imageAlt="Demo GIF"
            className='[&>img]:max-w-[28rem]'
        />

        <p>
            Honestly not sure if the original game even exists anymore. I recall it being an easter egg that 
            had something to do with the soccer ball emoji.
        </p>


        <h2>
            Why did I make this?
        </h2>
        <p>
            Just really enjoyed programming at the time (still do!).
            Saw the Facebook messenger game with its simple yet effective use of gravity and thought to myself
            one school afternoon "hey I bet I can make this!".
        </p>

        {/* 
            TODO: More info about the tech stack and stuff maybe?
            - ball made in paint
            - a good early project bc it lets u code velocity and gravity from scratch in a simple environment (no physics engine) while still being useful.
            - circle radius style collision detection with mouse (good to learn imo)
        */}

    </ProjectPage>

}
