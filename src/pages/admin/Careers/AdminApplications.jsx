import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/applications");
      setApplications(response.data);
      setError("");
    } catch (err) {
      setError("Lỗi khi lấy dữ liệu ứng tuyển.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (application, actionType) => {
    // Kiểm tra nếu trạng thái hiện tại là ACCEPTED và muốn đổi sang REJECTED,
    // hoặc đang là REJECTED và muốn đổi sang ACCEPTED thì hiển thị confirm
    if (
      (application.status === "ACCEPTED" && actionType === "REJECTED") ||
      (application.status === "REJECTED" && actionType === "ACCEPTED")
    ) {
      if (
        !window.confirm(
          `Bạn đã ${
            application.status === "ACCEPTED" ? "đồng ý" : "từ chối"
          } ứng viên ${application.fullName}. Bạn có chắc muốn đổi lại không?`
        )
      ) {
        return;
      }
    }
  
    setActionLoading(true);
    try {
      await axios.put(`/api/applications/${application.id}/status`, {
        status: actionType,
        message:
          actionType === "ACCEPTED"
            ? "Chúc mừng! Bạn đã được chấp nhận."
            : "Rất tiếc, bạn không đạt yêu cầu.",
      });
  
      setMessage(
        `${actionType === "ACCEPTED" ? "Chấp nhận" : "Từ chối"} ứng viên ${
          application.fullName
        } thành công.`
      );
  
      fetchApplications();
    } catch (err) {
      setError("Lỗi khi cập nhật trạng thái ứng tuyển.");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản Lý Ứng Tuyển</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {message && <p className="text-green-600 mb-2">{message}</p>}

      {loading ? (
        <p>Đang tải...</p>
      ) : applications.length === 0 ? (
        <p>Không có ứng tuyển nào.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left font-medium text-sm">ID</th>
                <th className="px-4 py-3 text-left font-medium text-sm">Tên</th>
                <th className="px-4 py-3 text-left font-medium text-sm">Email</th>
                <th className="px-4 py-3 text-left font-medium text-sm">
                  Số Điện Thoại
                </th>
                <th className="px-4 py-3 text-left font-medium text-sm">
                  Thư Xin Việc
                </th>
                <th className="px-4 py-3 text-left font-medium text-sm">Resume</th>
                <th className="px-4 py-3 text-left font-medium text-sm">ID Công Việc</th>
                <th className="px-4 py-3 text-left font-medium text-sm">Trạng Thái</th>
                <th className="px-4 py-3 text-left font-medium text-sm text-center">
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{app.id}</td>
                  <td className="px-4 py-3">{app.fullName}</td>
                  <td className="px-4 py-3">{app.email}</td>
                  <td className="px-4 py-3">{app.phone}</td>
                  <td className="px-4 py-3">
                    {app.coverLetter.length > 50
                      ? `${app.coverLetter.substring(0, 50)}...`
                      : app.coverLetter}
                  </td>
                  <td className="px-4 py-3">
                    {app.resumeUrl ? (
                      <a
                        href={`${process.env.BACKEND_URL}/api/files/${app.resumeUrl
                          .split("\\")
                          .pop()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View Resume
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-4 py-3">{app.jobId}</td>
                  <td
                    className={`px-4 py-3 font-bold ${
                      app.status === "ACCEPTED"
                        ? "text-green-600"
                        : app.status === "REJECTED"
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    {app.status}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleAction(app, "ACCEPTED")}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        disabled={actionLoading}
                      >
                        {actionLoading ? "Đang xử lý..." : "Đạt"}
                      </button>
                      <button
                        onClick={() => handleAction(app, "REJECTED")}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        disabled={actionLoading}
                      >
                        {actionLoading ? "Đang xử lý..." : "Không Đạt"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminApplications;
