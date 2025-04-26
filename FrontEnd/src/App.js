import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/Signup';
import Body from './pages/Body/Body';
import Services from './pages/MyServices/Services';
import Aboutus from './pages/AboutUs/Aboutus';
import Contactus from './pages/ContactUs/Contactus';
import Dashboard from './pages/Dashboard/Dashboard';
import PaymentPage from './pages/Payments/PaymentPage';
import Profile from './pages/Dashboard/Profile';
import Employeedashboard from './pages/Dashboard/employeedashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Body />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<Contactus />} />
        
        {/* Protected Customer Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['customer']}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/payment" element={
          <ProtectedRoute allowedRoles={['customer']}>
            <PaymentPage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        {/* Protected Employee Routes */}
        <Route path='/employeedashboard' element={
          <ProtectedRoute allowedRoles={['employee']}>
            <Employeedashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
