#!/usr/bin/env node

/**
 * A minimal wrapper around the "next build" API which accepts arguments --src_dir and --out_dir
 */

const path = require("path");
const minimist = require("minimist");
const nextBuild = require("next/dist/build").default;
const fs = require("fs");
const promisify = require("util").promisify;
const ncp = promisify(require("ncp").ncp);
const rimraf = promisify(require("rimraf"));

// Set copy concurrency limit
ncp.limit = 16;

main(process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

async function main(argv) {
  const args = minimist(argv);

  const srcPath = path.resolve(args.src_dir);
  const outPath = path.resolve(args.out_dir);
  const copiedSrcPath = path.join(outPath, "src");
  if (!fs.existsSync(copiedSrcPath)) {
    fs.mkdirSync(copiedSrcPath);
  }

  console.log('Preparing next build...')
  await ncp(srcPath, copiedSrcPath);

  console.log("Starting next build...")
  await nextBuild(outPath);

  console.log('Cleaning up next build...')
  await rimraf(copiedSrcPath)
}
