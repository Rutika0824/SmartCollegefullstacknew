// import { useContext } from "react";
// import { AuthContext } from "../auth/AuthContext";
// import { useNavigate } from "react-router-dom"; // 👈 add this
// import { NavLink } from "react-bootstrap";

// export default function Sidebar() {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <div style={{width: "200px"}}>
//       <div
//         className="col-md-3 col-lg-2 text-white min-vh-100 p-3 d-flex flex-column bg-dark"
//         style={{ width: "100%" }}
//       >
//         <h5 className="mb-4">Smart College</h5>

//         {/* Navigation Links */}
//         <nav className="flex-grow-1">
//           <NavLink
//             to="/dashboard"
//             className={({ isActive }) =>
//               `d-block text-white mb-2 text-decoration-none ${
//                 isActive
//                   ? "fw-bold border-start border-3 border-primary ps-2"
//                   : "ps-2"
//               }`
//             }
//           >
//             Dashboard
//           </NavLink>

//           {user?.role === "admin" && (
//             <>
//               <NavLink
//                 to="/departments"
//                 className={({ isActive }) =>
//                   `d-block text-white mb-2 text-decoration-none ${
//                     isActive
//                       ? "fw-bold border-start border-3 border-primary ps-2"
//                       : "ps-2"
//                   }`
//                 }
//               >
//                 Departments
//               </NavLink>
//               <NavLink
//                 to="/courses"
//                 className={({ isActive }) =>
//                   `d-block text-white mb-2 text-decoration-none ${
//                     isActive
//                       ? "fw-bold border-start border-3 border-primary ps-2"
//                       : "ps-2"
//                   }`
//                 }
//               >
//                 Courses
//               </NavLink>
//               <NavLink
//                 to="/students"
//                 className={({ isActive }) =>
//                   `d-block text-white mb-2 text-decoration-none ${
//                     isActive
//                       ? "fw-bold border-start border-3 border-primary ps-2"
//                       : "ps-2"
//                   }`
//                 }
//               >
//                 Students
//               </NavLink>
//             </>
//           )}

//           {(user?.role === "teacher" || user?.role === "admin") && (
//             <NavLink
//               to="/attendance"
//               className={({ isActive }) =>
//                 `d-block text-white mb-2 text-decoration-none ${
//                   isActive
//                     ? "fw-bold border-start border-3 border-primary ps-2"
//                     : "ps-2"
//                 }`
//               }
//             >
//               Attendance
//             </NavLink>
//           )}
//         </nav>

//         {/* User Info + Logout */}
//         <div className="mt-auto pt-3 border-top border-secondary">
//           <small className="d-block text-muted">Logged in as:</small>
//           <strong>{user?.name}</strong> ({user?.role})
//           <button
//             onClick={handleLogout}
//             className="btn btn-outline-light btn-sm w-100 mt-2"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{width: "200px"}}>
      <div className="col-md-3 col-lg-2 bg-dark text-white min-vh-100 p-3 d-flex flex-column" style={{width: "100%"}}>
        <h5 className="mb-4">Smart College</h5>

        <nav className="flex-grow-1">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `d-block text-white mb-2 text-decoration-none ${
                isActive
                  ? "fw-bold border-start border-3 border-primary ps-2"
                  : "ps-2"
              }`
            }
          >
            Dashboard
          </NavLink>

          {user?.role === "admin" && (
            <>
              <NavLink
                to="/departments"
                className={({ isActive }) =>
                  `d-block text-white mb-2 text-decoration-none ${
                    isActive
                      ? "fw-bold border-start border-3 border-primary ps-2"
                      : "ps-2"
                  }`
                }
              >
                Departments
              </NavLink>
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  `d-block text-white mb-2 text-decoration-none ${
                    isActive
                      ? "fw-bold border-start border-3 border-primary ps-2"
                      : "ps-2"
                  }`
                }
              >
                Courses
              </NavLink>
              <NavLink
                to="/students"
                className={({ isActive }) =>
                  `d-block text-white mb-2 text-decoration-none ${
                    isActive
                      ? "fw-bold border-start border-3 border-primary ps-2"
                      : "ps-2"
                  }`
                }
              >
                Students
              </NavLink>
            </>
          )}

          {(user?.role === "teacher" || user?.role === "admin") && (
            <NavLink
              to="/attendance"
              className={({ isActive }) =>
                `d-block text-white mb-2 text-decoration-none ${
                  isActive
                    ? "fw-bold border-start border-3 border-primary ps-2"
                    : "ps-2"
                }`
              }
            >
              Attendance
            </NavLink>
          )}
        </nav>

        {/* User Info + Logout */}
        <div className="mt-auto pt-3 border-top border-secondary">
          {user ? (
            <>
              <small className="d-block text-muted">Logged in as:</small>
              <strong>{user.name}</strong> ({user.role})
              <button
                onClick={handleLogout}
                className="btn btn-outline-light btn-sm w-100 mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <p className="text-muted">Not logged in</p>
          )}
        </div>
      </div>
    </div>
  );
}
