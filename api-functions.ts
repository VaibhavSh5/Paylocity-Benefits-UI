import { request } from "@playwright/test";
import config from "./config/env.json";



export class ApiFunctions{


    static async deleteEmployeeRecords(employeeId: string){

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
}