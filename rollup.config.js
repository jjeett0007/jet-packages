import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";

const packageJson = require("./package.json");

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true
            }
        ],
        plugins: [
            peerDepsExternal(),
            typescript({tsconfig: "./tsconfig.json"}),
            commonjs(),
            resolve(),
            terser(),
            postcss()
        ],
        external: ["react", "react-dom"]
    },
    {
        input: "src/index.ts",
        output: [{file: packageJson.types}],
        plugins: [dts.default()],
        external: [/\.css/]
    }
]