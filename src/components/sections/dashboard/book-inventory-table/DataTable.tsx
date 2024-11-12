import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, useGridApiRef, GridApi } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import ActionMenu from 'components/common/ActionMenu';
import { ISBN10, ISBN13, Book } from 'database/common';
import { fetchData } from 'database/requests';

const actions = [
  {
    id: 2,
    icon: 'solar:export-linear',
    title: 'Export',
  }
];

const columns: GridColDef[] = [
  {
    field: '__check__',
    headerName: '',
    width: 40,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'id',
    headerName: 'Entry ID',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 120,
    sortComparator: (v1, v2) => v1.localeCompare(v2)
  },
  {
    field: 'title',
    headerName: 'Title',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 400,
    sortComparator: (v1, v2) => v1.localeCompare(v2),
    renderCell: (params) => (
      <Typography
        variant="body2"
        noWrap={false} // Allow text wrapping
        sx={{
          whiteSpace: 'normal', // Allow wrapping
          overflow: 'hidden', // Hide overflowed text if any
          textOverflow: 'ellipsis', // Optional: show ellipsis if text overflows
        }}
      >
        {params.value}
      </Typography>
    )
  },
  {
    field: 'authors',
    headerName: 'Author',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 200,
    sortComparator: (v1, v2) => v1.localeCompare(v2),
    renderCell: (params) => (
      <Typography
        variant="body2"
        noWrap={false} // Allow text wrapping
        sx={{
          whiteSpace: 'normal', // Allow wrapping
          overflow: 'hidden', // Hide overflowed text if any
          textOverflow: 'ellipsis', // Optional: show ellipsis if text overflows
        }}
      >
        {params.value}
      </Typography>
    ),
    valueGetter: (params : string[]) => {
      // Assuming the object has `firstName` and `lastName` properties
      return `${params.join(', ')}`
    },
  },
  {
    field: 'genres',
    headerName: 'Genre',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 100,
    sortComparator: (v1, v2) => v1.localeCompare(v2),
    renderCell: (params) => (
      <Typography
        variant="body2"
        noWrap={false} // Allow text wrapping
        sx={{
          whiteSpace: 'normal', // Allow wrapping
          overflow: 'hidden', // Hide overflowed text if any
          textOverflow: 'ellipsis', // Optional: show ellipsis if text overflows
        }}
      >
        {params.value}
      </Typography>
    ),
    valueGetter: (params : string[]) => {
      // Assuming the object has `firstName` and `lastName` properties
      return `${params.join(', ')}`
    },
  },
  {
    field: 'publication_date',
    headerName: 'Release',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 50,
    sortComparator: (v1, v2) => v1.localeCompare(v2),
    valueGetter: (params : Date) => {
      // Assuming the object has `firstName` and `lastName` properties
      const [month, , year] = params.toLocaleDateString().split('/');
      return `${month.padStart(2,'0')}-${year.padStart(2,'0')}`;
    },
    renderCell: (params) => (
      <Typography
        variant="body2"
        noWrap={false} // Allow text wrapping
        sx={{
          whiteSpace: 'normal', // Allow wrapping
          overflow: 'hidden', // Hide overflowed text if any
          textOverflow: 'ellipsis', // Optional: show ellipsis if text overflows
          alignItems: 'center',
          display: 'flex', 
        }}
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: 'isbn',
    headerName: 'ISBN',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 120,
    sortComparator: (v1, v2) => v1.localeCompare(v2),
    valueGetter: (params : ISBN10 | ISBN13) => {
      if ('prefix' in params)
      {
        return `${params.prefix.join('')}-${params.isbn10.join('')}`;
      }
      else
      {
        return `${params.join('')}`;
      }
    },
    renderCell: (params) => (
      <Typography
        variant="body2"
        noWrap={false} // Allow text wrapping
        sx={{
          whiteSpace: 'normal', // Allow wrapping
          overflow: 'hidden', // Hide overflowed text if any
          textOverflow: 'ellipsis', // Optional: show ellipsis if text overflows
        }}
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: 'action',
    headerAlign: 'right',
    align: 'right',
    editable: false,
    sortable: false,
    flex: 1,
    minWidth: 100,
    renderHeader: () => <ActionMenu actions={actions} />,
    renderCell: () => <ActionMenu actions={actions} />,
  },
];

interface TaskOverviewTableProps {
  searchText: string;
  updateInventory: boolean;
}

const DataTable = ({ searchText, updateInventory }: TaskOverviewTableProps) => {
  const apiRef = useGridApiRef<GridApi>();

  useEffect(() => {
    apiRef.current.setQuickFilterValues(searchText.split(/\b\W+\b/).filter((word) => word !== ''));
  }, [searchText]);


  const [rows, setRows] = useState<Book[]>([]);

  // Fetch data when the component mounts or when searchText changes
  useEffect(() => {
    fetchData(searchText, setRows); // Call the fetch function when searchText changes or component mounts
  }, [searchText, updateInventory]);


  

  return (
    <DataGrid
      apiRef={apiRef}
      density="standard"
      columns={columns}
      rows={rows}
      rowHeight={50}
      disableColumnResize
      disableColumnMenu
      disableColumnSelector
      disableRowSelectionOnClick
      initialState={{
        pagination: { paginationModel: { pageSize: 15 } },
      }}
      autosizeOptions={{
        includeOutliers: true,
        includeHeaders: false,
        outliersFactor: 1,
        expand: true,
      }}
      slots={{
        pagination: DataGridFooter,
      }}
      checkboxSelection
      pageSizeOptions={[15]}
    />
  );
};

export default DataTable;
