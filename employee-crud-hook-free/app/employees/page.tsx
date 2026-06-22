import EmployeeList from "@/features/employees/components/employee-list";
import { getEmployees } from "@/features/employees/service";
import React from "react";

export default async function Employee() {
    const employees = await getEmployees();
    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Employee Management</h2>

            <EmployeeList employees={employees} />
        </div>
    );
}
