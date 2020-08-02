package(
  default_visibility = [
    "//nextjs-app:next"
  ]
)

load("@rules_pkg//:pkg.bzl", "pkg_tar")

filegroup(
    name = "pages",
    srcs = glob(["pages/*.js"])
)

filegroup(
    name = "configs",
    srcs = [
        "next.config.js"
    ],
)

pkg_tar(
    name = "files",
    strip_prefix = ".",
    srcs = [
      ":pages",
      ":configs"
    ]
)
