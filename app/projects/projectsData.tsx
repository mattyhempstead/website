import type { Metadata } from 'next';


type ProjectData = {
    includeInProjectsList: boolean,  // Whether project appears as a card in the /projects list
    link: string,
    image?: string,
    title: string,
    desc: string,
    date: {
        year: number,  // year as int
        month?: number, // (optional) month as integer index at 1
        string: string,  // the string we render for the date
    },
    builtWith: string
};


/**
 * A list of projects for /projects.
 *
 * date: {
 *     year: year as int
 *     month: (optional) month as integer index at 1
 *     string: the string we render for the date
 * }
 */
export const PROJECTS_DATA: {[projectId: string]: ProjectData} = {
    "soil-shoveller": {
        includeInProjectsList: true,
        link: "/projects/soil-shoveller",
        image: "/projects/soil-shoveller/thumbnail.jpg",
        title: "Soil Shoveller",
        desc: "A really bad Cookie Clicker clone. Also probably one of the first things I ever coded.",
        date: {
            year: 2015,
            string: "2015"
        },
        builtWith: "HTML + CSS + JS",
    },
    "ev1": {
        includeInProjectsList: true,
        link: "/projects/ev1",
        image: "/projects/ev1/thumbnail.png",
        title: "Evolution Simulation v1",
        desc: "The first version of my agent-based evolution simulations.",
        date: {
            year: 2015,
            string: "2015"
        },
        builtWith: "HTML + CSS + JS"
    },
    "pong": {
        includeInProjectsList: true,
        link: "/projects/pong",
        image: "/projects/pong/thumbnail.png",
        title: "Pong",
        desc: "My first pong.",
        date: {
            year: 2015,
            string: "2015 / 2016 ?"
        },
        builtWith: "HTML + CSS + JS"
    },
    "cat-simulator-2015": {
        includeInProjectsList: true,
        link: "/projects/cat-simulator-2015",
        image: "/projects/cat-simulator-2015/thumbnail.jpg",
        title: "Cat Simulator 2015",
        desc: "very likely underwhelming",
        date: {
            year: 2015,
            string: "2015"
        },
        builtWith: "HTML + CSS + JS"
    },
    "superboyboy": {
        includeInProjectsList: true,
        link: "/projects/superboyboy",
        image: "/projects/superboyboy/thumbnail.png",
        title: "Super Boy Boy",
        desc: "A 2D platformer game from high school.",
        date: {
            year: 2016,
            month: 5,
            string: "May 2016"
        },
        builtWith: "Python + pygame"
    },
    "fb-soccer-python": {
        includeInProjectsList: true,
        link: "/projects/fb-soccer-python",
        image: "/projects/fb-soccer-python/thumbnail.png",
        title: "FB Soccer Python",
        desc: "A python clone of the Facebook messenger soccer game.",
        date: {
            year: 2016,
            month: 6,
            string: "June 2016"
        },
        builtWith: "Python + pygame"
    },
    "fractal-tree": {
        includeInProjectsList: true,
        link: "/projects/fractal-tree",
        image: "/projects/fractal-tree/thumbnail.png",
        title: "Fractal Tree",
        desc: "A procedural recursive tree generator.",
        date: {
            year: 2017,
            string: "2017 or 2018 ???"
        },
        builtWith: "HTML + CSS + JS"
    },
    "image-circle-tiler": {
        includeInProjectsList: true,
        link: "/projects/image-circle-tiler",
        image: "/projects/image-circle-tiler/thumbnail.png",
        title: "Image Circle Tiler",
        desc: "A programmatic art image circle effect.",
        date: {
            year: 2017,
            string: "2017 or 2018 ???"
        },
        builtWith: "HTML + CSS + JS"
    },
    "image-pixel-sorter": {
        includeInProjectsList: true,
        link: "/projects/image-pixel-sorter",
        image: "/projects/image-pixel-sorter/thumbnail.png",
        title: "Image Pixel Sorter",
        desc: "Have you ever wondered what it looks like to sort all the pixels in an image for some reason?",
        date: {
            year: 2017,
            string: "2017 or 2018 ???"
        },
        builtWith: "HTML + CSS + JS"
    },
    "pi-estimator": {
        includeInProjectsList: true,
        link: "/projects/pi-estimator",
        image: "/projects/pi-estimator/thumbnail.png",
        title: "Pi Estimator",
        desc: "A nice visualisation of one method to estimate π.",
        date: {
            year: 2017,
            string: "2017 or 2018 ???"
        },
        builtWith: "HTML + CSS + JS"
    },
    "image-evolution": {
        includeInProjectsList: true,
        link: "/projects/image-evolution",
        image: "/projects/image-evolution/thumbnail.png",
        title: "Image Evolution",
        desc: "Genetic algorithm that evolves images made of triangles.",
        date: {
            year: 2017,
            string: "2017 or 2018 ???"
        },
        builtWith: "HTML + CSS + JS"
    },
    "car-evolution-v1": {
        includeInProjectsList: true,
        link: "/projects/car-evolution-v1",
        image: "/projects/car-evolution-v1/thumbnail.png",
        title: "Car Evolution v1",
        desc: "Genetic algorithm that evolves cars to drive around a track.",
        date: {
            year: 2016,
            month: 8,
            string: "August 2016"
        },
        builtWith: "Python + pygame"
    },
    "song-visualiser-fourier": {
        includeInProjectsList: true,
        link: "/projects/song-visualiser-fourier",
        image: "/projects/song-visualiser-fourier/thumbnail.png",
        title: "Song Visualiser",
        desc: "A song visualiser using a fourier transform that was written from scratch.",
        date: {
            year: 2018,
            month: 12,
            string: "December 2018"
        },
        builtWith: "Python + pygame"
    },
    "double-pendulemon": {
        includeInProjectsList: true,
        link: "/projects/double-pendulemon",
        image: "/projects/double-pendulemon/thumbnail.png",
        title: "Double Pendulemon",
        desc: "A double pendulum simulation coded from scratch, with a sour twist.",
        date: {
            year: 2019,
            month: 4,
            string: "April 2019"
        },
        builtWith: "HTML + CSS + JS"
    },
    "thermo-sim": {
        includeInProjectsList: true,
        link: "/projects/thermo-sim",
        image: "/projects/thermo-sim/thumbnail.png",
        title: "Thermo Simulation",
        desc: "A micro-scale simulation of vibrating molecules with macro-scale emergent properties.",
        // desc: "A simulation of vibrating molecules transferring heat to one another at a micro scale, producing states of matter at a macro scale.",
        date: {
            year: 2019,
            month: 4,
            string: "April 2019"
        },
        builtWith: "HTML + CSS + JS"
    },
    "water": {
        includeInProjectsList: true,
        link: "/projects/water",
        image: "/projects/water/thumbnail.png",
        title: "Water",
        desc: "A little interactive water puddle.",
        date: {
            year: 2019,
            month: 4,
            string: "April 2019"
        },
        builtWith: "HTML + CSS + JS"
    },
    "mnist": {
        includeInProjectsList: true,
        link: "/projects/mnist",
        image: "/projects/mnist/thumbnail.png",
        title: "MNIST Interactive",
        desc: "An interactive browser-based digit classifier.",
        date: {
            year: 2019,
            month: 7,
            string: "July 2019"
        },
        builtWith: "HTML + CSS + JS + Python + Tensorflow"
    },
    "dvd-face": {
        includeInProjectsList: true,
        link: "/projects/dvd-face",
        image: "/projects/dvd-face/thumbnail.jpeg",
        title: "DVD Face",
        desc: "The DVD screensaver but it's your face.",
        date: {
            year: 2019,
            month: 9,
            string: "September 2019"
        },
        builtWith: "HTML + CSS + JS"
    },
    "cartpole-evolution": {
        includeInProjectsList: true,
        link: "/projects/cartpole-evolution",
        image: "/projects/cartpole-evolution/thumbnail.png",
        title: "Cartpole Evolution",
        desc: "Evolving neural networks to play cartpole, from scratch.",
        date: {
            year: 2019,
            month: 5, // May to June
            string: "May 2019"
        },
        builtWith: "HTML + CSS + JS"
    },

    "canvas-lib": {
        includeInProjectsList: false,
        link: "/projects/extra/canvas-lib",
        title: "canvasLib",
        desc: "A small UI abstraction I built over time for various projects.",
        date: {
            year: 2017,  // I think bc I used it for GAN Studio
            string: "2017"
        },
        builtWith: "HTML + CSS + JS"
    },
};


export function getProjectData(projectId: string): ProjectData {
    if (!(projectId in PROJECTS_DATA)) {
        throw new Error(`No project with ID: ${projectId}`);
    }
    return PROJECTS_DATA[projectId];
}

/**
 * Returns the NextJS Metadata object for a project page.
 * https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-object
 */
export function getProjectMetadata(projectId: string): Metadata {
    const project = getProjectData(projectId);
    return {
        "title": project.title,
        "description": project.desc,
    }
}
