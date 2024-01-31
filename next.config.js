/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["apidev.accuweather.com", "www.citypng.com"],
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(gif)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            outputPath: "static", // Adjust the output path as needed
            name: "[name].[ext]",
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
