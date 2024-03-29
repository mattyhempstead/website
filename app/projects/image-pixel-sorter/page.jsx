import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectVideo from '@/components/projects/ProjectVideo';
import ProjectIFrame from '@/components/projects/ProjectIFrame';
import ProjectImage from '@/components/projects/ProjectImage';

export const metadata = getProjectMetadata("image-pixel-sorter");

export default function Project() {

    return <ProjectPage projectId="image-pixel-sorter">
        <p>
            A small web app that performs a live bubble sort of the pixels in an image by their brightness (sum of RGB).
        </p>

        <p className='mt-8'>
            Takes a few minutes to finish so I have added a video below to jump through.
            <br/>
            Bubble sort is O(n^2) after all.
        </p>

        <ProjectVideo
            videoUrl = 'https://www.youtube.com/embed/fS3X7jCTIP4?si=rea3ei2blW7bVneE'
            caption = {<div
                title="There are other songs that demonstrate this viz better,
                       but I needed something that YouTube wouldn't take down.."
            >
                Video of the pixels sorting if you want to skip ahead.
            </div>}
        />

        <p className='mt-12'>
            Application embedded below if you want to run it yourself on a custom image.
        </p>

        <ProjectIFrame
            src="/projects/image-pixel-sorter/index.html"
            className="w-[70rem] h-[54rem]"
        />

        <ProjectImage
            imageUrl="/projects/image-pixel-sorter/interesting-meme.png"
            imageAlt="A meme"
            className='mt-24 [&>img]:max-w-[34rem]'
            caption={<>
                It's unclear what inspired me to make the pixel sorter.
            </>}
        />

    </ProjectPage>
}
