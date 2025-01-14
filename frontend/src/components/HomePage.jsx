import { useNavigate } from 'react-router-dom';
export const Home = () => {
    const navigate = useNavigate();
    const goHome = () => navigate('/login');

    if (localStorage.length === 0) {
        console.log('work');
        goHome();
    } else {
        return <h1>ГЛАВНАЯ СТРАНИЦА</h1>;
    }
};