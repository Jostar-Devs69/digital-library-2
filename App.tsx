
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BrowsePage from './pages/BrowsePage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryDetailPage from './pages/CategoryDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BookDetailPage from './pages/BookDetailPage';
import AiLibrarianPage from './pages/AiLibrarianPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/category/:categoryName" element={<CategoryDetailPage />} />
            <Route path="/book/:title" element={<BookDetailPage />} />
            <Route path="/ai-librarian" element={<AiLibrarianPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
