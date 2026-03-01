import React from 'react';
import { createContext, useState, useContext } from 'react';
import LoadingSpinner from '../components/LoadingSpinner'; 

const LoadingContext = createContext();
export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ setLoading }}>
      {loading && <LoadingSpinner />}
      {children}
    </LoadingContext.Provider>
  );
}
export function useLoading() {
  return useContext(LoadingContext);
}