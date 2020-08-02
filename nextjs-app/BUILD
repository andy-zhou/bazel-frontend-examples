package_group(
  name = "next", 
  packages = [
    "//nextjs-app",
    "//nextjs-app/src"
  ], 
)

load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary", "npm_package_bin")

nodejs_binary(
    name = "next_build",
    data = [
        "@npm//minimist",
        "@npm//next",
        "@npm//ncp",
        "@npm//rimraf",
        "@npm//tar"
    ],
    entry_point = ":next-build.js",
)

npm_package_bin(
    name = "app",
    args = [
        "--out_dir=$(@D)",
        "--files=$(execpaths //nextjs-app/src:files)"
    ],
    data = [
        "//nextjs-app/src:files",
    ],
    output_dir = True,
    tool = ":next_build",
)
