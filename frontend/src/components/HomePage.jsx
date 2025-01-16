import { Navigate } from 'react-router-dom';
export const Home = () => localStorage.token ? <h1>ГЛАВНАЯ СТРАНИЦА</h1> : <Navigate to="/login" />;
    