import {BasePage} from "./base.page";
import {Page} from "playwright";
import {MainPage} from "./main.page";
import {envConfig} from "../configs";

export class LoginPage extends BasePage {
    private loginField = this.page.locator('[name="login"]');
    private passwordField = this.page.locator('[name="password"]');
    private submitButton = this.page.locator('xpath=//button[@type="submit"]');
    private badCredentialsLabel = this.page.locator('xpath=(//span[contains(text(),"Bad Credentials")])[1]');

    constructor(page: Page) {
        super(page);
    }

    async login(userName: string, password: string) {
        await this.loginField.fill(userName);
        await this.passwordField.fill(password);
        await this.submitButton.click();

        return new MainPage(this.page);
    }

    async loginWithTestUser(){
        const userName: string = envConfig.username!;
        const password: string = envConfig.password!;
        return await this.login(userName, password)
    }

    async badCredentialLabelIsEnabled(){
        return await this.badCredentialsLabel.isEnabled();
    }
}