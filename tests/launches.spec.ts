import {expect, test} from './fixtures';
import {LaunchesPage, LaunchType, LoginPage} from '../src/pages';

test.describe('Launches Test Suite', () => {
    let loginPage: LoginPage;
    let launchesPage: LaunchesPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.openHomePage();
        await loginPage.loginWithTestUser();
        await loginPage.getSideBar().openLaunchesPage();
        launchesPage = new LaunchesPage(page);
    });

    test('Should show one latest launch', async ({page}) => {
        await launchesPage.selectLaunches(LaunchType.LatestLaunches);
        const numberOfLaunches = await launchesPage.getDisplayedLaunches();
        // await new Promise(resolve => setTimeout(resolve, 10000000));
        expect(numberOfLaunches.length).toBe(1);
    });
});