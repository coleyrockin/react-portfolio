// Regenerates docs/screenshot.png — the home preview referenced by README.md —
// from a fresh production build, so the README always shows the current UI.
//
// Usage: npm run screenshot:readme   (optionally READMESHOT_PORT=4178)
//
// Mirrors the build -> vite preview -> Playwright flow used by visual-smoke.mjs,
// but captures a single deterministic 1240x800 hero shot at deviceScaleFactor 1
// (matching the existing asset dimensions) instead of the full breakpoint matrix.

import { chromium } from "@playwright/test";
import http from "node:http";
import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";

const cwd = process.cwd();
const outFile = path.join(cwd, "docs", "screenshot.png");
const host = "127.0.0.1";
const requestedPort = Number(process.env.READMESHOT_PORT);
const port = Number.isInteger(requestedPort) && requestedPort > 0 ? requestedPort : 4173;
const baseUrl = `http://${host}:${port}/react-portfolio/`;
const width = 1240;
const height = 800;

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: "inherit",
      shell: process.platform === "win32",
      ...options,
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
      }
    });
  });
}

function waitForUrl(url, timeoutMs = 15000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = () => {
      const request = http.get(url, (response) => {
        let body = "";
        const contentType = response.headers["content-type"] || "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          if (
            response.statusCode &&
            response.statusCode >= 200 &&
            response.statusCode < 300 &&
            contentType.includes("text/html") &&
            body.includes('id="root"') &&
            !body.includes("__CONTENT_SECURITY_POLICY__")
          ) {
            resolve();
          } else {
            retry();
          }
        });
      });
      request.on("error", retry);
      request.setTimeout(1000, () => {
        request.destroy();
        retry();
      });
    };
    const retry = () => {
      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Timed out waiting for ${url}`));
      } else {
        setTimeout(attempt, 250);
      }
    };
    attempt();
  });
}

async function launchBrowser() {
  try {
    return await chromium.launch({ channel: "chrome" });
  } catch {
    return chromium.launch();
  }
}

async function settleHero(page) {
  await page.evaluate(async () => {
    await document.fonts?.ready;
    const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));
    const pause = (duration) => new Promise((resolve) => setTimeout(resolve, duration));
    // Trigger any in-viewport reveal animations, then settle at the top.
    for (const item of document.querySelectorAll(".reveal")) {
      item.scrollIntoView({ block: "center", inline: "nearest" });
      await nextFrame();
      await pause(20);
    }
    window.scrollTo(0, 0);
    await nextFrame();
    await pause(600);
  });
}

async function main() {
  await run("npm", ["run", "build"]);

  const preview = spawn(
    "npx",
    ["vite", "preview", "--host", host, "--port", String(port), "--strictPort"],
    { cwd, stdio: ["ignore", "pipe", "pipe"], shell: process.platform === "win32" }
  );

  let previewOutput = "";
  preview.stdout.on("data", (chunk) => {
    previewOutput += chunk.toString();
  });
  preview.stderr.on("data", (chunk) => {
    previewOutput += chunk.toString();
  });

  try {
    const previewExit = new Promise((_, reject) => {
      preview.once("exit", (code) => {
        reject(new Error(`vite preview exited before startup with code ${code}\n${previewOutput}`));
      });
    });
    await Promise.race([waitForUrl(baseUrl), previewExit]);

    const browser = await launchBrowser();
    try {
      const context = await browser.newContext({
        viewport: { width, height },
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();
      await page.goto(`${baseUrl}#about`, { waitUntil: "networkidle" });
      await settleHero(page);
      await page.screenshot({ path: outFile, clip: { x: 0, y: 0, width, height } });
      console.log(`Wrote ${path.relative(cwd, outFile)} (${width}x${height}).`);
    } finally {
      await browser.close();
    }
  } finally {
    preview.kill("SIGTERM");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
