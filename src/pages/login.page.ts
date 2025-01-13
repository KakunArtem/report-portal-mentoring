import {BasePage} from "./base.page";
import {Page} from "playwright";

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page)
    }
}