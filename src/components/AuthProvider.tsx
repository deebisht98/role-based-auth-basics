import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import { User } from "../types/user";
import { getUser, login } from "../api/auth";

type AuthContext = {
    authToken?: string | null;
    currentUser?: User | null; 
    handleLogin: () => Promise<void>;
    handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider ({children}: AuthProviderProps) {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await getUser();
                const {user, authToken} = response[1];
                setAuthToken(authToken);
                setCurrentUser(user);
                
            } catch (error) {
                setAuthToken(null);
                setCurrentUser(null);
                console.error(error);
            }
        }
        fetchUser();
    }, [])

    async function handleLogin () {
        try {
            const response = await login();
            const {user, authToken} = response[1];
            setAuthToken(authToken);
            setCurrentUser(user);
            
        } catch (error) {
            setAuthToken(null);
            setCurrentUser(null);
            console.error(error);
        }
    }

    async function handleLogout () {
        setAuthToken(null);
        setCurrentUser(null);
    }

    return <AuthContext.Provider value={{authToken, currentUser, handleLogin, handleLogout}}>{children}</AuthContext.Provider>
}

export function useAuth () {
    const context = useContext(AuthContext);
    
    if(context === undefined) {
        throw new Error(
            "useAuth must be used inside of a AuthProvider"
        )
    }

    return context;
}