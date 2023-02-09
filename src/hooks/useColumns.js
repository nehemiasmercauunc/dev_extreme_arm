import { useState } from 'react';

const useColumns = () => {
    const [columns] = useState([
        { name: 'name', title: 'Name' },
        { name: 'check', title: 'Archivar / Enviar' },
        { name: 'gender', title: 'Gender' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' }
      ])
    return [columns]
}

export default useColumns;
