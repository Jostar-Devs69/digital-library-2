
import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChatMessage } from '../types';
import { GoogleGenAI, Chat } from '@google/genai';

const UserIcon: React.FC = () => (
    <svg className="w-8 h-8 text-white bg-blue-500 rounded-full p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
);

const BotIcon: React.FC = () => (
    <svg className="w-8 h-8 text-white bg-indigo-500 rounded-full p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
    </svg>
);

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isUser = message.role === 'user';
    return (
        <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
            {!isUser && <BotIcon />}
            <div className={`px-4 py-3 rounded-xl max-w-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                <p className="whitespace-pre-wrap">{message.text}</p>
            </div>
            {isUser && <UserIcon />}
        </div>
    );
};

const AiLibrarianPage: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const initChat = () => {
            try {
                const apiKey = process.env.API_KEY;
                if (!apiKey) {
                    throw new Error("API key not found.");
                }
                const ai = new GoogleGenAI({ apiKey });
                chatRef.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: 'You are a friendly and knowledgeable AI Librarian. Your goal is to help users discover new books. You can answer questions about authors, genres, and provide personalized recommendations based on their interests. Keep your responses engaging and helpful. Use markdown for formatting lists or titles.',
                    },
                });
                setMessages([{
                    role: 'model',
                    text: 'Hello! I am your personal AI Librarian. How can I help you find your next great read today?'
                }]);
            } catch (err: any) {
                setError(err.message || 'Failed to initialize the AI Librarian. Please check your API key.');
                console.error(err);
            }
        };
        initChat();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await chatRef.current.sendMessage({ message: input });
            const modelMessage: ChatMessage = { role: 'model', text: response.text };
            setMessages(prev => [...prev, modelMessage]);
        } catch (err: any) {
            setError('Sorry, something went wrong. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow pt-16 flex flex-col">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-4">
                        Chat with the AI Librarian
                    </h1>
                    <p className="text-center text-gray-600 mb-8">Get personalized book recommendations and answers to your literary questions.</p>
                    
                    <div className="flex-grow bg-white rounded-lg shadow-lg p-6 flex flex-col">
                        <div className="flex-grow overflow-y-auto space-y-6 pr-4">
                            {messages.map((msg, index) => (
                                <ChatBubble key={index} message={msg} />
                            ))}
                            {isLoading && (
                                <div className="flex items-start gap-3">
                                    <BotIcon />
                                    <div className="px-4 py-3 rounded-xl bg-gray-200 text-gray-800">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                             <div ref={messagesEndRef} />
                        </div>
                        
                        {error && <p className="text-red-500 text-center my-2">{error}</p>}
                        
                        <div className="mt-6 pt-4 border-t">
                             <form onSubmit={handleSubmit} className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask for a book recommendation..."
                                    className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    disabled={isLoading || !!error}
                                />
                                <button type="submit" disabled={isLoading || !input.trim()} className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AiLibrarianPage;
