import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/students")
      .then((res) => setStudents(res.data))
      .catch(() => setError("Failed to load students"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-5">Loading students...</p>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;

  const getDepartmentName = (id) => {
    if (!id) return '—';
    const dept = departments.find((d) => d._id === id);
    return dept ? dept.name : '—';
  };

  return (
    <div className="card shadow-lg border-0 rounded-3  overflow-hidden">
      <div className="card-header  text-white py-3" style={{backgroundColor:"#1a3f51"}}>
        <h5 className="mb-0 fw-bold">Students</h5>
      </div>
      <div className="card-body p-0">
        {/* ✅ Scrollable Table with Fixed Height & Shadow */}
        <div
          className="table-responsive"
          style={{
            maxHeight: '400px', // 👈 Reduced height
            overflowY: 'auto',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // 👈 Added shadow
          }}
        >
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light sticky-top">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Roll No</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No students found
                  </td>
                </tr>
              )}
              {students.map((s) => (
                <tr key={s._id} className="border-bottom">
                  <td className="px-4 py-3">{s.name}</td>
                  <td className="px-4 py-3">
                    <span className="fw-medium">{s.rollNo || "—"}</span>
                  </td>
                  <td className="px-4 py-3">{s.departmentId?.name || "—"}</td>
                  <td className="px-4 py-3">{s.courseId?.name || "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`badge ${
                        s.status === "Active"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}