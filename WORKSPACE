workspace(
    name = "bazel_frontend_examples",
    managed_directories = {"@npm": ["node_modules"]},
)

# https://bazelbuild.github.io/rules_nodejs/install.html
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "0f2de53628e848c1691e5729b515022f5a77369c76a09fbe55611e12731c90e3",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/2.0.1/rules_nodejs-2.0.1.tar.gz"],
)
load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories", "yarn_install")
node_repositories(
    package_json = ["//:package.json"],
    node_version = "12.13.0",
    yarn_version = "1.19.1",
)
yarn_install(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)
