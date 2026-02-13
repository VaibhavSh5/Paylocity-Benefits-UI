import {Page} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { BasePage } from '../pages/BasePage';


export class PageFixtures{

    readonly page: Page;
    readonly loginPage: LoginPage;
    readonly homePage: HomePage;
    readonly _basePage: BasePage;

    constructor(page:Page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
        this._basePage = new BasePage(page);
    }

    get basePage(): Page{
        return this.page;
    }
}