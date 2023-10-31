import Layout from '/components/layout';

import ProjectPage from '/components/projects/ProjectPage';

import styles from './index.module.css';


export default function Project() {

    return <ProjectPage
        title="Evolution Simulation v1"
        date = "2015"
    >

        <p>
            While learning to code, a quickly growing passion of mine was simulations,
            particularly those
            that demonstrated some kind of evolution/nature driven design.
        </p>

        <p>
            I think the reason I liked simulating evolution so much was that it felt like I
            could make the computer act intelligent by optimizing itself
            to achieve goals that a human would not be capable of through manual design.
        </p>

        <p>
            This is the first version of the evolution simulation that I built.

            Here, a number of unique organisms (colourful circles) with differing genotypes
            move around a square collecting food (smaller grey circles) to gain "energy".
            When an organism has gained enough energy they will use that energy to reproduce,
            creating another organism (a child) with very similar (slightly mutated) genotypes.

            In theory, over time organisms with more favourable genotypes should evolve and
            dominate the simulation through natural selection.
        </p>

        <p>
            The genotype of a given organism consists of 3 values R G and B, each numbers between 0 and 1.
            The phenotype (observable expression of genotype) was two-fold. Firstly, the colour of
            the organism is a direct mapping of the RGB values to red, green and blue respectively.

            Secondly, and the purpose of this simulation, was that the RGB values each determined a
            particular attribute about the organism.
            {/* <ul>
                <li>red - the speed of the organism (between 0 and 10 units/sec)</li>
                <li>green - energy gain from food (between 0 and 50 energy/food)</li>
                <li>blue - energy threshold for reproduction (between 50 and 100 energy)</li>
            </ul> */}

            Organisms also passively lose energy over time to encourage food consumption.
            The total sum of R,G,B also determines how fast energy is consumed, thus encouraging
            organisms to find an optimal balance between the the attributes.
        </p>


        <ProjectPage.IFrame
            src="/projects/ev1/evolution.html"
            className={styles.iframe}
        />

        <p>
            <b>Technology</b>
            <br/>
            As framework-less web was the only stack I knew at the time, this simulation
            was build using raw HTML/CSS/JS using
            the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API">Canvas</a> element
            to render graphics.
        </p>




    </ProjectPage>

}