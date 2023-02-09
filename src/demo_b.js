import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  Plugin, Template, TemplateConnector, TemplatePlaceholder,
} from '@devexpress/dx-react-core';

import {
  SelectionState,
  IntegratedSelection,
  TreeDataState,
  CustomTreeData,
  EditingState,
  IntegratedSorting,
  SearchState,
  SortingState,
  IntegratedFiltering,
  PagingState,
  IntegratedPaging
} from '@devexpress/dx-react-grid';

import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn,
  TableEditRow,
  TableEditColumn,
  SearchPanel,
  Toolbar,
  PagingPanel,
  TableColumnResizing,
  TableSelection
} from '@devexpress/dx-react-grid-material-ui';

import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MuiGrid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


import {
  generateRows,
  defaultColumnValues
} from './demo-data/generator';

const Popup = ({
  row,
  onChange,
  onApplyChanges,
  onCancelChanges,
  open,
}) => (
  <Dialog open={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Employee Details</DialogTitle>
    <DialogContent>
      <MuiGrid container spacing={8}>
        <MuiGrid item xs={12}>
          <FormGroup>
            <TextField
              margin="normal"
              name="name"
              label="Name"
              value={row.name || ''}
              onChange={onChange}
            />
            <TextField
              margin="normal"
              name="city"
              label="City"
              value={row.city || ''}
              onChange={onChange}
            />
            <TextField
              margin="normal"
              name="car"
              label="Car"
              value={row.car || ''}
              onChange={onChange}
            />
          </FormGroup>
        </MuiGrid>
      </MuiGrid>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancelChanges} color="secondary">
        Cancel
      </Button>
      <Button onClick={onApplyChanges} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

const llamadaApi = (row) => {
  console.log("Llamada a la api: row", row)
  // aca hago la llamada a la api
}

const PopupEditing = React.memo(({ popupComponent: Popup }) => (
  <Plugin>
    <Template name="popupEditing">
      <TemplateConnector>
        {(
          {
            rows,
            getRowId,
            addedRows,
            editingRowIds,
            createRowChange,
            rowChanges,
          },
          {
            changeRow, changeAddedRow, commitChangedRows, commitAddedRows,
            stopEditRows, cancelAddedRows, cancelChangedRows,
          },
        ) => {
          const isNew = addedRows.length > 0;
          let editedRow;
          let rowId;
          if (isNew) {
            rowId = 0;
            editedRow = addedRows[rowId];
          } else {
            [rowId] = editingRowIds;
            const targetRow = rows.filter(row => getRowId(row) === rowId)[0];
            editedRow = { ...targetRow, ...rowChanges[rowId] };
          }

          const processValueChange = ({ target: { name, value } }) => {
            const changeArgs = {
              rowId,
              change: createRowChange(editedRow, value, name),
            };
            if (isNew) {
              changeAddedRow(changeArgs);
            } else {
              changeRow(changeArgs);
            }
          };
          const rowIds = isNew ? [0] : editingRowIds;
          const applyChanges = () => {
            if (isNew) {
              commitAddedRows({ rowIds });
            } else {
              stopEditRows({ rowIds });
              commitChangedRows({ rowIds });
              // console.log("rowsCommit", rows)
              // console.log("rowChangesCommit", rowChanges)
              // console.log("editedRow", editedRow)
              // aca hago la llamada a la api
              llamadaApi(editedRow)
            }
          };
          const cancelChanges = () => {
            if (isNew) {
              cancelAddedRows({ rowIds });
            } else {
              stopEditRows({ rowIds });
              cancelChangedRows({ rowIds });
            }
          };
          const open = editingRowIds.length > 0 || isNew;
          return (
            <Popup
              open={open}
              row={editedRow}
              onChange={processValueChange}
              onApplyChanges={applyChanges}
              onCancelChanges={cancelChanges}
            />
          );
        }}
      </TemplateConnector>
    </Template>
    <Template name="root">
      <TemplatePlaceholder />
      <TemplatePlaceholder name="popupEditing" />
    </Template>
  </Plugin>
));

const getRowId = row => row.id;

const getChildRows = (row, rootRows) => {
  const childRows = rootRows.filter(r => r.parentId === (row ? row.id : null));
  return childRows.length ? childRows : null;
};


export default () => {
  console.log("render")
  const [columns] = useState([
    { name: 'name', title: 'Name' },
    { name: 'check', title: 'Archivar / Enviar' },
    { name: 'gender', title: 'Gender' },
    { name: 'city', title: 'City' },
    { name: 'car', title: 'Car' }
  ]);

  const [tableColumnExtensions] = useState([
    { columnName: "check", width: 300, align: 'center' },
  ]);

  const [rows, setRows] = useState(generateRows({
    columnValues: {
      id: ({ index }) => index,
      parentId: ({ index, random }) => (index > 0 ? Math.trunc((random() * index) / 2) : null),
      ...defaultColumnValues
    },
    length: 20
  }));

  console.log("rows", rows)

  const [columnWidths, setColumnWidths] = useState([
    { columnName: "name", width: 200 },
    { columnName: "check", width: 300, align: 'center' },
    { columnName: "gender", width: 200 },
    { columnName: "city", width: 200 },
    { columnName: "car", width: 200 }
  ]);

  const [sorting, setSorting] = useState([
    { columnName: "car", direction: "asc" }
  ]);
  const [searchValue, setSearchState] = useState("");

  const showDetails = row => {
    // this.setState({ popupVisible: true, activeRow: row });
    console.log("showDetails", row)
  };

  const checkArchivarHandle = row => {
    //update field checkArchivar from state rows to true
    setRows(rows.map(r => r.id === row.id ? { ...r, checkArchivar: !row.checkArchivar } : r));
  };

  const checkEnviarHandle = row => {
    setRows(rows.map(r => r.id === row.id ? { ...r, checkEnviar: !row.checkEnviar } : r));
  };

  const CellComponent = ({ children, row, ...restProps }) => (
    <TableEditColumn.Cell row={row} {...restProps} >
      {children}
      {restProps.tableRow.row.parentId === null && <TableEditColumn.Command
        id="custom"
        text="Enviar"
        className="btn"
        onExecute={() => {
          showDetails(row);
        }}
      />
      }
    </TableEditColumn.Cell>
  );


  const CellComponentCheck = ({ children, row, ...restProps }) => (

    <TableTreeColumn.Cell row={row} {...restProps} >
      {children}
      {
        restProps.tableRow.row.parentId === 0 && <TableTreeColumn.Checkbox
          checked={restProps.tableRow.row.checkArchivar}
          onChange={() => {
            checkArchivarHandle(row);
          }}
          color="warning"
        />
      }
      {restProps.tableRow.row.parentId === 0 && <TableTreeColumn.Checkbox
        checked={restProps.tableRow.row.checkEnviar}
        onChange={() => {
          checkEnviarHandle(row);
        }}
        color="success"
        
      />
      }
    </TableTreeColumn.Cell>
  );



  // const [editingColumnExtensions] = useState([
  //   {
  //     columnName: 'name',
  //     createRowChange: (row, value) => ({ user: { ...row.user, name: value } }),
  //   },
  //   {
  //     columnName: 'city',
  //     createRowChange: (row, value) => ({ user: { ...row.user, city: value } }),
  //   },
  //   {
  //     columnName: 'car',
  //     createRowChange: (row, value) => ({ car: { model: value } }),
  //   },
  // ]);
  const [defaultExpandedRowIds] = useState([0]);

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };

  const EditButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Editar" size="small">
      <EditIcon />
    </IconButton>
  );

  const DeleteButton = ({ onExecute }) => (
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


  const commandComponents = {
    edit: EditButton,
    delete: DeleteButton,
  };

  const Command = ({ id, onExecute }) => {
    const CommandButton = commandComponents[id];
    return (
      <CommandButton
        onExecute={onExecute}
      />
    );
  };

  return (
    <>

      <Paper>
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
        >
          <SearchState value={searchValue} onValueChange={setSearchState} />
          <SortingState sorting={sorting} onSortingChange={setSorting} />
          <IntegratedSorting />
          <IntegratedFiltering />

          <SelectionState />
          <TreeDataState
            defaultExpandedRowIds={defaultExpandedRowIds}
          />
          <CustomTreeData
            getChildRows={getChildRows}
          />
          <IntegratedSelection />
          <EditingState
            onCommitChanges={commitChanges}
          />
          <Table
            columnExtensions={tableColumnExtensions}

          />
          <TableColumnResizing
            columnWidths={columnWidths}
            onColumnWidthsChange={setColumnWidths}


          />
          <TableHeaderRow 
          showSortingControls
          />
          <TableTreeColumn
            for="check"
            cellComponent={CellComponentCheck}
          />
          <TableEditColumn
            cellComponent={CellComponent}
            showEditCommand
            showDeleteCommand
            commandComponent={Command}
            width={200}
          />


          <Toolbar />
          <SearchPanel />
          <PopupEditing popupComponent={Popup} />
        </Grid>
      </Paper>
    </>
  );
};
