import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">

      <motion.div
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <Sidebar />
      </motion.div>

      <main className="flex-1 p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {children}
        </motion.div>
      </main>

    </div>
  );
}