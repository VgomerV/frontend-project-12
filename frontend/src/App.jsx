import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotFound } from './components/NotFoundPage';
import { Login } from './components/LoginPage';
import { Home } from './components/HomePage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
