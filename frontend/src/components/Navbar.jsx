import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { logOut } from '../slices/authSlice.js';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const isAuthorized = token;

  const dispach = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    dispach(logOut());
    navigate('/login');
  }

  useEffect(() => console.log('RENDER NAVBAR'), [])

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {isAuthorized ? <Button variant="primary" onClick={handleLogOut}>Выйти</Button> : null}
      </div>
    </nav>
  );
};

export default Navbar;
