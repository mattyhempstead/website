import Image from 'next/image';

import { ProjectPage, ProjectIFrame } from '@/components/projects/ProjectPage';

export const metadata = {
    title: "Image Pixel Sorter",
}

export default function Project() {

    return <ProjectPage
        title = "Image Pixel Sorter"
        date = "2017 or 2018 ????"
    >

        <p>
            A small web app that performs a live bubble sort of the pixels in an image by their brightness (sum of RGB).
        </p>

        <p>
            It is unclear what inspired me to make this.
            {/* Not entirely sure why I made this. */}
        </p>


        <div className='text-center mt-12'>
            <Image
                className="mx-auto shadow-[0_0_10px_black]"
                src="/projects/image-pixel-sorter/interesting-meme.png"
                alt="Demo GIF"
                width={488}
                height={559}
            />
            <p className='italic text-center mt-4'>
                This is probably how it went.
            </p>
        </div>


        <p className='mt-16'>
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

    </ProjectPage>
}
