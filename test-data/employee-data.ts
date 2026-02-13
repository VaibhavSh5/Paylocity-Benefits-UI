

export class EmployeeData{

        static employeeData(): Array<{firstName: string, lastName: string, dependents: number, benefitsCost: number, netPay: number, grossPay: number, salary: number}> {

        return[{
            "firstName": "Test1",
            "lastName": "User1",
            "dependents": 0,
            "benefitsCost": 38.46,
            "netPay": 1961.54,
            "grossPay": 2000,
            "salary": 2000*26
        },
        {
            "firstName": "Test2",
            "lastName": "User2",
            "dependents": 1,
            "benefitsCost": 57.69,
            "netPay": 1942.31,
            "grossPay": 2000,
            "salary": 2000*26
        },
        {
            "firstName": "Test3",
            "lastName": "User3",
            "dependents": 16,
            "benefitsCost": 346.15,
            "netPay": 1653.85,
            "grossPay": 2000,
            "salary": 2000*26
        },
        
        {   "firstName": "Test4",
            "lastName": "User4",
            "dependents": 32,
            "benefitsCost": 653.85,
            "netPay": 1346.15,
            "grossPay": 2000,
            "salary": 2000*26  
        }]
    }

        static employeeTableHeaders(): string[] {
            return ['Id',
                    'Last Name',
                    'First Name',
                    'Dependents',
                    'Salary',
                    'Gross Pay',
                    'Benefits Cost',
                    'Net Pay',
                    'Actions'];
        }
    }