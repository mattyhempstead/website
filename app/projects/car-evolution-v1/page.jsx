import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectVideo from '@/components/projects/ProjectVideo';


export const metadata = getProjectMetadata("car-evolution-v1");

export default function Project() {

    return <ProjectPage
        title = "Car Evolution v1"
        date = "August 2016"
    >

        <p>
            A program where cars with tiny brains evolve/learn to drive around a non-linear track.
        </p>

        <h2>
            Video demo
        </h2>

        <ProjectVideo
            videoUrl = 'https://www.youtube.com/embed/AbXxIN6xxf8?si=v8czdNkSxJv4Y8gi'
            caption = {<div>90 minutes of the program running.</div>}
        />

        <h2>
            Stages of Evolution
        </h2>

        <p>
            The part I find most interesting about this simulation is the apparent distinct stages of evolution.
            Much like the stages of life that evolved from ocean to land to sky, the cars first learn to travel forward,
            then turn left, then turn right.
        </p>
        <p>
            You may also notice that the rate of evolution changes over time, with the cars often experiencing rapid
            evolution as they fill a niche (e.g. bending around a new corner), followed by a period of slow evolution
            as the cars micro-optimize within their new niche.
            I believe this effect is called <a
                href="https://en.wikipedia.org/wiki/Punctuated_equilibrium"
            >punctuated equilibrium</a> in evolutionary biology.
            I have built a half dozen other evolution simulations in the past and they all seem to experience this trait,
            which I suppose makes me an armchair punctuationist.
        </p>

        <p>
            I find these simulations so incredibly interesting and could talk forever about them.
            To 
        </p>

        <p>
            I've outlined below some approximate stages I observed.
        </p>

        <h3>
            1. Travelling forward
        </h3>
        <p>
            Due to the randomly initialised brains, the first few generation of the simulation have relatively high 
            phenotypical variance.

            Some cars spin in circles, some don't move at all, but most charge full speed into a nearby wall.

            Therefore these generations mostly involve filtering away those cars that are total failures,
            rather than evolving any useful strategies.
        </p>

        <p>
            Two cars from the initial batch show some promise, as they can be seen moving forward.

            One car travels quite fast, but doesn't know how to turn so and quickly headbutts the wall.
            
            The other travels forward slow and steady, giving itself time to turn slightly left as it
            very nearly hits the right wall. The 15 second timer runs out, but by then the slower car
            has surpassed the headbutting car in distance travelled, revealing it to be the winner of the
            genetic lottery.
        </p>

        <p>
            As expected from the selection algorithm, we can see this strategy take over the population over the next few
            generations.
        </p>

        <h3>
            2. Bending left
        </h3>

        <p>
            Now that "the great filtering" has completed, the car that reigned supreme can begin the long journey
            of evolution as it learns to traverse the entire track.
        </p>

        <p>
            Currently, the car is moving too slow to travel far before the 15 second timer completes.
            This create a strong evolutionary pressure for <i>speed</i>, which we can see rapidly evolve
            over the first 10 generations.
        </p>

        <p>
            All good times come to an end, as eventually improvement plateaus as the cars hit the first major obstacle,
            an inverse bend in the track.
        </p>

        
        <h3>
            3. Avoiding the bend
        </h3>

        <p>
            Before long, the majority of the population is stuck hitting the inverse bend in the track.
            There is now a strong evolutionary pressure to both detect and avoid the bend which is
            currently in the way of progress.
        </p>

        <p>
            Although hard to see, the continuous fitness function means that each generation is hitting
            the bend a few pixels later than the previous. This progress compounds, and on generation 18
            a major breakthrough occurs as the first car is able to narrowly miss the bend by steering
            heavily to the left.
        </p>

        <p>
            Until now, there has been no evolutionary pressure to turn right, so the car is quite unsure what to
            do after missing the bend and so directly into the wall below. But hey, this is progress!
        </p>

        <h3>
            4. Turning right
        </h3>

        <p>
            This next stage of evolution is quite slow, as until this point the cars lacked any means for the
            elusive "right turn".
            Unlike avoiding the inverse bend, which was able to quickly evolve from a modification of the left
            turn that got it there, the right turn requires a whole new kind of adaptation.
        </p>

        <p>
            Rather than evolving it directly, the cars start by modifying their left turn to be slightly less
            severe. This left turn evolves into a straight line around generation 40, which evolves
            into a slight right turn around generation 70.
        </p>

        <p>
            A major right-turning breakthrough occurs in generation 76, and the cars are once again turning
            correctly, but limited by their speed.
        </p>


        <h3>
            5. Final bend
        </h3>

        <p>
            Before long, the right turning cars have sped up but are now hitting their
            sides on inside of the final left bend.
            Over the next dozen generations, we observe pixel-sized progress towards avoiding this bend.
        </p>

        <p>
            Generation 99 is a big moment for car evolutionary history, as the first car is born that is able
            to turn all the way around the final bend with milliseconds to spare.
        </p>

        <p>
            Thus begins the race to the finish.
        </p>

        <h3>
            6. Race to the finish
        </h3>

        <p>
            The cars are now competing to be fast enough to complete a full cycle of the track.
        </p>

        <p>
            However it's not as simple as speeding up overall, as the cars must maintain their ability to clear
            all previous turns without crashing. They must gain speed, but only at the right moments.
        </p>

        <p>
            The exact moment that a car first crossed the finish line is hard to pinpoint as I didn't render
            any observable marker, but my guess is that it was achieved by a particularly speedy car from generation 125.
            Congrats little car! 🎉
        </p>

        <br/>

        <h2>
            How it works
        </h2>

        <h3>
            Population
        </h3>

        <p>
            A genetic algorithm consists of some kind of population that evolves over time.
            In the case of this simulation, the population is a number (20) of triangular cars.

        </p>

        <p>
            These cars each have a miniature "brain" which is a small feed-forward artificial neural network (3-4-3-2)
            that controls how the car drives on the track.
        </p> 
        <p>
            The 3 "sight lines" that protrude from the front of the car are the inputs to this ANN. The input neuron
            is provided an activation between 0 and 1, based on how much of the sight line has been intercepted by
            a wall. This allows the cars to primitively detect how close they are to crashing into a given wall,
            allowing them to swerve away to avoid collision.
        </p>
        <p>
            The output of the ANN is two neurons that determine how fast each back wheel spins, which is enough
            to give the car full control over both steering and speed.
        </p>
        <p>
            The evolving genotype are the weights and biases of the ANN, and the phenotype
        </p>

        <h3>
            Fitness Function
        </h3>

        <p>
            In a genetic algorithm, there is a fitness function that determines the success of members of the
            population.

            In this simulation the fitness function is how far the cars travel along the track,
            as measured by cumulative distance travelled along the light grey line.
        </p>
        <p>
            Previous works have used a series of checkpoints to measure progress, however this makes evolution
            more difficult as larger discrete progress leaps are required to inspire any evolutionary pressure.
            Although hard to notice from just watching the cars, progress is often made in a few pixels worth
            of distance, so by using a smooth continuous fitness function this can accumulate over time leading
            to meaningful progress.
        </p>


        <h3>
            Selection
        </h3>
        <p>
            To select cars for the next generation, we take the top 50% of performing cars. These agents are
            used as parents to produce one child asexually (i.e. no crossover) for the next generation.
            These parents are then also added to the next generation.
        </p>
        <p>
            This method generally leads to exponential growth of successful traits which can be observed
            in the simulation. When a car performs well, it will have a child added to the next
            generation that usually acts similarly well.
            If both perform well again, there will be 4 cars with similar strategies in the generation
            after as each of these two cars will have childen, and so on until the strategy has spread
            to 100% of the population.
        </p>


        <h3>
            Reproduction
        </h3>
        <p>
            To reproduce asexually, the cars have their genotype (brain) passed
            on to children, as this will carry over the phenotype (driving strategy and fitness score).

            The genotype is also mutated slightly (small random values added to weights & biases), causing  
            the child to drive slightly differently from its parent.

            Most of the time these mutations make the car drive worse, but occasionally it will improve
            driving, providing a mechanism for progress.
        </p>


        <br/>


        <h2>
            Programming
        </h2>

        <h3>
            Simulation
        </h3>

        <p>
            The entire simulation is coded from scratch at the abstraction layer of pygame, which provides
            an API for drawing primitive shapes and a game loop.
        </p>

        <p>
            I was quite young/naive at the time (trigonometry was peak maths knowledge),
            so line-to-line collisions were about the most advanced mechanics I could derive equations for on paper.

            This is why <a href="https://github.com/mattyhempstead/neural-network-cars/blob/master/lines.py">the code</a> is
            mostly a mess of spaghetti handling of every possible case, despite there
            existing much more elegant ways to handle line-to-line collisions (linear algebra ftw!).

        </p>

        <p>
            The neural network mechanism was also coded from scratch without knowledge of
            linear algebra, much to its detriment.
            Concurrency and GPU acceleration was a foreign concept to me, so 
            the <a href="https://github.com/mattyhempstead/neural-network-cars/blob/master/neural_net.py">neural network class</a> is
            just many layers of nested for loops running synchronously on the CPU.
        </p>

        <p>
            As a <a href="https://xkcd.com/1205/">classic noob programmer mistake</a>, rather than manually specifying
            the line segments for the track, I instead spent much longer writing an 
            entire <a href="https://github.com/mattyhempstead/neural-network-cars/blob/master/trackCreator.py">visual editor</a> for
            track creation which I used a total of 1 times.
        </p>

        <h3>
            Source Code
        </h3>
        <p>
            Source code can be found on <a href="https://github.com/mattyhempstead/neural-network-cars/">Github</a>.
        </p> 
        <p>
            Note that this is a very early project (from 2016, which was ~1yr into learning to code),
            so my programming style and abilities have probably improved since.
        </p>



    </ProjectPage>

}