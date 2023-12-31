import Image from 'next/image';

import { ProjectPage, ProjectIFrame } from '@/components/projects/ProjectPage';

export const metadata = {
    title: "Double Pendulemon",
}


export default function Project() {

    return <ProjectPage
        title="Double Pendulemon"
        date = "April 2019"
    >

        <p>
            In first year of uni I did one semester of Physics as a science elective.
            The course had a module on "chaos theory" that touched on the unpredictability
            of <a href="https://en.wikipedia.org/wiki/Double_pendulum">double pendulums</a>,
            which <abbr 
                title="More likely is that I was just procrastinating from physics homework...">inspired me
            </abbr> to try to create my own from scratch.
        </p>

        <ProjectIFrame
            src="/projects/double-pendulemon/src/index.html"
            className="w-[64rem] h-[44rem]"
        />


        <h2>
            Technology
        </h2>

        <h3>
            Stack
        </h3>

        <p>
            At the low level, the simulation was built with raw JavaScript using my own UI 
            library <a href="/projects/extra/canvas-lib">canvasLib</a>.
        </p>

        <h3>
            Spring-Mass System
        </h3>

        <p>
            At a high level, the simulation uses a spring-mass system that has had it's parameters
            finely tuned to approximately maintain the total energy of the system over time while
            still permitting realtime simulation.
        </p>

        <p>
            The pivot point and both lemons are particles with the pivot point also having its
            position fixed. Two fairly rigid springs are used to connect the particles in a line to
            produce the double pendulum.
            If you zoomed in, you would actually see the pendulum stretching and compressing tiny amounts,
            but the springs are rigid enough that this is not perceptible to the human eye.
        </p>

        <p>
            You would be surprised just how carefully the parameters must be tweaked to get this to work.

            If the springs are not rigid enough it starts stretching and bouncing all over the place
            and looks nothing like a pendulum.
            
            If they are too rigid, the forces will be too great and the simulation will quickly
            spiral out of control as kinetic energy approximation errors build up until the lemons
            fly out of bounds.
        </p>

        <p>
            Maybe one day I will embed examples of the above to demonstrate the point bc it's kinda funny.
        </p>



        <h2 className='mt-12'>
            A section for spring-mass appreciation
        </h2>

        <p>
            IMO spring-mass simulations are massively underrated as programming primitive
            as they are incredibly easy to make and can quickly produce
            really impressive behaviours.
        </p>

        <p>
            A high school understanding of Newtons laws of motions and the equations that govern
            attractive/repulsive forces between particles/bodies is all you need to create basic
            simulations including but not limited to:
        </p>

        <ul>
            <li>Softbodies (i.e. squishy blobs)</li>
            <li>Ropes</li>
            <li>Fabric/cloth sheets</li>
            <li>And double pendulums if you want!</li>
        </ul>


        <div className='text-center mb-12 mt-12'>
            <Image
                className="mx-auto shadow-[0_0_10px_black]"
                src="/projects/double-pendulemon/meme-spring-mass-always-has-been.jpg"
                alt="Demo GIF"
                width={500}
                height={888}
            />
        </div>


        <p>
            Personally, I had always assumed that the math underlying softbodies was necessarily
            a superset and thus far more complex than rigidbodies.

            And arbitrary rigidbody collision handling was already complex
            enough, so softbodies seemed out of reach without some serious dedication. Well turns out it's
            actually the opposite and softbodies are 10x easier and quicker to create.
        </p>

        <p>
            So go make one!
        </p>


    </ProjectPage>

}
