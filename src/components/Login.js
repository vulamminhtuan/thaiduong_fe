import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../api';
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";



const Login = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const {t} = useTranslation(); 
    const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t('error email')).required(t('error login 1')),
      password: Yup.string().min(6, t('error pass')).required(t('error login 1')),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const response = await api.post('/auth/login', values);

        const { jwt } = response.data;
        localStorage.setItem('jwt', jwt); 
        const decoded = jwtDecode(jwt);
        console.log(decoded);
        setAuth({ jwt, user: decoded });

        if (decoded.roles.some((role) => role.name === "ADMIN")) {
          console.log("Navigate to admin page");
          navigate("/admin");
        } else {
          console.log("Navigate to home page");
          navigate("/");
        }
      } catch (err) {
        console.log('Login error:', err);
        if (err.response) {
          console.log('Error response:', err.response.data);
          if (err.response.data.message === 'Bad credentials') {
            setFieldError('email', t('error login 2'));
        
          } else {
            setFieldError('email', err.response.data.message || t('error login 3'));
          }
        } else if (err.request) {
          console.log('Error request:', err.request);
          setFieldError('email', 'Không thể kết nối đến server');
        } else {
          console.log('Error:', err.message);
          setFieldError('email', t('error login 4'));
        }
    
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{t('login')}</h2>
      {formik.errors.general && (
        <p style={styles.error}>{formik.errors.general}</p>
      )}
      <form onSubmit={formik.handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="email"
            required
            style={styles.input}
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={styles.error}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>{t('pass')}</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="current-password"
            required
            style={styles.input}
          />
          {formik.touched.password && formik.errors.password ? (
            <div style={styles.error}>{formik.errors.password}</div>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          style={styles.button}
        >
          {t('login')}
        </button>
      </form>
      <p style={styles.linkText}>
        {t('text login')}{" "}
        <Link to="/register" style={styles.link}>
        {t('register')}
        </Link>
      </p>
    </div>
  );
  };
const styles = {
    container: {
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '24px',
      color: '#333',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      marginBottom: '5px',
      fontSize: '14px',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '14px',
    },
    button: {
      padding: '10px 15px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    buttonDisabled: {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed',
    },
    error: {
      color: 'red',
      fontSize: '12px',
      marginTop: '5px',
    },
    linkText: {
      textAlign: 'center',
      marginTop: '15px',
    },
    link: {
      color: '#007BFF',
      textDecoration: 'none',
    },
  };
export default Login;
