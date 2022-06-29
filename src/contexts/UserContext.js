import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

const LOCAL_STORAGE_KEY = 'A001-token';
const persistedToken = localStorage.getItem(LOCAL_STORAGE_KEY);

export function UserProvider({children}) {
    const [token, setToken] = useState(persistedToken);

    function signIn(token) {
        setToken(token);
        localStorage.setItem(LOCAL_STORAGE_KEY, token);
    }

    function signOut() {
        setToken(null);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }

    return (
        <UserContext.Provider value={{token, signIn, signOut}}>
            {children}
        </UserContext.Provider>
    );
}