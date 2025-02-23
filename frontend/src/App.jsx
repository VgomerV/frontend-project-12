import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import MainPage from './components/MainPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import SignUp from './components/SignUp.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import store from './slices/index.js';
import resources from './locales/index.js';

const App = () => {
  const i18n = i18next.createInstance();
  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
      debug: false,
    });
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Router future = {{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path = '/' element={<MainPage />} />
            <Route path = '/login' element={<LoginPage />} />
            <Route path = '/signup' element={<SignUp />} />
            <Route path = '*' element={<NotFoundPage />} />
          </Routes>
        </Router>
      </Provider>
    </I18nextProvider>
  );
};

export default App;
