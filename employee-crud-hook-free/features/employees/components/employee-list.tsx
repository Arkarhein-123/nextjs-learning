import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteEmployee, Employee } from "../service";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EmpoyeeListProps {
    employees: Employee[];
    // updateEmployee?: Employee;
}

export default function EmployeeList({ employees }: EmpoyeeListProps) {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Salary</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees &&
                        employees.length > 0 &&
                        employees.map((emp, id) => (
                            <TableRow key={id}>
                                <TableCell>{emp.id}</TableCell>
                                <TableCell>{emp.firstName}</TableCell>
                                <TableCell>{emp.lastName}</TableCell>
                                <TableCell>{emp.email}</TableCell>
                                <TableCell>{emp.salary}</TableCell>
                                {/* <TableCell>
                                    <Link href={`employee/edit/${emp.id}`}>Update</Link>
                                    <Button onClick={() => deleteEmployee(emp.id)}>Delete</Button>
                                </TableCell> */}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>
    );
}
