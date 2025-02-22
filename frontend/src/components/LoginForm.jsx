import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useFormik } from 'formik';
import cn from 'classnames';
import { logIn } from '../slices/authSlice.js';
import { useLoginMutation } from '../api/authApi.js'

const LoginForm = () => {
  const [errorAuthorized, setErrorAuthorized] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ username, password }) => {
      const { data, error } = await login({ username, password });

      localStorage.setItem('token', data.token);
      dispatch(logIn(data));

      error 
        ? setErrorAuthorized('Неверные имя пользователя или пароль')
        : navigate('/');
    },
  });

  const classInput = cn({ 
    'is-invalid': errorAuthorized ? true : false,
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>
      <FloatingLabel
        className="mb-3"
        label="Ваш ник"
        controlId="username"
      >
        <Form.Control
          type="text"
          name="username"
          id="username"
          className={classInput}
          autocomplete="username"
          placeholder="Ваш ник"
          onChange={formik.handleChange}
          value={formik.values.username}
          ref={inputRef}
          required
        />
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
          className={classInput}
          autocomplete="password"
          placeholder="Пароль"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          required
        />
        <div placement="right" class="invalid-tooltip">{errorAuthorized}</div>
      </FloatingLabel>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
    </Form>
  );
};

export default LoginForm;
