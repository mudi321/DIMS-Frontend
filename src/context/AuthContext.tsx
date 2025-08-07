import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Mock authentication logic
    if (email === 'admin@gmail.com' && password === 'admin123') {
      const adminUser: User = {
        id: '1',
        email: 'admin@gmail.com',
        name: 'Admin User',
        role: 'admin',
        createdAt: '2024-01-01',
        lastLogin: new Date().toISOString()
      };
      setUser(adminUser);
      return { success: true };
    } else if (email === 'user@gmail.com' && password === 'user123') {
      const regularUser: User = {
        id: '2',
        email: 'user@gmail.com',
        name: 'John Doe',
        role: 'user',
        createdAt: '2024-01-15',
        lastLogin: new Date().toISOString()
      };
      setUser(regularUser);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const register = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    // Mock registration logic
    if (email && password && name) {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role: 'user',
        createdAt: new Date().toISOString()
      };
      setUser(newUser);
      return { success: true };
    }
    return { success: false, error: 'Registration failed' };
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};