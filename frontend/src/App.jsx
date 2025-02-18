import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainPage from './components/MainPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import store from './slices/index.js';

const App = () => {
  return (
    <Provider store={store}>
      <Router future = {{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path = '/' element={<MainPage />} />
          <Route path = '/login' element={<LoginPage />} />
          <Route path = '*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
