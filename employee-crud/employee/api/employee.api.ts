import axios from "axios";
import { Employee } from "../dto/Employee";

const BACKEND_URL = "http://localhost:8080/api/employees";

export const employeeService = {
    // 1. Get all records
    getAllEmployee: async (): Promise<Employee[]> => {
        const response = await axios.get(BACKEND_URL);
        return response.data;
    },

    // 2. Create a new record
    createEmployee: async (
        employee: Omit<Employee, "id">,
    ): Promise<Employee> => {
        const response = await axios.post(BACKEND_URL, employee);
        return response.data;
    },

    // 3. FIX: Get a single employee record by ID via HTTP GET
    findEmployeeById: async (id: number): Promise<Employee> => {
        const response = await axios.get(`${BACKEND_URL}/${id}`); // 👈 Fixed method type and parameters
        return response.data;
    },

    // 4. CLEAN ADDITION: Dedicated method to update an employee via HTTP PUT
    updateEmployee: async (
        id: number,
        employee: Omit<Employee, "id">,
    ): Promise<Employee> => {
        const response = await axios.put(`${BACKEND_URL}/${id}`, employee);
        return response.data;
    },
    
    deleteEmployee: async (id:number): Promise<void> => {
        await axios.delete(`${BACKEND_URL}/${id}`)
    }
};
