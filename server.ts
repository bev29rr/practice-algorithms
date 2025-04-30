import { serveDir } from "https://deno.land/std@0.211.0/http/file_server.ts";

Deno.serve((req) => {
  return serveDir(req, {
    fsRoot: "./web",
    urlRoot: "",
    showDirListing: true,
  });
});