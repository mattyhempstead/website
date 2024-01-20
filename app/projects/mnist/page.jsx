import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectIFrame from '@/components/projects/ProjectIFrame';

export const metadata = getProjectMetadata("mnist");


export default function Project() {

    return <ProjectPage projectId="mnist">

        <p>
            An interactive neural network powered digit classifier.
        </p>

        <p>
            Seeing the accuracy on neural networks I was training is useful, but I figured it would
            be nice to be able to draw digits directly into a neural network and see live predictions.
        </p>

        <p>
            So I trained a simple ANN with Tensorflow locally, then uploaded the weights to a web app
            with a canvas that lets you draw digits and view live predictions throughout the process.
        </p>

        <p>
            Play around with it below! It's interesting to get a feel for what types of features the model
            is looking for with certain digits.
        </p>


        <ProjectIFrame
            src="/projects/mnist/src/index.html"
            className="w-[64rem] h-[48rem]"
        />


        <h2>
            Technology
        </h2>

        <p>
            UI and drawing pad built with raw JavaScript using my own UI 
            library <a href="/projects/extra/canvas-lib">canvasLib</a>.
        </p>

        <p>
            Neural network was trained locally with Python and Tensorflow on the <a
                href="https://en.wikipedia.org/wiki/MNIST_database"
            >MNIST</a> dataset of handwritten digits.
            Model is then run in the browser using <a href="https://github.com/tensorflow/tfjs">Tensorflow.js</a>.
        </p>


    </ProjectPage>

}
