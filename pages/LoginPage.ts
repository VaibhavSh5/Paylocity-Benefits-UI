import {Page} from '@playwright/test'
import allLocators from '../locators/locators.json'
import { BasePage } from './BasePage';
import config from '../config/env.json';

export class LoginPage extends BasePage{

    private locators = allLocators;
    
    constructor(page: Page){
        super(page);
    }

    async loginWithCredentials(username: string, password: string){
        await this.navigateToURL(config.baseUrl);
        await this.fill(this.locators.loginPage.usernameInput, username);
        await this.fill(this.locators.loginPage.passwordInput, password);
        await this.clickByRole('button', 'Log In');
        await this.waitForState(this.locators.homePage.homepageName, 'visible', 5000);
    }
}