// TodoPage.ts
import { Locator, Page, chromium, expect } from "@playwright/test";
import { Fixture, Given, When, Then } from "playwright-bdd/decorators";
import { Assets } from "../../enums";

export @Fixture("assetsPage")
class AssetsPage {
    constructor(public page: Page) {
        this.page = page;
    }


    @Given("I wait for {string} seconds")
    async waitFor(time: number) {
        await this.page.waitForTimeout(time * 1000);
    }

    @When("user enters {string} credentials and logs in to {string} the Application")
    async userEntersCredentialsAndLoginToApplication(userId: string, application: string) {
       
        await this.page.goto('https://mingle-portal.inforcloudsuite.com/MONTEFIORE_TST');
        await this.page.click(Assets.sign_in)
        await this.page.waitForTimeout(10000)
        
    }



}