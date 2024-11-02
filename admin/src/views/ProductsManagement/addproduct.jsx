import React from 'react';
import { Card, CardHeader, CardContent, Grid, Typography, Divider } from '@mui/material';
import { gridSpacing } from 'config.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  productName: yup.string().required('Product Name is required'),
  productDescription: yup.string().required('Product Description is required'),
  productPrice: yup.number().positive('Product Price must be a positive number').required('Product Price is required'),
  productStock: yup.number().positive('Product Stock must be a positive number').required('Product Stock is required'),
  productImage: yup.mixed().required('Product Image is required')
});

const ProductsManagement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    // Handle form submission here, e.g., send data to backend or perform further actions
    console.log(data); // You can see the form data in the console for now
  };

  return (
    <>
      <Grid container spacing={gridSpacing}>
        <Grid item>
          <Card style={{ width: '1100px' }}>
            <CardHeader
              title={
                <Typography component="div" className="card-header text-center" variant="h3" style={{ fontSize: '20px' }}>
                Product Management
              </Typography>
              
              }
            />
            <Grid item className="mx-3">
              <Link to="/productmanagement" style={{textDecoration:"none"}}>
              <i className="fa fa-arrow-left" aria-hidden="true"></i>{" "}
 Go Back
              </Link>
            </Grid>
            <Divider />
            <CardContent>
            <div className="d-flex justify-content-center align-items-center">
            <Card style={{ width: '500px' }} className='bg-light'>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>  
                <Typography component="div" className="card-header">
                  Product Name
                </Typography>
                <input
                  placeholder="Product Name"
                  className={`form-control ${errors.productName ? 'is-invalid' : ''}`}
                  {...register('productName')}
                />
                {errors.productName && <span className="invalid-feedback d-block">{errors.productName.message}</span>}
                <br />

                <Typography component="div" className="card-header">
                  Product Description
                </Typography>
                <textarea
                  placeholder="Product Description"
                  className={`form-control ${errors.productDescription ? 'is-invalid' : ''}`}
                  {...register('productDescription')}
                />
                {errors.productDescription && <span className="invalid-feedback d-block">{errors.productDescription.message}</span>}
                <br />

                <Typography component="div" className="card-header">
                  Product Price
                </Typography>
                <input
                  type="number"
                  placeholder="Product Price"
                  className={`form-control ${errors.productPrice ? 'is-invalid' : ''}`}
                  {...register('productPrice')}
                />
                {errors.productPrice && <span className="invalid-feedback d-block">{errors.productPrice.message}</span>}
                <br />

                <Typography component="div" className="card-header">
                  Product Stock
                </Typography>
                <input
                  type="number"
                  placeholder="Product Stock"
                  className={`form-control ${errors.productStock ? 'is-invalid' : ''}`}
                  {...register('productStock')}
                />
                {errors.productStock && <span className="invalid-feedback d-block">{errors.productStock.message}</span>}
                <br />

                <Typography component="div" className="card-header">
                  Product Image
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  className={`form-control ${errors.productImage ? 'is-invalid' : ''}`}
                  {...register('productImage')}
                />
                {errors.productImage && <span className="invalid-feedback d-block">{errors.productImage.message}</span>}
                <br />

                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </form>
              </CardContent>
              </Card>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductsManagement;
