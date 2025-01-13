import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedContact, setSelectedContact] = useState(null); // dùng cho modal chi tiết, nếu muốn

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://thaiduong-be.onrender.com/api/contact/admin/list"); 
      setContacts(res.data || []);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      alert("Hiện tại chưa có endpoint xóa, vui lòng tạo thêm backend!");
    } catch (err) {
      setError("Error deleting contact");
    }
  };

  const handleViewDetail = (contact) => {
    setSelectedContact(contact);
  };

  const handleCloseDetail = () => {
    setSelectedContact(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Contacts</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow border">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Cell</th>
              <th className="px-4 py-2 text-left">Home</th>
              <th className="px-4 py-2 text-left">Message</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{c.id}</td>
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">{c.email}</td>
                <td className="px-4 py-2">{c.cellPhone}</td>
                <td className="px-4 py-2">{c.homePhone}</td>
                <td className="px-4 py-2 truncate max-w-xs">
                  {c.message?.length > 50
                    ? c.message.substring(0, 50) + "..."
                    : c.message}
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleViewDetail(c)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!loading && contacts.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-lg w-full">
            <h2 className="text-xl font-bold mb-2">Contact Detail</h2>
            <p>
              <strong>ID:</strong> {selectedContact.id}
            </p>
            <p>
              <strong>Name:</strong> {selectedContact.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedContact.email}
            </p>
            <p>
              <strong>Cell:</strong> {selectedContact.cellPhone}
            </p>
            <p>
              <strong>Home:</strong> {selectedContact.homePhone}
            </p>
            <p>
              <strong>Message:</strong> {selectedContact.message}
            </p>
            <button
              onClick={handleCloseDetail}
              className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminContacts;
