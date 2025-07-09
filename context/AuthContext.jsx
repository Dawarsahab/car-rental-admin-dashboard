import { createContext, useState, useContext, useEffect } from 'react';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { adminToken } = parseCookies();
    if (adminToken) {
      setUser({ email: 'admin@example.com' });
    }
  }, []);

  const login = async (email, password) => {
    if (email === 'admin@example.com' && password === 'password') {
      setCookie(null, 'adminToken', 'mock-token', { maxAge: 30 * 24 * 60 * 60 });
      setUser({ email });
      return true;
    }
    return false;
  };

  const logout = () => {
    destroyCookie(null, 'adminToken');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);