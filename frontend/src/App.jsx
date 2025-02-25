import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import { ToastContainer, Bounce } from 'react-toastify';
import filter from 'leo-profanity';
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
    const ru = filter.getDictionary('ru');
    filter.add(ru);

    const rollbarConfig = {
      accessToken: 'dcf03e877a0d407387cb8a3404559e99',
      environment: 'production',
      captureUncaught: true,
      captureUnhandledRejections: true,
    };

    // function TestError() {
    //   const a = null;
    //   return a.hello();
    // }

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        {/* <TestError /> */}
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <Router future = {{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  transition={Bounce}
                />
              <Routes>
                <Route path = '/' element={<MainPage />} />
                <Route path = '/login' element={<LoginPage />} />
                <Route path = '/signup' element={<SignUp />} />
                <Route path = '*' element={<NotFoundPage />} />
              </Routes>
            </Router>
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
