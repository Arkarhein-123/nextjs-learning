"use client";

import { useState } from "react";
import { employeeService } from "@/employee/api/employee.api";

export default function useDeleteEmployee() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteEmployee = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            // Use your service instead of calling axios directly
            await employeeService.deleteEmployee(id);
        } catch (err) {
            setError("Failed to delete employee.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { deleteEmployee, loading, error };
}
