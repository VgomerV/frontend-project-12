import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import avatar from "../assets/avatar.jpg";

const createUrl = (url) => {
    const proxy = 'http://localhost:5001/post';
    const fullUrl = new URL(proxy);
    fullUrl.searchParams.set('url', url);
  
    return fullUrl;
  };

export const Login = () => (
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
                        <Formik
                            initialValues={{ username: "", password: "" }}
                            onSubmit={({ setSubmitting }, initialValues) => {
                                console.log("Form is validated! Submitting the form...");
                                axios.post(createUrl('/api/v1/login'), initialValues).then((response) => {
                                    console.log(response.data); // =>[{ id: '1', name: 'general', removable: false }, ...]
                                  });
                                setSubmitting(false);
                            }}
                        >
                            <Form className="col-12 col-md-6 mt-3 mt-md-0">
                            <h1 className="text-center mb-4">Войти</h1>
                            <div className="form-floating mb-3">
                                <Field
                                type="username"
                                name="username"
                                id="username"
                                className="form-control"
                                autocomplete="username"
                                required
                                placeholder="Ваш ник"
                                />
                                <label htmlFor="username">Ваш ник</label>
                            </div>
                            <div className="form-floating mb-4">
                                <Field
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="Пароль"
                                />
                                <label htmlFor="password" className="form-label">Пароль</label>
                            </div>
                            <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
                            </Form>
                        </Formik>
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
