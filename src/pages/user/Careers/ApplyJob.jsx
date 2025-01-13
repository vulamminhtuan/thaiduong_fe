import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ApplyJob() {
  const { id } = useParams(); 
  const navigate = useNavigate();
    const { t, i18n } = useTranslation(); // Lấy ngôn ngữ hiện tại
  

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    coverLetter: "",
    resume: null, 
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [verificationCode, setVerificationCode] = useState(""); 
  const [isVerificationModalVisible, setIsVerificationModalVisible] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prevForm) => ({
      ...prevForm,
      resume: file,
    }));
  };

  const handleSubmitApplication = async () => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("fullName", form.fullName);
    formData.append("email", form.email); // Lấy email
    formData.append("phone", form.phone);
    formData.append("address", form.address);
    formData.append("coverLetter", form.coverLetter);
    if (form.resume) {
      formData.append("resume", form.resume);
    }
  
    try {
      // Gửi yêu cầu POST để apply
      await axios.post(`/api/jobs/${id}/apply`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // // Gửi mã xác nhận
      // await axios.post(`/api/jobs/${id}/send-verification-code`, null, {
      //   params: { email: form.email }, 
      // });

      setMessage(
        t("mi 14")
      );
      setError("");

      // Sau 2 giây chuyển trang
      setTimeout(() => {
        navigate("/careers");
      }, 2000);
    } catch (err) {
      console.error("Error submitting application:", err);
      setError(
        t("mi 16")
      );
      setMessage("");
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
      await axios.post(`/api/jobs/${id}/verify-code`, {
        email: form.email,
        code: verificationCode,
      });

      setMessage("Application submitted successfully!");
      setError("");
      setTimeout(() => {
        navigate("/careers");
      }, 2000);
    } catch (err) {
      console.error("Error verifying code:", err);
      setError("Invalid verification code. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">{t("mi 6")} {id}</h1>

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form  onSubmit={(e) => {
            e.preventDefault();
            handleSubmitApplication();
          }} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="fullName">
          {t("mi 7")}
          </label>
          <input
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="email">
          {t("mi 8")}
          </label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="email">
          {t("mi 10")}
          </label>
          <input
            name="address"
            type="text"
            value={form.address}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="coverLetter">
          {t("mi 11")}
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            rows={4}
            value={form.coverLetter}
            onChange={handleInputChange} 
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="resume">
          {t("mi 12")}(PDF/Doc)
          </label>
          <input
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
            className="w-full"
          />
        </div>

        <button
          type="submit"
          // Disable nút nếu đang submit
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting ? t("mi 15") : t("mi 13")}
        </button>
      </form>
      {isVerificationModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Enter Verification Code</h2>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter code"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleVerifyCode}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Verify
              </button>
              <button
                onClick={() => setIsVerificationModalVisible(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplyJob;
