import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import autoprefixer from "autoprefixer";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

export default [
  {
    input: "src/index.tsx",
    output: [
      {
        file: "dist/index.umd.cjs",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/index.js",
        format: "es",
        exports: "named",
        sourcemap: true,
      },
    ],
    plugins: [
      external(),
      nodeResolve({
        extensions: [".ts", ".tsx"],
      }),
      postcss({
        use: [
          [
            "sass",
            {
              includePaths: ["./src/"],
            },
          ],
        ],
        minimize: true,
        plugins: [autoprefixer()],
      }),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        presets: [["@babel/preset-react", { runtime: "automatic" }]],
        extensions: [".ts", ".tsx"],
      }),
      commonjs(),
      replace({
        preventAssignment: false,
        "process.env.NODE_ENV": '"development"',
      }),
      typescript(),
      terser(),
    ],
    external: ["react", "react-dom"], // Mark these as external explicitly
  },
];
