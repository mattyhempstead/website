import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TFrontmatter } from "@/utils/TFrontmatter";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { PROJECTS_MARKDOWNS_PATH } from "@/utils/constants";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import fs from "fs";
import Link from "next/link";

type ProjectCardProps = {
  link: string;
  image: string;
  title: string;
  desc: string;
  date: string;
  builtWith: string;
};

const ProjectCard = ({
  link,
  image,
  title,
  desc,
  date,
  builtWith,
}: ProjectCardProps) => {
  return (
    <Link href={link}>
      <div
        className={`
                flex mb-6 text-slate-300 bg-slate-800
                border-[0.2rem] border-slate-950
                shadow-[0_0_7px_rgba(0,0,0,0.5)]

                hover:bg-slate-700
                [&:hover_.project-card-image]:bg-[rgba(1,1,1,0.0)]
            `}
      >
        <div
          className={`
                    bg-gray-100 h-40 relative flex-[0_0_10rem]
                    border-r-[1px] border-gray-900
                `}
        >
          {/* width: calc(100% - 0.6rem); */}
          <Image src={image} alt={title} layout="fill" />

          {/* Overlay to make the images appear less bright/contrasting */}
          <div
            className={`
                            project-card-image

                            w-full h-full absolute bg-[rgba(1,1,1,0.2)]
                            shadow-[inset_0_0_1rem_black]
                        `}
          ></div>
        </div>
        <div className="flex-grow p-3">
          <div className="flex justify-between">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="pr-2 mt-0 italic text-gray-500">{date}</p>
          </div>
          <p className="mt-0 mb-2 font-normal">{desc}</p>
          <p className="mt-0 mb-0 font-bold text-green-600">{builtWith}</p>
        </div>
      </div>
    </Link>
  );
};

function getProjectDateSortFn(newestFirst = true) {
  // Sort by date created
  // Ties are broken on title alphabetical
  // Unknown dates get sort priority
  const f = (a: any, b: any) => {
    const yearDiff = a.date.year - b.date.year;
    if (yearDiff != 0) return yearDiff;

    // Months start at 1
    // Use 0 if undefined (unknown months sort earlier)
    const monthDiff = (a.date.month || 0) - (b.date.month || 0);
    if (monthDiff != 0) return monthDiff;

    // Alphabetical title if same date
    return a.title > b.title ? 1 : -1;
  };

  // Swap order of params if oldest first
  if (newestFirst) {
    return f;
  } else {
    return (a: any, b: any) => f(b, a);
  }
}

const ProjectsList = ({
  projectsMetadata,
}: {
  projectsMetadata: TFrontmatter[];
}) => {
  const [sortingMethod, setSortingMethod] = useState("default");
  const [sortedProjects, setSortedProjects] =
    useState<TFrontmatter[]>(projectsMetadata);

  useEffect(() => {
    console.log("Changing sorting method", sortingMethod);

    // Sort projects based on the selected method
    if (sortingMethod === "date-asc") {
      const sortedByDate = [...projectsMetadata].sort(
        getProjectDateSortFn(true)
      );
      setSortedProjects(sortedByDate);
    } else if (sortingMethod === "date-desc") {
      const sortedByDate = [...projectsMetadata].sort(
        getProjectDateSortFn(false)
      );
      setSortedProjects(sortedByDate);
    } else {
      setSortedProjects(projectsMetadata); // Default order
    }
    console.log(sortedProjects);
  }, [sortingMethod, projectsMetadata]); // Re-run the effect when sortingMethod changes

  return (
    <>
      <div className="text-right">
        <select
          value={sortingMethod}
          onChange={(e) => setSortingMethod(e.target.value)}
          className={`
                p-1 mr-0 bg-gray-700 text-gray-300
                border-[1px] border-gray-400 rounded
                hover:bg-gray-600
            `}
        >
          <option value="default">Default</option>
          <option value="date-desc">Date (newest first)</option>
          <option value="date-asc">Date (oldest first)</option>
        </select>
      </div>

      <div className="mt-5 ">
        {sortedProjects.map((project) => (
          <ProjectCard
            key={project.title}
            link={project.link}
            image={project.image}
            title={project.title}
            desc={project.desc}
            date={project.date.string}
            builtWith={project.builtWith}
          />
        ))}
      </div>
    </>
  );
};

export default function ProjectsPage({
  projectsMetadata,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1 className="mb-6">Projects</h1>

      <p>
        An archive of some of the projects I mostly finished going all the way
        back to when I first learned to code in ~2015.
        <br />
        <br />
        <span title="There are a few projects that appear to have been lost :'(">
          Many of these were made in my first few years of coding (before I
          discovered Github) and whose only location was until recently was an
          unused Windows partition that would have inevitably been destroyed at
          one point.
        </span>
        <br />
        <br />
        To ensure these projects are not lost to time and so I can look back at
        them many years from now, I thought I would put them all in one place.
        <br />
        <br />
        {/* <span
                    title="So really, this archive exists more for me than anyone else."
                >
                Also, lots of these are really not "projects" in the sense I was inspired for
                a few hours and put something small together, but rather than abandoning 
                them I'd rather just have everything in a place where I am OK with 
                low quality.
                </span> */}
      </p>

      <ProjectsList projectsMetadata={projectsMetadata} />
    </div>
  );
}

export const getStaticProps = (async () => {
  console.log("Get static props for project list");

  const files = fs.readdirSync(PROJECTS_MARKDOWNS_PATH);

  const projectsMetadata: TFrontmatter[] = [];

  for (const filename of files) {
    const mdxString = fs.readFileSync(
      path.join(PROJECTS_MARKDOWNS_PATH, filename),
      "utf-8"
    );
    const mdxSource = await serialize<Record<string, unknown>, TFrontmatter>(
      mdxString,
      { parseFrontmatter: true }
    );
    projectsMetadata.push(mdxSource.frontmatter);
  }

  return {
    props: {
      projectsMetadata,
    },
  };
}) satisfies GetStaticProps<{
  projectsMetadata?: TFrontmatter[];
}>;
