import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import cn from 'classnames';
import getRoute from '../utilites/routes.js';

const LoginForm = () => {
  const [errorAuthorized, setErrorAuthorized] = useState();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: ({username, password}) => {
      axios.post(getRoute('login'), { username, password })
        .then((response) => {
          const { token, username } = response.data;
          const user = {
            token,
            username,
          }
          localStorage.setItem('user', JSON.stringify(user));
          navigate('/');
        })
        .catch(() => {
          setErrorAuthorized('Неверные имя пользователя или пароль');
        });
      },
    });

  const classInput = cn({ 
    'form-control': true,
    'is-invalid': errorAuthorized ? true : false,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
          <input
          type="text"
          name="username"
          id="username"
          className={classInput}
          autocomplete="username"
          required
          autoFocus
          placeholder="Ваш ник"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <label htmlFor="username">Ваш ник</label>
      </div>
      <div className="form-floating mb-4">
          <input
            type="password"
            name="password"
            id="password"
            className={classInput}
            required
            autocomplete="current-password"
            placeholder="Пароль"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <label htmlFor="password" className="form-label">Пароль</label>
          {errorAuthorized ? <div className="invalid-tooltip">Неверные имя пользователя или пароль</div> : null}
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
    </form>
  );
};

export default LoginForm;