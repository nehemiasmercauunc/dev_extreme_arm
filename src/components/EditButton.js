import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const EditButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Editar" size="small">
        <EditIcon />
    </IconButton>
);

export default EditButton;