import { useEffect, useState } from "react";
import { AuthContextProvider }  from "./AuthContext";


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
  
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const codeParam = urlParams.get('code');

        if (codeParam && !localStorage.getItem('accessToken')) {
            getAccessToken(codeParam);
        } else if (localStorage.getItem('accessToken')) {
            getUserData();
        }
    }, []);
  
    const getAccessToken = async (code: string) => {
        const response = await fetch(`${process.env.VITE_BACKEND_LINK}/auth/getAccessToken?code=${code}`, {
          method: 'GET',
        });
        const data = await response.json();
        if (data.access_token) {
          localStorage.setItem('accessToken', data.access_token);
          getUserData();
        }
    };
    
    const getUserData = async () => {
        const response = await fetch(`${process.env.VITE_BACKEND_LINK}/user/getUserData`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setUser(data);
        setIsAuthenticated(true); 
    };
  
    const logout = () => {
      localStorage.removeItem('accessToken');
      setIsAuthenticated(false);
      setUser(null);
    };
  
    const handleLogin = () => {
      window.location.assign(`https://github.com/login/oauth/authorize?client_id=${process.env.VITE_CLIENT_ID_GITHUB}`);
    };
  
    return (
      <AuthContextProvider value={{ isAuthenticated, user, logout, handleLogin }}>
        {children}
      </AuthContextProvider>
    );
  };