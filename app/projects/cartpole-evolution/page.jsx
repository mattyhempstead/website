import Image from 'next/image';

import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectIFrame from '@/components/projects/ProjectIFrame';

export const metadata = getProjectMetadata("cartpole-evolution");


export default function Project() {

    return <ProjectPage projectId="cartpole-evolution">
        <p>
            A program where agents (carts) with neural network brains evolve/learn to balance a pendulum (pole) upwards.
        </p>

        <h2>
            Usage
        </h2>

        <p>
            Press "Play" and watch as the little AI agents attempt to swing the pole vertically upwards.
            The brains are initialized randomly a bit analogous to a newborn, so it will fail miserably to start.
        </p>

        <p>
            Each agent will have 20 seconds to perform, after which the best few from the generation will used to
            produce agents in the next generation.
            This can take a while, so press the "Speed" button to fast-forward the evolution process. 
        </p>

        <p>
            Watch the graph below which shows the carts slowly gets better at balancing the pole.
            Press the speed button again to go back to regular speed and see observe how they have improved.
        </p>

        <p>
            Usually after ~1000 generations (a few minutes in fast-forward mode), the agents will essentially
            have perfected the swing-up-and-balance maneuver.
            On the y-axis, this is a score of ~2200.
        </p>

        {/* <p>
            Use keys "A" and "D" to apply forces that mess with them if you want.
            The best agents are usually resistant to small disruptions. 
        </p> */}


        <ProjectIFrame
            src="/projects/cartpole-evolution/src/index.html"
            className="w-[64rem] h-[79rem] mt-8"
        />


        <h2>
            Technology Stack
        </h2>

        <p>
            There is kind of a lot going on for this to work, given basically everything was written from scratch in JavaScript (except the plotting library).
            I won't explain it all here (just a high level overview of the components), but feel free to ask me IRL bc I am really
            passionate about these kinds of computer programs. 😊
        </p>

        <p>
            At the lowest level, the graphics were built with raw JavaScript and rendered using my own UI 
            library <a href="/projects/extra/canvas-lib">canvasLib</a>.
        </p>

        <p>
            At the next level of abstraction, the actual CartPole simulation was an adaption of the spring-mass 
            system I developed for my <a href="http://localhost:3000/projects/double-pendulemon">Double Pendulemon</a> project.

            CartPole is already a common benchmark for AI agents, but I enjoy making things from scratch.
        </p>

        <p>
            The neural network is a class I made with raw JS (only feedfoward bc no backpropagation is needed).
            It's probably the bottleneck for the simulation given there is no matrix multiplication (just for loops).
        </p>

        <p>
            The final layer of the stack is a genetic algorithm that allows the agents to evolving to improve their
            balancing abilities. There are many details to this that I can perhaps explain another day.
        </p>

        <p>
            The plot was made with <a href="https://plotly.com/javascript/">plotly.js</a>.
        </p>


    </ProjectPage>

}
