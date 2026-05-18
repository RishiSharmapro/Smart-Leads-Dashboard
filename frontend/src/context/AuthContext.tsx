import {
    createContext,
    useContext,
    useState,
} from "react";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;

    token: string | null;

    login: (
        token: string,
        user: User
    ) => void;

    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {
    children: React.ReactNode;
}) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );

    const [user, setUser] = useState<User | null>(
        localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")!)
            : null
    );

    const login = (
        token: string,
        user: User
    ) => {
        localStorage.setItem("token", token);

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        setToken(token);

        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setToken(null);

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
};