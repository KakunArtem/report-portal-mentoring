import {expect, test} from './fixtures';
import {LoginPage} from "../src/pages";

test.describe('Login Test Suite', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.openHomePage();
    });

    test('Should login with valid user', async ({page}) => {
        await loginPage.loginWithTestUser();
        await page.waitForURL(/.*dashboard.*/);
        const url = page.url();
        expect(url).toContain('dashboard');
    });

    test('Should display bad credentials label with invalid user', async ({page}) => {
        await loginPage.login('invalidUserName', 'InvalidPassword');
        const isDisplayed = await loginPage.badCredentialLabelIsEnabled();
        expect(isDisplayed).toBe(true);
    });
});