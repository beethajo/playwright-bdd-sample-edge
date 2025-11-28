import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig, cucumberReporter } from "playwright-bdd";

const testDir = defineBddConfig({
  features: "src/tests/features/**/*.feature",
  steps: [
    "src/tests/steps/**/*.ts",
    "src/fixtures/fixtures.ts"   // <-- Add this
  ],
});

export default defineConfig({
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  //workers: process.env.CI ? 1 : 2,
  timeout: 60000,

  expect: {
    timeout: 10_000, // Default timeout for all `expect` assertions
  },

  testDir,

  reporter: [
    cucumberReporter("html", {
      outputFile: "cucumber-report/index.html",
      externalAttachments: true,
    }),
    ["html", { open: "never" }],
  ],

  use: {
    actionTimeout: 15_0000,
    navigationTimeout: 30_0000,
    baseURL: "https://www.lrqa.com/en-gb/",
    screenshot: "on",
    trace: "on",
    video: "on",
    testIdAttribute: "data-qa",
    // Required for start-maximized
  },

  

  metadata: {
    bdd: {
      steps: [".src/tests/steps/**/*.ts", "./src/fixtures/fixtures.ts"],
    },
  },
});
