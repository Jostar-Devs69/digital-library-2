
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { searchBooks } from '../services/geminiService';
import { Book } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';
import { featuredBooks, popularCollections, categories as allCategories, allBooks } from '../data/books';

// Page-specific component for Popular Collections
interface CollectionCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ title, description, imageUrl }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div className="relative h-48">
                <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-end p-4">
                    <h3 className="text-white text-xl font-bold">{title}</h3>
                </div>
            </div>
            <div className="p-4">
                <p className="text-gray-600 text-sm mb-4" style={{minHeight: '40px'}}>{description}</p>
                <a href="#" className="text-blue-600 font-semibold text-sm hover:underline">
                    Browse Collection &rarr;
                </a>
            </div>
        </div>
    );
};

// Helper component to highlight matched text in suggestions
const HighlightedText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
    if (!highlight.trim()) {
        return <>{text}</>;
    }
    const escapedHighlight = highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedHighlight})`, 'gi');
    const parts = text.split(regex);
    
    return (
        <>
            {parts.map((part, i) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <strong key={i} className="font-bold text-indigo-600">{part}</strong>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </>
    );
};


const HomePage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState('No file chosen');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // State for search results and filtering
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [filters, setFilters] = useState({ category: '', author: '', year: '' });

    // State for search suggestions
    const [suggestions, setSuggestions] = useState<Book[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);


    // Effect to filter books when filters or original book list changes
    useEffect(() => {
        let results = [...books];
        if (filters.category) {
            results = results.filter(book => book.category === filters.category);
        }
        if (filters.author) {
            results = results.filter(book => book.author === filters.author);
        }
        if (filters.year) {
            const minYear = parseInt(filters.year, 10);
            if (!isNaN(minYear)) {
                results = results.filter(book => book.year >= minYear);
            }
        }
        setFilteredBooks(results);
    }, [books, filters]);

    // Effect to handle clicks outside of the search suggestion box
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setFileName(file.name);
        }
    };
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 1) {
            const matchedSuggestions = allBooks.filter(
                book => book.title.toLowerCase().includes(query.toLowerCase()) || 
                        book.author.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 5);
            setSuggestions(matchedSuggestions);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (book: Book) => {
        setSearchQuery(book.title);
        setShowSuggestions(false);
    };

    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!searchQuery.trim()) return;

        setShowSuggestions(false);
        setIsLoading(true);
        setError(null);
        setBooks([]);
        setFilters({ category: '', author: '', year: '' }); // Reset filters on new search

        try {
            const results = await searchBooks(searchQuery);
            setBooks(results);
        } catch (err: any) {
            setError(err.message || 'An error occurred while searching.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // Memoize derived state for performance
    const uniqueCategories = React.useMemo(() => [...new Set(books.map(book => book.category).filter(Boolean))] as string[], [books]);
    const uniqueAuthors = React.useMemo(() => [...new Set(books.map(book => book.author))], [books]);


    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <section 
                    className="relative pt-16 flex items-center justify-center bg-cover bg-center"
                    style={{ backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')" }}
                >
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-24 sm:py-32">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                            Discover a World of Knowledge
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
                            Access thousands of free books from around the world in multiple languages.
                        </p>
                        <div className="mt-10 max-w-2xl mx-auto">
                            <form onSubmit={handleSearch} className="space-y-4">
                                <div className="flex flex-col sm:flex-row gap-2" ref={searchContainerRef}>
                                    <div className="relative flex-grow">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                                            className="w-full px-5 py-3 text-base text-gray-800 placeholder-gray-500 bg-white border border-transparent rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            placeholder="Search books, authors, subjects..."
                                            autoComplete="off"
                                        />
                                        {showSuggestions && suggestions.length > 0 && (
                                            <ul className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl z-50 overflow-hidden text-left border border-gray-200">
                                                {suggestions.map((book) => (
                                                    <li key={book.title + book.author} onClick={() => handleSuggestionClick(book)} className="px-4 py-3 text-gray-800 cursor-pointer hover:bg-gray-100 transition-colors duration-150 border-b last:border-b-0">
                                                        <div className="font-medium truncate">
                                                            <HighlightedText text={book.title} highlight={searchQuery} />
                                                        </div>
                                                        <div className="text-sm text-gray-500 truncate">
                                                            by <HighlightedText text={book.author} highlight={searchQuery} />
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-shrink-0 w-full sm:w-auto px-8 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                                    >
                                        {isLoading ? 'Searching...' : 'Search'}
                                    </button>
                                </div>
                            </form>
                            <div className="mt-4 flex flex-col sm:flex-row gap-2">
                                <label className="relative w-full sm:flex-1 cursor-pointer bg-black/50 border border-gray-600 rounded-full text-sm text-gray-300 hover:bg-black/70 transition-colors">
                                    <span className="flex items-center px-4 py-3">
                                        Choose File
                                    </span>
                                    <input type="file" className="hidden" onChange={handleFileChange} />
                                    <span className="absolute right-0 top-0 bottom-0 flex items-center px-4 py-3 text-gray-400 truncate max-w-[calc(100%-8rem)]">{fileName}</span>
                                </label>
                                <button
                                    type="button"
                                    className="flex-shrink-0 w-full sm:w-auto px-8 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Upload File
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Main Content */}
                <section id="content" className="py-16 bg-white border-t border-b border-gray-200">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                         {/* Explore Categories Section */}
                        {!books.length && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Explore Categories</h2>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {allCategories.map(category => (
                                        <Link key={category} to={`/category/${category.toLowerCase()}`} className="px-5 py-2 bg-gray-100 text-gray-800 rounded-full font-medium text-sm hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            {category}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {error && <p className="text-center text-red-500 mb-8">{error}</p>}
                        
                        {isLoading && (
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                                <p className="mt-2 text-gray-600">Finding recommendations...</p>
                            </div>
                        )}

                        {books.length > 0 && !isLoading && (
                             <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Search Results</h2>
                                
                                {/* Filter Controls */}
                                <div className="bg-gray-100 p-4 rounded-lg mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
                                    <select name="category" value={filters.category} onChange={handleFilterChange} className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                        <option value="">All Categories</option>
                                        {uniqueCategories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                    <select name="author" value={filters.author} onChange={handleFilterChange} className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                        <option value="">All Authors</option>
                                        {uniqueAuthors.map(a => <option key={a} value={a}>{a}</option>)}
                                    </select>
                                    <input type="number" name="year" value={filters.year} onChange={handleFilterChange} placeholder="Published after year..." className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                    {filteredBooks.map((book, index) => (
                                        <BookCard key={`${book.title}-${index}`} book={book} />
                                    ))}
                                </div>
                                {filteredBooks.length === 0 && <p className="text-center text-gray-500 col-span-full">No books match your current filters.</p>}
                            </div>
                        )}

                        {books.length === 0 && !isLoading && !error && (
                            <>
                                {/* Featured Books Section */}
                                <div className="mb-16">
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-3xl font-bold text-gray-800">Featured Books</h2>
                                        <Link to="/browse" className="text-blue-600 font-semibold text-sm hover:underline">
                                            View All
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                        {featuredBooks.map((book, index) => (
                                            <BookCard key={index} book={book} />
                                        ))}
                                    </div>
                                </div>

                                {/* Popular Collections Section */}
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Popular Collections</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {popularCollections.map((collection, index) => (
                                            <CollectionCard 
                                                key={index}
                                                title={collection.title}
                                                description={collection.description}
                                                imageUrl={collection.imageUrl}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
