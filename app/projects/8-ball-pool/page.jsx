import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectImage from '@/components/projects/ProjectImage';

export const metadata = getProjectMetadata("8-ball-pool");

export default function Project() {

    return <ProjectPage projectId="8-ball-pool">
        <p>
            An aim assist overlay for the popular Miniclip 8 ball pool web-based game.
        </p>

        <p>
            Uses neural networks that I trained on like a thousand manually labelled pool balls to detect their type and position.
        </p>

        <ProjectImage
            imageUrl="/projects/8-ball-pool/aim-assist-demo.gif"
            imageAlt="Aim Assist Demo"
            caption={<>
                Aim assist lines (in red) are not typically provided by the Miniclip game.
            </>}
        />

        <h2>
            Tech
        </h2>

        <p>
            This project consists of two major parts.

            One part is python backend which trains a model to detect the centres and types of pool balls.

            The other part is JavaScript injected via a Chrome extension, which does everything else.
        </p>

        <h3>
            Pool Ball Vision
        </h3>

        <p>
            Due to the inherent sensitivity of angles in pool, it was important that the positions of pool balls was very accurate
            down to the pixel level.
        </p>

        <p>
            This accuracy was achieved in a two part process.
        </p>

        <p>
            Firstly, I used a Hough Transform in the OpenCV JavaScript library to detect circles on the pool table.

            This would only provide approximate bounding boxes for pool balls due to shadows and other artifacts messing with the algorithm.

            I ran this across some games and collected around a thousand images containing single pool balls.
        </p>

        <p>
            I then wrote a small script to open the balls as images cropped to their bounding boxes in matplotlib.

            This sped up labelling, which I proceeded to perform on every single image where I would
            label both the type of ball (i.e. white or the number) and centre of the ball with a click.
        </p>

        <p>
            Finally, I trained two separate models in Tensorflow.
            One was categorical and classified the type of the ball.
            The other was a regression model which outputted the center of the ball in the image.
        </p>

        <p>
            These models were then exported to be used by JavaScript portion of the project.
        </p>


        <h3>
            Everything Else
        </h3>

        <p>
            The JavaScript portion of the aim assist had multiple modules all working together.
        </p>

        <ul className='[&>li]:mb-2'>
            <li>
                A state machine that reads certain trigger pixels on the game to detect and track the state of the game (e.g. the green
                loading bar around the profile at the top was useful for triggering player turns).
                This was important as it told the program exactly when to perform pool ball detection and start/stop displaying
                the aim assist lines.
            </li>

            <li>
                A module to take in a screenshot of the game and perform pool ball detection with OpenCV and the previously trained Tensorflow models.
            </li>

            <li>
                Logic to take in a list of labelled pool balls with a cursor position, and perform a bit of trig to project
                the direction that a pool ball would travel if hit by the white.
            </li>

            <li>
                A transparent canvas overlay that renders the aim assist lines.
            </li>
        </ul>

        <h3>
            Results
        </h3>

        <p>
            In the end I'd say the results were quite reasonable for a first attempt.
            Aim lines were not entirely accurate (see the gif above), however they still provide a noticeable advantage over no lines at all.
        </p>

        <p>
            With some effort it may have been possible to reverse engineer the Unity web game binary and
            extract the true in-memory coordinates of the balls. The benefit of an ML vision-based approach
            however is that it's essentially impossible to prevent/detect and entirely resistant to binary obfuscation.
        </p>


        <h3>
            Source Code
        </h3>

        <p>
            Source code can be found on <a href="https://github.com/mattyhempstead/8-ball-pool-bot">Github</a>.
        </p>

        <p>
            Note the repo says WIP and uses the term "bot" as I originally intended to develop an agent capable of playing entire games by itself.

            I started by building aim assist for the bot and by the time I'd finished I guess shiny object syndrome had me moving on to another project.
        </p>

        <p>
            It also appears I am ranking on Google for certain often-searched keywords because it's been a few years
            and the repo now has nearly 20 stars entirely organically haha.
        </p>


    </ProjectPage>

}
