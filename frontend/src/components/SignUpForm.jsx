import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, FloatingLabel  } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { logIn } from '../slices/authSlice.js';
import { useSignupMutation } from '../api/authApi.js';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup] = useSignupMutation();
  const { t } = useTranslation();

  const signupValidationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, t('registration.errors.usernameField'))
      .max(20, t('registration.errors.usernameField'))
      .required(t('registration.errors.require')),
    password: yup
      .string()
      .min(6, t('registration.errors.passwordField'))
      .required(t('registration.errors.require')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('registration.errors.confirmField'))
      .required(t('registration.errors.confirmField')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupValidationSchema,
    onSubmit: async ({ username, password }) => {
      const { data } = await signup({ username, password });
      const { token } = data;
      localStorage.setItem('token', token);
      dispatch(logIn(data));
      navigate('/');
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);  

  return (
    <Form className="w-50" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('registration.title')}</h1>
      <FloatingLabel
        className="mb-3"
        label={t('registration.usernameField')}
        controlId="username"
      >
        <Form.Control
          type="text"
          name="username"
          id="username"
          className={formik.touched.username && formik.errors.username ? 'is-invalid' : ''}
          autocomplete="username"
          placeholder={t('registration.usernameField')}
          onChange={formik.handleChange}
          value={formik.values.username}
          onBlur={formik.handleBlur}
          ref={inputRef}
          required
        />
        <div placement="right" class="invalid-tooltip">{formik.errors.username}</div>
      </FloatingLabel>
      <FloatingLabel
        className="mb-3"
        label={t('registration.passwordField')}
        controlId="password"
      >
        <Form.Control
          type="password"
          name="password"
          id="password"
          className={formik.touched.password && formik.errors.password ? 'is-invalid' : ''}
          autocomplete="password"
          placeholder={t('registration.passwordField')}
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          required
        />
        <div placement="right" class="invalid-tooltip">{formik.touched.password ? formik.errors.password : ''}</div>
      </FloatingLabel>
      <FloatingLabel
        className="mb-3"
        label={t('registration.confirmField')}
        controlId="confirmPassword"
      >
        <Form.Control
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}
          autocomplete="confirmPassword"
          placeholder={t('registration.confirmField')}
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          onBlur={formik.handleBlur}
        />
        <div placement="right" class="invalid-tooltip">{formik.touched.password ? formik.errors.confirmPassword : ''}</div>
      </FloatingLabel>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('registration.submit')}</button>
    </Form>
  );
};

export default SignUpForm;
