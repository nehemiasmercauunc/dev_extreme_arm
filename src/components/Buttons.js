import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const EditButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Editar" size="small">
        <EditIcon />
    </IconButton>
);

export const DeleteButton = ({ onExecute }) => (
    <IconButton
        onClick={() => {
            // eslint-disable-next-line
            if (window.confirm('Está seguro que desea eliminar el registro?')) {
                onExecute();
            }
        }}
        title="Eliminar"
    >
        <DeleteIcon />
    </IconButton>
);

