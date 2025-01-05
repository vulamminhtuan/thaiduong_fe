import React, { useContext,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";


const Register = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [generalError, setGeneralError] = useState(null);
  const {t} = useTranslation(); 
  
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(t('error error'))
        .min(2, t('error error 2')),
      email: Yup.string().email(t('error email')).required(t('error login 1')),
      password: Yup.string()
        .min(6, t('error pass'))
        .required(t('error login 1')),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await api.post('/auth/register', values);
        const { jwt } = response.data;
        localStorage.setItem('token', jwt);
        const decoded = jwtDecode(jwt);
        setAuth({ token: jwt, user: decoded });
        navigate('/login');
      } catch (err) {
        setGeneralError(err.response?.data?.message || t('error register 1'));
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{t('register')}</h2>
      {generalError && <div style={styles.error}>{generalError}</div>}
      <form onSubmit={formik.handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>{t('name')}:</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            style={styles.input}
          />
          {formik.touched.name && formik.errors.name && (
            <div style={styles.error}>{formik.errors.name}</div>
          )}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            style={styles.input}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={styles.error}>{formik.errors.email}</div>
          )}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>{t('pass')}:</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            style={styles.input}
          />
          {formik.touched.password && formik.errors.password && (
            <div style={styles.error}>{formik.errors.password}</div>
          )}
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          style={styles.button}
        >
          {t('register')}
        </button>
      </form>
      <p style={styles.linkText}>
      {t('text register')}{" "}
        <Link to="/login" style={styles.link}>
        {t('login')}
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

export default Register;
