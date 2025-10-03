import type { NextConfig } from "next";
import createMDX from "@next/mdx";


const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  typedRoutes: true,
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
