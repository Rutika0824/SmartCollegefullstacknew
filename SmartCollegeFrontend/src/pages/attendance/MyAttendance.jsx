import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function MyAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/attendance") // backend filters by logged-in student
      .then((res) => setAttendance(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading attendance...</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="mb-3">My Attendance</h5>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Course</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a) => (
                <tr key={a._id}>
                  <td>{new Date(a.date).toLocaleDateString()}</td>
                  <td>{a.courseId?.name}</td>
                  <td>
                    <span
                      className={`badge ${
                        a.status === "Present"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}

              {attendance.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    No attendance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
