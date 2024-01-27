import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectImage from '@/components/projects/ProjectImage';
import ProjectVideo from '@/components/projects/ProjectVideo';

export const metadata = getProjectMetadata("syncs-hack-2020");

export default function Project() {
    return <ProjectPage projectId="syncs-hack-2020">
        <p>
            At the University of Sydney, the CS society (SYNCS) runs an annual hackathon where you have
            ~24 hours to build a open ended project.
        </p>

        <p>
            In 2020, I competed with a team of six in the hackathon to build what is essentially an audio
            version of QR Codes, called QR Tones.

            The idea is that when you don't have access to a widespread visual transmission method for
            QR codes like a projector or printed sheets of paper, you can instead transmit the code
            to everyone at once by playing a sound.

            There are a couple flaws with the idea (noisy rooms make <i>everything</i> hard to hear), but
            hackathons are hackathons after all. 🤷
        </p>

        <p>
            In the end we got second place, yay! 🎉
        </p>

        <p>
            The app was only ever locally hosted, but you can still view the <a
                href="https://devpost.com/software/syncs-hack-2020"
            >devpost</a> and <a
                href="https://github.com/mattyhempstead/syncs-hack-2020"
            >source code</a>.
        </p>


        <h2>
            Experience
        </h2>

        <p>
            This was the first entirely online hackathon due to the 2020 COVID lockdowns, so it was quite a different
            experience to the previous in-person hackathon I attended in 2019.
        </p>

        <p>
            We also went into the entirely open-ended hackathon with no real plans, which I have learned now was a mistake.
            Without a plan, the ideation process feels rushed as you are cutting into valuable hack time and you end up
            with many people unsatisfied with the idea.

            Fortunately everything turned out fine in the end as we came around to the idea, but still a lesson learned there.
        </p>

        <h3>Roles</h3>

        <p>
            As there were six of us (also not really recommended), I definitely spent a good amount of time ensuring the work
            we did would actually fit together. Organising programmatic interfaces between modules developed by different teams,
            in particular.
            This was further complicated by being all virtual so I couldn't just walk over and chat with people.
        </p>

        <p>
            The coding I did do was mostly in the actual noise decoding algorithm.
            Interface-wise, my job was to take an audio signal as waveform samples and return a message encoded using a communication
            protocol defined by the encoding team.
        </p>

        <p>
            The primary challenge here was the extreme levels of noise that scrambled the signal, making it very hard to correctly
            decode. Thankfully, a tradeoff existed between signal speed and accuracy, so we were able to keep sacrificing speed until the
            accuracy was satisfactory.
        </p>


        <h2>
            Outcome
        </h2>

        <p>
            Our first working prototype was completed with less than 4 hours before the demonstration was due (not recommended).
            Below is a video of that prototype in its final form.
        </p>

        <ProjectVideo
            videoUrl = 'https://www.youtube.com/embed/SNmF6LwqdMk?si=z7ln0BakP-vv1AIT'
            caption = {<div>
                A demonstration of QR Tones receiving the word "hello".
            </div>}
            className='mt-6 mb-8'
        />

        <p>
            A hint at our encoding method exists in the above visualisation.
            Each distinct tone holds a single byte of information and the different spikes represent the 
            amplitude of the waveform at one of 8 possible frequencies (one for each bit in the byte).
        </p>

        <p>
            The first, slightly longer signal was actually a header that was used indicate to the
            decoder that a message was about to be received.

            The header is why you hear 6 tones for a 5 byte message "hello".
        </p>

        <p>
            During decoding, a fourier transform was used to extract the amplitude at each of these 8
            frequencies which could then used to decode the signal.
        </p>

        <p>
            We managed to get QR tones to work reliably at a speedy 1 byte per second.

            A typical Version 4 QR code for a URL may only need to hold up to 50 characters, which translates to
            around a minute of transmission time for QR tones.
        </p>
        <p>
            I expect that with some time and effort (compressed encoding, noise cancellation, error correction) we
            could have increased the rate of reliable transmission by an order of magnitude, which is definitely
            comparable to the visual alternative.
        </p>

    </ProjectPage>
}
