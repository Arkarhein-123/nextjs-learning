import { useState, useEffect } from "react";
import { Employee } from "../dto/Employee";
import { employeeService } from "../api/employee.api";
import { setTimeout } from "timers/promises";

export default function useEmployee() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true; // Prevents state updates if component unmounts

        const fetchEmployees = async () => {
            try {
                setLoading(true);
                const data = await employeeService.getAllEmployee();

                if (isMounted) {
                    setEmployees(data);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError("Failed to fetch employees");
                    console.error(err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        const timerId = window.setTimeout(() => {
            fetchEmployees();
        }, 1500);

        return () => {
            isMounted = false;
            window.clearTimeout(timerId);
        };
    }, []);

    return { employees, loading, error };
}
