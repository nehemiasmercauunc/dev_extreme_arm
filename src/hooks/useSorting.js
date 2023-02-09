import { useState } from "react";

const useSorting = (initial) => {
    const [sorting, setSorting] = useState(initial);

    const handleChange = (e) => {
        setSorting({
            ...sorting,
            [e.target.name]: e.target.value,
        });
    };

    return [sorting, setSorting];
};

export default useSorting;