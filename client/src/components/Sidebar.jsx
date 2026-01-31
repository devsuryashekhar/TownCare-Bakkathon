import { useEffect, useRef, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/* ---------------- COLLAPSIBLE MENU ---------------- */
const Menu = ({ icon, label, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-gray-700 hover:bg-white transition"
      >
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">
            {icon}
          </span>
          {label}
        </div>

        <span className={`transition ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>

      {open && (
        <ul className="ml-12 mt-2 space-y-1">
          {items.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className="block px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-white"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/* ---------------- SIDEBAR ---------------- */
export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const profileRef = useRef(null);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const close = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  /* -------- NAVIGATION CONFIG -------- */
  const mainNav = [
    { label: "Overview", path: "/dashboard" },
    { label: "Bookings", path: "/dashboard/bookings" },
    { label: "Transactions", path: "/dashboard/transactions" },
  ];

  const billingNav = [
    { label: "Cards", path: "/dashboard/billing/cards" },
    { label: "Payments", path: "/dashboard/billing/payments" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAddAccount = () => {
    logout();
    navigate("/login", { state: { addAccount: true } });
  };

  return (
    <aside className="h-screen w-80 p-4 bg-[#f7f8fa] flex flex-col">

      {/* ================= PROFILE ================= */}
      <div className="bg-white rounded-3xl p-4 shadow-sm flex items-center gap-3 relative">
        <img
          src={user?.avatar || "https://i.pravatar.cc/100"}
          className="w-11 h-11 rounded-full"
          alt="avatar"
        />

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">
            {user?.name || "Guest"}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {user?.email}
          </p>
        </div>

        <button
          ref={profileRef}
          onClick={() => setProfileOpen(!profileOpen)}
          className="p-2 rounded-xl hover:bg-gray-100"
        >
          ⋮
        </button>

        {profileOpen && (
          <div className="absolute top-20 left-4 w-64 bg-white rounded-2xl shadow-lg p-2 text-sm z-50">
            <button
              onClick={handleAddAccount}
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-100"
            >
              ➕ Add another account
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-xl text-red-600 hover:bg-red-50"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>

      {/* ================= MAIN NAV ================= */}
      <nav className="mt-6 space-y-2 text-sm">
        {mainNav.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-2xl transition ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-white hover:shadow-sm"
              }`
            }
          >
            <span className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">
              ●
            </span>
            {item.label}
          </NavLink>
        ))}

        <Menu
          icon="💳"
          label="Billing"
          items={billingNav}
        />
      </nav>

      {/* ================= FOOTER ================= */}
      <div className="mt-auto space-y-2 pt-4">
        <NavLink
          to="/dashboard/settings"
          className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-white hover:shadow-sm"
        >
          <span className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
            ⚙️
          </span>
          Settings
        </NavLink>

        <NavLink
          to="/dashboard/help"
          className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-white hover:shadow-sm"
        >
          <span className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
            ❓
          </span>
          Help
        </NavLink>
      </div>
    </aside>
  );
}