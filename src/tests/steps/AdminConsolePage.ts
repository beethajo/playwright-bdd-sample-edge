// TodoPage.ts
import { Locator, Page, expect } from "@playwright/test";
import { Fixture, Given, When, Then } from "playwright-bdd/decorators";

export
@Fixture("adminConsolePage")
class AdminConsolePage {
  constructor(public page: Page) {
    this.page = page;
  }

  @Given("I navigeto login page")
  async open() {
    await this.page.goto("/");
    
  }
}
