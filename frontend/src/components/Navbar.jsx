import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { logOut } from '../slices/authSlice.js';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const isAuthorized = !!token;
  const { t } = useTranslation();
  const dispach = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    dispach(logOut());
    navigate('/login');
  }

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('navbar.title')}</a>
        {isAuthorized ? <Button variant="primary" onClick={handleLogOut}>{t('navbar.logOutBtn')}</Button> : null}
      </div>
    </nav>
  );
};

export default Navbar;
