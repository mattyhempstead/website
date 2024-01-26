import { getProjectMetadata } from '@/app/projects/projectsData';

import ProjectPage from '@/components/projects/ProjectPage';
import ProjectImage from '@/components/projects/ProjectImage';

export const metadata = getProjectMetadata("browser-homepage");

export default function Project() {
    return <ProjectPage projectId="browser-homepage">
        <p>
            I built a <a
                href="https://github.com/mattyhempstead/browser-homepage"
            >Chrome extension</a> which lets me customise my own new tab page by writing
            custom HTML+CSS+JS.
        </p>

        <p>
            Most people I know who use computers often have installed a Chrome extension that
            changes the default page that opens when they create a new tab.
            Finding the perfect Chrome extension with all the features you want is impossible though,
            so I figured I would just make my own since I know how to code.
        </p>

        <p>
            Some features I have added to my own new tab page include:
        </p>
        <ul className='mt-1'>
            <li>Quick links to all my email accounts.</li>
            <li>Hotkeys that open a few common websites I visit.</li>
            <li>Live cryptocurrency prices fetched from an API.
                <ul>
                    <li>
                        This was mostly just to prove external HTTP requests work, although the
                        result has been a continuous awareness of the price of Bitcoin these
                        past few years.
                    </li>
                </ul>
            </li>
            <li>
                A counter which increments each time I open the new tab page.
                <ul>
                    <li>
                        This number often reaches upwards of 50k before I eventually reset my computer.
                    </li>
                    <li>
                        One day I might store this data in a persistent location and see how high it gets.
                    </li>
                </ul>
            </li>
            <li>
                Live updating datetime string with seconds.
                <ul>
                    <li>
                        With both Sydney and UTC timezones, because I often found myself converting manually.
                    </li>
                </ul>
            </li>
        </ul>

        <p>
            The experience has been really good as I've been using the custom new tab page dozens
            of times per day since late 2019 and haven't looked back.

            A few times now I've had people ask me where I got my fancy new tab page from and I
            get to give them the DIY pitch. 😀
        </p>

        <p>
            So yeah, I would totally recommend making your own new tab page to anyone who knows even basic web dev.

            To give others the same benefit, I tried to make it as easy as possible with this <a
                href="https://github.com/mattyhempstead/browser-homepage"
            >GitHub repo</a> to remove the friction of also needing to create a Chrome extension.
        </p>

    </ProjectPage>
}
