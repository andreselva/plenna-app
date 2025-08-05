import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axiosInstance from '../../api/axiosInstance';

interface AuthContextType {
    user: any;
    login: (userData: any) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const {data: response} = await axiosInstance('/auth');
                setUser(response.payload.user);
            } catch {
                // nada
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const login = (userData: any) => setUser(userData);

    const logout = async () => {
        try {
            setIsLoading(true);
            await axiosInstance.post('/auth/logout',);
            setUser(null);
        } catch {
            //
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: !!user,
            isLoading,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth precisa estar dentro de AuthProvider');
    return ctx;
};
