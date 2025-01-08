import { BrowserRouter, Routes, Route } from 'react-router-dom';

const BuildPage = (index) => (
    <>
      <h3>Page {index}</h3>
      <div>
        Page {index}
      </div>
    </>
  );
  
const PageOne = () => BuildPage(1);
const PageTwo = () => BuildPage(2);
const NotFound = () => <h1>404</h1>

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="one" element={<PageOne />} />
                <Route path="two" element={<PageTwo />} />
                <Route path="" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
