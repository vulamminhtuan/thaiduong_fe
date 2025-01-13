import React, { useEffect, useState,} from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const data = [
  { name: "01 May", sales: 200, uv: 100 },
  { name: "07 May", sales: 600, uv: 300 },
  { name: "15 May", sales: 500, uv: 400 },
  { name: "30 May", sales: 900, uv: 700 },
];

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editFormData, setEditFormData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [chartData, setChartData] = useState([]);


  const [stats, setStats] = useState({
    newsCount: 0,           
    careersCount: 0,        
    applicationsCount: 0,   
    acceptedPercentage: 0,  
    contactCount: 0,          
  });

  useEffect(() => {
    const tempData = [
      {
        name: "Tổng hợp", 
        news: stats.newsCount,        
        apply: stats.applicationsCount, 
      },
    ];
    setChartData(tempData);
  }, [stats]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("https://thaiduong-be.onrender.com/api/roles", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setRoles(response.data);
      } catch (err) {
        setError("Không thể lấy danh sách vai trò: " + err.message);
      }
    };
    fetchRoles();
  }, []);

  
  useEffect(() => {
    const fetchStats = async () => {
      try {
       
        const [newsRes, jobsRes, appsRes, contactsRes] = await Promise.all([
          axios.get("https://thaiduong-be.onrender.com/api/news"),
          axios.get("https://thaiduong-be.onrender.com/api/jobs"),
          axios.get("https://thaiduong-be.onrender.com/api/applications"),
          axios.get("https://thaiduong-be.onrender.com/api/contact/admin/list", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }),
        ]);
        const newsArray = newsRes.data.news || [];
        const newsCount = newsArray.length;
        const careersCount = jobsRes.data.length;
        const applications = appsRes.data;
        const applicationsCount = applications.length;
        const acceptedApps = applications.filter((a) => a.status === "ACCEPTED").length;
        const acceptedPercentage =
          applicationsCount > 0 ? ((acceptedApps / applicationsCount) * 100).toFixed(2) : 0;
        const contactCount = contactsRes.data.length;

        setStats({
          newsCount,
          careersCount,
          applicationsCount,
          acceptedPercentage,
          contactCount,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://thaiduong-be.onrender.com/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        setError("Error fetching users: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleNewAccount = () => {
    navigate("new-account");
  };

  const handleEdit = (user) => {
    setEditFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      password: "",
      roles: Array.isArray(user.roles)
        ? user.roles.map((role) => ({ name: role.name }))
        : [],
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://thaiduong-be.onrender.com/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      name: editFormData.name,
      email: editFormData.email,
      roles: editFormData.roles.map((role) => role.name),
    };
    if (editFormData.newPassword && editFormData.newPassword.trim() !== "") {
      updatedData.password = editFormData.newPassword;
    }

    try {
      const response = await axios.put(`https://thaiduong-be.onrender.com/api/users/${editFormData.id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers((prev) =>
        prev.map((u) => (u.id === editFormData.id ? { ...u, ...response.data } : u))
      );
      setEditFormData(null);
    } catch (err) {
      setError("Error updating user: " + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Revenue Overview</h1>

      <div className="bg-white rounded p-4 shadow mb-8">
        <h2 className="text-lg font-semibold mb-2">Total sells</h2>
        <div className="overflow-x-auto">
        <BarChart width={600} height={300} data={chartData} barSize={20}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 50]} />
          <Tooltip cursor={{ fill: "transparent" }} />

          <Bar dataKey="news" fill="#8884d8" />
          <Bar dataKey="apply" fill="#82ca9d" />
        </BarChart>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">NewsDB</h2>
          <p>News: {stats.newsCount}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">RecumentManagerDB</h2>
          <p>Careers: {stats.careersCount}</p>
          <p>Apply: {stats.applicationsCount}</p>
          <p>ACCEPTED: {stats.acceptedPercentage}%</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">ContactsDB</h2>
          <p>Contacts: {stats.contactCount}</p>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl font-bold">Danh sách tài khoản</h2>
          <button
            onClick={() => handleNewAccount()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            New Account
          </button>
        </div>
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="border-b">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Roles</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  {user.roles.map((role) => role.name).join(", ")}
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Sửa thông tin người dùng</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Tên</label>
                <input
                  type="text"
                  className="border p-2 w-full rounded"
                  value={editFormData.name}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="border p-2 w-full rounded"
                  value={editFormData.email}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">New Password</label>
                <input
                  type="password"
                  className="border p-2 w-full rounded"
                  placeholder="Leave blank to keep current password"
                  value={editFormData.newPassword || ""}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, newPassword: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Vai trò</label>
                {roles.length > 0 ? (
                  roles.map((role) => (
                    <div key={role.id} className="flex items-center mb-2">
                      <input
                        type="radio"
                        id={`role-${role.id}`}
                        name="role"
                        value={role.name}
                        checked={
                          Array.isArray(editFormData?.roles) &&
                          editFormData.roles.some((r) => r.name === role.name)
                        }
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            roles: [{ name: e.target.value }],
                          })
                        }
                      />
                      <label htmlFor={`role-${role.id}`} className="ml-2">
                        {role.name}
                      </label>
                    </div>
                  ))
                ) : (
                  <p>Loading roles...</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Lưu
              </button>
              <button
                onClick={() => setEditFormData(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
              >
                Hủy
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
    

export default AdminDashboard;
