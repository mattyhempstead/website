import Image from 'next/image';

import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectIFrame from '@/components/projects/ProjectIFrame';

export const metadata = getProjectMetadata("thermo-sim");


export default function Project() {

    return <ProjectPage
        title="Thermo Sim"
        date = "April 2019"
    >

        <p>
            In first semester of uni I did one Physics course as a science elective that
            had a module on thermodynamics, which <abbr 
                title="More likely is that I was just procrastinating from physics homework...">inspired
            </abbr> me to make some project related to it.
        </p>

        <p>
            In the end I made what is essentially a particle simulation to simulate the transfer of heat
            between individual particles (molecules) at a micro-scale.

            At a macro-scale, the simulation has some emergent properties that are analogous to how real
            life matter works which is quite nice.
        </p>



        <ProjectIFrame
            src="/projects/thermo-sim/src/index.html"
            className="w-[62rem] h-[44rem]"
        />


        <h2>
            On the State of Matter
        </h2>

        <p>
            I went into this not expecting anything in particular (just driven by curiosity) and was
            pleasantly surprised when I was able to generate quite feasible simulations of both 
            gaseous and solid forms of matter.

            Liquid matter is also sort of possible, although much less stable due to the particular
            phase diagram of the simulation.
        </p>

        <h3>Gas</h3>

        <p>
            Simulating a gas is quite easy parameter-tuning-wise.

            You just need it so the particles are hot (moving fast) enough to overcome the attractive forces between
            them.
        </p>

        <div className='text-center mt-8 mb-8'>
            <Image
                className="mx-auto shadow-[0_0_10px_black]"
                src="/projects/thermo-sim/demo_gas.gif"
                alt="Demo GIF"
                width={300}
                height={559}
            />
            <p className='italic text-center mt-4'>
                Simulating a gas.
            </p>
        </div>


        <p>
            Every now an then a particle will bounce off another particle, but most of the time particles
            travel in a straight line independently of each other.
        </p>

        <p>
            In the real world, we can expect a similar situation with particles in a gas.

            Unlike in the simulation, the rare cases when particles bounce off or divert the path of another
            occur are actually very common due to the incomprehensible number of atoms. This is why the diffusion
            (mixture) of gases takes some time despite the average hydrogen particle moving 1.84km/s at room temperature.
        </p>

        <p>
            Perhaps if I made a simulation with many more particles we could see this effect.
        </p>



        <h3>Solid</h3>

        <p>
            It's relatively easy to get a solid if you cool the particles down enough by reducing their average
            velocity/vibrations.
        </p>

        <div className='text-center mt-8 mb-8'>
            <Image
                className="mx-auto shadow-[0_0_10px_black]"
                src="/projects/thermo-sim/demo_solid.gif"
                alt="Demo GIF"
                width={300}
                height={559}
            />
            <p className='italic text-center mt-4'>
                Simulating a solid.
            </p>
        </div>

        <p>
            When the attractive forces dominate, the particles will settle into a stable low energy state,
            which for 2D point particles happens to be a hexagonal lattice structure.
        </p>

        {/* Insert image */}

        <p>
            In the real world, molecules live in 3D space and are not uniform point attractors. This is why
            the crystal structures can vary between different materials, but the same general principles apply.
        </p>



        <h3>Liquid</h3>

        <p>
            Using the simulation, it's possible to generate a kind of mushy blob that might be analogous to
            a liquid in the real world.
        </p>

        <div className='text-center mt-8 mb-8'>
            <Image
                className="mx-auto shadow-[0_0_10px_black]"
                src="/projects/thermo-sim/demo_liquid.gif"
                alt="Demo GIF"
                width={300}
                height={559}
            />
            <p className='italic text-center mt-4'>
                Simulating a liquid (almost).
            </p>
        </div>



        <p>
            The blob is not a stable lattice structure (and so not a solid), but also isn't gas 
            as most particles are not able to overcome the attractive forces between one another (thus the mushyness).
        </p>

        <p>
            You may also notice that occasionally a particle gets a lucky boost of kinetic energy that is enough
            to escape the blob. This is actually to be expected and happens in the real world all the time: evaporation!
        </p>

        <p>
            Achieving this liquid state however requires careful tuning of particle velocities.
            
            Part of the reason is that the particles are experiencing very low pressures due to existing in what is
            essentially a vacuum.
        </p>

        <div className='text-center mt-8 mb-8'>
            <Image
                className="mx-auto shadow-[0_0_10px_black]"
                src="/projects/thermo-sim/phase_diagram_of_water.png"
                alt="Demo GIF"
                width={488}
                height={559}
            />
            <p className='italic text-center mt-4'>
                Notice how in this phase diagram of water, achieving a liquid is impossible if the pressure is low enough.
            </p>
        </div>

        <p>
            If I added some kind of external force pushing the particles inwards, perhaps we would see more liquids form.
            Project for another day 😊.
        </p>



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
            Particles
        </h3>

        <p>
            At a high level, the simulation is a collection of point objects with mass & velocity that
            attract and repel one another.

            Particles that are too close will repel one another at an increasing rate.
            Particles that are far enough apart will attract one another at a decreasing rate.

            Importantly, this creates a stable distance where the attractive and repulsive forces cancel each other out.
        </p>



        <h2>
            Sources
        </h2>

        <p>
            <a href="https://commons.wikimedia.org/w/index.php?curid=34865054">
                1. Phases of Matter diagram. By author of the original work: Cmglee - Own work, CC BY-SA 3.0.
            </a>
        </p>


    </ProjectPage>

}
