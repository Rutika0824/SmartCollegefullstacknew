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







// src/components/Sidebar.jsx
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) return null;

  // Helper to generate active class
  const isActive = (path) => location.pathname === path;

  return (
    <div
      className="text-white d-flex flex-column vh-100"
      style={{
        width: "250px", // Fixed width like screenshot
        minWidth: "250px",
        maxWidth: "250px",
        overflowY: "auto",
        borderRight: "1px solid #333",
        backgroundColor:"#0c3346"
      }}
    >
      {/* Header */}
      <div
        className="d-flex flex-column gap-3 justify-content-between align-items-center px-3 py-3 border-bottom border-secondary"
        style={{ minHeight: "60px" }}
      >
        <h5 className="mb-0 fw-bold">Smart College</h5>
        {/* <span className="small">
          Logged in as <strong>{user.role.toUpperCase()}</strong>
        </span> */}
      </div>

      {/* Navigation */}
      <nav className="flex-grow-1 px-3 py-3">
        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={`d-block py-2 px-3 rounded mb-1 ${
            isActive("/dashboard") ? "bg-gray-600" : ""
          }`}
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "0.9rem",
             textAlign:"center"
          }}
        >
          Dashboard
        </NavLink>

        {/* Admin Section Header */}
        <div className="mt-3 mb-2 small fw-bold fs-3 text-center" style={{color:"#dde2e4"}}>ADMIN</div>

        {/* Departments */}
        <NavLink
          to="/departments"
          className={`d-block py-2 px-3 rounded mb-1 ${
            isActive("/departments") ? "bg-gray-600" : ""
          }`}
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "0.9rem",
             textAlign:"center"
          }}
        >
          Departments
        </NavLink>
        <NavLink
          to="/departments/add"
          className={`d-block py-2 px-3 rounded mb-1 ${
            isActive("/departments/add") ? "bg-gray-600" : ""
          }`}
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "0.9rem",
            textAlign:"center"
          }}
        >
          Add Department
        </NavLink>

        {/* Courses */}
        <NavLink
          to="/courses"
          className={`d-block py-2 px-3 rounded mb-1 ${
            isActive("/courses") ? "bg-gray-600" : ""
          }`}
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "0.9rem",
             textAlign:"center"
          }}
        >
          Courses
        </NavLink>
        <NavLink
          to="/courses/add"
          className={`d-block py-2 px-3 rounded mb-1 ${
            isActive("/courses/add") ? "bg-gray-600" : ""
          }`}
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "0.9rem",
             textAlign:"center"
          }}
        >
          Add Course
        </NavLink>

        {/* Students */}
        <NavLink
          to="/students"
          className={`d-block py-2 px-3 rounded mb-1 ${
            isActive("/students") ? "bg-gray-600" : ""
          }`}
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "0.9rem",
             textAlign:"center"
          }}
        >
          Students
        </NavLink>
        <NavLink
          to="/students/add"
          className={`d-block py-2 px-3 rounded mb-1 ${
            isActive("/students/add") ? "bg-gray-600" : ""
          }`}
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "0.9rem",
             textAlign:"center"
          }}
        >
          Add Student
        </NavLink>

        {/* Attendance Records */}
        <NavLink
          to="/attendance/list"
          className={`d-block py-2 px-3 rounded mb-1 ${
            isActive("/attendance/list") ? "bg-gray-600" : ""
          }`}
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "0.9rem",
             textAlign:"center"
          }}
        >
          Attendance Records
        </NavLink>
      </nav>
    </div>
  );
}