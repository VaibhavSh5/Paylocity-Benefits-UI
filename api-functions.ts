import { request } from "@playwright/test";
import config from "./config/env.json";



export class ApiFunctions{


    static async deleteEmployeeById(employeeId: string){

        const api_request = await request.newContext();
        const response = await api_request.delete(`${config.baseUrl}${config.apiBasePath}/${employeeId}`,{

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${config.apiAuthToken}`
            }
        });
        return response;
    }

    static async getEmployeeById(employeeId: string){
        
        const api_request = await request.newContext();
        const response = await api_request.get(`${config.baseUrl}${config.apiBasePath}/${employeeId}`,{

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${config.apiAuthToken}`
            }
        });
        return response;
    }

    static async addEmployee(employeeData: {firstName: string, lastName: string, dependents: number}){

        const api_request = await request.newContext();
        const response = await api_request.post(`${config.baseUrl}${config.apiBasePath}`,{
            
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${config.apiAuthToken}`
            },
            data: employeeData
        });
        return response;
    }
}