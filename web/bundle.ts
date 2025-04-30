import * as esbuild from "https://deno.land/x/esbuild@v0.20.1/mod.js";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader";

await esbuild.build({
  plugins: [...denoPlugins()],
  entryPoints: ["web/main.ts"],
  outdir: "web/dist",           
  bundle: true,
  platform: "browser",
  format: "esm",
  target: "esnext",
  minify: true,
  sourcemap: true,
  treeShaking: true,
});

esbuild.stop();