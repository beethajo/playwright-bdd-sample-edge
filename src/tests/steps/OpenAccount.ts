// TodoPage.ts
import { Locator, Page, expect } from "@playwright/test";
import { Fixture, Given, When, Then } from "playwright-bdd/decorators";

export
@Fixture("openAccountPage")
class OpenAccountPage {
  x: string = "";
  constructor(public page: Page) {
    this.page = page;
  }

  @Given("I am on bank parasoft home page")
  async open() {
    await this.page.goto("https://parabank.parasoft.com/parabank/index.htm");
  }

  @When("I click on link {string}")
  async clickOnLink(link: string) {
    try {
      await this.page.getByRole("link", { name: link, exact: true }).click();
    } catch (error) {
      await this.page
        .getByRole("banner")
        .getByRole("link", { name: link })
        .click();
    }
  }

  @When("I click on header link {string}")
  async clickHeaderOnLink(link: string) {
    await this.page
      .locator(".pageHeaderEyebrowContact.cta")
      .filter({ hasText: "Contact us" })
      .click();
  }

  @When("I click on first link {string}")
  async clickOnNthLink(link: string) {
    try {
      await this.page.getByRole("link", { name: link }).nth(0).click();
    } catch (error) {
      await this.page
        .getByRole("banner")
        .getByRole("link", { name: link })
        .nth(0)
        .click();
    }
  }

  @Then("I select account type {string}")
  async selectAccountType(accountType: string) {
    //Open New Accountawait this.page.getByRo('button', {name: 'OPEN NEW ACCOUNT'}).click();
    await this.page.locator("#type").selectOption(accountType);
  }

  @Then("I eneter user name {string}")
  async enterUsername(usename: string) {
    await this.page
      .locator('input[name="username"]')
      .pressSequentially(usename, { delay: 1 });
  }

  @Then("I eneter password {string}")
  async enterPassword(password: string) {
    await this.page.locator('input[name="password"]').fill(password);
  }

  @Then("I should see text {string}")
  async shoudSeeText(text: string) {
    try {
      await expect(
        this.page.locator("//*[contains(text(),'" + text + "')]"),
      ).toContainText(text);
    } catch (error) {
      await expect(this.page.getByText(text, { exact: true })).toHaveText(text);
    }
  }
}
