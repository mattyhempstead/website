import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectImage from '@/components/projects/ProjectImage';
import ProjectVideo from '@/components/projects/ProjectVideo';

export const metadata = getProjectMetadata("syncs-hack-2022");

export default function Project() {
    return <ProjectPage projectId="syncs-hack-2022">
        <p>
            At the University of Sydney, the CS society (SYNCS) runs an annual hackathon where you have
            ~24 hours to build a open ended project.
        </p>

        <p>
            In 2022, I competed in the hackathon a team of four to build an AI image generator into <a
                href="https://canva.com/"
            >Canva</a> via their extension API.

            We won first place, yay! 🎉
        </p>

        <p>
            The extension was not publicly released during the hackathon (and there is no point now, for
            reasons discussed layer 😂). However, you can still view the <a
                href="https://devpost.com/software/alpha-gogh"
            >devpost</a> and <a
                href="https://github.com/mattyhempstead/syncs-hack-2022"
            >source code</a>.
        </p>


        <h2>
            The Idea
        </h2>
        <p>
            I am quite an avid follower of AI-related news, so I was notified when <a
                href="https://en.wikipedia.org/wiki/Stable_Diffusion"
            >Stable Diffusion</a> released their first open source generative AI image model on
            22nd August 2022.

            This was essentially the first high quality AI image generator that was accessible via
            an API, so I figured it would be the perfect base for a hackathon project. The hackathon
            was less than a week later, so it was basically cutting edge tech at the time
            (i.e. a bonus WOW factor during the presentation).
        </p>

        <p>
            For context, <a
                href="https://en.wikipedia.org/wiki/DALL-E"
            >DALL-E 2</a> was released in April and of comparable quality, but their API
            would not be released until early November.
        </p>

        <br/>


        <p>
            The particular idea we landed on is a Canva extension which is outlined below in our demo video.
            I won't take full credit for this though as it was heavily inspired by a discussion on tech Twitter
            of theoretical use cases for image-based generative AI within Google Slides.
        </p>

        <ProjectVideo
            videoUrl = 'https://www.youtube.com/embed/j0SG6iB6yzA?si=_14auuuvz_in6q7t'
            caption = {<div>
                A demo video of the final hackathon project we scrambled to film in the final hour.
            </div>}
            className='mt-6 mb-10'
        />

        <p>
            Funnily enough, Canva would release a <a
                href="https://medium.com/mlearning-ai/stable-diffusion-arrives-in-canva-da109f6c9c02"
            >nearly identical beta feature</a> into their application just a few weeks later.

            The idea was probably obvious to many people, we just executed first thanks to the hackathon. 
        </p>

        <ProjectImage
            imageUrl="/projects/syncs-hack-2022/canva-comment.png"
            imageAlt="Funny comment"
            caption={<>
                A funny comment on that article.
                <br/>
                (we confirmed this was the very same hackathon)
            </>}
            className='[&_img]:max-w-[20rem] '
        />


        <p>
            While the core idea was relatively low hanging fruit (AI generated images in presentation software),
            I do think there was some novelty in the execution. 

            In particular, the use of a sidebar filled with predefined modifier controls was not something I
            had seen Canva or others implement just yet.
        </p>

        <ProjectImage
            imageUrl="/projects/syncs-hack-2022/demo-sidebar.png"
            imageAlt="The sidebar in our demo"
            caption={<>
                Users can select from a range of image styles via a dropdown in the sidebar.
            </>}
            className='[&_img]:max-w-[20rem] '
        />

        <p>
            At the time, AI image generation was relatively new and so required an new kind of skill called "prompting".

            While prompting, I expect the average user (myself included) would probably not be creative enough to think of adding
            "in the style of Van Gogh" to the end of their prompt unless they had previously seen the technique.
        </p>

        <p>
            I figured that adding a sidebar filled with controls like an "Image style" dropdown would guide the
            user towards possible modifications for their image after they type the core objects into
            the prompt box (e.g. a cat at the Colosseum).

            On the backend, we simply append strings to their prompt based on the controls they select and then
            hand it off to the AI.
        </p>

        <p>
            In my opinion, this UX layer between the prompt and the user was an obvious next step for generative AI.
            What I did not predict, was that this layer could be very effectively replaced by an LLM, which we later
            saw when DALL-E 3 was <a
                href="https://openai.com/blog/dall-e-3-is-now-available-in-chatgpt-plus-and-enterprise"
            >integrated with GPT-4</a> in October of 2023.

            I am not as sure anymore what the future interface of AI image generation looks like
            (<a href="https://www.krea.ai/home">possibly something like this</a>),
            but I sure am excited to see.
        </p>


    </ProjectPage>
}
