# Bug: Login page crashes when user try to login with invalid username

## Summary:
When user try to login with invalid username, the page crashes and shows HTTP ERROR 405 error.

## Pre-requisites:
1. The Paylocity PROD environment is up and running.

## Steps to reproduce:
1. Navigate to the Paylocity dashboard login page.
2. Enter invalid Username (say, TestUser448) and random Password and click on Login.
3. Observe the navigation and the error message.

## Actual result:
The page crashes and shows HTTP ERROR 405 error.

## Expected result:
The page should show an error message indicating that 'The username or password' is invalid and should not crash.

## Environment:
- OS: MacOs Tahoe 26.3
- Browser: Chrome Version 144.0.7559.134 (Official Build) (arm64)
- Application Version: Paylocity Benefits Dashboard v1.0.0

## Screenshot:
![img.png](../bug-screenshots/img2.png)