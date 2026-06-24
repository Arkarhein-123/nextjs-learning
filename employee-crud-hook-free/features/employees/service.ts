export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    salary: number;
}

const EMPLOYEE_URL = "http://localhost:8080/api/employees";

export const getEmployees = async (): Promise<Employee[]> => {
    try {
        const response = await fetch(EMPLOYEE_URL, { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to fetch Employees...");
        return response.json();
    } catch (err) {
        console.error(err);
        return [];
    }
};

export const createEmployee = async (data: Omit<Employee, "id">): Promise<Employee> => {
    const response = await fetch(EMPLOYEE_URL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error while creating new employee...");
    return response.json();
};

export const updateEmployee = async (id: number, data: Partial<Employee>): Promise<Employee> => {
    const response = await fetch(`${EMPLOYEE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update Employee...");
    return response.json();
};


export const deleteEmployee = async (id: number): Promise<void> => {
    const response = await fetch(`${EMPLOYEE_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Can't delete employee...");
};
