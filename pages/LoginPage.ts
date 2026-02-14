import {Page} from '@playwright/test'
import allLocators from '../locators/locators.json'
import { BasePage } from './BasePage';
import config from '../config/env.json';

export class LoginPage extends BasePage{

    private locators = allLocators;
    
    constructor(page: Page){
        super(page);
    }

    async attemptLogin(username: string, password: string) {
        await this.navigateToURL(config.baseUrl);
        await this.fill(this.locators.loginPage.usernameInput, username);
        await this.fill(this.locators.loginPage.passwordInput, password);
        await this.clickByRole('button', 'Log In');
    }

    async loginWithCredentials(username: string, password: string){
        await this.attemptLogin(username, password);
        await this.waitForState(this.locators.homePage.homepageName, 'visible', 5000);
    }

    async getErrorMessage(): Promise<string> {
        await this.toBeVisible(this.locators.loginPage.errorMessage);
        return this.getText(this.locators.loginPage.errorMessage);
    }

    async getErrorMessageUsername(): Promise<string> {
        await this.toBeVisible(this.locators.loginPage.errorMessageUsername);
        return this.getText(this.locators.loginPage.errorMessageUsername);
    }

    async getErrorMessagePassword(): Promise<string> {
        await this.toBeVisible(this.locators.loginPage.errorMessagePassword);
        return this.getText(this.locators.loginPage.errorMessagePassword);
    }
}