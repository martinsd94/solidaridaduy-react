import { createContext, useContext } from 'react';

export const DataContext = createContext();

// Create a Hook for using the Context
export const useData = () => {
	return useContext(DataContext);
}