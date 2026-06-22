"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Employee } from "@/employee/dto/Employee";
import useCreateEmployee from "@/employee/hooks/useCreateEmployee";
import { useRouter } from "next/navigation";
import React from "react";

export default function EmployeeForm() {
    const { createEmployee, loading, error, success } = useCreateEmployee();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Employee>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            salary: 0,
        },
    });

    // This function runs when the form validates successfully
    const onSubmit = async (data: Employee) => {
        // Destructure to remove 'id' so we send Omit<Employee, "id"> to the server
        const { id, ...employeeData } = data;

        await createEmployee(employeeData);

        // Redirect back to the main employee list page after success
        router.push("/employee");
    };

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col mt-5 px-4">
            <h1 className="text-2xl font-bold mb-6">Employee Form</h1>

            {/* Show error alerts from backend if they happen */}
            {error && (
                <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 rounded-lg">
                    {error}
                </div>
            )}

            {/* Show success message */}
            {success && (
                <div className="p-3 mb-4 text-sm text-green-500 bg-green-50 rounded-lg">
                    Employee added successfully! Redirecting...
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* First Name */}
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

                {/* Last Name */}
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

                {/* Email */}
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

                {/* Salary */}
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
                    size="lg" // 👈 This gives you a nice, large clean button automatically!
                    className="bg-blue-500 hover:bg-indigo-200 text-white hover:text-black transition-colors ease-in-out cursor-pointer mt-2 w-2xl mx-auto block text-center rounded-md"
                >
                    {loading ? "Adding..." : "Add"}
                </Button>
            </form>
        </div>
    );
}
