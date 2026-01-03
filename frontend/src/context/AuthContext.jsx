import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  useEffect,
} from "react";
import { getMe } from "../api/userClient";

const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLooding, setIsLoadong] = useState(true);

  useLayoutEffect(() => {
    (async () => {
      try {
        const response = await getMe();
        setUser(response.data);
      } catch (e) {
        setUser(null);
      } finally {
        setIsLoadong(false);
      }
    })();
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      setUser(null); // Now React knows!
    };

    window.addEventListener("auth-logout", handleLogout);
    return () => window.removeEventListener("auth-logout", handleLogout);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLooding, setIsLoadong }}>
      {!isLooding ? children : <div>loading</div>}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
