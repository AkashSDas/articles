import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import renderApp from "./dist/server/ServerApp.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT ?? 8000;

const html = fs
    .readFileSync(path.resolve(__dirname, "./dist/client/index.html"), "utf-8")
    .toString();

const parts = html.split("<!--ssr-outlet-->");

const app = express();

// This will serve all of the static assets like imgs, JS, css
app.use(
    "/assets",
    express.static(path.resolve(__dirname, "./dist/client/assets"))
);

// Other things that aren't served by static assets will be served by React
app.use(function (req, res) {
    // 1. return the header
    res.write(parts[0]);

    const stream = renderApp(req.url, {
        onShellReady: () => {
            // 2. return the body
            // if it's the crawler, do noting (streaming makes it look slow to the SEO)
            stream.pipe(res);
        },
        onShellError: (err: unknown) => {
            // log error to logging service
            console.error(err);
        },
        onAllReady: () => {
            // if it's the crawler then dump everything to the client
            // stream.pipe(res)

            // sending the last part to the client
            // and closing the request
            res.write(parts[1]);
            res.end();
        },
        onAllError: (err: unknown) => {
            console.error(err);
        },
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
