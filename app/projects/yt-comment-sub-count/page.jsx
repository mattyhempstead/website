import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectImage from '@/components/projects/ProjectImage';

export const metadata = getProjectMetadata("yt-comment-sub-count");

export default function Project() {
    return <ProjectPage projectId="yt-comment-sub-count">
        <p>
            I built, released, and maintain a browser extension that, for every comment under a YouTube video,
            shows the number of subscribers for the author of the comment.
        </p>

        <ProjectImage
            imageUrl="/projects/yt-comment-sub-count/example-screenshot.png"
            imageAlt="Example Screenshot"
            caption={<>
                One of the use cases is being able to quickly distinguish between comments
                that are actually contributing and being rewarded with likes, and those 
                that are just getting likes because the author is well known.
                {/* An example screenshot of the extension in action (anonymised). */}
            </>}
        />

        <p>
            The extension has around 4k users from both platforms as of early 2024.
        </p>

        <p>
            You can see the Chrome web store listing <a
                href="https://chromewebstore.google.com/detail/subscriber-count-on-comme/legnlfnnpadijhghmeagaafplkeljhki"
            >here</a>.
            <br/>
            Per the request of a particular user, I have also created a Firefox listing <a
                href="https://addons.mozilla.org/en-US/firefox/addon/yt-comment-sub-count/"
            >here</a>.
        </p>

        <br/>

        <p>
            Because I find this interesting, I'm sure others will too. So here is the slowly growing user graph over the last 4 years:
        </p>

        <ProjectImage
            imageUrl="/projects/yt-comment-sub-count/weekly-users-graph.png"
            imageAlt="Example Screenshot"
            className='mt-6 mb-6'
            caption={<>
                Weekly active users graph since 1st March 2020 release.
                <br/>
                (Chrome Web Store analytics kinda glitched out in Feb 2021 lol).
            </>}
        />

        <p>
            Weird how the end of each year seems to have a small drop in active users.
        </p>



        <h2>Technology</h2>

        <p>
            The extension is open source and can be found on <a href="https://github.com/mattyhempstead/yt-comment-sub-count">Github</a>.
        </p>

        <p>
            It works by simply fetches the raw HTML of the /about page for each author and scrapes the string that contains the
            current subscriber count.

            Normally you can't just fetch the source of any HTML page within another due to <a
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
            >CORS</a>.
            
            However, because the /about page exists on the same youtube.com domain as the video, this is allowed.
        </p>

        <p>
            While there exists an official YouTube API that can get this data, that would require maintaining a backend and might cost money.
        </p>


    </ProjectPage>
}
