import type { Metadata } from 'next'


type ProjectData = {
    link: string,
    image: string,
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
        link: "/projects/ev1",
        image: "/projects/ev1/thumbnail.png",
        title: "Evolution Simulator v1",
        desc: "The first version of my agent-based evolution simulations.",
        date: {
            year: 2015,
            string: "2015"
        },
        builtWith: "HTML + CSS + JS"
    },
    "pong": {
        link: "/projects/pong",
        image: "/projects/pong/thumbnail.png",
        title: "Pong",
        desc: "My first pong.",
        date: {
            year: 2015,
            string: "2015"
        },
        builtWith: "HTML + CSS + JS"
    },
    "cat-simulator-2015": {
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
        link: "/projects/superboyboy",
        image: "/projects/superboyboy/thumbnail.png",
        title: "Super Boy Boy",
        desc: "A 2D platformer game from high school.",
        date: {
            year: 2016,
            string: "2016"
        },
        builtWith: "Python + pygame"
    },
    "fb-soccer-python": {
        link: "/projects/fb-soccer-python",
        image: "/projects/fb-soccer-python/thumbnail.png",
        title: "FB Soccer Python",
        desc: "A python clone of the Facebook messenger soccer game.",
        date: {
            year: 2016,
            string: "2016"
        },
        builtWith: "Python + pygame"
    },
    "fractal-tree": {
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
};


export function getProjectMetadata(projectId: string): Metadata {
    const project = PROJECTS_DATA[projectId];
    return {
        "title": project.title,
        "description": project.desc,
    }
}