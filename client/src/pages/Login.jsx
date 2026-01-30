import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  /* ---------------- EMAIL LOGIN ---------------- */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ email, provider: "email" })
      );

      setEmail("");
      setPassword("");

      Swal.fire("Welcome back 👋", "Login successful", "success");
      navigate("/dashboard");
    } catch {
      Swal.fire("Error", "Invalid credentials", "error");
    }
  };

  /* ---------------- GOOGLE LOGIN ---------------- */
  const handleGoogleSuccess = (cred) => {
    const decoded = jwtDecode(cred.credential);

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        provider: "google",
      })
    );

    Swal.fire("Success", "Signed in with Google", "success");
    navigate("/dashboard");
  };

  /* ---------------- OTP ---------------- */
  const sendOtp = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/send-otp",
      { phone }
    );
    setOtpSent(true);
    Swal.fire("OTP Sent", `OTP (dev): ${res.data.otp}`, "info");
  };

  const verifyOtp = async () => {
    await axios.post(
      "http://localhost:5000/api/auth/verify-otp",
      { phone, otp: otp.toString() }
    );

    localStorage.setItem(
      "user",
      JSON.stringify({ phone, provider: "otp" })
    );

    setPhone("");
    setOtp("");

    Swal.fire("Success", "OTP verified", "success");
    navigate("/dashboard");
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-950">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-col justify-center px-16 bg-gradient-to-br from-indigo-700 to-purple-700 text-white">
        <h1 className="text-4xl font-extrabold leading-tight">
          Welcome back to <br /> TownCare
        </h1>
        <p className="mt-6 text-lg text-indigo-100">
          Manage services, bookings, and providers from one powerful dashboard.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white text-center">
            Login to your account
          </h2>

          {/* GOOGLE */}
          <div className="mt-6 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() =>
                Swal.fire("Error", "Google Sign‑In failed", "error")
              }
            />
          </div>

          <div className="my-6 text-center text-gray-400">or</div>

          {/* EMAIL LOGIN */}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white outline-none focus:border-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white outline-none focus:border-indigo-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-500 transition py-2 font-semibold text-white">
              Login
            </button>
          </form>

          {/* OTP LOGIN */}
          <div className="mt-8 space-y-4">
            <input
              type="tel"
              placeholder="Phone number"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {!otpSent ? (
              <button
                onClick={sendOtp}
                className="w-full rounded-lg bg-gray-800 py-2 text-white"
              >
                Send OTP
              </button>
            ) : (
              <>
                <input
                  placeholder="Enter OTP"
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  onClick={verifyOtp}
                  className="w-full rounded-lg bg-green-600 py-2 text-white"
                >
                  Verify OTP
                </button>
              </>
            )}
          </div>

          <p className="mt-6 text-center text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-400 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}