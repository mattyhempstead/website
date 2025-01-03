import type { Metadata } from "next";

type ProjectData = {
  includeInProjectsList: boolean; // Whether project appears as a card in the /projects list
  link: string;
  image?: string;
  title: string;
  desc: string;
  date: {
    year: number; // year as int
    month?: number; // (optional) month as integer index at 1
    string: string; // the string we render for the date
  };
  builtWith: string[];
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
export const PROJECTS_DATA: { [projectId: string]: ProjectData } = {
  "soil-shoveller": {
    includeInProjectsList: true,
    link: "/projects/soil-shoveller",
    image: "/projects/soil-shoveller/thumbnail.jpg",
    title: "Soil Shoveller",
    desc: "A really bad Cookie Clicker clone. Also probably one of the first things I ever coded.",
    date: {
      year: 2015,
      string: "2015",
    },
    builtWith: ["HTML", "CSS", "JavaScript"],
  },
  ev1: {
    includeInProjectsList: true,
    link: "/projects/ev1",
    image: "/projects/ev1/thumbnail.png",
    title: "Evolution Simulation v1",
    desc: "The first version of my agent-based evolution simulations.",
    date: {
      year: 2015,
      string: "2015",
    },
    builtWith: ["HTML", "CSS", "JavaScript"],
  },
  ev4: {
    includeInProjectsList: true,
    link: "/projects/ev4",
    image: "/projects/ev4/thumbnail.png",
    title: "Evolution Simulation v4",
    desc: "The fourth version of my agent-based evolution simulations.",
    date: {
      year: 2017,
      month: 9,
      string: "Sep 2017",
    },
    builtWith: ["HTML", "CSS", "JavaScript"],
  },
  pong: {
    includeInProjectsList: true,
    link: "/projects/pong",
    image: "/projects/pong/thumbnail.png",
    title: "Pong",
    desc: "My first pong.",
    date: {
      year: 2015,
      string: "2015 / 2016 ?",
    },
    builtWith: ["HTML", "CSS", "JavaScript"],
  },
  "cat-simulator-2015": {
    includeInProjectsList: true,
    link: "/projects/cat-simulator-2015",
    image: "/projects/cat-simulator-2015/thumbnail.jpg",
    title: "Cat Simulator 2015",
    desc: "very likely underwhelming",
    date: {
      year: 2015,
      string: "2015",
    },
    builtWith: ["HTML", "CSS", "JavaScript"],
  },
  superboyboy: {
    includeInProjectsList: true,
    link: "/projects/superboyboy",
    image: "/projects/superboyboy/thumbnail.png",
    title: "Super Boy Boy",
    desc: "A 2D platformer game from high school.",
    date: {
      year: 2016,
      month: 5,
      string: "May 2016",
    },
    builtWith: ["Python", "Pygame"],
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
      string: "Jun 2016",
    },
    builtWith: ["Python", "Pygame"],
  },
  "fractal-tree": {
    includeInProjectsList: true,
    link: "/projects/fractal-tree",
    image: "/projects/fractal-tree/thumbnail.png",
    title: "Fractal Tree",
    desc: "A procedural recursive tree generator.",
    date: {
      year: 2017,
      string: "2017 or 2018 ???",
    },
    builtWith: ["HTML", "CSS", "JavaScript"],
  },
  "image-circle-tiler": {
    includeInProjectsList: true,
    link: "/projects/image-circle-tiler",
    image: "/projects/image-circle-tiler/thumbnail.png",
    title: "Image Circle Tiler",
    desc: "A programmatic art image circle effect.",
    date: {
      year: 2017,
      string: "2017 or 2018 ???",
    },
    builtWith: ["HTML", "CSS", "JavaScript"],
  },
  "image-pixel-sorter": {
    includeInProjectsList: true,
    link: "/projects/image-pixel-sorter",
    image: "/projects/image-pixel-sorter/thumbnail.png",
    title: "Image Pixel Sorter",
    desc: "Have you ever wondered what it looks like to sort all the pixels in an image for some reason?",
    date: {
      year: 2017,
      string: "2017 or 2018 ???",
    },
    builtWith: ["HTML", "CSS", "JavaScript"],
  },
  "pi-estimator": {
    includeInProjectsList: true,
    link: "/projects/pi-estimator",
    image: "/projects/pi-estimator/thumbnail.png",
    title: "Pi Estimator",
    desc: "A nice visualisation of one method to estimate π.",
    date: {
      year: 2017,
      string: "2017 or 2018 ???",
    },
    builtWith: ["HTML", "CSS", "JavaScript"],
  },
  "image-evolution": {
    includeInProjectsList: true,
    link: "/projects/image-evolution",
    image: "/projects/image-evolution/thumbnail.png",
    title: "Image Evolution",
    desc: "Genetic algorithm that evolves images made of triangles.",
    date: {
      year: 2017,
      string: "2017 or 2018 ???",
    },
    builtWith: ["HTML", "CSS", "JavaScript"],
  },
  "gan-studio": {
    includeInProjectsList: true,
    link: "/projects/gan-studio",
    image: "/projects/gan-studio/thumbnail.png",
    title: "GAN Studio",
    desc: "A web application for training and generating images with GANs (generative adversarial neural networks).",
    date: {
      year: 2018,
      month: 7,
      string: "July 2018",
    },
    builtWith: ["HTML", "CSS", "JavaScript", "AI"],
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
      string: "Aug 2016",
    },
    builtWith: ["Python", "Pygame", "AI"],
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
      string: "Dec 2018",
    },
    builtWith: ["Python", "Pygame"],
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
      string: "Apr 2019",
    },
    builtWith: ["HTML", "CSS", "JavaScript"],
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
      string: "Apr 2019",
    },
    builtWith: ["HTML", "CSS", "JavaScript"],
  },
  water: {
    includeInProjectsList: true,
    link: "/projects/water",
    image: "/projects/water/thumbnail.png",
    title: "Water",
    desc: "A little interactive water puddle.",
    date: {
      year: 2019,
      month: 4,
      string: "Apr 2019",
    },
    builtWith: ["HTML", "CSS", "JavaScript"],
  },
  mnist: {
    includeInProjectsList: true,
    link: "/projects/mnist",
    image: "/projects/mnist/thumbnail.png",
    title: "MNIST Interactive",
    desc: "An interactive browser-based digit classifier.",
    date: {
      year: 2019,
      month: 7,
      string: "Jul 2019",
    },
    builtWith: ["HTML", "CSS", "JavaScript", "Python", "Tensorflow", "AI"],
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
      string: "Sep 2019",
    },
    builtWith: ["HTML", "CSS", "JavaScript"],
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
      string: "May 2019",
    },
    builtWith: ["HTML", "CSS", "JavaScript", "AI"],
  },
  "canvas-lib": {
    includeInProjectsList: false,
    link: "/projects/extra/canvas-lib",
    title: "canvasLib",
    desc: "A small UI abstraction I built over time for various projects.",
    date: {
      year: 2017, // I think bc I used it for GAN Studio
      string: "2017",
    },
    builtWith: ["JavaScript"],
  },
  "yt-comment-sub-count": {
    includeInProjectsList: true,
    link: "/projects/yt-comment-sub-count",
    image: "/projects/yt-comment-sub-count/thumbnail.png",
    title: "YouTube Browser Extension",
    desc: "A utility browser extension that adds the number of subscribers next to YouTube comments.",
    date: {
      year: 2020,
      month: 2,
      string: "Feb 2020",
    },
    builtWith: ["HTML", "CSS", "JavaScript", "Browser Extension"],
  },
  "typeracer-cheat": {
    includeInProjectsList: true,
    link: "/projects/typeracer-cheat",
    image: "/projects/typeracer-cheat/thumbnail.jpg",
    title: "TypeRacer Cheat",
    desc: "Building an exploit for typeracer.com to make up for the fact I type slower than my friends.",
    date: {
      year: 2020,
      month: 2,
      string: "Feb 2020",
    },
    builtWith: ["HTML", "JavaScript"],
  },
  "8-ball-pool": {
    includeInProjectsList: true,
    link: "/projects/8-ball-pool",
    image: "/projects/8-ball-pool/thumbnail.png",
    title: "8 Ball Pool Aim Assist",
    desc: "A *very* helpful overlay for the popular Miniclip game 8 ball pool.",
    date: {
      year: 2020,
      month: 7,
      string: "Jul 2020",
    },
    builtWith: ["HTML", "JavaScript", "Python", "Tensorflow", "AI"],
  },
  edhack: {
    includeInProjectsList: true,
    link: "/projects/edhack",
    image: "/projects/edhack/thumbnail.png",
    title: "Edhack",
    desc: "One weird trick to get more views on your edstem posts that tutors don't want you to know!",
    date: {
      year: 2019,
      month: 10,
      string: "Oct 2019",
    },
    builtWith: ["HTML", "CSS", "JavaScript", "Browser Extension"],
  },
  "browser-homepage": {
    includeInProjectsList: true,
    link: "/projects/browser-homepage",
    image: "/projects/browser-homepage/thumbnail.png",
    title: "Custom New Tab Page",
    desc: "A Chrome extension which allows you to customise your own New Tab page using static files.",
    date: {
      year: 2019,
      month: 9,
      string: "Sep 2019",
    },
    builtWith: ["HTML", "CSS", "JavaScript", "Browser Extension"],
  },
  "coup-bot": {
    includeInProjectsList: true,
    link: "/projects/coup-bot",
    image: "/projects/coup-bot/thumbnail.png",
    title: "Competitive Coup Bot",
    desc: "A program that plays the card game 'Coup' well enough to win a bot battle competition.",
    date: {
      year: 2022,
      month: 9,
      string: "Sep 2022",
    },
    builtWith: ["Python", "Competition", "Team"],
  },
  "syncs-hack-2020": {
    includeInProjectsList: true,
    link: "/projects/syncs-hack-2020",
    image: "/projects/syncs-hack-2020/thumbnail.png",
    title: "QR Tones",
    desc: "QR Codes but with sound, built during SYNCS Hack 2020. Second place! 🎉",
    date: {
      year: 2020,
      month: 8,
      string: "Aug 2020",
    },
    builtWith: ["React", "Firebase", "JavaScript", "Hackathon", "Team"],
  },
  "syncs-hack-2022": {
    includeInProjectsList: true,
    link: "/projects/syncs-hack-2022",
    image: "/projects/syncs-hack-2022/thumbnail.jpg",
    title: "Canva AI Image Extension",
    desc: "An AI image generator embedded into Canva, built during SYNCS Hack 2022. First place! 🎉",
    date: {
      year: 2022,
      month: 8,
      string: "Aug 2022",
    },
    builtWith: ["Python", "JavaScript", "Hackathon", "Team", "AI"],
  },
  pyfck: {
    includeInProjectsList: true,
    link: "/projects/pyfck",
    image: "/projects/pyfck/thumbnail.png",
    title: "Pyfck",
    desc: "A novel method of encoding any python script using only 8 characters.",
    date: {
      year: 2023,
      month: 10,
      string: "Oct 2023",
    },
    builtWith: ["Python", "Esoteric"],
  },
  promptilation: {
    includeInProjectsList: true,
    link: "/projects/promptilation",
    image: "/projects/promptilation/thumbnail.png",
    title: "Promptilation",
    desc: "A new kind of programming language, powered by LLMs.",
    date: {
      year: 2024,
      month: 3,
      string: "Mar 2024",
    },
    builtWith: ["Python", "AI"],
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
    title: project.title,
    description: project.desc,
  };
}

/**
 * Returns the tailwind className to add to each given builtWith tag.
 *
 * We use this to change things like background color.
 */
export function getBuiltWithClassName(builtWith: string): string {
  // Hardcode until softcode is better :)
  if (
    ["Esoteric", "Competition", "Team", "Hackathon", "AI"].includes(builtWith)
  ) {
    return "bg-cyan-700";
  }

  return "bg-blue-700";
}

/**
 * A list of the projects filtered to those visible in the projects list.
 */
export function getProjectsInProjectsList(): ProjectData[] {
  return [...Object.values(PROJECTS_DATA)].filter(
    (p) => p.includeInProjectsList,
  );
}
