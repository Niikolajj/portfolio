const { getDependenciesToBundle } = require('@remix-run/dev');

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: [/^rehype.*/,
        /^remark.*/,
        /^unified.*/,
        /^unist.*/,
        /^hast.*/,
        /^bail.*/,
        /^trough.*/,
        /^mdast.*/,
        /^micromark.*/,
        /^decode.*/,
        /^character.*/,
        /^property.*/,
        /^space.*/,
        /^comma.*/,
        /^react-markdown$/,
        /^vfile.*/,
        /^ccount*/,
        /^markdown-table*/,
        /^trim-lines*/
      ]
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
