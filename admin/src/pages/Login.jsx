import axios from 'axios'
import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

function Login() {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const fillAdminCredentials = () => {
    setState('Admin');
    setEmail('admin@prescripto.com');
    setPassword('qqmxw4s5');
    toast.info("Demo Admin credentials auto-filled!");
  };

  const handleDemoAdminLogin = async () => {
    setState('Admin');
    setEmail('admin@prescripto.com');
    setPassword('qqmxw4s5');
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/login', {
        email: 'admin@prescripto.com',
        password: 'qqmxw4s5'
      });

      if (data.success) {
        setAToken(data.token);
        localStorage.setItem('aToken', data.token);
        toast.success("Demo Admin login successful!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to log in with demo credentials.");
    }
  };

  const fillDoctorCredentials = () => {
    setState('Doctor');
    setEmail('sneha.kulkarni@example.com');
    setPassword('sneha.kulkarni');
    toast.info("Demo Doctor credentials auto-filled!");
  };

  const handleDemoDoctorLogin = async () => {
    setState('Doctor');
    setEmail('sneha.kulkarni@example.com');
    setPassword('sneha.kulkarni');
    try {
      const { data } = await axios.post(backendUrl + '/api/doctor/login', {
        email: 'sneha.kulkarni@example.com',
        password: 'sneha.kulkarni'
      });

      if (data.success) {
        setDToken(data.token);
        localStorage.setItem('dToken', data.token);
        toast.success("Demo Doctor login successful!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to log in with demo credentials.");
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });

        if (data.success) {
          setAToken(data.token);
          localStorage.setItem('aToken', data.token);
          toast.success("Login successful!");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password });
        if (data.success) {
          setDToken(data.token);
          localStorage.setItem('dToken', data.token);
          toast.success("Login successful!");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-md overflow-hidden transition-all duration-300">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#5f6fff] to-[#3b82f6] p-6 text-white text-center relative">
          <h1 className="text-2xl font-bold tracking-tight">Prescripto Portal</h1>
          <p className="text-blue-100 text-xs mt-1">Management & Administration Panel</p>
          
          {/* Tab Switcher */}
          <div className="flex bg-white/20 p-1 rounded-xl mt-4 max-w-xs mx-auto backdrop-blur-md">
            <button
              type="button"
              onClick={() => setState('Admin')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                state === 'Admin' ? 'bg-white text-[#5f6fff] shadow-sm' : 'text-white hover:bg-white/10'
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => setState('Doctor')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                state === 'Doctor' ? 'bg-white text-[#5f6fff] shadow-sm' : 'text-white hover:bg-white/10'
              }`}
            >
              Doctor
            </button>
          </div>
        </div>

        {/* Demo Credentials Box */}
        <div className="p-6">
          {state === 'Admin' ? (
            <div className="mb-5 bg-amber-50 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-800">
              <div className="flex items-center justify-between font-semibold mb-1">
                <span className="flex items-center gap-1.5 text-amber-900">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  Interview Demo Access (Admin)
                </span>
                <span className="bg-amber-200/60 text-amber-900 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold">Quick Login</span>
              </div>
              <p className="text-amber-700 text-[11px] mb-2.5">
                Email: <code className="font-mono bg-amber-100/80 px-1 rounded">admin@prescripto.com</code> <br />
                Pass: <code className="font-mono bg-amber-100/80 px-1 rounded">qqmxw4s5</code>
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={fillAdminCredentials}
                  className="flex-1 bg-white hover:bg-amber-100/50 text-amber-900 border border-amber-300 font-medium py-1 px-2 rounded-lg text-center transition duration-150"
                >
                  Auto-fill Form
                </button>
                <button
                  type="button"
                  onClick={handleDemoAdminLogin}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-1 px-2 rounded-lg text-center shadow-sm transition duration-150"
                >
                  1-Click Login
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-5 bg-blue-50 border border-blue-200/80 rounded-xl p-3 text-xs text-blue-800">
              <div className="flex items-center justify-between font-semibold mb-1">
                <span className="flex items-center gap-1.5 text-blue-900">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  Interview Demo Access (Doctor)
                </span>
                <span className="bg-blue-200/60 text-blue-900 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold">Quick Login</span>
              </div>
              <p className="text-blue-700 text-[11px] mb-2.5">
                Email: <code className="font-mono bg-blue-100/80 px-1 rounded">sneha.kulkarni@example.com</code> <br />
                Pass: <code className="font-mono bg-blue-100/80 px-1 rounded">sneha.kulkarni</code>
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={fillDoctorCredentials}
                  className="flex-1 bg-white hover:bg-blue-100/50 text-blue-900 border border-blue-300 font-medium py-1 px-2 rounded-lg text-center transition duration-150"
                >
                  Auto-fill Form
                </button>
                <button
                  type="button"
                  onClick={handleDemoDoctorLogin}
                  className="flex-1 bg-[#5f6fff] hover:bg-[#4353ff] text-white font-medium py-1 px-2 rounded-lg text-center shadow-sm transition duration-150"
                >
                  1-Click Login
                </button>
              </div>
            </div>
          )}

          <form onSubmit={onSubmitHandler} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                {state} Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                required
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-[#5f6fff]/30 focus:border-[#5f6fff] focus:outline-none transition duration-150"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                required
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-[#5f6fff]/30 focus:border-[#5f6fff] focus:outline-none transition duration-150"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#5f6fff] hover:bg-[#4353ff] text-white py-2.5 rounded-xl font-medium shadow-md shadow-blue-500/20 active:scale-[0.99] transition duration-150 cursor-pointer mt-2"
            >
              Sign In to {state} Panel
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-center text-xs text-slate-500">
          Prescripto Doctor Appointment Management System
        </div>
      </div>
    </div>
  );
}

export default Login;
