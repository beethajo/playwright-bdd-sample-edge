import { chromium } from "@playwright/test";
import { createBdd, test as base,  } from "playwright-bdd";
import { createLogger, format, transports } from "winston";
import { OpenAccountPage } from "../tests/steps/OpenAccount";
import { AutomationPracticePage } from "../tests/steps/AutomationPracticePage";
import { AdminConsolePage } from "../tests/steps/AdminConsolePage";
import { AssetsPage } from "../tests/steps/AssetsPage";

// ------------------------------------------------------
// LOGGER
// ------------------------------------------------------
export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/test.log" })
  ]
});

// ------------------------------------------------------
// CUSTOM FIXTURES
// ------------------------------------------------------
export const test = base.extend<{
  browser: any;
  context: any;
  page: any;
  openAccountPage: OpenAccountPage;
  automationPracticePage: AutomationPracticePage;
  adminConsolePage: AdminConsolePage;
  assetsPage: AssetsPage;
}>({
  // 1️⃣ Custom Browser
  browser: async ({}, use) => {
    const browser = await chromium.launch({
      headless: false,
      channel: "msedge",
      args: [
        "--disable-gpu",
        "--disable-software-rasterizer",
        "--disable-extensions",
        "--disable-features=msEdgePWAMode",
        "--disable-background-mode",
        "--no-sandbox",
        "--test-type"
      ]
    });

    await use(browser);
    await browser.close();
  },

  // 2️⃣ Custom Context
  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },

  // 3️⃣ Custom Page (available everywhere)
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },

  // 4️⃣ Page Objects
  openAccountPage: async ({ page }, use) => use(new OpenAccountPage(page)),
  automationPracticePage: async ({ page }, use) => use(new AutomationPracticePage(page)),
  adminConsolePage: async ({ page }, use) => use(new AdminConsolePage(page)),
  assetsPage: async ({ page }, use) => use(new AssetsPage(page))
});

// ------------------------------------------------------
// BDD
// ------------------------------------------------------
export const { Given, When, Then, Before, After, BeforeAll, AfterAll } =
  createBdd(test);

export { expect } from "@playwright/test";
