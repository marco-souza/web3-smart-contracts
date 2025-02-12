async function main() {
  await Bun.build({
    entrypoints: ["./index.ts"],
    outdir: "./dist",
  });

  return Bun.serve({
    port: 6969,
    static: {
      // serve a file by buffering it in memory
      "/": new Response(await Bun.file("./index.html").bytes(), {
        headers: {
          "Content-Type": "text/html",
        },
      }),

      "/dist/index.js": new Response(
        await Bun.file("./dist/index.js").bytes(),
        {
          headers: {
            "Content-Type": "text/html",
          },
        }
      ),

      // serve JSON
      "/version.json": Response.json({ version: "1.0.0" }),
    },

    fetch(req) {
      return new Response("404!");
    },
  });
}

main()
  .then((s) =>
    console.log(`Server started!
    http://${s.hostname}:${s.port}`)
  )
  .catch(console.error);
