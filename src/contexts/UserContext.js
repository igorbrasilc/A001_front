import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

const LOCAL_STORAGE_KEY = 'A001-token';
const LOCAL_STORAGE_KEY2 = 'A001-user';

const persistedToken = localStorage.getItem(LOCAL_STORAGE_KEY);
const persistedUserInfos = localStorage.getItem(LOCAL_STORAGE_KEY2);

export function UserProvider({children}) {
    const [token, setToken] = useState(persistedToken);
    const [userInfos, setUserInfos] = useState(persistedUserInfos);

    function signIn(token) {
        setToken(token);
        localStorage.setItem(LOCAL_STORAGE_KEY, token);
    }

    function signOut() {
        setToken(null);
        setUserInfos(null);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        localStorage.removeItem(LOCAL_STORAGE_KEY2);
    }

    function updateUserInfos(userInfos) {
        setUserInfos(userInfos);
        localStorage.setItem(LOCAL_STORAGE_KEY2, JSON.stringify(userInfos));
    }

    return (
        <UserContext.Provider value={{token, signIn, signOut, userInfos, updateUserInfos}}>
            {children}
        </UserContext.Provider>
    );
}