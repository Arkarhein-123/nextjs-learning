"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Employee } from "@/employee/dto/Employee";
import useUpdateEmployee from "@/employee/hooks/useUpdateEmployee";
import { employeeService } from "@/employee/api/employee.api";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function EmployeeEditForm({ params }: PageProps) {
    const { id } = React.use(params); // Unwraps the dynamic parameter safely
    const router = useRouter();
    const { updateEmployee, loading, error, success } = useUpdateEmployee();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Employee>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            salary: 0,
        },
    });

    // Load data and filter purely on client side
    useEffect(() => {
        if (!id) return;

        const fetchAndFilterEmployee = async () => {
            try {
                const allEmployees = await employeeService.getAllEmployee();
                const currentEmployee = allEmployees.find(
                    (emp) => emp.id === Number(id),
                );

                if (currentEmployee) {
                    reset(currentEmployee);
                } else {
                    console.error("Employee not found in the list.");
                }
            } catch (err) {
                console.error("Failed to load employee data", err);
            }
        };

        fetchAndFilterEmployee();
    }, [id, reset]);

    useEffect(() => {
        if (success) {
            router.push("/employee");
        }
    }, [success, router]);

    const onSubmit = async (data: Employee) => {
        const { id: _, ...employeeData } = data;
        await updateEmployee(Number(id), employeeData);
    };

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col mt-5 px-4">
            <h1 className="text-2xl font-bold mb-6">Edit Employee Form</h1>

            {error && (
                <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label
                        htmlFor="firstName"
                        className="block text-sm font-medium mb-1"
                    >
                        First Name
                    </label>
                    <Input
                        id="firstName"
                        {...register("firstName", {
                            required: "First name is required",
                        })}
                    />
                    {errors.firstName && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.firstName.message}
                        </p>
                    )}
                </div>

                <div className="mb-3">
                    <label
                        htmlFor="lastName"
                        className="block text-sm font-medium mb-1"
                    >
                        Last Name
                    </label>
                    <Input
                        id="lastName"
                        {...register("lastName", {
                            required: "Last name is required",
                        })}
                    />
                    {errors.lastName && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.lastName.message}
                        </p>
                    )}
                </div>

                <div className="mb-3">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-1"
                    >
                        Email
                    </label>
                    <Input
                        id="email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="mb-3">
                    <label
                        htmlFor="salary"
                        className="block text-sm font-medium mb-1"
                    >
                        Salary
                    </label>
                    <Input
                        id="salary"
                        type="number"
                        {...register("salary", {
                            required: "Salary is required",
                            valueAsNumber: true,
                        })}
                    />
                    {errors.salary && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.salary.message}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className="bg-blue-500 hover:bg-indigo-200 text-white hover:text-black transition-colors ease-in-out cursor-pointer mt-2 w-2xl mx-auto block text-center rounded-md"
                >
                    {loading ? "Updating..." : "Update"}
                </Button>
            </form>
        </div>
    );
}
