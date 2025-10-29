import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Admin Pages
import EventsDashboard from "./pages/Admin/EventsDashboard"


import Home from "./pages/Home";

// //admin pages
import AdminSignup from "./pages/Admin/Adminsignup";
import AdminLogin from "./pages/Admin/AdminLogin";



function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Home />} />
        {/* Admin Routes */}
         <Route path="/admin/events" element={<EventsDashboard />} />
       {/* <Route path="/admin/event/:eventId" element={<EventOverview />} /> */}
      
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />

  
      
     
     
      </Routes>
    </Router>
  );
}

export default App;
