import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";

import Landing from "./pages/Landing";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PhoneAuth from "./pages/PhoneAuth";
import ProviderAuth from "./pages/ProviderAuth";
import ProviderDashboard from "./pages/ProviderDashboard";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/Booking";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Map from "./pages/Map";
import { ProviderProfile } from "./pages/Placeholders";

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/provider/:id" element={<ProviderProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book/:serviceId" element={<Booking />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/map" element={<Map />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/phone-auth" element={<PhoneAuth />} />

          {/* PROVIDER */}
          <Route path="/provider/login" element={<ProviderAuth />} />
          <Route path="/provider/dashboard" element={<ProviderDashboard />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
