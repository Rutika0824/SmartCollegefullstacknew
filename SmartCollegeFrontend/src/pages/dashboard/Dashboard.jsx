// // src/pages/dashboard/Dashboard.jsx
// import React, { useState, useEffect, useContext } from 'react';
// import { Container, Row, Col, Card, Button, Badge, ListGroup, ListGroupItem } from 'react-bootstrap';
// import { AuthContext } from '../../auth/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../api/axios';

// const Dashboard = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // Admin stats
//   const [stats, setStats] = useState({
//     departments: 0,
//     courses: 0,
//     students: 0,
//   });

//   // Teacher data
//   const [teacherCourses, setTeacherCourses] = useState([]);
//   const [totalStudents, setTotalStudents] = useState(0);

//   useEffect(() => {
//     if (!user) return;

//     if (user.role === 'admin') {
//       fetchAdminStats();
//     } else if (user.role === 'teacher') {
//       fetchTeacherData();
//     }
//   }, [user]);

//   const fetchAdminStats = async () => {
//     try {
//       const [deptRes, courseRes, studentRes] = await Promise.all([
//         axiosInstance.get('/departments'),
//         axiosInstance.get('/courses'),
//         axiosInstance.get('/students'),
//       ]);
//       setStats({
//         departments: deptRes.data.length,
//         courses: courseRes.data.length,
//         students: studentRes.data.length,
//       });
//     } catch (err) {
//       console.error('Failed to load admin stats');
//     }
//   };

//   const fetchTeacherData = async () => {
//     try {
//       const courseRes = await axiosInstance.get('/courses');
//       setTeacherCourses(courseRes.data);

//       let total = 0;
//       for (const course of courseRes.data) {
//         const studentRes = await axiosInstance.get(`/students?courseId=${course._id}`);
//         total += studentRes.data.length;
//       }
//       setTotalStudents(total);
//     } catch (err) {
//       console.error('Failed to load teacher data');
//     }
//   };

//   if (!user) {
//     return null;
//   }

//   return (
//     <Container fluid className="py-4">
//       {/* Header */}
//       <Row className="mb-4">
//         <Col>
//           <h1 className="display-5 fw-bold">Welcome, <span className="text-primary">{user.name}</span>!</h1>
//           <p className="lead text-muted">Role: <Badge bg={user.role === 'admin' ? 'danger' : 'warning'}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</Badge></p>
//         </Col>
//       </Row>

//       {user.role === 'admin' ? (
//         <>
//           {/* Stats Cards */}
//           <Row className="g-4 mb-4">
//             <Col md={4}>
//               <Card
//                 className="border-0 shadow-sm h-100"
//                 bg="primary"
//                 text="white"
//                 onClick={() => navigate('/departments')}
//                 style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
//                 onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
//                 onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//               >
//                 <Card.Body>
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <Card.Title className="mb-0 display-4">{stats.departments}</Card.Title>
//                       <Card.Text className="mb-0">Departments</Card.Text>
//                     </div>
//                     <i className="bi bi-building fs-1 opacity-75"></i>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={4}>
//               <Card
//                 className="border-0 shadow-sm h-100"
//                 bg="success"
//                 text="white"
//                 onClick={() => navigate('/courses')}
//                 style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
//                 onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
//                 onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//               >
//                 <Card.Body>
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <Card.Title className="mb-0 display-4">{stats.courses}</Card.Title>
//                       <Card.Text className="mb-0">Courses</Card.Text>
//                     </div>
//                     <i className="bi bi-book fs-1 opacity-75"></i>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={4}>
//               <Card
//                 className="border-0 shadow-sm h-100"
//                 bg="info"
//                 text="white"
//                 onClick={() => navigate('/students')}
//                 style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
//                 onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
//                 onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//               >
//                 <Card.Body>
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <Card.Title className="mb-0 display-4">{stats.students}</Card.Title>
//                       <Card.Text className="mb-0">Students</Card.Text>
//                     </div>
//                     <i className="bi bi-people fs-1 opacity-75"></i>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>

//           {/* Quick Actions */}
//           <Row>
//             <Col>
//               <Card className="shadow-sm border-0">
//                 <Card.Header className="bg-white">
//                   <h5 className="mb-0">Quick Actions</h5>
//                 </Card.Header>
//                 <Card.Body>
//                   <div className="d-flex flex-wrap gap-3">
//                     <Button
//                       variant="outline-primary"
//                       size="lg"
//                       onClick={() => navigate('/departments/new')}
//                       className="d-flex align-items-center gap-2"
//                     >
//                       <i className="bi bi-plus-circle me-2"></i>
//                       Add Department
//                     </Button>
//                     <Button
//                       variant="outline-success"
//                       size="lg"
//                       onClick={() => navigate('/courses/new')}
//                       className="d-flex align-items-center gap-2"
//                     >
//                       <i className="bi bi-plus-circle me-2"></i>
//                       Add Course
//                     </Button>
//                     <Button
//                       variant="outline-info"
//                       size="lg"
//                       onClick={() => navigate('/students/new')}
//                       className="d-flex align-items-center gap-2"
//                     >
//                       <i className="bi bi-plus-circle me-2"></i>
//                       Add Student
//                     </Button>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </>
//       ) : user.role === 'teacher' ? (
//         <>
//           {/* Teacher Stats */}
//           <Row className="g-4 mb-4">
//             <Col md={6}>
//               <Card className="border-0 shadow-sm h-100">
//                 <Card.Body>
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <Card.Title className="mb-0 display-4">{teacherCourses.length}</Card.Title>
//                       <Card.Text className="mb-0">Courses You Teach</Card.Text>
//                     </div>
//                     <i className="bi bi-book fs-1 text-success"></i>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={6}>
//               <Card className="border-0 shadow-sm h-100">
//                 <Card.Body>
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <Card.Title className="mb-0 display-4">{totalStudents}</Card.Title>
//                       <Card.Text className="mb-0">Total Students</Card.Text>
//                     </div>
//                     <i className="bi bi-people fs-1 text-info"></i>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>

//           {/* Your Courses */}
//           <Row>
//             <Col>
//               <Card className="shadow-sm border-0">
//                 <Card.Header className="bg-white">
//                   <h5 className="mb-0">Your Courses</h5>
//                 </Card.Header>
//                 <Card.Body>
//                   {teacherCourses.length === 0 ? (
//                     <p className="text-muted">No courses assigned yet.</p>
//                   ) : (
//                     <ListGroup>
//                       {teacherCourses.map((course) => (
//                         <ListGroupItem
//                           key={course._id}
//                           className="d-flex justify-content-between align-items-center py-3"
//                         >
//                           <div>
//                             <strong>{course.name}</strong> <small>({course.code})</small>
//                           </div>
//                           <Button
//                             variant="outline-primary"
//                             size="sm"
//                             onClick={() => navigate(`/attendance?courseId=${course._id}`)}
//                           >
//                             <i className="bi bi-calendar-check me-1"></i> Mark Attendance
//                           </Button>
//                         </ListGroupItem>
//                       ))}
//                     </ListGroup>
//                   )}
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </>
//       ) : null}
//     </Container>
//   );
// };

// export default Dashboard;











// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../auth/AuthContext";
// import api from "../../api/axios";

// export default function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     if (user?.role === "teacher") {
//       api.get("/courses/my").then((res) => setCourses(res.data));
//     }
//   }, [user]);

//   return (
//     <div>
//       <h4 className="mb-3">Dashboard</h4>

//       {user?.role === "admin" && (
//         <div className="alert alert-info">
//           Welcome Admin. Use sidebar to manage college data.
//         </div>
//       )}

//       {user?.role === "teacher" && (
//         <>
//           <h6 className="mb-2">My Courses</h6>

//           <div className="row">
//             {courses.map((c) => (
//               <div key={c._id} className="col-md-4 mb-3">
//                 <div className="card shadow-sm">
//                   <div className="card-body">
//                     <h6>{c.name}</h6>
//                     <p className="text-muted mb-1">
//                       Department: {c.departmentId?.name}
//                     </p>
//                     <span className="badge bg-success">Active</span>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {courses.length === 0 && (
//               <p className="text-muted">No courses assigned.</p>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }






import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import api from "../../api/axios";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (user?.role === "teacher") {
      api
        .get("/courses/my")
        .then((res) => {
          setCourses(res.data?.data || []);
        })
        .catch(() => setCourses([]));
    }
  }, [user]);

  return (
    <div>
      <h4 className="mb-3">Dashboard</h4>

      {user?.role === "admin" && (
        <div className="alert alert-info">
          Welcome Admin. Use sidebar to manage college data.
        </div>
      )}

      {user?.role === "teacher" && (
        <>
          <h6 className="mb-2">My Courses</h6>

          <div className="row">
            {courses.length > 0 ? (
              courses.map((c) => (
                <div key={c._id} className="col-md-4 mb-3">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h6>{c.name}</h6>
                      <p className="text-muted mb-1">
                        Department: {c.departmentId?.name || "-"}
                      </p>
                      <span className="badge bg-success">Active</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">No courses assigned.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
