import ReactDOM from 'react-dom/client';
import init from './init.jsx';

console.log("WORK-1");

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(await init());
};

app();

console.log("WORK-2");