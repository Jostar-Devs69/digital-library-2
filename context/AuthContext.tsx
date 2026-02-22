
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { sampleUsers } from '../data/users';

interface AuthContextType {
    currentUser: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        const storedUser = sessionStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if (currentUser) {
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            sessionStorage.removeItem('currentUser');
        }
    }, [currentUser]);

    const login = async (email: string, password: string): Promise<void> => {
        const user = sampleUsers.find(u => u.email === email && u.password === password);
        if (user) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: _, ...userToStore } = user;
            setCurrentUser(userToStore);
        } else {
            throw new Error('Invalid email or password');
        }
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const register = async (name: string, email: string, password: string): Promise<void> => {
        const existingUser = sampleUsers.find(u => u.email === email);
        if (existingUser) {
            throw new Error('An account with this email already exists.');
        }
        // In a real app, you'd save this to a database and hash the password.
        // For this demo, we'll just confirm that the check passed.
        console.log("New user registered (mock):", { name, email });
    };

    const value = { currentUser, login, logout, register };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
