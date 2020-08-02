load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary", "npm_package_bin")

nodejs_binary(
    name = "next_build",
    data = [
        "@npm//minimist",
        "@npm//next",
        "@npm//ncp",
        "@npm//rimraf",
    ],
    entry_point = ":next-build.js",
)

npm_package_bin(
    name = "nextjs_app",
    args = [
        "--src_dir",
        "$(location :src)",
        "--out_dir",
        "$(@D)",
    ],
    data = ["src/."],
    output_dir = True,
    tool = ":next_build",
)
