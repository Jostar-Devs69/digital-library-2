
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { categories } from '../data/books';

const CategoryIcon: React.FC = () => (
    <svg className="w-8 h-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zm0 14h.01M7 17h5a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5a2 2 0 012-2z" />
    </svg>
);


const CategoriesPage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow pt-16">
                 <div className="bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
                            Explore by Category
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {categories.map((category) => (
                                <Link
                                    key={category}
                                    to={`/category/${category.toLowerCase()}`}
                                    className="flex items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-indigo-100 hover:shadow-md transition-all duration-200"
                                >
                                    <CategoryIcon />
                                    <span className="ml-4 text-lg font-semibold text-gray-800">{category}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CategoriesPage;
