// // src/auth/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../auth/AuthContext";

// export default function ProtectedRoute({ children, allowedRoles }) {
//   const { user } = useContext(AuthContext);

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// }





import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  return children;
}
