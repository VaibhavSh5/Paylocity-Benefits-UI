# Bug: Cosmetic issue, No success message when a user is successfully created, updated or deleted from UI

## Summary:
When a user is successfully created, updated or deleted from the UI, there is no success message displayed to the user.

## Pre-requisites:
1. The Paylocity PROD environment is up and running.
2. User should have proper credentials to login to the dashboard.
3. For SCENARIO 2 and SCENARIO 3, there should be at least one existing user in the system to perform update and delete operations.

# SCENARIO 1: No success message when a user is successfully created from UI

## Steps to reproduce:
1. Navigate to the Paylocity dashboard login page.
2. Enter valid Username and valid Password and click on Login.
3. On Homepage, click on the Add Employee button.
4. Enter valid First Name, Last Name and Dependents value in respective fields and click on Add button.
5. Once user is created, observe if there is any success message displayed.

## Actual result:
There is no success message displayed when a user is successfully created from the UI.

## Expected result:
A success message should be displayed to the user when a user is successfully created from the UI. 


# SCENARIO 2: No success message when a user is successfully updated from UI

## Steps to reproduce:
1. Navigate to the Paylocity dashboard login page.
2. Enter valid Username and valid Password and click on Login.
3. On Homepage, click on the Edit button of an existing user.
4. Update the user details with valid information and click on Update button.
5. Once user is updated, observe if there is any success message displayed.

## Actual result:
There is no success message displayed when a user is successfully updated from the UI.

## Expected result:
A success message should be displayed to the user when a user is successfully updated from the UI.

# SCENARIO 3: No success message when a user is successfully deleted from UI

## Steps to reproduce:
1. Navigate to the Paylocity dashboard login page.
2. Enter valid Username and valid Password and click on Login.
3. On Homepage, click on the Delete button of an existing user.
4. Confirm the delete action by clicking on the Confirm button in the confirmation dialog.
5. Once user is deleted, observe if there is any success message displayed.

## Actual result:
There is no success message displayed when a user is successfully deleted from the UI.

## Expected result:
A success message should be displayed to the user when a user is successfully deleted from the UI.

## Environment:
- OS: MacOs Tahoe 26.3
- Browser: Chrome Version 144.0.7559.134 (Official Build) (arm64)
- Application Version: Paylocity Benefits Dashboard v1.0.0

