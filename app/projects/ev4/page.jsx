import { getProjectMetadata } from "@/app/projects/projectsData";

import ProjectPage from "@/components/projects/ProjectPage";
import ProjectVideo from "@/components/projects/ProjectVideo";

export const metadata = getProjectMetadata("ev4");

export default function Project() {
  return (
    <ProjectPage projectId="ev4">
      <p>
        This is the fourth and most advanced version of my agent-based evolution
        simulations for ALife (artificial life). I'm not really sure where
        versions 2 and 3 are anymore, but you can see version 1{" "}
        <a href="/projects/ev1">here</a>. All I have left of version 4 is this
        20 second recording which I took after leaving the simulation to evolve
        for what I assume was several hours.
      </p>

      <ProjectVideo
        videoUrl="https://www.youtube.com/embed/dTxYSRl6Tx4?si=vAXVQmqNHDLXWZje"
        caption={
          <div>
            The simulation after a few hours of evolution. Notice the agents
            have evolved brains that can successfully chase down food (green
            dots).
          </div>
        }
      />

      <p>
        The purpose of this simulation was to use a genetic algorithm to evolve
        intelligent agents that seek food in order to survive and reproduce. The
        genotype of a given agent encoded a spiking neural network, producing a
        phenotype that changed the behaviour of how they would seek food given
        their 3 sensory neurons (their 3 "whiskers"). Notice the visualisation
        of one of the agent's brain in the red circle in the bottom left. It is
        similar to a typical feed forward neural network, but with an additional
        temporal factor due the spiking nature. The closer an agent whisker is
        to food, the more frequent a sensory neuron would spike.
      </p>
      <p>
        I could write many many words about this project and the lessons I
        learned to make effective evolution simulations. If someone cares I'd be
        happy to brain dump one day.
      </p>

      <h2>Inspiration</h2>
      <p>
        The original inspiration for this project (and a significant part of
        what got me interested in AI in the first place) was this{" "}
        <a target="_blank" href="https://www.youtube.com/watch?v=2kupe2ZKK58">
          random video
        </a>{" "}
        I found on YouTube. It was only many years later did I discover this was
        actually a video from a much younger Andrej Karpathy.
      </p>

      <h2>Technology</h2>

      <p>
        As framework-less web was the only stack I knew at the time, this
        simulation was build using raw HTML/CSS/JS using the{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API">
          Canvas
        </a>{" "}
        element to render graphics.
      </p>

      <h2>Later Versions</h2>
      <p>
        I was super passionate about this software and I'd love to make more
        versions in the future and I have many plans for how I would extend it.
        I'm also a much better software engineer now so I think I do a lot
        better. Unfortunately I've never really given myself the time as it's
        not particularly useful. Maybe one day.
      </p>
    </ProjectPage>
  );
}
