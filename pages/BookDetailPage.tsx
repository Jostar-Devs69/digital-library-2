
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';
import { allBooks } from '../data/books';
import { Book } from '../types';
import { generateDetailedSummary, findSimilarBooks, answerBookQuestion } from '../services/geminiService';

const LoadingSpinner: React.FC<{size?: string}> = ({ size = 'h-8 w-8' }) => (
    <div className={`animate-spin rounded-full ${size} border-b-2 border-indigo-600`}></div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
        <p>{message}</p>
    </div>
);

const BookDetailPage: React.FC = () => {
    const { title } = useParams<{ title: string }>();
    const location = useLocation();
    const [book, setBook] = useState<Book | null>(location.state?.book || null);

    const [summary, setSummary] = useState<string>('');
    const [similarBooks, setSimilarBooks] = useState<Book[]>([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    
    const [isSummaryLoading, setIsSummaryLoading] = useState(true);
    const [isSimilarLoading, setIsSimilarLoading] = useState(true);
    const [isAnswerLoading, setIsAnswerLoading] = useState(false);
    
    const [summaryError, setSummaryError] = useState<string | null>(null);
    const [similarError, setSimilarError] = useState<string | null>(null);

    useEffect(() => {
        let currentBook = location.state?.book;
        if (!currentBook && title) {
            const decodedTitle = decodeURIComponent(title);
            currentBook = allBooks.find(b => b.title === decodedTitle) || null;
        }
        setBook(currentBook);
        
        if (currentBook) {
            // Reset state for new book navigation from the same page
            setSummary('');
            setSimilarBooks([]);
            setSummaryError(null);
            setSimilarError(null);
            setQuestion('');
            setAnswer('');

            const fetchAiContent = async () => {
                setIsSummaryLoading(true);
                setIsSimilarLoading(true);
                
                const [summaryResult, similarResult] = await Promise.allSettled([
                    generateDetailedSummary(currentBook.title, currentBook.author),
                    findSimilarBooks(currentBook.title, currentBook.author)
                ]);

                if (summaryResult.status === 'fulfilled') {
                    setSummary(summaryResult.value);
                } else {
                    console.error("Summary fetch failed:", summaryResult.reason);
                    setSummaryError('Could not load the AI-generated summary. The model may be busy.');
                }
                setIsSummaryLoading(false);

                if (similarResult.status === 'fulfilled') {
                    setSimilarBooks(similarResult.value);
                } else {
                    console.error("Similar books fetch failed:", similarResult.reason);
                    setSimilarError('Could not find similar books at this time.');
                }
                setIsSimilarLoading(false);
            };

            fetchAiContent();
        }
    }, [title, location.state]);

    const handleQuestionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim() || !book) return;

        const currentQuestion = question;
        setQuestion(''); // Clear input for better UX
        setIsAnswerLoading(true);
        setAnswer('');
        try {
            const result = await answerBookQuestion(book.title, book.author, currentQuestion);
            setAnswer(result);
        } catch (error) {
            setAnswer('Sorry, I could not answer that question.');
            console.error(error);
        } finally {
            setIsAnswerLoading(false);
        }
    };

    if (!book) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow pt-16 flex items-center justify-center text-center px-4">
                     <div>
                        <h1 className="text-2xl font-bold text-gray-800">Book Not Found</h1>
                        <p className="text-gray-600 mt-2">The book you are looking for does not exist in our library.</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow pt-16">
                <div className="bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        {/* Book Info Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            <div className="md:col-span-1">
                                <img src={book.imageUrl || `https://picsum.photos/seed/${encodeURIComponent(book.title)}/400/600`} alt={`Cover of ${book.title}`} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                            </div>
                            <div className="md:col-span-2">
                                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{book.title}</h1>
                                <p className="mt-2 text-xl text-gray-600">by {book.author}</p>
                                <p className="mt-1 text-sm text-gray-500">{book.category} &bull; Published: {book.year}</p>
                                
                                <h2 className="mt-8 text-2xl font-bold text-gray-800">AI-Generated Summary</h2>
                                <div className="mt-4 min-h-[10rem] transition-all duration-300">
                                    {isSummaryLoading ? (
                                        <div className="flex justify-start items-center h-40"><LoadingSpinner /></div>
                                    ) : summaryError ? (
                                        <ErrorDisplay message={summaryError} />
                                    ) : (
                                        <div className="prose prose-lg text-gray-600 whitespace-pre-wrap">{summary}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Ask a Question Section */}
                        <div className="mb-16 p-8 bg-gray-100 rounded-lg">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Ask a Question About This Book</h2>
                            <form onSubmit={handleQuestionSubmit} className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
                                <input
                                    type="text"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder="e.g., What is the main theme?"
                                    className="w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <button type="submit" disabled={isAnswerLoading} className="px-6 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors">
                                    {isAnswerLoading ? 'Thinking...' : 'Ask AI'}
                                </button>
                            </form>
                            {isAnswerLoading && <div className="flex justify-center mt-4"><LoadingSpinner size="h-6 w-6"/></div>}
                            {answer && (
                                <div className="mt-4 p-4 bg-white rounded-md shadow-inner max-w-2xl mx-auto transition-opacity duration-500">
                                    <p className="text-gray-700 whitespace-pre-wrap">{answer}</p>
                                </div>
                            )}
                        </div>

                        {/* Similar Books Section */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-8">Similar Books</h2>
                            <div className="min-h-[20rem]">
                                {isSimilarLoading ? (
                                    <div className="flex justify-center items-center h-60"><LoadingSpinner /></div>
                                ) : similarError ? (
                                    <ErrorDisplay message={similarError} />
                                ) : similarBooks.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                        {similarBooks.map((b, index) => (
                                            <BookCard key={index} book={b} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-600 pt-10">No AI-powered recommendations found at this time.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BookDetailPage;
