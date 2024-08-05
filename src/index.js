import React,{ createContext, useState }from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//server url
export const server = "https://e-mart-lp43.onrender.com/api/v1";

export const Context = createContext({});

//Used this function because otherwise not be able to declare useState and give them to Context.Provider
const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [isAdmin, setIsAdmin] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        setIsLoading,
        user,
        setUser,
        isAdmin,
        setIsAdmin,
      }}
    >
      <App />
    </Context.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

