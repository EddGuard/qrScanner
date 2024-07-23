import { Children, createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import * as SecureStore from "expo-secure-store";

interface AuthProps {
    authState?: { token:string | null; authenticated:boolean | null };
    onRegister?: (email:string, password:string) => Promise<any>;
    onLogin?: (username:string, password:string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'http://16.170.219.164:8000';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}: any) => {
    const [authState, setAuthState] = useState<{
        token:string | null;
        authenticated:boolean | null;
    }>({
        token: null,
        authenticated: null
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setAuthState({
                    token: token,
                    authenticated: true
                });
            }
        }
        //loadToken();
    }, [])

    const register = async (email: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/api/users`, {email, password});     
        } catch (e) {
            return { error: true, msg: (e as any) };
            
        }
    };

    const login = async (username: string, password: string) => {
        try {
            
            const result = await axios.post(`${API_URL}/authentication_token`, {username, password});

            setAuthState({
                token: result.data.token,
                authenticated: true
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

            return result;
        } catch (e) {
            setAuthState({
                token: null,
                authenticated: false
            });
            return { error: true, msg: (e as any) };
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: null,
            authenticated: false
        });
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}