"use client";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import useDeleteEmployee from "@/employee/hooks/useDeleteEmployee";
import useEmployee from "@/employee/hooks/useEmployee";
import Link from "next/link";

export default function Employee() {
    const { employees, loading, error } = useEmployee();
    const { deleteEmployee } = useDeleteEmployee();

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure to delete this?")) {
            await deleteEmployee(id);
            window.location.reload();
        } else {
            console.log(`${id} doesn't exist...`);
        }
    };

    // 1. Handle Loading State
    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
                <span className="animate-pulse">
                    Loading employee records...
                </span>
            </div>
        );
    }

    // 2. Handle Error State
    if (error) {
        return (
            <div className="flex h-64 items-center justify-center text-sm text-destructive font-medium">
                Error: {error || "Failed to load employee data."}
            </div>
        );
    }

    return (
        // 3. Perfect Block Centering via mx-auto + w-full
        <div className="w-full max-w-5xl mx-auto my-6 px-4">
            <Link
                href={"employee/employee-form"}
                className="mb-6 bg-indigo-700 px-5 py-3 hover:bg-white text-white hover:text-indigo-800 hover:border-2 cursor-pointer rounded-2xl"
            >
                Add Employee
            </Link>

            {/* 4. Elegant Card wrapper for the table */}
            <div className="mt-6 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                <Table className="border border-gray-300 p-8">
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="w-[80px] font-bold">
                                Id
                            </TableHead>
                            <TableHead className="font-bold">
                                First Name
                            </TableHead>
                            <TableHead className="font-bold">
                                Last Name
                            </TableHead>
                            <TableHead className="font-bold">Email</TableHead>
                            <TableHead className="font-bold">Salary</TableHead>
                            <TableHead className="font-bold text-right pr-6">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees && employees.length > 0 ? (
                            employees.map((emp) => (
                                <TableRow
                                    key={emp.id}
                                    className="hover:bg-muted/40 transition-colors"
                                >
                                    <TableCell className="font-medium">
                                        #{emp.id}
                                    </TableCell>
                                    <TableCell>{emp.firstName}</TableCell>
                                    <TableCell>{emp.lastName}</TableCell>
                                    <TableCell className="max-w-[200px] truncate">
                                        {emp.email}
                                    </TableCell>
                                    <TableCell>
                                        {/* Nicely formatted currency */}
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            maximumFractionDigits: 0,
                                        }).format(emp.salary)}
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        {/* 5. Clean Button Layout utilizing native variants */}
                                        <div className="flex justify-end items-center gap-2">
                                            <Link
                                                href={`/employee/${emp.id}`} // 👈 Navigates dynamically to the edit path
                                                className="h-8 px-3 inline-flex items-center justify-center text-xs font-medium rounded-md bg-blue-500 hover:bg-indigo-200 text-white hover:text-black transition-colors ease-in-out cursor-pointer shadow-sm"
                                            >
                                                Update
                                            </Link>
                                            <Button
                                                onClick={() =>
                                                    handleDelete(emp.id)
                                                }
                                                variant="destructive"
                                                size="sm"
                                                className="h-8 px-3 bg-red-500 hover:bg-indigo-200 text-white hover:text-red-500
                                                 transition-colors ease-in-out cursor-pointer"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            // 6. Handle Empty State seamlessly
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="h-32 text-center text-muted-foreground"
                                >
                                    No employee records found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
