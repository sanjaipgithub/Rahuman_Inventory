import React from 'react';
import { Card, CardHeader, CardContent, Grid, Typography, Divider } from '@mui/material';
import { gridSpacing } from 'config.js';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';



const ProductsManagement = () => {

const data = [
  { id: 1, title: 'Conan the Barbarian', year: '1982' },
  { id: 2, title: 'The Terminator', year: '1984' },
  { id: 3, title: 'Commando', year: '1985' },
  { id: 4, title: 'Predator', year: '1987' },
  { id: 5, title: 'Total Recall', year: '1990' },
  { id: 6, title: 'Terminator 2: Judgment Day', year: '1991' }
];

const columns = [
  {
    name: 'Id',
    selector: (row) => row.id,
    sortable: true
  },
  {
    name: 'Product Name',
    selector: (row) => row.title,
    sortable: true
  },
  {
    name: 'Product Price',
    selector: (row) => row.price, // Assuming 'price' instead of 'year'
    sortable: true
  },
  {
    name: 'Product Stock',
    selector: (row) => row.stock, // Assuming 'stock' instead of 'year'
    sortable: true
  },
  {
    name: 'Actions',
    cell: (row) => (
      <button
        onClick={() => navigate(`/editproduct/${row.id}`)}
        className='btn btn-primary'
      >
        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true
  },
  {
    name: 'Actions',
    cell: (row) => <button onClick={() => handleDelete(row.id)} className='btn btn-danger'><i className="fa fa-trash-o" aria-hidden="true"></i></button>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true
  }
];

const handleDelete = (id) => {
  console.log(`Deleting row with id: ${id}`);
};



  const navigate = useNavigate();
  return (
    <>
      <Grid container spacing={gridSpacing}>
        <Grid item>
          <Card style={{ width: '1150px' }}>
            <CardHeader
              title={
                <Typography component="div" className="card-header text-center " variant="h4">
                  Product Management
                </Typography>
              }
            />
            <Divider />
            <Grid item className="d-flex justify-content-end mx-3">
              <Link to="/addproduct" className="btn btn-dark">
                Add Product
              </Link>
            </Grid>

            <CardContent>
              <DataTable columns={columns} data={data} pagination />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductsManagement;
