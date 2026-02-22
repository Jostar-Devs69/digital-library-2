
import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative h-56">
         <img 
            src={book.imageUrl || `https://picsum.photos/seed/${encodeURIComponent(book.title)}/400/600`} 
            alt={`Cover of ${book.title}`} 
            className="w-full h-full object-cover"
         />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-bold text-gray-900 truncate">{book.title}</h3>
        <p className="text-sm text-gray-500">{book.author}</p>
        {(book.category || (book.year && book.year > 0)) && (
            <p className="text-xs text-gray-400 mt-1">
                {book.category ? book.category : `Published: ${book.year}`}
            </p>
        )}
        {book.summary && book.summary.length > 0 && <p className="text-sm text-gray-600 mt-2 flex-grow">{book.summary.substring(0, 100)}{book.summary.length > 100 ? '...' : ''}</p>}
        <div className="mt-auto pt-2 flex justify-end">
            <Link 
                to={`/book/${encodeURIComponent(book.title)}`}
                state={{ book }}
                className="px-3 py-1.5 bg-blue-500 text-white text-xs font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
                Read
            </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
