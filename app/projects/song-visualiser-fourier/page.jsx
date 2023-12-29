
import { ProjectPage } from '@/components/projects/ProjectPage';

export const metadata = {
    title: "Song Visualiser",
}

export default function Project() {

    return <ProjectPage
        title = "Song Visualiser"
        caption = "or Explorations into the Slow Fourier Transform..."
        date = "December 2018"
    >

        <p>
            A program to visualise songs using a Fourier transform written from scratch.
        </p>

        <p>
            During the summer break between high school and starting university I was watching 
            this <a href="https://www.youtube.com/watch?v=spUNpyF58BY">3Blue1Brown video</a> on a visual introduction to the Fourier transform,
            which is essentially a method of extracting the component frequencies of some function.
        </p>

        <p>
            He does a <i>really</i> good job of explaining it, because it was enough for me to intutively understand the algorithm enough to 
            directly translate it into code (which is arguably the ultimate test for understanding an algorithm).
        </p>

        <p>
            I figured frequency deconstruction was how YouTube videos like
            <a href="https://www.youtube.com/watch?v=s8XIgR5OGJc"> these </a>
            were produced, so in order to prove my algorithm works I
            set myself the goal of recreating these animations on another song by reading the individual samples of a <code>.wav</code> file.
        </p>



        <br/>
        <h2>
            Video demo
        </h2>
        <div className="text-center mb-10">
            <iframe
                src="https://www.youtube.com/embed/XZR_UIu4kRw?si=EcUgsjtZHs2pymKa"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                className='border-0 w-[560px] h-[315px] mx-auto'
            />
            <p
                title="There are other songs that demonstrate this viz better, but I needed something that YouTube wouldn't take down.."
                className="italic mt-2"
            >
                The first 60 seconds of "Exit the Premises" by Kevin MacLeod.
            </p>
        </div>

        <p>
            At this point I could probably have gone much further with the visualisation and produced something
            that looks like the <a href="https://www.youtube.com/watch?v=s8XIgR5OGJc">music videos</a>, as I
            had finished the challenging part of getting the core algorithm to work.

            But apparently I completed what I originally wanted to achieve and moved right onto my next project 🤷.
        </p>


        <h2 className='mt-12'>
            Programming
        </h2>

        <h3>
            Algorithm
        </h3>
        <p>
            As mentioned, the entire algorithm is just a visual understanding of the Fourier transform from
            this <a href="https://www.youtube.com/watch?v=spUNpyF58BY">3Blue1Brown video</a>,
            translated imperatively into code form.

            Being manually written and therefore horribly slow, I'd like to coin the algorithm as I have written
            it the "Slow Fourier Transform" (in contrast to
            the <a href="https://en.wikipedia.org/wiki/Fast_Fourier_transform">Fast Fourier Transform</a>,
            which is actually used for this sort of task).
        </p>
        <p>
            It is essentially lots of iterative "wrapping" of a waveform (as sourced from the samples of a <code>.wav</code> file)
            around the origin at different speeds (frequencies),
            where the deviation of the mean of the wrapped waveform from the origin represents the magnitude of that
            particular wrapping frequency in the waveform.
        </p>
        <p>
            I could attempt to explain it property with diagrams, but I'd strongly recommend you just watch 
            <a href="https://www.youtube.com/watch?v=spUNpyF58BY"> this video </a>
            if you are curious.
        </p>



        <h3>
            Source Code
        </h3>
        <p>
            Source code can be found on <a href="https://github.com/mattyhempstead/song-visualiser-fourier">GitHub</a>.
        </p>


        <p>
            
        </p>

        <h3>

        </h3>

        <p>

        </p>
        <p>

        </p>


    </ProjectPage>

}