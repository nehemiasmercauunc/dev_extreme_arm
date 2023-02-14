import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const mostrarAlertaDelete = () => {
    Swal.fire({
        title: '¿Está seguro de eliminar el registro?',
        text: "No podrá revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminado!',
                'El registro ha sido eliminado.',
                'success'
            )
        }
    })
}
const DeleteButton = ({ onExecute }) => {
    // useEffect(() => {
    //     console.log("useEffect")
    //     mostrarAlertaDelete
    // }, []);


    return (
        <IconButton
            onClick={() => {
                // eslint-disable-next-line
                mostrarAlertaDelete()
                if (window.confirm('Está seguro que desea eliminar el registro?')) {
                    onExecute();
                }
            }}
            title="Eliminar"
        >
            <DeleteIcon />
        </IconButton>
    )
}

export default DeleteButton;