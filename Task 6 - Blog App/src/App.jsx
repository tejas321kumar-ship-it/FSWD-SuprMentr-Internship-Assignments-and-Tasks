import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogDetails from './pages/BlogDetails';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="page">
        <h1>Blog App</h1>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/blogs">Blogs List</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
