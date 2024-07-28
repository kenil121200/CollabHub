// Author: Kenil Patel
import React, { createContext, useContext} from 'react';

const AuthContextType = {
  isAuthenticated: false,
  user: null,
  logout: () => {},
  handleLogin: () => {},
};

const AuthContext = createContext(AuthContextType);
export const AuthContextProvider = AuthContext.Provider; 

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};