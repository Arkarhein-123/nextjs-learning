import { createEmployeeAction } from "../actions";

export default function AddEmployeeForm() {
    return (
        <div className="max-w-lg mx-auto p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Add Employee</h2>

            <form action={createEmployeeAction} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-600" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            className="border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-600" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            className="border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="salary">
                        Salary
                    </label>
                    <input
                        type="number"
                        name="salary"
                        className="border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all"
                >
                    Add Employee
                </button>
            </form>
        </div>
    );
}
