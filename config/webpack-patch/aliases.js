/* eslint-disable */
// Node path utility for creating absolute alias targets.
const path = require("path");

// SPFx webpack patch entry point.
// This function receives the generated webpack config and returns the patched version.
module.exports = function patchWebpackConfig(webpackConfig) {
  // Resolve from the project root where Heft is executed.
  const root = process.cwd();

  // Alias map used by webpack during bundle-time module resolution.
  // These targets point to /lib because SPFx compiles TypeScript from /src into /lib first.
  const aliases = {
    // Reusable UI components: import from "@components/..."
    "@components": path.resolve(root, "lib/components"),
    // Web part modules: import from "@webparts/..."
    "@webparts": path.resolve(root, "lib/webparts"),
  };

  // Ensure resolve object exists.
  webpackConfig.resolve = webpackConfig.resolve || {};
  // Merge aliases with any existing aliases from SPFx config.
  webpackConfig.resolve.alias = {
    ...(webpackConfig.resolve.alias || {}),
    ...aliases,
  };

  // Return patched webpack config back to the SPFx build pipeline.
  return webpackConfig;
};
