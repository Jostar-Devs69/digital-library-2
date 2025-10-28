
export interface Book {
  title: string;
  author: string;
  summary: string;
  year: number;
  imageUrl?: string;
  category?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
