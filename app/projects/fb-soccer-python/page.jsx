import Image from 'next/image';

import ProjectPage from '@/components/projects/ProjectPage';

export const metadata = {
    title: "FB Soccer Python Clone",
}

export default function Project() {

    return <ProjectPage
        title="FB Soccer Python Clone"
        date = "June 2016"
    >

        <p>
            A simple clone of the Facebook messenger soccer game I made in
            high school with Python and <a href="https://www.pygame.org/wiki/about">pygame</a>.
        </p>

        <p>
            Source code can be found on <a href="https://github.com/mattyhempstead/fb-soccer-python">Github</a>.
        </p>


        <br/>

        <div className='text-center mb-12'>
            <Image
                src="/projects/fb-soccer-python/demo.gif"
                alt="Demo GIF"
                width={474} // Set the width of the image
                height={716} // Set the height of the image
                className='mx-auto'
            />
        </div>


        <h2>
            Why did I make this?
        </h2>
        <p>
            Just really enjoyed programming at the time (still do!).
            Saw the Facebook game with its simple yet effective use of gravity and thought to myself
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
