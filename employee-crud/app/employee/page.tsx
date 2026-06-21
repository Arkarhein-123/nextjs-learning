"use client";

import { employeeService } from "@/employee/api/employee.api";
import type { Employee } from "@/employee/dto/Employee";
import { useEffect, useState } from "react";

export default function Employee() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAllEmployee = async () => {
            try {
                const employees = await employeeService.getAllEmployee();
                setEmployees(employees);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        const timer = setTimeout(() => fetchAllEmployee(), 500);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
                Employee Page
            </h1>

            {loading ? (
                <div className="flex flex-col items-center justify-center gap-3">
                    {/* Tailwind Spinning SVG Icon */}
                    <svg
                        className="animate-spin h-8 w-8 text-blue-600"
                        xmlns="http://w3.org"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <span className="text-sm font-medium text-gray-500">
                        Loading employees...
                    </span>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
                    <table className="w-full text-left border-collapse bg-white">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">First Name</th>
                                <th className="px-6 py-4">Last Name</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Salary</th>
                                <th className="px-6 py-4 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-gray-600 text-sm">
                            {employees && employees.length > 0 ? (
                                employees.map((emp) => (
                                    <tr
                                        key={emp.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        {/* Missing ID cell added to match your column header */}
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {emp.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            {emp.firstName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {emp.lastName}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs">
                                            {emp.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            $
                                            {Number(
                                                emp.salary,
                                            ).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-center flex justify-center gap-2">
                                            <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition shadow-sm">
                                                Update
                                            </button>
                                            <button className="px-3 py-1.5 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700 transition shadow-sm">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-10 text-center text-gray-400 italic"
                                    >
                                        No employees found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
