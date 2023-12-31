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
import { ProjectVideo } from "@/components/projects/ProjectVideo";

export const PROJECTS_MARKDOWNS_PATH = "data/projectsMarkdowns/";

const embeddedComponents = {
  ProjectVideo,
};

interface IParams extends ParsedUrlQuery {
  projectSlug: string;
}

export default function ProjectPage({
  source,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="">
      {/* <h1 className="mb-4 text-slate-100">{title}</h1>
      {caption && <p className="italic mb-4 text-slate-500">{caption}</p>} 
      <p className="italic font-bold mb-10 text-slate-600">{date}</p> */}

      {source ? (
        <MDXRemote {...source} components={embeddedComponents} />
      ) : (
        <div>Could not find mdx source :(</div>
      )}
    </div>
  );
}

export const getStaticPaths = (async () => {
  console.log("Get static paths from " + PROJECTS_MARKDOWNS_PATH);
  const files = fs.readdirSync(PROJECTS_MARKDOWNS_PATH);

  console.log(files);
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

  const mdxSource = await serialize(mdxString, {});

  return {
    props: {
      source: mdxSource,
    },
  };
}) satisfies GetStaticProps<
  {
    source?: MDXRemoteSerializeResult;
  },
  IParams
>;
