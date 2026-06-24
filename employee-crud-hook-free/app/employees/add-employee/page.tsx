import AddEmployeeForm from "@/features/employees/components/add-form";

export default function AddForm() {
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-6">Create New Employee</h1>
            <div className="max-w-md mt-6">
                <AddEmployeeForm />
            </div>
        </main>
    );
}
