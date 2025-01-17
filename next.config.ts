// import type { NextConfig } from "next";
import nextMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

/** @type {import('rehype-pretty-code').Options} */
const options = {
  theme: "dracula",
  keepBackground: false,
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [[rehypePrettyCode, options]],
  },
});



const nextConfig = { reactStrictMode: true };

export default withMDX(nextConfig);

// export default nextConfig;
