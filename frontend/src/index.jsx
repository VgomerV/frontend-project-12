import ReactDOM from 'react-dom/client';
import App from './App.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(await App());
};

app();
