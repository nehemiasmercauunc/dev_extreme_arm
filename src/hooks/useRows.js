import { useState } from 'react';

const useRows = (inicial) => {
    const [rows, setRows] = useState(inicial)
    const handleChange = (e) => {
        setRows({
            ...rows,
            [e.target.name]: e.target.value
        })
    }
    return [rows, handleChange, setRows]
}


export default useRows;