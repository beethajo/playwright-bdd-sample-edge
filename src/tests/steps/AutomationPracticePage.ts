// TodoPage.ts
import { Locator, Page, expect } from "@playwright/test";
import { Fixture, Given, When, Then } from "playwright-bdd/decorators";
import { Locators } from "../../helper/Locators";
export const randomEmail = () => {
  return Math.random().toString().substr(2) + "@email.com";
};

export
@Fixture("automationPracticePage")
class AutomationPracticePage {
  constructor(public page: Page) {
    this.page = page;
  }

  @Given("I wait for {string} seconds")
  async waitFor(time: number) {
    await this.page.waitForTimeout(time * 1000);
  }

  @When("I click on button {string}")
  async clickOnButton(button: string) {
    await this.page.getByRole("button", { name: button, exact: true }).click();
  }
  @When("I click on finder button {string}")
  async clickOnFinderButton(button: string) {
    await this.page
      .locator('[id="Office\\+finder\\+search"]')
      .getByRole("button", { name: button })
      .click();
  }

  @When("I click on learning finder button {string}")
  async clickOnLearningFinderButton(button: string) {
    try {
      await this.page
        .locator("#content")
        .getByRole("button", { name: "Search" })
        .click();
    } catch (error) {
      await this.page.locator(".searchFormSubmit").first().click();
    }
  }

  @When("I switch tab")
  async switchTab() {
    const promisePage = this.page.context().waitForEvent("page");
    this.page = await promisePage;
  }

  @Given("I am on automation practice page")
  async open() {
    await this.page.goto("http://automationexercise.com");
  }

  @Given("I navigate to lrqa website")
  async openLRQAPage() {
    await this.page.goto("https://www.lrqa.com/en-gb/");
  }

  @Given("I navigate to eiq website")
  async openEIQPage() {
    await this.page.goto("https://www.eiq.com");
  }

  @Given("I should be on page {string}")
  async verifyUrl(url: string) {
    expect(this.page.url()).toContain(url);
  }

  @Given("I should see the url contains {string}")
  async verifyUrlCOntans(url: string) {
    await this.waitFor(1);
    expect(this.page.url()).toContain(url);
  }

  @Given('I scroll down to element "YouTube video player"')
  async scrollToElement(text: string) {
    await this.page
      .locator("iframe[title='YouTube video player']")
      .scrollIntoViewIfNeeded();
  }

  @Given("I scroll down to element contains text {string}")
  async scrollToElementText(text: string) {
    await this.page.getByText(text).scrollIntoViewIfNeeded();
  }

  @Given("I scroll down to footer element contains text {string}")
  async scrollToFooterElement(text: string) {
    await this.page.locator(Locators.footerLink(text)).scrollIntoViewIfNeeded();
  }

  @Given("I click on footer link contains text {string}")
  async clickOnFooterElement(text: string) {
    await this.page.locator(Locators.footerLink(text)).click();
  }
  @Given("I click on page header search button")
  async clickOnHeaderButton(text: string) {
    await this.page.locator(Locators.headerSearchButton()).click();
  }

  @Given("I should see YouTube video player is visible")
  async seeVideoPlayerIsVisible(text: string) {
    expect(
      await this.page
        .locator('iframe[title="YouTube video player"]')
        .isVisible(),
    ).toBeTruthy();
  }

  @When("I enter {string} for input name {string}")
  async enterTextForInputName(text: string, input: string) {
    await this.page.locator("//input[@name='" + input + "']").fill(text);
  }

  @When("I click on search results text {string}")
  async clickOnText(text: string) {
    await this.page.locator("summary").filter({ hasText: text }).click();
  }

  @When("I click on view map for location {string}")
  async clickOnViewMap(location: string) {
    await this.page
      .locator("//p[text()='" + location + "']/../a/span[text()='View Map']")
      .click();
  }

  @Given("I verify the video is playing")
  async verifyVideoIsPlaying(text: string) {
    //let videoFrame = this.page.locator('iframe[title="YouTube video player"]').contentFrame();
    let videoFrame = await this.page
      .locator(
        'iframe[title="The era of Assurance 4\\.0\\: Assuring assets and management systems"]',
      )
      .contentFrame();

    await videoFrame.getByLabel("Play", { exact: true }).click();
    await this.page.waitForTimeout(2000);
    //  Verify the video is playing
    const timeBefore = await videoFrame
      .locator(".ytp-time-current")
      .innerText();
    //console.log('timeBefore  : ' + timeBefore)
    await this.page.waitForTimeout(3000); // Wait 3 seconds
    const timeAfter = await videoFrame.locator(".ytp-time-current").innerText();
    //console.log('timeAfter  : ' + timeAfter)
    expect(timeBefore).not.toBe(timeAfter); // Time should increase

    await videoFrame.getByLabel("Pause keyboard shortcut k").click();
    await this.page.waitForTimeout(2000);

    // Capture time after pausing
    const timePaused = await videoFrame
      .locator(".ytp-time-current")
      .innerText();
    //console.log('timePaused  : ' + timePaused)
    await this.page.waitForTimeout(3000);
    const timeAfterPause = await videoFrame
      .locator(".ytp-time-current")
      .innerText();
    //console.log('timeAfterPause  : ' + timeAfterPause)
    // Verify the video is paused (time should not change)
    expect(timePaused).toBe(timeAfterPause);
  }

  @Then("I verify home page is visible successfully")
  async verifyHomePageVisible() {
    expect(
      await this.page
        .getByAltText("Website for automation practice")
        .isVisible(),
    ).toBe(true);
  }

  @When("I enter name {string} and email address {string}")
  async enterEmailAndPassword(name: string, email: string){
    await this.page
      .getByTestId("signup-name")
      .pressSequentially(name, { delay: 1 });
    await this.page
      .getByTestId("signup-email")
      .pressSequentially(randomEmail(), { delay: 1 });
  }

  @When("I select title as {string}")
  async selectTitleRadio(tiltle: string) {
    await this.page.getByLabel(tiltle).check();
  }

  @When("I enter {string} in name field")
  async enternameField(name: string) {
    await this.page.getByTestId("name").pressSequentially(name, { delay: 1 });
  }

  @When("I enter {string} search input")
  async enterInputSearch(text: string) {
    try {
      await this.page.locator("#q").fill(text);
    } catch (error) {
      await this.page.locator("#q").nth(1).fill(text);
    }
  }

  @When("I enter {string} search input and press enter key")
  async enterInputSearchPressEnter(text: string) {
    try {
      await this.page.locator("#q").fill(text);
      await this.page.locator("#q").press("Enter");
    } catch (error) {
      await this.page.locator("#q").nth(1).fill(text);
      await this.page.locator("#q").press("Enter");
    }
  }

  @When("I enter email field {string}")
  async enterEmailField(email: string) {
    await this.page.getByTestId("email").pressSequentially(email, { delay: 1 });
  }
  @When("I enter password field {string}")
  async enterPasswordField(password: string) {
    await this.page
      .getByTestId("password")
      .pressSequentially(password, { delay: 1 });
  }

  @When("I enter otp for mobile number {string}")
  async enterOTP(otp: string) {
    let position: number;
    for (let i = 1; i <= otp.length; i++) {
      await this.page
        .locator("//div[@class='MuiBox-root css-1brzdu3']/input[" + i + "]")
        .fill(`Index: ${i}, Character: ${otp[i]}`);
    }
  }

  @When("I select day {string} of date of birth")
  async selectDayOfDOB(day: string) {
    await this.page.locator("#days").selectOption(day);
  }
  @When("I select month {string} of date of birth")
  async selectMonthOfDOB(months: string) {
    await this.page.locator("#months").selectOption(months);
  }
  @When("I select year {string} of date of birth")
  async selectYearOfDOB(year: string) {
    await this.page.locator("#years").selectOption(year);
  }

  @When("I click on {string} check box")
  async clickOnCheckBox(checkBoxName: string) {
    await this.page.getByLabel(checkBoxName).check();
  }

  @When("I enter first name as {string}")
  async enterFirstName(firstName: string) {
    await this.page
      .getByTestId("first_name")
      .pressSequentially(firstName, { delay: 1 });
  }

  @When("I enter last name as {string}")
  async enterLastName(lastName: string) {
    await this.page
      .getByTestId("last_name")
      .pressSequentially(lastName, { delay: 1 });
  }

  @When("I enter company name as {string}")
  async enterCompany(company: string) {
    await this.page
      .getByTestId("company")
      .pressSequentially(company, { delay: 1 });
  }
  @When("I enter address1 as {string}")
  async enterAddress1(address1: string) {
    await this.page
      .getByTestId("address")
      .pressSequentially(address1, { delay: 1 });
  }
  @When("I enter address2 as {string}")
  async enterAddress2(address2: string) {
    await this.page
      .getByTestId("address2")
      .pressSequentially(address2, { delay: 1 });
  }
  @When("I select country name as {string}")
  async selectCountry(country: string) {
    await this.page.getByTestId("country").selectOption(country);
  }
  @When("I enter state as {string}")
  async enterState(state: string) {
    await this.page.getByTestId("state").pressSequentially(state, { delay: 1 });
  }

  @When("I enter city as {string}")
  async enterCity(city: string) {
    await this.page.getByTestId("city").pressSequentially(city, { delay: 1 });
  }

  @When("I enter zip code as {string}")
  async enterZipcode(zipcode: string) {
    await this.page
      .getByTestId("zipcode")
      .pressSequentially(zipcode, { delay: 1 });
  }
  @When("I enter mobile number as {string}")
  async enterMobileNumber(mobile: string) {
    await this.page
      .getByTestId("mobile_number")
      .pressSequentially(mobile, { delay: 1 });
  }
}
