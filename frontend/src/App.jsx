import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import About from './pages/about/About.jsx';
import Contact from './pages/contact/Contact.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import ResetPassword from './pages/auth/ResetPassword.jsx';
import EnterAccessCode from './pages/auth/EnterAccessCode.jsx';
import Profile from './pages/profile/Profile.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/enter-access-code" element={<EnterAccessCode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
