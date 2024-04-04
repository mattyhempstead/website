import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectVideo from '@/components/projects/ProjectVideo';
import ProjectIFrame from '@/components/projects/ProjectIFrame';

export const metadata = getProjectMetadata("gan-studio");

export default function Project() {

    return <ProjectPage projectId="gan-studio">
        <p>
            A web application for training and generating images with GANs (<a
                href="https://en.wikipedia.org/wiki/Generative_adversarial_network"
            >generative adversarial networks</a>),
            which was a popular method for image-based generative AI from its development
            in 2014, until diffusion kind of took over around 2020.

            Given DALL-E and Stable Diffusion, this technique is now mostly obsolete but it was
            fun while it lasted.
        </p>

        <p>
            This was my major project for software design and development in high school in 2018.
            So the disclaimer is that I probably don't agree with many of the decisions anymore.
        </p>

        <p className='mb-12'>
            At the time this was probably the largest programming project I had completed.
        </p>

        <ProjectVideo
            videoUrl = 'https://www.youtube.com/embed/OHG-hnsNyQo?si=mgbKWhBSzjNCxWkI'
            caption = {<div>
                Tutorial/demo video that was submitted with the project.
            </div>}
        />


        <h2>Technology</h2>

        <p>
            All I had was a hammer, so the entire project was written from scratch using vanilla JavaScript.
        </p>

        <p>
            The UI was drawn from rectangle/text primitives and powered by click events on a HTML Canvas.

            The GAN was written from scratch down to the individual looping over neurons to sum their activations
            (no parallelism 🥲).
        </p>

        <p>
            Many mediocre layers of abstraction.
        </p>

        <p>
            The source code can be found on <a href="https://github.com/mattyhempstead/gan-studio">Github</a>.
        </p>


        <h2>Application</h2>

        <p>
            Application embedded below if you want to try it yourself, although I won't make any guarantees
            about the experience.
        </p>

        <p>
            You can draw the data manually (not recommended).
            Otherwise the MNIST training data for each digit can be found on <a
                href="https://github.com/mattyhempstead/gan-studio/tree/main/GAN%20Studio/MNIST_digits"
            >GitHub</a>.
        </p>

        <ProjectIFrame
            src="/projects/gan-studio/src/index.html"
            className="w-[72rem] h-[44rem]"
        />

    </ProjectPage>
}
