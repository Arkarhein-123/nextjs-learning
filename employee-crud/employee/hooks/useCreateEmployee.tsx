import { useState } from "react";
import { Employee } from "../dto/Employee";
import { employeeService } from "../api/employee.api";
import axios from "axios";

export default function useCreateEmployee() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const createEmployee = async (employeeData: Omit<Employee, "id">) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await employeeService.createEmployee(employeeData);
            setSuccess(true);
        } catch (err: unknown) {
            // Changed 'any' to 'unknown' to fix ESLint
            // Check if it's an Axios error and extract the message safely
            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message ||
                        err.message ||
                        "Backend error occurred.",
                );
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong while creating employee.");
            }
        } finally {
            setLoading(false);
        }
    };

    return { createEmployee, loading, error, success };
}
