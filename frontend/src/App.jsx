import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import store from './slices/index.js';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path = '/' element={<HomePage />} />
          <Route path = '/login' element={<LoginPage />} />
          <Route path = '*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;



// import { Provider } from 'react-redux';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { NotFound } from './components/NotFoundPage';
// import { Login } from './components/LoginPage';
// import Home from './components/HomePage';
// import store from './slices/index.js';

// const App = () => {
//     return (
//         <Provider store={store}>
//             <BrowserRouter>
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="*" element={<NotFound />} />
//                 </Routes>
//             </BrowserRouter>
//         </Provider>
//     );
// };

// export default App;
