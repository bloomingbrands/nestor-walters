import puppeteer from "puppeteer";
import { spawn, execSync } from "child_process";
import path from "path";
import fs from "fs";
import http from "http";

const PORT = 3456;
const BASE_URL = `http://localhost:${PORT}`;
const OUTPUT_DIR = path.join(process.cwd(), "public", "assets", "og");

const ROUTES = [
  { path: "/", filename: "og-home.png", waitFor: "#top, #speaking, section" },
  { path: "/blog", filename: "og-blog.png", waitFor: "h1" },
  { path: "/books", filename: "og-books.png", waitFor: "h1" },
];

function waitForServer(url, timeout = 60000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      http
        .get(url, (res) => {
          if (res.statusCode === 200) {
            resolve();
          } else {
            retry();
          }
        })
        .on("error", retry);
    };
    const retry = () => {
      if (Date.now() - start > timeout) {
        reject(new Error(`Server did not start within ${timeout}ms`));
        return;
      }
      setTimeout(check, 500);
    };
    retry();
  });
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log("Starting Next.js dev server...");
  const server = spawn("npx", ["next", "dev", "-p", String(PORT)], {
    stdio: "pipe",
    shell: true,
    env: { ...process.env, NODE_OPTIONS: "--no-deprecation" },
  });

  // Silence server output unless there's an error
  server.stdout.on("data", () => {});
  server.stderr.on("data", (data) => {
    const text = data.toString();
    if (text.includes("error") || text.includes("Failed")) {
      console.error("[server]", text.trim());
    }
  });

  try {
    await waitForServer(BASE_URL, 120000);
    console.log(`Server ready at ${BASE_URL}`);
  } catch (err) {
    server.kill();
    throw err;
  }

  console.log("Launching Puppeteer...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route.path}`;
    console.log(`Capturing ${url} → ${route.filename}`);

    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: "networkidle0" });

    // Wait for fonts and animations to settle
    await page.waitForSelector(route.waitFor, { timeout: 10000 });
    await new Promise((r) => setTimeout(r, 2000));

    const outPath = path.join(OUTPUT_DIR, route.filename);
    await page.screenshot({ path: outPath, type: "png" });
    console.log(`  Saved → ${outPath}`);
  }

  await browser.close();
  server.kill();
  console.log("Done. OG images generated in", OUTPUT_DIR);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
