import { createContext, useContext } from 'react';

export const AuthContext = createContext();

// Create a Hook for using the Context
export const useAuth = () => {
	return useContext(AuthContext);
}