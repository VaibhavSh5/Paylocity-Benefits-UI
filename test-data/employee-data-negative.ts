import config from '../config/env.json';

export class EmployeeDataNegative{

    static invalidLoginData(): Array<{username: string, password: string}> {
        
        return[{
            username: 'invalidUser',
            password: 'invalidPassword'
        },
        {
            username: `${config.userName}`,
            password: 'invalidPassword'
        }
    ];
    }

    static invalidEmployeeData(): Array<{caseName: string, firstName: string, lastName: string, dependents: number | string, errorMessage: string}> {

        return [
            {
            caseName: 'Empty fields',
            firstName: '',
            lastName: '',
            dependents: '',
            errorMessage: 'First Name is required. Last Name is required. Dependents must be a non-negative number.'
        },
    
        {
            caseName: '50 chars in FirstName',
            firstName: 'TestUser00TestUser00TestUser00TestUser00TestUser001',
            lastName: 'User@@50Char',
            dependents: 0,
            errorMessage: 'First Name cannot exceed 50 characters.'
        },

        {
            caseName: '50 chars in LastName',
            firstName: 'TestUser50Char',
            lastName: 'TestUser00TestUser00TestUser00TestUser00TestUser001',
            dependents: 0,
            errorMessage: 'Last Name cannot exceed 50 characters.'
        },
        {
            caseName: 'Negative dependents',
            firstName: 'TestUser',
            lastName: 'TestUser',
            dependents: -1,
            errorMessage: 'Dependents must be between 0 and 32.'
        }
    ];
        }
    }