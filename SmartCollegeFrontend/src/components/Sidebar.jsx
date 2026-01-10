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

// // src/components/Sidebar.jsx
// import { NavLink } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../auth/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Sidebar() {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <div style={{width: "200px"}}>
//       <div className="col-md-3 col-lg-2 bg-dark text-white min-vh-100 p-3 d-flex flex-column" style={{width: "100%"}}>
//         <h5 className="mb-4">Smart College</h5>

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
//           {user ? (
//             <>
//               <small className="d-block text-muted">Logged in as:</small>
//               <strong>{user.name}</strong> ({user.role})
//               <button
//                 onClick={handleLogout}
//                 className="btn btn-outline-light btn-sm w-100 mt-2"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <p className="text-muted">Not logged in</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { NavLink } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../auth/AuthContext";

// export default function Sidebar() {
//   const { user } = useContext(AuthContext);

//   if (!user) return null;

//   return (
//     <div className="col-md-3 col-lg-2 bg-dark text-white min-vh-100 p-3">
//       <h5 className="text-center mb-4">Smart College</h5>

//       <NavLink className="nav-link text-white mb-2" to="/dashboard">
//         Dashboard
//       </NavLink>

//       {user.role === "admin" && (
//         <>
//           <NavLink className="nav-link text-white mb-2" to="/departments">
//             Departments
//           </NavLink>
//           <NavLink className="nav-link text-white mb-2" to="/courses">
//             Courses
//           </NavLink>
//           <NavLink className="nav-link text-white mb-2" to="/students">
//             Students
//           </NavLink>
//         </>
//       )}

//       {(user.role === "teacher" || user.role === "admin") && (
//         <NavLink className="nav-link text-white mb-2" to="/attendance">
//           Attendance
//         </NavLink>
//       )}

//       {user.role === "student" && (
//         <>
//           <NavLink className="nav-link text-white mb-2" to="/dashboard">
//             Dashboard
//           </NavLink>
//           <NavLink className="nav-link text-white mb-2" to="/my-attendance">
//             My Attendance
//           </NavLink>
//         </>
//       )}
//     </div>
//   );
// }












import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Sidebar() {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  const linkClass = ({ isActive }) =>
    `nav-link text-white ${isActive ? "fw-bold bg-secondary rounded" : ""}`;

  return (
    <div className="col-md-3 col-lg-2 bg-dark min-vh-100 p-3">
      <h5 className="text-center text-white mb-4">Smart College</h5>

      {/* Common */}
      <NavLink to="/dashboard" className={linkClass}>
        Dashboard
      </NavLink>

      {/* ================= ADMIN ================= */}
      {user.role === "admin" && (
        <>
          <hr className="text-secondary" />

          <small className="text-secondary">ADMIN</small>

          {/* Departments */}
          <NavLink to="/departments" className={linkClass}>
            Departments
          </NavLink>
          <NavLink to="/departments/add" className={linkClass}>
            Add Department
          </NavLink>

          {/* Courses */}
          <NavLink to="/courses" className={linkClass}>
            Courses
          </NavLink>
          <NavLink to="/courses/add" className={linkClass}>
            Add Course
          </NavLink>

          {/* Students */}
          <NavLink to="/students" className={linkClass}>
            Students
          </NavLink>
          <NavLink to="/students/add" className={linkClass}>
            Add Student
          </NavLink>

          {/* Attendance */}
          <NavLink to="/attendance/list" className={linkClass}>
            Attendance Records
          </NavLink>
        </>
      )}

      {/* ================= TEACHER ================= */}
      {user.role === "teacher" && (
        <>
          <hr className="text-secondary" />

          <small className="text-secondary">TEACHER</small>

          <NavLink to="/attendance" className={linkClass}>
            Mark Attendance
          </NavLink>
          <NavLink to="/attendance/list" className={linkClass}>
            Attendance Records
          </NavLink>
        </>
      )}

      {/* ================= STUDENT ================= */}
      {user.role === "student" && (
        <>
          <hr className="text-secondary" />

          <small className="text-secondary">STUDENT</small>

          <NavLink to="/my-attendance" className={linkClass}>
            My Attendance
          </NavLink>
        </>
      )}
    </div>
  );
}
