import {BasePage} from "./base.page";
import {Page} from "@playwright/test";
import {Locator} from "playwright";

export class LaunchesPage extends BasePage {
    private launchesDropDownButton = this.page.locator('xpath=//div[contains(@class, "allLatestDropdown__icon--ZcM8q")]');
    private latestLaunchesButton = this.page.locator('xpath=//div[contains(text(),"Latest launches")]');
    private allLaunchesButton = this.page.locator('xpath=(//div[contains(text(),"All launches")])[2]');
    private launchContainer = this.page.locator('xpath=//div[@class="gridRow__grid-row-wrapper--xj8DG"]');

    constructor(page: Page) {
        super(page);
    }

    async selectLaunches(launchType: LaunchType) {
        await this.launchesDropDownButton.click();

        switch (launchType) {
            case LaunchType.AllLaunches:
                await this.allLaunchesButton.click();
                break;
            case LaunchType.LatestLaunches:
                await this.latestLaunchesButton.click();
                break;
        }
    }

    async getDisplayedLaunches() {
        await this.launchContainer.waitFor({state: 'visible'});
        const count = await this.launchContainer.count();
        const elementList: Locator[] = [];

        for (let i = 0; i < count; i++) {
            const element = this.launchContainer.nth(i);
            await element.waitFor({state: 'visible'});
            elementList.push(element);
        }

        return elementList;
    }
}

export enum LaunchType {
    AllLaunches = 'AllLaunches',
    LatestLaunches = 'LatestLaunches',
}