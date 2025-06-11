import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Library from './pages/Library';
import Shop from './pages/Shop';
import Social from './pages/Social';

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 p-4 text-white">
        <ul className="flex space-x-4">
          <li>
            <Link to="/library" className="hover:text-gray-300">Bibliothèque</Link>
          </li>
          <li>
            <Link to="/shop" className="hover:text-gray-300">Boutique</Link>
          </li>
          <li>
            <Link to="/social" className="hover:text-gray-300">Réseau Social</Link>
          </li>
        </ul>
      </nav>

      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/library" element={<Library />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/social" element={<Social />} />
          {/* Redirection vers la bibliothèque par défaut ou une page d'accueil */}
          <Route path="/" element={<Library />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 