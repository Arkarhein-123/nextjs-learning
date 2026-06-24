"use server";

import { revalidatePath } from "next/cache";
import { createEmployee, updateEmployee, deleteEmployee } from "./service";
import { redirect } from "next/navigation";

export const createEmployeeAction = async (formData: FormData) => {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const salary = Number(formData.get("salary"));

    if (!firstName || !email) {
        console.error("Missing required fields");
        return; // Return void to satisfy TypeScript
    }

    try {
        await createEmployee({ firstName, lastName, email, salary });
        revalidatePath("/employees");
    } catch (err) {
        console.error("Failed to create employee", err);
    }
    redirect("/employees");
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
    } catch (err) {
        console.error("Failed to update employee", err);
    }
    redirect("/employees");
};

export const deleteEmployeeAction = async (formData: FormData) => {
    const id = Number(formData.get("id"));

    if (!id) return; // Return void

    try {
        await deleteEmployee(id);
        revalidatePath("/employees");
    } catch (err) {
        console.error("Failed to delete employee", err);
    }
    // No redirect needed for delete if you want to stay on the same page
};
