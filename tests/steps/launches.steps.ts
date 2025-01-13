import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage, LaunchesPage, LaunchType } from '../../src/pages';

Given('I am logged in as a test user', async function () {
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.openHomePage();
    await this.loginPage.loginWithTestUser();
});

Given('I navigate to the launches page', async function () {
    await this.loginPage.getSideBar().openLaunchesPage();
    this.launchesPage = new LaunchesPage(this.page);
});

When('I select the latest launches', async function () {
    await this.launchesPage.selectLaunches(LaunchType.LatestLaunches);
});

Then('I should see one latest launch', async function () {
    const numberOfLaunches = await this.launchesPage.getDisplayedLaunches();
    expect(numberOfLaunches.length).toBe(1);
});