#!/usr/bin/env node

/**
 * A minimal wrapper around the "next build" API which accepts arguments --files and --out_dir
 */

const path = require("path");
const minimist = require("minimist");
const nextBuild = require("next/dist/build").default;
const fs = require("fs");
const promisify = require("util").promisify;
const ncp = promisify(require("ncp").ncp);
const rimraf = promisify(require("rimraf"));
const tar = promisify(require("tar").x);

// Set copy concurrency limit
ncp.limit = 16;

main(process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

async function main(argv) {
  const args = minimist(argv);

  const filePath = path.resolve(args.files);
  const outPath = path.resolve(args.out_dir);
  
  console.log("Preparing next build...");
  const copiedSrcPath = path.join(outPath, "src");
  if (!fs.existsSync(copiedSrcPath)) {
    fs.mkdirSync(copiedSrcPath);
  }
  await tar({
    file: filePath,
    C: copiedSrcPath,
  });

  console.log("Starting next build...");
  await nextBuild(copiedSrcPath);

  console.log("Cleaning up next build...");
  const distPath = path.join(copiedSrcPath, ".next");
  await ncp(distPath, outPath);
  await rimraf(copiedSrcPath);
}
