
import { User } from '../types';

// NOTE: In a real application, passwords would be hashed and stored securely.
// This is for demonstration purposes only.
export const sampleUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', password: 'password123' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', password: 'Password_123' },
];
