import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import { useSignupMutation } from '../api/authApi.js'

const SignUpForm = () => {
  const navigate = useNavigate();

  const [signup] = useSignupMutation();

  const signupValidationSchema = yup.object().shape({
    username: yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20,'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: yup.string()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    confirmPassword: yup.string()
      .oneOf(
        [yup.ref('password'), null],
        'Пароли должны совпадать',
      )
      .required('Обязательное поле'),
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
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
    },
  });

  const classInput = cn({ 
    'form-control': true,
    'is-invalid': false ? true : false,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
      <h1 className="text-center mb-4">Регистрация</h1>
      <div className="form-floating mb-3">
          <input
          type="text"
          name="username"
          id="username"
          className={classInput}
          autocomplete="username"
          required
          autoFocus
          placeholder="Имя пользователя"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <label htmlFor="username">Имя пользователя</label>
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
      </div>
      <div className="form-floating mb-4">
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className={classInput}
            required
            autocomplete="current-password"
            placeholder="Пароль"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          <label htmlFor="confirmPassword" className="form-label">Подтвердите пароль</label>
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Зарегистрироваться</button>
    </form>
  );
};

export default SignUpForm;
