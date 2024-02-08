import type { Metadata } from 'next'
import Link from 'next/link';

import Dropdown from '@/components/dropdown';


export const metadata: Metadata = {
    title: "Home | Matty Hempstead",
    alternates: {
        canonical: "https://mattyhempstead.com",
    },
}


export default function Page() {
    return <div className={`
        [&_h2]:mt-20
    `}>

        <div className='text-center mt-12 text-lg'>
            <p>
                Projects are <a href="/projects">here</a>.
            </p>

            <p>
                The rest is just noise.
            </p>
        </div>

        <div className='h-4'></div>

        {/* <p>
            I am a
        </p>
        <ul className='mt-2'>
            <li><Link href="#education">Student</Link></li>
            <li><Link href="#employment">Software Developer</Link></li>
            <li><Link href="#hobbies">Creator of <i>things</i></Link></li>
        </ul>

        <br/> */}



        <h2 id="education">
            Education
        </h2>

        <p>
            I am currently a student at University of Sydney.
        </p>

        <p>
            I study a double degree in <b>Computer Science </b>
            and <b>Data Science</b>.
        </p>

        <ul>
            <li>
                <p>
                    Why Computer Science?
                </p>

                <Dropdown>
                    I learned to code in my free time during high school and realised pretty quickly
                    that I wanted to do this for the rest of my life if given the chance.

                    <br/><br/>

                    Since then I've discovered many practical benefits that CS can offer to both myself
                    and society, although I don't think I need to convince any readers here.

                    {/* Stuff about it being the most powerful tool available to humanity, about it giving you an
                    understanding of how the world works at lower levels of abstraction (this also applies to physics!). */}
                </Dropdown>
            </li>


            <li>
                <p>
                    Why Data Science?
                </p>

                <Dropdown>
                    <p className='mt-2'>
                        I enjoyed physics enough in high school that I was tempted to pick it.

                        However, by that time I had spent a couple years playing with (ML-based)
                        AI which I could see as a rapidly improving extension
                        to <a href="https://karpathy.medium.com/software-2-0-a64152b37c35">software</a>.
                        I decided to go all in on software and utility rather than split my degree in two.
                    </p>

                    <p>
                        Similar to CS, during my degree I have learned the value of data science
                        outside of what I originally knew.
                        For DS, this means the ability to extract knowledge from observation
                        and reason about its uncertainty (i.e. <i>science</i>).
                    </p>

                    <p>
                        I actually still ended up doing a course in Physics during my first semester which
                        inspired a couple <a
                            href="/projects/double-pendulemon">
                            personal projects
                        </a>.
                    </p>
                </Dropdown>
            </li>
        </ul>

        <p className='mt-8'>
            For my final year (2024), I will be doing Honours and writing a thesis related to Large Language Models.
            Kinda just hoping ChatGPT doesn't get better than me at writing papers before I get to write mine.
        </p>


        <p>
            More details about my education
            are probably on my <a href="https://www.linkedin.com/in/matty-hempstead-89a980191/">LinkedIn</a>.
        </p>



        <h2 id="employment">
            Employment
        </h2>

        <div>
            <p>
                I've worked as a software developer in a few companies alongside my university studies,
                both part-time work and full-time internships.
            </p>

            <ul className='[&>li]:mb-4'>
                {/* Add logos to the left of each point.
                Canva can use real logo, envisage and others can use other logos. */}

                <li>
                    A software solutions company.

                    <Dropdown>
                        <p className='mt-2'>
                            I think I learned more during my first software job out of high school than my entire degree,
                            at least regarding the skills for practical software development.
                        </p>
                        <p>
                            Here I did some frontend work (where I learned React and the Node ecosystem)
                            and some backend database work (where I learned SQL and how to maintain a DBMS).
                        </p>
                        <p>
                            This was also my first exposure to using Git, Jira and other software 
                            management tools. I was also persuaded by my coworkers to start using Linux,
                            which I still use to this day.

                            {/* Admittedly I went a little too deep at first (Arch Linux, Vim, etc), but I have
                            slowly come to my senses (now I just use Manjaro and VSCode with Vim bindings). */}
                        </p>
                        <p>
                            <i>React, Node, SQL, .NET, using APIs</i>
                        </p>
                    </Dropdown>
                </li>

                <li>
                    A medical research lab at University of Sydney.

                    <Dropdown>
                        <p className='mt-2'>
                            In my second job I was one of the developers responsible for creating
                            and managing software for a lab in the university.
                        </p>
                        <p>
                            The role of a lab is arguably to produce papers, and it turns out that such
                            a job requires the management of a number of different objects
                            (grants, papers, people, collaborations, expenses). Not to mention any
                            industry-specific software at each stage of the data pipelines.
                        </p>
                        <p>
                            My job primarily revolved around connecting data sources like spreadsheets
                            (Google Sheets) and DBMSs which held these objects, and then building interfaces
                            so that lab members could interact with the data in useful ways.
                        </p>
                        <p>
                            <i>Django, ORMs, SQL, Web Dev, Google Sheets (API), etc.</i>
                        </p>
                    </Dropdown>
                </li>

                <li>
                    <b>Canva Internship</b> - Graphic design platform

                    <Dropdown>
                        <p>
                            This was my first internship and work experience at a large (&gt;1k&nbsp;employees)
                            company. This was notable for me as the first role where I was responsible for a small
                            portion of a huge system, rather than a large portion of a small system.
                        </p>
                        <p>
                            By this point I had work experience as both a frontend and backend developer,
                            so I decided to apply for infrastructure engineer in order to broaden my
                            knowledge and try something new. In the end I was placed on the Cloud Security
                            team, which additionally allowed me to dip into the area of cybersecurity.
                        </p>
                        <p>
                            In the internship I worked on improving Canva's internally used secrets manager,
                            and also performed some day-to-day maintenance of other Cloud Security software
                            used by Canva.
                        </p>
                        <p>
                            <i>Golang, AWS, Secrets Managers (Vault by Hashicorp)</i>
                        </p>
                    </Dropdown>

                </li>

                <li>
                    <b>Displayr Internship</b> - Analysis and reporting software

                    <Dropdown>
                        <p>
                            This is my second internship.

                            After working at Canva I thought I would try out a smaller company (~100 employees)
                            where I would have more responsibility and get to work on more areas of the codebase.
                        </p>

                        <p>
                            I'm not sure Tim (the CEO who sits right across from me 😬) would approve of this framing,
                            but when people ask I basically describe it as PowerPoint niched down to people who do lots
                            of data-heavy presentations.
                        </p>

                        <p>
                            I am only mid-way through the internship as I type this, but the work I do is a mixture
                            of frontend (TypeScript) and backend (C#). Some bug fixes, some features.
                        </p>

                        <p>
                            One thing I have enjoyed is gaining experience navigating a large codebase to make changes
                            or fix bugs. Essentially lots of "go to definition" and "find all references".
                            This kind of software development feels more "real" than only working on code in your little
                            corner, so I have been motivated to learn better practices (e.g. IDE tooling).
                        </p>

                        <p> 
                            This has been different from Canva where there
                            is less emphasis on an "intern project" and I have instead been able to commit and push
                            changes regularly to production rather than working off to the side.
                            Definitely much higher trust and responsibility placed on the interns, which is honestly refreshing.
                        </p>
                        <p>
                            <i>TypeScript, C#</i>
                        </p>
                    </Dropdown>

                </li>
            </ul>

            <p>
                More details are probably on 
                my <a href="https://www.linkedin.com/in/matty-hempstead-89a980191/">LinkedIn</a>.
            </p>
        </div>


        <h2 id="hobbies">
            Enjoyment
        </h2>

        <p>
            I tend to spend much of my free time:
        </p>

        <ul className='mt-2'>
            <li>Building things (mostly software).</li>
            <li>Thinking of more things to build.</li>
            <li>Learning stuff, often for the purpose of allowing me to build more things.</li>
            <li>Trying to improve my mindset, partly so I am capable of building more things.</li>
        </ul>

        <p>
            Essentially, don't be surprised if you ask about my hobbies when I'm not writing software @ work
            and I just say writing software @ home.
        </p>

        <p>
            To see some of my projects, go <Link href="/projects">here</Link>.
        </p>


        {/* <div>
            {Array(100).fill(<p>e</p>)}
        </div>  */}


    </div>;
}
