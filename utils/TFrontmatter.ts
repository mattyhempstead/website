export type TFrontmatter = {
  title: string;
  link: string;
  image: string;
  desc: string;
  caption?: string;
  date: {
    year: number;
    month: number;
    string: string;
  };
  builtWith: string;
};
