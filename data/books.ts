
import { Book } from '../types';

export const categories = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Children', 'Poetry', 'Technology', 'Fantasy', 'Mystery'];

export const allBooks: Book[] = [
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', imageUrl: 'https://images.unsplash.com/photo-1621841951998-f29b4b953a3c?w=500', summary: 'A story of the fabulously wealthy Jay Gatsby and his new love for the beautiful Daisy Buchanan.', year: 1925 },
  { title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500', summary: 'A landmark volume in science writing by one of the great minds of our time.', year: 1988 },
  { title: 'Becoming', author: 'Michelle Obama', category: 'Biography', imageUrl: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=500', summary: 'An intimate, powerful, and inspiring memoir by the former First Lady of the United States.', year: 2018 },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'Fantasy', imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500', summary: 'A timeless classic about the adventures of Bilbo Baggins.', year: 1937 },
  { title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', category: 'History', imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=500', summary: 'A critically acclaimed book that explores the history of humankind.', year: 2011 },
  { title: 'The Catcher in the Rye', author: 'J.D. Salinger', category: 'Fiction', imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500', summary: 'A classic novel about teenage angst and alienation.', year: 1951 },
  { title: 'Cosmos', author: 'Carl Sagan', category: 'Science', imageUrl: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?w=500', summary: 'A journey through the vastness of space and time.', year: 1980 },
  { title: 'Where the Wild Things Are', author: 'Maurice Sendak', category: 'Children', imageUrl: 'https://images.unsplash.com/photo-1571485903253-6975258efb39?w=500', summary: 'A beloved children\'s book about a boy\'s imaginative adventure.', year: 1963 },
  { title: 'Dune', author: 'Frank Herbert', category: 'Fantasy', imageUrl: 'https://images.unsplash.com/photo-1608178388421-26c04f4a3afe?w=500', summary: 'A science fiction epic set in a distant future amidst a feudal interstellar society.', year: 1965 },
  { title: 'The Silent Patient', author: 'Alex Michaelides', category: 'Mystery', imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500', summary: 'A shocking psychological thriller of a woman’s act of violence against her husband.', year: 2019 },
  { title: 'Educated', author: 'Tara Westover', category: 'Biography', imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=500', summary: 'A memoir about a young woman who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.', year: 2018 },
  { title: 'The Laws of Thermodynamics', author: 'Peter Atkins', category: 'Science', imageUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256ec346?w=500', summary: 'An introduction to the four laws of thermodynamics.', year: 2010 }
];

export const featuredBooks: Book[] = allBooks.slice(0, 4);

export const popularCollections = [
  { title: 'Classic Literature', description: 'Explore timeless works from Shakespeare, Austen, Dickens, and more.', imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=500' },
  { title: 'STEM Education', description: 'Resources for science, technology, engineering, and mathematics learning.', imageUrl: 'https://images.unsplash.com/photo-1617791160536-595cfb24c1a5?w=500' },
  { title: 'Children\'s Books', description: 'Engaging stories and educational books for young readers.', imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500' },
];
