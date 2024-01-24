import Image from 'next/image';

import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectImage from '@/components/projects/ProjectImage';



export const metadata = getProjectMetadata("typeracer-cheat");

export default function Project() {
    return <ProjectPage projectId="typeracer-cheat">

        <p>
            <a href="https://play.typeracer.com/">TypeRacer.com</a> is a website where you compete
            with others in typing tests. Due to the inherent trust in the client that is required
            for a typing game, the game is a big target for people trying to cheat and so there are
            some anti-cheat mechanisms in place (e.g. a timed captcha).
        </p>

        <p>
            For fun, I developed an exploit chain with JavaScript that bypasses the anti-cheat to reach the maximum
            speed. I wrote up my experience in this <a
                href="https://github.com/mattyhempstead/typeracer-cheat"
            >
                GitHub repo
            </a>. The exploit probably doesn't work anymore, but that was never really the point.
        </p>

        <p>
            If you are interested in knowing how I did it, check out the <a
                href="https://github.com/mattyhempstead/typeracer-cheat"
            >write-up</a>.
        </p>

        <p>
            If you just want results, refer to the screenshot below.
        </p>

        <ProjectImage
            imageUrl="/projects/typeracer-cheat/leaderboard.png"
            imageAlt="Leaderboard"
            className='[&>img]:max-w-[36rem]'
            caption={<>
                My account later got permanently banned.
                <br/>
                (they were just jealous)
            </>}
        />

    </ProjectPage>
}
