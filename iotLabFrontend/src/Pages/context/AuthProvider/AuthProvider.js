import React, { createContext } from 'react';
import useDatabase from './../../hooks/useDatabase';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const allContexts = useDatabase();

    return (
        <AuthContext.Provider value={allContexts}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;