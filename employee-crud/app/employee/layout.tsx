// app/employee/layout.tsx
import React, { ReactNode } from "react";
import Navbar from "./Navbar";

export default function EmployeeLayout({ children }: { children: ReactNode }) {

    return (
        <div className="min-h-screen flex flex-col">
            {children}
        </div>
    );
}
