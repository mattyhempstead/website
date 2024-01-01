import Image from 'next/image';

import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectIFrame from '@/components/projects/ProjectIFrame';

export const metadata = getProjectMetadata("image-pixel-sorter");

export default function Project() {

    return <ProjectPage
        title = "Image Pixel Sorter"
        date = "2017 or 2018 ????"
    >

        <p>
            A small web app that performs a live bubble sort of the pixels in an image by their brightness (sum of RGB).
        </p>

        <p className='mt-8'>
            Application embedded below.
            <br/>
            Takes a few minutes - bubble sort is O(n^2) after all.
            <br/>
            <a href="https://youtu.be/fS3X7jCTIP4">Here</a> is a video demo to skip through if you don't want to wait.
        </p>

        <ProjectIFrame
            src="/projects/image-pixel-sorter/index.html"
            className="w-[70rem] h-[54rem]"
        />

        <div className='text-center mt-16'>
            <Image
                className="mx-auto shadow-[0_0_10px_black]"
                src="/projects/image-pixel-sorter/interesting-meme.png"
                alt="Demo GIF"
                width={488}
                height={559}
            />
            <p className='italic text-center mt-4'>
                It's unclear what inspired me to make this.   
            </p>
        </div>

    </ProjectPage>
}
