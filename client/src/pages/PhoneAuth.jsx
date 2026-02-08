import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/auth.css";

export default function PhoneAuth() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const res = await api.post("/api/auth/send-otp", { phone });
      alert(res.data.message || "OTP sent to your phone.");
    } catch (err) {
      alert("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      await api.post("/api/auth/verify-otp", { phone, otp });
      localStorage.setItem(
        "user",
        JSON.stringify({ phone, provider: "otp" })
      );

      // ✅ CLEAR INPUTS
      setPhone("");
      setOtp("");

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Phone Login</h2>

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button onClick={sendOtp}>Send OTP</button>

        <input
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={verifyOtp}>Verify OTP</button>
      </div>
    </div>
  );
}
