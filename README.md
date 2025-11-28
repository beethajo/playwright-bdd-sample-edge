# playwright-bdd-sample

# README

Playwright (TS binding) + Playwright-bdd (BDD)

Playwright-BDD combines Playwright (for automation) with Cucumber/Gherkin (for behavior-driven development — BDD). This setup allows you to write human-readable test scenarios.TypeScript is a powerful superset of JavaScript that adds optional static typing, making it easier to catch errors before runtime. By combining these two tools, we can create more reliable and maintainable tests.

### What is this repository for?

-   Features
-   Awesome report with screenshots, videos & logs
-   Execute tests on multiple environment
-   Parallel execution
-   Rerun only failed features
-   Retry failed tests on CI
-   Github Actions integrated with downloadable report
-   Page object model

## How to report a bug

1. [Fork](https://github.com/vitalets/playwright-bdd-example/fork) the repo!
2. Clone it to your local machine

   ```
   git clone https://github.com/<%your github username%>/playwright-bdd-sample.git
   ```

3. Change directory to `playwright-bdd-sample`

   ```
   cd playwright-bdd-sample
   ```

4. Install dependencies

   ```
   npm install
   ```

5. Install browsers

   ```
   npx playwright install
   ```

6. Run tests

   ```
   npx bddgen && npx playwright test --grep @demo
   ```

   Output:

   ```
   Running 1 tests using 1 worker
   1 passed (10.3s)
   ```

7. Make changes reproducing a bug

8. Commit and push changes
   ```
   git add .
   git commit -m'repro for playwright-bdd issue xxx'
   git push
   ```
9. [Open a pull-request](https://github.com/vitalets/playwright-bdd-sample/pulls) and share the link
