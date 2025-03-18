import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, FloatingLabel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import cn from 'classnames';
import { logIn } from '../slices/authSlice.js';
import { useLoginMutation } from '../api/authApi.js';

const LoginForm = () => {
  const [errorAuthorized, setErrorAuthorized] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ username, password }) => {
      try {
        const { data, error } = await login({ username, password });

        if (error) throw error.status;

        localStorage.setItem('token', data.token);
        dispatch(logIn(data));
        navigate('/');
      } catch (errorStatus) {
        if (errorStatus === 401) {
          setErrorAuthorized(t('loginPage.error'));
        } else {
          toast.error(t('networkError'));
        }
      }
    },
  });

  const classInput = cn({
    'is-invalid': errorAuthorized,
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
      <FloatingLabel
        className="mb-3"
        label={t('loginPage.usernameField')}
        controlId="username"
      >
        <Form.Control
          type="text"
          name="username"
          id="username"
          className={classInput}
          autocomplete="username"
          placeholder={t('loginPage.usernameField')}
          onChange={formik.handleChange}
          value={formik.values.username}
          ref={inputRef}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        className="mb-3"
        label={t('loginPage.passwordField')}
        controlId="password"
      >
        <Form.Control
          type="password"
          name="password"
          id="password"
          className={classInput}
          autocomplete="password"
          placeholder={t('loginPage.passwordField')}
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          required
        />
        <div className="invalid-tooltip">{errorAuthorized}</div>
      </FloatingLabel>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('loginPage.submit')}</button>
    </Form>
  );
};

export default LoginForm;
