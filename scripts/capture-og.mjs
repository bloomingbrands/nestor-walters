import puppeteer from "puppeteer";
import http from "http";
import path from "path";
import fs from "fs";

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const OUTPUT_DIR = path.join(process.cwd(), "public", "assets", "og");

const ROUTES = [
  { path: "/", filename: "og-home.png", waitFor: "#top, #speaking, section" },
  { path: "/blog", filename: "og-blog.png", waitFor: "h1" },
  { path: "/books", filename: "og-books.png", waitFor: "h1" },
];

function waitForServer(url, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      http.get(url, (res) => {
        if (res.statusCode === 200) { resolve(); } else { retry(); }
      }).on("error", retry);
    };
    const retry = () => {
      if (Date.now() - start > timeout) { reject(new Error("Server not ready")); return; }
      setTimeout(check, 500);
    };
    retry();
  });
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  await waitForServer(BASE_URL, 30000);
  console.log(`Server ready at ${BASE_URL}`);

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
    await page.waitForSelector(route.waitFor, { timeout: 10000 });
    await new Promise((r) => setTimeout(r, 2000));
    const outPath = path.join(OUTPUT_DIR, route.filename);
    await page.screenshot({ path: outPath, type: "png" });
    console.log(`  Saved → ${outPath}`);
  }

  await browser.close();
  console.log("Done. OG images in", OUTPUT_DIR);
}

main().catch((err) => { console.error(err); process.exit(1); });
