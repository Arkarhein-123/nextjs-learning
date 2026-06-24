import { getEmployees } from "@/features/employees/service";
import EmployeeList from "@/features/employees/components/employee-list";
import Link from "next/link";

export default async function EmployeePage({ searchParams }: { searchParams: Promise<{ editId?: string }> }) {
    const params = await searchParams;
    const editId = params.editId;

    const employees = await getEmployees();

    const updateEmployee = editId ? employees.find((emp) => emp.id === Number(editId)) : undefined;

    return (
        <div>
            <h1 className="text-3xl text-slate-900 font-bold my-6 text-center">Employees</h1>

            <Link
                href="/employees/add-employee"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mx-4"
            >
                + Add New Employee
            </Link>

            <hr className="my-2" />

            <EmployeeList employees={employees} updateEmployee={updateEmployee} />
        </div>
    );
}
