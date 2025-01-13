import {Page} from 'playwright';
import {logger} from "../../configs";

export class Sidebar {
    private readonly page: Page;
    private launchesButton;

    constructor(page: Page) {
        this.page = page;
        this.launchesButton = this.page.locator('xpath=//a[contains(@href, "launches")]');
    }

    async openLaunchesPage() {
        await this.launchesButton.click();
        logger.info('open Launches page');
    }

}