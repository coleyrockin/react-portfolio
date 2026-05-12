import { chromium } from "@playwright/test";
import { mkdir, rm, writeFile } from "node:fs/promises";
import http from "node:http";
import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";

const cwd = process.cwd();
const reportDir = path.join(cwd, "reports", "visual-smoke");
const screenshotDir = path.join(reportDir, "screenshots");
const host = "127.0.0.1";
const port = 4173;
const baseUrl = `http://${host}:${port}/react-portfolio/`;
const routes = [
  { hash: "#about", heading: "Boyd Roberts." },
  { hash: "#portfolio", heading: "Selected Work" },
  { hash: "#knowledge", heading: "Engineering Knowledge" },
  { hash: "#contact", heading: "Contact" },
];
const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 1000 },
];

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
        response.resume();
        if (response.statusCode && response.statusCode < 500) {
          resolve();
        } else {
          retry();
        }
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

async function settleRevealStates(page) {
  await page.evaluate(async () => {
    await document.fonts?.ready;

    const pause = (duration) => new Promise((resolve) => setTimeout(resolve, duration));
    const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));
    const revealItems = [...document.querySelectorAll(".reveal")];

    for (const item of revealItems) {
      item.scrollIntoView({ block: "center", inline: "nearest" });
      await nextFrame();
      await pause(90);
    }

    const root = document.documentElement;
    const maxY = Math.max(0, root.scrollHeight - window.innerHeight);
    const stepSize = Math.max(1, Math.floor(window.innerHeight * 0.7));
    const steps = Math.max(1, Math.ceil(maxY / stepSize));

    for (let index = 0; index <= steps; index += 1) {
      window.scrollTo(0, Math.round((maxY * index) / steps));
      await nextFrame();
      await pause(80);
    }

    window.scrollTo(0, 0);
    await nextFrame();
    await pause(160);
  });
}

async function inspectPage(page, route, viewport) {
  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.goto(`${baseUrl}${route.hash}`, { waitUntil: "networkidle" });
  await settleRevealStates(page);

  const checks = await page.evaluate((expectedHeading) => {
    const root = document.documentElement;
    const mainHeading = document.querySelector("main h2")?.textContent?.trim() || "";
    const imagesMissingAlt = [...document.images]
      .filter((image) => !image.hasAttribute("alt"))
      .map((image) => image.currentSrc || image.src);

    return {
      title: document.title,
      heading: mainHeading,
      headingMatches: mainHeading === expectedHeading,
      horizontalOverflow: root.scrollWidth > window.innerWidth,
      scrollWidth: root.scrollWidth,
      viewportWidth: window.innerWidth,
      missingAltCount: imagesMissingAlt.length,
      imagesMissingAlt,
      unresolvedCspPlaceholder: root.innerHTML.includes("__CONTENT_SECURITY_POLICY__"),
    };
  }, route.heading);

  const screenshotName = `${viewport.name}-${route.hash.replace("#", "")}.png`;
  await page.screenshot({
    path: path.join(screenshotDir, screenshotName),
    fullPage: true,
  });

  return {
    route: route.hash,
    viewport: `${viewport.width}x${viewport.height}`,
    screenshot: `screenshots/${screenshotName}`,
    consoleErrors,
    pageErrors,
    ...checks,
  };
}

function scenarioFailed(result) {
  return (
    !result.headingMatches ||
    result.horizontalOverflow ||
    result.missingAltCount > 0 ||
    result.unresolvedCspPlaceholder ||
    result.consoleErrors.length > 0 ||
    result.pageErrors.length > 0
  );
}

async function main() {
  await rm(reportDir, { recursive: true, force: true });
  await mkdir(screenshotDir, { recursive: true });

  await run("npm", ["run", "build"]);

  const preview = spawn(
    "npx",
    ["vite", "preview", "--host", host, "--port", String(port), "--strictPort"],
    {
      cwd,
      stdio: ["ignore", "pipe", "pipe"],
      shell: process.platform === "win32",
    }
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
    const results = [];

    try {
      for (const viewport of viewports) {
        for (const route of routes) {
          const page = await browser.newPage();
          try {
            results.push(await inspectPage(page, route, viewport));
          } finally {
            await page.close();
          }
        }
      }
    } finally {
      await browser.close();
    }

    const failed = results.filter(scenarioFailed);
    const summary = {
      generatedAt: new Date().toISOString(),
      baseUrl,
      failedCount: failed.length,
      results,
    };

    await writeFile(
      path.join(reportDir, "summary.json"),
      `${JSON.stringify(summary, null, 2)}\n`
    );

    if (failed.length > 0) {
      console.error(`Visual smoke failed for ${failed.length} scenario(s).`);
      console.error(`See ${path.relative(cwd, path.join(reportDir, "summary.json"))}`);
      process.exitCode = 1;
    } else {
      console.log(`Visual smoke passed. See ${path.relative(cwd, reportDir)}`);
    }
  } finally {
    preview.kill("SIGTERM");
    if (previewOutput.trim()) {
      await writeFile(path.join(reportDir, "preview.log"), previewOutput);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
