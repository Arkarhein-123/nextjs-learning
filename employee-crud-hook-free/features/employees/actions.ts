"use server";

import { revalidatePath } from "next/cache";
import { createEmployee, updateEmployee, deleteEmployee } from "./service";
import { redirect } from "next/navigation";

export const createEmployeeAction = async (formData: FormData) => {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const salary = Number(formData.get("salary"));

    if (!firstName || !email) return { error: "First Name and Email are required" };

    try {
        await createEmployee({ firstName, lastName, email, salary });
        revalidatePath("/employees");
        redirect("/employees");
    } catch (err) {
        return { error: "Failed to create employee" };
    }
};

export const updateEmployeeAction = async (formData: FormData) => {
    const id = Number(formData.get("id"));
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const salary = Number(formData.get("salary"));

    try {
        await updateEmployee(id, { firstName, lastName, email, salary });
        revalidatePath("/employees");
        redirect("/employees");
    } catch (err) {
        return { error: "Failed to update employee" };
    }
};

export const deleteEmployeeAction = async (id: number) => {
    try {
        await deleteEmployee(id);
        revalidatePath("/employees"); // Updates the list after deletion
    } catch (err) {
        console.error("Failed to delete employee", err);
        return { error: "Failed to delete employee" };
    }
};
