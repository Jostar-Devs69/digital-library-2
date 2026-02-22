
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';
import { allBooks } from '../data/books';

const BrowsePage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow pt-16">
                <div className="bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
                            Browse All Books
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                            {allBooks.map((book, index) => (
                                <BookCard key={index} book={book} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BrowsePage;
