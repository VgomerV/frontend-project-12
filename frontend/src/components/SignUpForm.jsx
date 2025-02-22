import React from 'react';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { logIn } from '../slices/authSlice.js';
import { useSignupMutation } from '../api/authApi.js'

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup] = useSignupMutation();

  const signupValidationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, 'От 3 до 20 символов')
      .max(20,'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: yup
      .string()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Пароли должны совпадать'),
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
      <h1 className="text-center mb-4">Регистрация</h1>
      <FloatingLabel
        className="mb-3"
        label="Имя пользователя"
        controlId="username"
      >
        <Form.Control
          type="text"
          name="username"
          id="username"
          className={formik.touched.username && formik.errors.username ? 'is-invalid' : ''}
          autocomplete="username"
          placeholder="Имя пользователя"
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
        label="Пароль"
        controlId="password"
      >
        <Form.Control
          type="password"
          name="password"
          id="password"
          className={formik.touched.password && formik.errors.password ? 'is-invalid' : ''}
          autocomplete="password"
          placeholder="Пароль"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          required
        />
        <div placement="right" class="invalid-tooltip">{formik.touched.password ? formik.errors.password : ''}</div>
      </FloatingLabel>
      <FloatingLabel
        className="mb-3"
        label="Подтвердите пароль"
        controlId="confirmPassword"
      >
        <Form.Control
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}
          autocomplete="confirmPassword"
          placeholder="Подтвердите пароль"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          onBlur={formik.handleBlur}
        />
        <div placement="right" class="invalid-tooltip">{formik.touched.password ? formik.errors.confirmPassword : ''}</div>
      </FloatingLabel>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Зарегистрироваться</button>
    </Form>
  );
};

export default SignUpForm;
