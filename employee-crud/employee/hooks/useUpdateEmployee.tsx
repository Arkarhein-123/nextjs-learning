"use client";

import { useState } from "react";
import axios from "axios";
import { Employee } from "@/employee/dto/Employee";
import { employeeService } from "@/employee/api/employee.api";

export default function useUpdateEmployee() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Using 'Omit' is perfect here!
    const updateEmployee = async (id: number, employeeData: Omit<Employee, "id">) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await employeeService.updateEmployee(id, employeeData);
            setSuccess(true);
        } catch (err: unknown) {
            // Use 'unknown' instead of 'any'
            if (axios.isAxiosError(err)) {
                // Now TypeScript knows err is an AxiosError
                setError(err.response?.data?.message || err.message || "Failed to update employee.");
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return { updateEmployee, loading, error, success };
}
