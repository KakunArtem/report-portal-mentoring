import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../src/pages';

Given('I open the login page', async function () {
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.openHomePage();
});

When('I login with valid user', async function () {
    await this.loginPage.loginWithTestUser();
});

When('I login with invalid user', async function () {
    await this.loginPage.login('invalidUserName', 'InvalidPassword');
});

Then('I should be redirected to the dashboard', async function () {
    await this.page.waitForURL(/.*dashboard.*/);
    const url = this.page.url();
    expect(url).toContain('dashboard');
});

Then('I should see bad credentials label', async function () {
    const isDisplayed = await this.loginPage.badCredentialLabelIsEnabled();
    expect(isDisplayed).toBe(true);
});