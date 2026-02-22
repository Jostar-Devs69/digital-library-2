
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
    </svg>
);


const Header: React.FC = () => {
    const location = useLocation();
    const { currentUser, logout } = useAuth();
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Browse', path: '/browse' },
        { name: 'Categories', path: '/categories' },
        { name: 'AI Librarian', path: '/ai-librarian' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];
    
    return (
        <header className="bg-gradient-to-r from-indigo-800 to-purple-700 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <BookIcon className="h-8 w-8 mr-2" />
                        <Link to="/" className="text-xl font-bold tracking-wider">Asianista Digital Library</Link>
                    </div>
                    <nav className="hidden md:flex items-center space-x-4">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                to={link.path} 
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname === link.path ? 'bg-white/20' : 'hover:bg-white/10'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex items-center space-x-2 ml-4">
                            {currentUser ? (
                                <>
                                    <span className="text-sm font-medium">Welcome, {currentUser.name}!</span>
                                    <button
                                        onClick={logout}
                                        className="px-4 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600 transition-colors duration-200"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="px-4 py-2 rounded-md text-sm font-medium bg-white/20 hover:bg-white/30 transition-colors duration-200">
                                        Login
                                    </Link>
                                    <Link to="/register" className="px-4 py-2 rounded-md text-sm font-medium bg-blue-500 hover:bg-blue-600 transition-colors duration-200">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                     <div className="md:hidden">
                        {/* Mobile menu button could go here */}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
