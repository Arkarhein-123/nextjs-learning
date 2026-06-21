"use client";

import { useParams } from "next/navigation";

export default function EmployeeId() {
    const { id } = useParams();
    return (
        <div>
            <h2>Employee id {id}</h2>
        </div>
    );
}
