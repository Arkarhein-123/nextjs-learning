import axios from "axios";
import { Employee } from "../dto/Employee";
const BACKEND_URL = "http://localhost:8080/api/employees";

export const employeeService = {
    getAllEmployee: async (): Promise<Employee[]> => {
        const response = await axios.get(BACKEND_URL);
        return response.data;
    },
};
