import { Page } from "@playwright/test";
import allLocators from '../locators/locators.json';
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    
    private locators = allLocators.homePage;
    private tableHeaders: string[] = [];

    constructor(page: Page) {
        super(page);
    }

    async clickAddEmployee() {

        await this.page.waitForLoadState('networkidle');
        await this.waitForState(this.locators.addEmployeeButton, 'visible', 5000);
        await this.click(this.locators.addEmployeeButton);
        await this.toBeVisible(this.locators.addEmployeePopup);
    }

    async fillEmployeeForm(firstName?: string, lastName?: string, dependents?: number | string) {
        if (firstName!== undefined) {
            await this.fill(this.locators.firstName, firstName);
        }
        if (lastName!== undefined) {
            await this.fill(this.locators.lastName, lastName);
        }
        if (dependents !== undefined) {
            await this.fill(this.locators.dependents, dependents.toString());
        }
    }
    
    async submitEmployeeForm() {

        await this.waitForState(this.locators.addButton, 'attached', 4000);
        await this.click(this.locators.addButton);
        await this.waitForTimeout(1000);
    }

    async createEmployeeWithDependents(firstName?: string, lastName?: string, dependents?: number | string) {
        await this.clickAddEmployee();
        await this.fillEmployeeForm(firstName, lastName, dependents);
        await this.submitEmployeeForm();
        await this.waitForState(this.locators.addEmployeePopup, 'hidden', 4000);
        await this.toBeVisible(this.locators.homepageName);
    }

    async tableheaders(): Promise<string[]> {

        const countHeaders = await this.page.locator(this.locators.tableHeader).count();
        for(let i=0; i<countHeaders; i++){
            const headerText = await this.page.locator(this.locators.tableHeader).nth(i).textContent();
            if(headerText){
                this.tableHeaders.push(headerText.trim());
            }
        }
        return this.tableHeaders;
    }

    async fetchUserDetails(firstName: string, lastName: string, dependents: number): Promise<{id: string, lastName: string, firstName: string, dependents: number, salary: number, grossPay: number, benefitsCost: number, netPay: number} | null> {
        
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.locators.tableRows).last().waitFor({ state: 'visible', timeout: 4000 });
        await this.waitForTimeout(500);

        const countRows = await this.page.locator(this.locators.tableRows).count();
        for (let i = 0; i < countRows; i++) {
            const rowFirstName = await this.page.locator(this.locators.tableRows).nth(i).locator('td').nth(2).textContent();
            const rowLastName = await this.page.locator(this.locators.tableRows).nth(i).locator('td').nth(1).textContent();
            const rowDependents = await this.page.locator(this.locators.tableRows).nth(i).locator('td').nth(3).textContent();

            // Search for swapped values to find the employee
            if (rowFirstName?.trim() === lastName && rowLastName?.trim() === firstName && rowDependents?.trim() === dependents.toString()) {
                const id = await this.page.locator(this.locators.tableRows).nth(i).locator('td').nth(0).textContent();
                const salary = await this.page.locator(this.locators.tableRows).nth(i).locator('td').nth(4).textContent();
                const grossPay = await this.page.locator(this.locators.tableRows).nth(i).locator('td').nth(5).textContent();
                const benefitsCost = await this.page.locator(this.locators.tableRows).nth(i).locator('td').nth(6).textContent();
                const netPay = await this.page.locator(this.locators.tableRows).nth(i).locator('td').nth(7).textContent();

                return {
                    id: id ?? '',
                    // Return swapped values to match what user expects
                    lastName: rowFirstName ?? '',
                    firstName: rowLastName ?? '',
                    dependents: parseFloat(rowDependents ?? '0'),
                    salary: parseFloat(salary ?? '0'),
                    grossPay: parseFloat(grossPay ?? '0'),
                    benefitsCost: parseFloat(benefitsCost ?? '0'),
                    netPay: parseFloat(netPay ?? '0')
                };
            }
        }
        return null;
    }

    async clickEmployeeId(employeeId: string) {

        await this.page.waitForLoadState('networkidle');
        const countRows = await this.page.locator(this.locators.tableRows).count();
        for (let i = 0; i < countRows; i++) {
            const rowId = await this.page.locator(this.locators.tableRows).nth(i).locator('td').nth(0).textContent();
            if (rowId?.trim() === employeeId) {
                await this.page.locator(this.locators.tableRows).nth(i).locator(this.locators.editButton).click();
                await this.page.waitForLoadState('networkidle');
                await this.waitForState(this.locators.addEmployeePopup, 'visible', 4000);
                break;
            }
        }
    }

    async updateEmployee(){

        await this.waitForState(this.locators.updateButton, 'attached', 4000);
        await this.click(this.locators.updateButton);
        await this.waitForTimeout(1000);
    }

    async updateEmployeeWithDependents(employeeId: string, firstName?: string, lastName?: string, dependents?: number) {

        await this.clickEmployeeId(employeeId);
        await this.fillEmployeeForm(firstName, lastName, dependents);
        await this.updateEmployee();
        await this.waitForState(this.locators.addEmployeePopup, 'hidden', 4000);
        await this.toBeVisible(this.locators.homepageName);
    }

    async clickDeleteButton(employeeId: string) {
        await this.page.waitForLoadState('networkidle');
        const countRows = await this.page.locator(this.locators.tableRows).count();
        
        for (let i = 0; i < countRows; i++) {
            const rowId = await this.page.locator(this.locators.tableRows).nth(i).locator('td').nth(0).textContent();
            
            if (rowId?.trim() === employeeId) {
                await this.page.locator(this.locators.tableRows).nth(i).locator(this.locators.deleteButton).click();
                await this.waitForState(this.locators.confirmDeletePopup, 'visible', 4000);
                break;
            }
        }
    }

    async getDeleteConfirmationMessage(): Promise<string> {
        return await this.getText(this.locators.confirmDeleteMessage);
    }

    async cancelDelete() {
        await this.clickByRole('button', 'Cancel');
        await this.waitForState(this.locators.confirmDeletePopup, 'hidden', 4000);
    }

    async confirmDelete() {
        await this.click(this.locators.confirmDeleteButton);
        await this.waitForState(this.locators.confirmDeletePopup, 'hidden', 4000);
    }

    async deleteEmployee(employeeId: string) {
        await this.clickDeleteButton(employeeId);
        await this.cancelDelete();
        await this.clickDeleteButton(employeeId);
        await this.confirmDelete();
    }

    async getErrorMessageAddPopup(): Promise<string> {
        await this.toBeVisible(this.locators.addEmployeeFormErrorMessage);
        return this.getText(this.locators.addEmployeeFormErrorMessage);
    }
}

