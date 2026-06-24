import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Employee } from "../service";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { deleteEmployeeAction, updateEmployeeAction } from "../actions";

interface EmpoyeeListProps {
    employees: Employee[];
    updateEmployee?: Employee;
}

export default function EmployeeList({ employees, updateEmployee }: EmpoyeeListProps) {
    return (
        <div className="w-full max-w-6xl mx-auto py-8 px-4 space-y-6">
            {/* Update Form */}
            {updateEmployee && (
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Edit Employee: {updateEmployee.firstName}</h3>
                    <form
                        action={updateEmployeeAction}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        <input type="hidden" name="id" value={updateEmployee.id} />
                        <input
                            name="firstName"
                            defaultValue={updateEmployee.firstName}
                            placeholder="First Name"
                            className="border rounded-lg p-2"
                        />
                        <input
                            name="lastName"
                            defaultValue={updateEmployee.lastName}
                            placeholder="Last Name"
                            className="border rounded-lg p-2"
                        />
                        <input
                            name="email"
                            defaultValue={updateEmployee.email}
                            placeholder="Email"
                            className="border rounded-lg p-2"
                        />
                        <input
                            name="salary"
                            type="number"
                            defaultValue={updateEmployee.salary}
                            placeholder="Salary"
                            className="border rounded-lg p-2"
                        />
                        <Button type="submit" className="md:col-span-2 lg:col-span-1">
                            Update Details
                        </Button>
                    </form>
                </div>
            )}

            {/* Employee Table with Full Headers */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50">
                            <TableHead>ID</TableHead>
                            <TableHead>First Name</TableHead>
                            <TableHead>Last Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Salary</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((emp) => (
                            <TableRow key={emp.id} className="hover:bg-slate-50">
                                <TableCell className="font-mono text-slate-500">{emp.id}</TableCell>
                                <TableCell className="font-medium text-slate-900">{emp.firstName}</TableCell>
                                <TableCell>{emp.lastName}</TableCell>
                                <TableCell>{emp.email}</TableCell>
                                <TableCell>${emp.salary.toLocaleString()}</TableCell>
                                <TableCell className="flex justify-end gap-2">
                                    <Link href={`?editId=${emp.id}`} className="text-blue-600 hover:underline">
                                        Edit
                                    </Link>
                                    <form action={deleteEmployeeAction}>
                                        <input type="hidden" name="id" value={emp.id} />
                                        <button type="submit" className="text-red-600 hover:underline">
                                            Delete
                                        </button>
                                    </form>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
