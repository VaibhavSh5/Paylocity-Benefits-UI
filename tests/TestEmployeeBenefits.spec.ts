import {test, expect} from '../utils/test-base'
import config from '../config/env.json'
import { EmployeeData } from '../test-data/employee-data'
import { ApiFunctions } from '../api-functions';

test.describe.serial('Employee creation with dependents', () => {

    let employeeIds: string[] = [];
    const employeeData = EmployeeData.employeeData();

    test.beforeEach('Login to Paylocity environment', async({pages})=> {

        await pages.loginPage.loginWithCredentials(config.userName, config.password)
        const pageTitle = await pages.homePage.title();
        console.log('Page title after login: ', pageTitle)
        expect(pageTitle).toBe('Employees - Paylocity Benefits Dashboard')
    })


    test('Verify the Add employee functionality with different dependents', async({pages}) => {
        
        const actualHeaders = await pages.homePage.tableheaders();
        const expectedHeaders = EmployeeData.employeeTableHeaders();
        expect(actualHeaders, 'Table headers do not match expected values').toEqual(expectedHeaders);

        for (const employee of employeeData) {
            await pages.homePage.createEmployeeWithDependents(employee.firstName, employee.lastName, employee.dependents);
            const userDetails = await pages.homePage.fetchUserDetails(employee.firstName, employee.lastName, employee.dependents);

            expect(userDetails, `User details for ${employee.firstName} ${employee.lastName} with ${employee.dependents} dependents not found in the table`).not.toBeNull();

            if (userDetails) {
                employeeIds.push(userDetails.id);
                expect.soft(userDetails.firstName, `First name expected ${employee.firstName} but found ${userDetails.firstName}`).toBe(employee.firstName);
                expect.soft(userDetails.lastName, `Last name expected ${employee.lastName} but found ${userDetails.lastName}`).toBe(employee.lastName);
                expect.soft(userDetails.dependents, `Dependents count expected ${employee.dependents} but found ${userDetails.dependents}`).toBe(employee.dependents);
                expect.soft(userDetails.salary, `Salary expected ${employee.salary} but found ${userDetails.salary}`).toBe(employee.salary);
                expect.soft(userDetails.grossPay, `Gross pay expected ${employee.grossPay} but found ${userDetails.grossPay}`).toBe(employee.grossPay);
                expect.soft(userDetails.benefitsCost, `Benefits cost expected ${employee.benefitsCost} but found ${userDetails.benefitsCost}`).toBe(employee.benefitsCost);
                expect.soft(userDetails.netPay, `Net pay expected ${employee.netPay} but found ${userDetails.netPay}`).toBe(employee.netPay);
            }
        }    
        
    })

    test('Verify update employee functionality with different dependents', async({pages}) => {

        //Create a new employee to update
        await pages.homePage.createEmployeeWithDependents('EmployeeUpdate', 'TestUpdate', 2);
        const userDetails = await pages.homePage.fetchUserDetails('EmployeeUpdate', 'TestUpdate', 2);
        let employeeId = '';

        expect(userDetails, 'User details for EmployeeUpdate Test with 2 dependents not found in the table').not.toBeNull();


        if (userDetails) {
            employeeId = userDetails.id;
            employeeIds.push(employeeId);
            console.log(`Created employee for update test with ID: ${employeeId}`);
        }

        expect(employeeId, 'Employee ID should not be empty after creation').not.toBe('');

        //Update employee with different details and dependent count:
        for (const employee of employeeData) {
            await pages.homePage.updateEmployeeWithDependents(employeeId, employee.firstName, employee.lastName, employee.dependents);
            const updatedUserDetails = await pages.homePage.fetchUserDetails(employee.firstName, employee.lastName, employee.dependents);
            
            expect(updatedUserDetails, `Updated user details for ${employee.firstName} ${employee.lastName} with ${employee.dependents} dependents not found in the table`).not.toBeNull();
            if (updatedUserDetails) {
                expect.soft(updatedUserDetails.firstName, `First name expected ${employee.firstName} but found ${updatedUserDetails.firstName}`).toBe(employee.firstName);
                expect.soft(updatedUserDetails.lastName, `Last name expected ${employee.lastName} but found ${updatedUserDetails.lastName}`).toBe(employee.lastName);
                expect.soft(updatedUserDetails.dependents, `Dependents count expected ${employee.dependents} but found ${updatedUserDetails.dependents}`).toBe(employee.dependents);
                expect.soft(updatedUserDetails.salary, `Salary expected ${employee.salary} but found ${updatedUserDetails.salary}`).toBe(employee.salary);
                expect.soft(updatedUserDetails.grossPay, `Gross pay expected ${employee.grossPay} but found ${updatedUserDetails.grossPay}`).toBe(employee.grossPay);
                expect.soft(updatedUserDetails.benefitsCost, `Benefits cost expected ${employee.benefitsCost} but found ${updatedUserDetails.benefitsCost}`).toBe(employee.benefitsCost);
                expect.soft(updatedUserDetails.netPay, `Net pay expected ${employee.netPay} but found ${updatedUserDetails.netPay}`).toBe(employee.netPay);
            }   
        }
    })

    test("Verify delete employee functionality", async({pages}) => {

        //Create a new employee to delete
        await pages.homePage.createEmployeeWithDependents('EmployeeDelete', 'TestDelete', 10);
        const userDetails = await pages.homePage.fetchUserDetails('EmployeeDelete', 'TestDelete', 10);
        let employeeId = '';
        let FirstName = '';
        let LastName = '';

        expect(userDetails, 'User details for EmployeeDelete Test with 10 dependents not found in the table').not.toBeNull();


        if (userDetails) {
            employeeId = userDetails.id;
            FirstName = userDetails.firstName;
            LastName = userDetails.lastName;
            employeeIds.push(employeeId);
            console.log(`Created employee for delete test with ID: ${employeeId}`);
        }

        expect(employeeId, 'Employee ID should not be empty after creation').not.toBe('');

        //Delete the employee and verify deletion
        await pages.homePage.clickDeleteButton(employeeId);
        const message = await pages.homePage.getDeleteConfirmationMessage();
        expect(message, 'Delete confirmation message did not match expected value').toBe(`Delete employee record for ${FirstName} ${LastName}?`);

        await pages.homePage.cancelDelete();
        let response = await ApiFunctions.getEmployeeById(employeeId);
        expect(response.status(), `Employee with ID ${employeeId} should still exist after cancelling delete`).toBe(200);

        await pages.homePage.clickDeleteButton(employeeId);
        await pages.homePage.confirmDelete();
        response = await ApiFunctions.getEmployeeById(employeeId);
        expect(response.status(), `Employee with ID ${employeeId} should be deleted but still exists`).toBe(404);
    })



    test.afterEach('Delete the created employee records', async({request}) => {

        if (employeeIds.length === 0) {
            console.warn('No employee IDs to delete. Skipping cleanup.');
            return;
        }
        
        for (const employeeId of employeeIds) {
            const response = await ApiFunctions.deleteEmployeeRecords(employeeId);
            expect(response.status(), `Failed to delete employee with ID ${employeeId}`).toBe(200);
            console.log(`Deleted employee ID: ${employeeId}, Status: ${response.status()}`);
        }
        employeeIds = [];    
    })})