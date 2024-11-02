import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// material-ui
import { Box, Button, FormHelperText, Grid, Typography } from '@mui/material';

import toast from 'react-hot-toast';
import axios from 'axios';
import { BACKEND_URL } from 'CommonService/CommonService';
import { useNavigate } from 'react-router';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

const AuthLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [loading, setLoading] = useState(false);

  const onsubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/login`, {
        email: data.email,
        password: data.password
      });

      if (response.error) {
        toast.error(response.error.data.message || 'Login failed');
        return;
      }
      toast.success('Login successful!');
      console.log(response.data);
      localStorage.setItem('authToken', response.data.token);
      setTimeout(() => {
        navigate('/dashboard/default');
      }, 1000);
      setLoading(false);
    } catch (error) {
      console.error('Error registering user:', error);
      setLoading(false);
      toast.error('Registration failed. Please try again later.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email format'
              }
            })}
          />
          {errors.email && <span className="invalid-feedback d-block">{errors.email.message}</span>}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long'
                }
              })}
            />
            <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
              <i className={`${showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}`} aria-hidden="true"></i>
            </button>
          </div>
          {errors.password && <span className="invalid-feedback d-block">{errors.password.message}</span>}
        </div>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography variant="subtitle2" color="primary" sx={{ textDecoration: 'none' }}>
              Forgot Password?
            </Typography>
          </Grid>
        </Grid>

        {errors.submit && (
          <Box mt={3}>
            <FormHelperText error>{errors.submit}</FormHelperText>
          </Box>
        )}

        <Box mt={2}>
          <Button color="primary" disabled={loading} fullWidth size="large" type="submit" variant="contained">
            {loading ? 'Loading..' : 'Log In'}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AuthLogin;
