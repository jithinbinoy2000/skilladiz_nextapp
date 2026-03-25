/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent bundling Knex (and its optional sqlite drivers) in RSC/route builds.
  serverExternalPackages: ["knex"],
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
