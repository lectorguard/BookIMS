import { useState, useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, useGridApiRef, GridApi } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import ActionMenu from 'components/common/ActionMenu';
import { ISBN10, ISBN13, Book } from 'database/common';
import { fetchData } from 'database/requests';

// export to json
const doExport = (books : Book[]) => 
{
  const formattedBooks = books.map(book => ({
    ...book,
    publication_date: book.publication_date.toLocaleDateString(),
    isbn : "prefix" in book.isbn ? `${book.isbn.prefix.join("")}-${book.isbn.isbn10.join("")}` : book.isbn.join("") 
  }));
  const jsonContent = JSON.stringify(formattedBooks, null, 2); // Pretty print with 2-space indentation
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'inventory_books.json'; // Specify the filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


const actions = [
  {
    id: 2,
    icon: 'solar:export-linear',
    title: 'Export',
    onClick: doExport
  }
];


interface TaskOverviewTableProps {
  searchText: string;
  updateInventory: boolean;
}

const DataTable = ({ searchText, updateInventory }: TaskOverviewTableProps) => {
  const apiRef = useGridApiRef<GridApi>();

  // We distinguish between database search queries and local search
  // This is the local search ignoring everything in {}
  useEffect(() => {    
    const toSearch = searchText.replace(/{[^}]*}/g, "").trim();
    apiRef.current.setQuickFilterValues(toSearch.split(/\b\W+\b/).filter((word) => word !== ''));
  }, [searchText]);

  // Parser for database queries of shape {column operator value}
  const parseFilters = (searchText: string) => {
    const regex = /\{(.*?)\}/g;
    const matches = searchText.match(regex);

    // Only allowed columns
    const column_list = ['title', 'author', 'genre', 'release', 'isbn'];
    // Only allowed operators
    const operator_list = ['<', '>', '='];
    
    if (!matches) return [];

    let isInvalid = false;
    const result =  matches.map((match) => {
      const [column, operator, value] = match
        .slice(1, -1) // Remove the curly braces
        .split(/(<=|>=|<|>|=)/); // Split by operators
      
        // Handle incomplete database queries by ignoring them
      if (!column_list.includes(column))isInvalid = true;
      if (!operator_list.includes(operator))isInvalid = true;
      if (column ==  null || column.length == 0 || 
        operator == null || operator.length == 0 || 
        value == null || value.length == 0) isInvalid = true;
      return { column, operator, value };
    });
    if (isInvalid)return [];
    else return result;
  };

  // Convert serach bar database queries to SQL queries
  const buildSQLQuery = (filters: Array<{ column: string; operator: string; value: string }>) => {
    const where_filters =  filters
      .map(({ column, operator, value }) => {
        // Handle different value types (like strings) if needed
        let formattedValue = isNaN(Number(value)) ? `${value}` : value;
        // Convert to database slang
        if (column === 'title')
        {
          formattedValue = `'%${value.replace(/^'|'$/g, '')}%'`;
        }
        else if (column === 'author')
        {
          column = 'authors.name'
          formattedValue = `'%${value.replace(/^'|'$/g, '')}%'`;
        }
        else if (column === 'genre')
        {
          column = 'genres.name'
          formattedValue = `'%${value.replace(/^'|'$/g, '')}%'`;
        }
        else if (column === 'release')
        {
          
          column = 'substr(publication_date, 7, 4)'
          formattedValue = `'${value.replace(/^'|'$/g, '')}'`
        }
        else if (column === 'isbn')
        {
          formattedValue = `'${value.split('-').join('').replace(/^'|'$/g, '')}'` 
        }
        if (operator === '=') operator = 'LIKE'
        return `${column} ${operator} ${formattedValue}`;
      })
      .join(' AND ');
    return "WHERE " + where_filters;
  };

  // Controls content shown in book table
  const [rows, setRows] = useState<Book[]>([]);

  // Store previous search globally to prevent unnecessary queries
  const globPrevSearch = useRef('init');
  // Fetch data when the component mounts or when searchText changes
  useEffect(() => {
    const filters = parseFilters(searchText);
    if (globPrevSearch.current === 'init' || searchText === '')
    {
      fetchData('', setRows);
      globPrevSearch.current = '';
    }
    else if (filters.length != 0)
    {
      const sql = buildSQLQuery(filters);
      if (sql === globPrevSearch.current && !updateInventory) return;
      globPrevSearch.current = sql;
      fetchData(sql, setRows);
    }
  }, [searchText, updateInventory]);


  
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
      minWidth: 60,
      sortComparator: (v1, v2) => v1.localeCompare(v2)
    },
    {
      field: 'title',
      headerName: 'Title',
      editable: false,
      align: 'left',
      flex: 2,
      minWidth: 300,
      sortComparator: (v1, v2) => v1.localeCompare(v2),
      renderCell: (params) => (
        <Typography
          variant="body2"
          noWrap={false}
          sx={{
            whiteSpace: 'normal', // Allow wrapping
            overflow: 'hidden', // Hide overflowed text if any
            textOverflow: 'ellipsis',
            marginRight: "3px"
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
      minWidth: 120,
      sortComparator: (v1, v2) => v1.localeCompare(v2),
      renderCell: (params) => (
        <Typography
          variant="body2"
          noWrap={false}
          sx={{
            whiteSpace: 'normal', // Allow wrapping
            overflow: 'hidden', // Hide overflowed text if any
            textOverflow: 'ellipsis', 
            marginRight: "3px"
          }}
        >
          {params.value}
        </Typography>
      ),
      valueGetter: (params : string[]) => {
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
          noWrap={false} 
          sx={{
            whiteSpace: 'normal', // Allow wrapping
            overflow: 'hidden', // Hide overflowed text if any
            textOverflow: 'ellipsis',
            marginRight: "3px"
          }}
        >
          {params.value}
        </Typography>
      ),
      valueGetter: (params : string[]) => {
        return `${params.join(', ')}`
      },
    },
    {
      field: 'publication_date',
      headerName: 'Release',
      editable: false,
      align: 'left',
      flex: 2,
      minWidth: 60,
      sortComparator: (v1, v2) => v1.localeCompare(v2),
      valueGetter: (params : Date) => {
        // Build text date of mm-yyyy from Date
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
            marginRight: "3px"
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
      minWidth: 50,
      renderHeader: () => <ActionMenu actions={actions} books={rows} />,
      renderCell: (params) => {
        const book = params.row;
        return <ActionMenu actions={actions} books={[book]} />;
      },
    },
  ];

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
      autoHeight
    />
  );
};

export default DataTable;
