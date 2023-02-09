import { useState } from 'react';

const useColumnsWidths = () => {
    const [columnWidths, setColumnWidths] = useState([
        { columnName: "name", width: 200 },
        { columnName: "check", width: 300, align: 'center' },
        { columnName: "gender", width: 200 },
        { columnName: "city", width: 200 },
        { columnName: "car", width: 200 }
      ]);
    return [columnWidths, setColumnWidths]
}

export default useColumnsWidths;