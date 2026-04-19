/** @type {import('next').NextConfig} */
module.exports = {
  turbopack: {
    resolveExtensions: [".ts", ".tsx", ".js", ".jsx", ".svg"],
  },
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};
