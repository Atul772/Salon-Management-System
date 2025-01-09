import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/Signup';
import Body from './pages/Body/Body';
import Services from './pages/MyServices/Services';
import Aboutus from './pages/AboutUs/Aboutus';
import Contactus from './pages/ContactUs/Contactus';
import Dashboard from './pages/Dashboard/Dashboard';
import PaymentPage from './pages/Payments/PaymentPage'; // Import PaymentPage
import Profile from './pages/Dashboard/Profile';
import Employeedashboard from './pages/Dashboard/employeedashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Add Dashboard route */}
        <Route path="/payment" element={<PaymentPage />} /> {/* Add PaymentPage route */}
        <Route path="/profile"  element={<Profile />} /> {/* Add Profile route */}
        <Route path='/employeedashboard' element={<Employeedashboard/>} />
      </Routes>
    </>
  );
}

export default App;
