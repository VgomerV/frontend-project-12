import axios from 'axios';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import avatar from "../assets/avatar.jpg";
import { useNavigate } from 'react-router-dom';

const LoginError = (isAuthorized) => isAuthorized ? <div className="invalid-tooltip">Неверные имя пользователя или пароль</div> : null;

const SignupForm = () => {
  const [ errorAuthorized, setErrorAuthorized ] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: ({username, password}) => {
      axios.post('api/v1/login', { username, password })
        .then((response) => {
          const { token, username } = response.data;

          localStorage.setItem('token', token);
          localStorage.setItem('uername', username);

          if (localStorage.token) {
            navigate('/');
          }
        })
        .catch(() => {
          setErrorAuthorized(true);
        });
      },
    });

  return (
    <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
          <input
          type="username"
          name="username"
          id="username"
          className={`form-control ${errorAuthorized ? 'is-invalid' : ''}`}
          autocomplete="username"
          required
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
            className={`form-control ${errorAuthorized ? 'is-invalid' : ''}`}
            required
            autocomplete="current-password"
            placeholder="Пароль"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <label htmlFor="password" className="form-label">Пароль</label>
          {LoginError(errorAuthorized)}
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
    </form>
  );
};

const LoginPage = () => (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
            <a className="navbar-brand">Hexlet Chat</a>
        </div>
      </nav>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                    <div className="card-body row p-5">
                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                            <img src={avatar} className="rounded-circle" alt="Войти"/>
                        </div>
                        <SignupForm />
                    </div>
                    <div className="card-footer p-4">
                        <div className="text-center">
                            <span>Нет аккаунта?</span>
                            <a href="/signup"> Регистрация</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );

  export default LoginPage;