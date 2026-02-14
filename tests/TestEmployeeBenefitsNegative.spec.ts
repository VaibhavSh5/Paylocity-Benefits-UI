import { test, expect } from '../utils/test-base'
import { EmployeeDataNegative } from '../test-data/employee-data-negative';
import config from '../config/env.json';
import { ApiFunctions } from '../api-functions';



test.describe('Negative tests for employee login', () => {

    for (const credentials of EmployeeDataNegative.invalidLoginData()) {
    
        test(`Verify the validation for invalid user login with username "${credentials.username}"`, async({pages}) => {
        
            await pages.loginPage.attemptLogin(credentials.username, credentials.password);
            const errorMessage = await pages.loginPage.getErrorMessage();
            expect(errorMessage, 'Error message did not match expected value').toBe('The specified username or password is incorrect.');
        })}

    test('Verify the validation for empty username and password fields', async({pages}) => {
        
        await pages.loginPage.attemptLogin('', '');
        const errorMessageUsername = await pages.loginPage.getErrorMessageUsername();
        const errorMessagePassword = await pages.loginPage.getErrorMessagePassword();
        expect(errorMessageUsername, 'Error message did not match expected value').toBe('The Username field is required.');
        expect(errorMessagePassword, 'Error message did not match expected value').toBe('The Password field is required.');
    })

})

test.describe('Negative tests for employee CRUD operations', () => {

    test.beforeEach('Login to Paylocity environment', async({pages})=> {

        await pages.loginPage.loginWithCredentials(config.userName, config.password);
    })


    for (const employeeData of EmployeeDataNegative.invalidEmployeeData()) {

    test(`Verify the validation on add employee form with ${employeeData.caseName} `, async({pages}) => {
        
        await pages.homePage.clickAddEmployee();
        await pages.homePage.fillEmployeeForm(employeeData.firstName, employeeData.lastName, employeeData.dependents ?? undefined);
        await pages.homePage.submitEmployeeForm();
        const errorMessage = await pages.homePage.getErrorMessageAddPopup();
        expect(errorMessage, `Error message for case ${employeeData.caseName} did not match expected value`).toBe(employeeData.errorMessage);
    })
    }

    test('Verify the validation on update employee form with invalid data', async({pages}) => {
        

        //*Create a new employee to update
        const response = await ApiFunctions.addEmployee({firstName: 'EmployeeUpdate', lastName: 'TestUpdate', dependents: 32});
        expect(response.status(), 'Failed to create employee for update test').toBe(200);
        console.log('Employee created for update test with response status: ', response.status());

        const employeeId = (await response.json()).id;
        expect(employeeId, 'Employee ID should not be empty after creation').not.toBeUndefined();
        try{
            await pages.basePage.reload();
            for (const employeeData of EmployeeDataNegative.invalidEmployeeData()) {
                await pages.homePage.clickEmployeeId(employeeId);
                await pages.basePage.waitForTimeout(3000);
                await pages.homePage.fillEmployeeForm(employeeData.firstName, employeeData.lastName, employeeData.dependents);
                await pages.homePage.updateEmployee();
                const errorMessage = await pages.homePage.getErrorMessageAddPopup();
                expect(errorMessage, `Error message for case ${employeeData.caseName} did not match expected value`).toBe(employeeData.errorMessage);
        }
    }
        //*Clean up - delete the employee created for update test

        finally{
            const responseDelete = await ApiFunctions.deleteEmployeeById(employeeId);
            expect(responseDelete.status(), 'Failed to delete employee after update test').toBe(200);
        }
})

})