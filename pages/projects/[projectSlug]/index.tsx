import type {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import fs from "fs";
import path from "path";
import { ParsedUrlQuery } from "querystring";
import { serialize } from "next-mdx-remote/serialize";
import ProjectVideo from "@/components/projects/ProjectVideo";
import ProjectIFrame from "@/components/projects/ProjectIFrame";
import React from "react";
import { TFrontmatter } from "@/utils/TFrontmatter";
import { PROJECTS_MARKDOWNS_PATH } from "@/utils/constants";
import Image from "next/image";

/**
 * Components that you want to use in the mdx files.
 */
const embeddedComponents = {
  ProjectVideo,
  ProjectIFrame,
  Image,
};

interface IParams extends ParsedUrlQuery {
  projectSlug: string;
}

export default function ProjectPage({
  source,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!source) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1 className="mb-4 text-slate-100">
        {source.frontmatter.title as string}
      </h1>
      {(source.frontmatter.caption as string) && (
        <p className="italic mb-4 text-slate-500">
          {source.frontmatter.caption as string}
        </p>
      )}
      <p className="italic font-bold mb-10 text-slate-600">
        {source.frontmatter.date.string}
      </p>

      <MDXRemote {...source} components={embeddedComponents} />
    </>
  );
}

export const getStaticPaths = (async () => {
  console.log("Get static paths from " + PROJECTS_MARKDOWNS_PATH);
  const files = fs.readdirSync(PROJECTS_MARKDOWNS_PATH);

  console.log("List of mdx filenames: ", files);
  return {
    paths: files.map((filename) => ({
      params: {
        projectSlug: filename,
      },
    })),
    fallback: true,
  };
}) satisfies GetStaticPaths<IParams>;

export const getStaticProps = (async (ctx: GetStaticPropsContext<IParams>) => {
  if (!ctx.params) return { props: {} };
  const { projectSlug } = ctx.params;
  console.log("Get static props for " + projectSlug);

  const mdxString = fs.readFileSync(
    path.join(PROJECTS_MARKDOWNS_PATH, (projectSlug + ".mdx") as string),
    "utf-8"
  );

  const mdxSource = await serialize<Record<string, unknown>, TFrontmatter>(
    mdxString,
    { parseFrontmatter: true }
  );

  return {
    props: {
      source: mdxSource,
    },
  };
}) satisfies GetStaticProps<
  {
    source?: MDXRemoteSerializeResult<Record<string, unknown>, TFrontmatter>;
  },
  IParams
>;
