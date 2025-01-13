import { Page } from 'playwright';
import { setupBrowser } from './hooks';
import { LoginPage } from '../src/pages';

describe('Login Test Suite', () => {
    const { getPage } = setupBrowser();
    let page: Page;
    let loginPage: LoginPage;

    beforeAll(async () => {
        page = getPage();
        loginPage = new LoginPage(page);
    });

    test('Should load Login page', async () => {
        await loginPage.openHomePage();
        const title = await loginPage.getTitle();
        expect(title).toBe('Report Portal');
    });
});