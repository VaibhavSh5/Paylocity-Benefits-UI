import {Page, expect} from '@playwright/test';

export class BasePage{

    protected page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async click(locator: string){
        await this.page.locator(locator).click();
    }

    async clickByRole(role: any, name: string){
        await this.page.getByRole(role, {name: name}).click();
    }

    async fill(locator: string, value: string){
        await this.page.locator(locator).fill(value);
    }

    async hover(locator: string){
        await this.page.locator(locator).hover();
    }

    async getText(locator: string){
        return await this.page.locator(locator).innerText();
    }

    async getTextContent(locator: string){
        return await this.page.locator(locator).textContent();
    }

    async navigateToURL(URL: string){
        await this.page.goto(URL);
    }

    async waitForTimeout(timeout: number){
        await this.page.waitForTimeout(timeout);
    }

    async goBackPage(){
        await this.page.goBack();
    }

    async toBeVisible(locator: string){
        await expect(this.page.locator(locator)).toBeVisible();
    }

    async title(){
        return await this.page.title();
    }
    
    async toBeEnabled(locator: string){
        await expect(this.page.locator(locator)).toBeEnabled();
    }

    async waitForState(locator: string, state: 'visible' | 'hidden' | 'attached' | 'detached', timeout: number){
        await this.page.locator(locator).waitFor({state: state, timeout: timeout});
    }
}