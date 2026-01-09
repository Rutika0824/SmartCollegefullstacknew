// // src/auth/AuthContext.jsx
// import { createContext, useState, useEffect } from "react";
// import api from "../api/axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // to prevent UI flash during auth check

//   // Set auth header if token exists
//   const setAuthToken = (token) => {
//     if (token) {
//       api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     } else {
//       delete api.defaults.headers.common["Authorization"];
//     }
//   };

//   const login = async (credentials) => {
//     try {
//       const res = await api.post("/auth/login", credentials);
//       const { token, user: userData } = res.data;

//       localStorage.setItem("token", token);
//       setAuthToken(token);
//       setUser(userData);
//     } catch (err) {
//       // Let the caller handle errors (e.g., show alert in Login form)
//       throw err;
//     }
//   };

//   const register = async (userData) => {
//     try {
//       const res = await api.post("/auth/register", userData);
//       const { token, user: newUser } = res.data;

//       localStorage.setItem("token", token);
//       setAuthToken(token);
//       setUser(newUser);
//     } catch (err) {
//       throw err;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setAuthToken(null);
//     setUser(null);
//   };

//   // On app load: check if valid token exists
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setAuthToken(token);
//       api
//         .get("/auth/me")
//         .then((res) => {
//           setUser(res.data);
//         })
//         .catch(() => {
//           // Invalid/expired token
//           localStorage.removeItem("token");
//           setAuthToken(null);
//           setUser(null);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };









// src/auth/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ← Add loading state

  // Set auth header if token exists
  const setAuthToken = (token) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  };

  const login = async (credentials) => {
    try {
      const res = await api.post("/auth/login", credentials);
      const { token, user: userData } = res.data;

      localStorage.setItem("token", token);
      setAuthToken(token);
      setUser(userData);
    } catch (err) {
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post("/auth/register", userData);
      const { token, user: newUser } = res.data;

      localStorage.setItem("token", token);
      setAuthToken(token);
      setUser(newUser);
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
  };

  // On app load: check if valid token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      api
        .get("/auth/me")
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          // Invalid/expired token
          localStorage.removeItem("token");
          setAuthToken(null);
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};