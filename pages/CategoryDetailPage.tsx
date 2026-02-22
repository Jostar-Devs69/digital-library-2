
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';
import { allBooks } from '../data/books';
import { Book } from '../types';

const CategoryDetailPage: React.FC = () => {
    const { categoryName } = useParams<{ categoryName: string }>();
    
    const booksInCategory = allBooks.filter(book => book.category?.toLowerCase() === categoryName?.toLowerCase());
    
    const formattedCategoryName = categoryName
        ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
        : 'Category';

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow pt-16">
                <div className="bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
                            {formattedCategoryName} Books
                        </h1>
                        {booksInCategory.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                                {booksInCategory.map((book, index) => (
                                    <BookCard key={index} book={book} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-600">No books found in this category.</p>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CategoryDetailPage;
