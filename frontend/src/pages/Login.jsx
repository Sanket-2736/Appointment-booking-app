import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const { backendUrl, setToken, token, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name, 
          password, 
          email, 
          phone
        });

        if (data.success) {
          toast.success("Registration successful!");
          setToken(data.token);
          localStorage.setItem('token', data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });

        if (data.success) {
          toast.success("Login successful!");
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal server error!");
      console.log("Error in login: ", error);
    }
  };

  useEffect(() => {
    if (token && userData) {
      navigate('/');
    }
  }, [token, userData]);

  return (
    <div className='min-h-[80vh] flex items-center justify-center px-4 py-12'>
      <div className='bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 w-full max-w-md shadow-xl shadow-slate-200/50'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight'>
            {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className='text-slate-500 text-xs sm:text-sm mt-1.5'>
            Please {state === 'Sign Up' ? 'sign up' : 'login'} to schedule appointments with certified doctors.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className='flex bg-slate-100 p-1 rounded-2xl mb-6'>
          <button
            type='button'
            onClick={() => setState('Sign Up')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              state === 'Sign Up' ? 'bg-white text-[#5f6fff] shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Create Account
          </button>
          <button
            type='button'
            onClick={() => setState('Login')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              state === 'Login' ? 'bg-white text-[#5f6fff] shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Login
          </button>
        </div>

        <form onSubmit={onSubmitHandler} className='space-y-4'>
          {state === 'Sign Up' && (
            <>
              <div>
                <label htmlFor='name' className='block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1'>
                  Full Name
                </label>
                <input 
                  className='w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-[#5f6fff]/30 focus:border-[#5f6fff] focus:outline-none transition duration-150' 
                  type="text" 
                  name="name" 
                  id="name"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>

              <div>
                <label htmlFor='phone' className='block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1'>
                  Phone Number
                </label>
                <input 
                  className='w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-[#5f6fff]/30 focus:border-[#5f6fff] focus:outline-none transition duration-150' 
                  type="text" 
                  name="phone" 
                  id="phone"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)} 
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor='email' className='block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1'>
              Email Address
            </label>
            <input 
              className='w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-[#5f6fff]/30 focus:border-[#5f6fff] focus:outline-none transition duration-150' 
              type="email" 
              name="email" 
              id="email" 
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1'>
              Password
            </label>
            <input 
              className='w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-[#5f6fff]/30 focus:border-[#5f6fff] focus:outline-none transition duration-150' 
              type="password" 
              name="password" 
              id="password" 
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button 
            type='submit' 
            className='w-full bg-[#5f6fff] hover:bg-[#4353ff] text-white py-3 rounded-xl font-medium shadow-md shadow-blue-500/20 active:scale-[0.99] transition duration-150 cursor-pointer mt-2'
          >
            {state === 'Sign Up' ? "Create Account" : "Sign In"}
          </button>
        </form>

        <div className='mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500'>
          {state === 'Sign Up' ? (
            <p>
              Already have an account?{' '}
              <button 
                type="button"
                className='text-[#5f6fff] font-bold hover:underline cursor-pointer' 
                onClick={() => setState('Login')}
              >
                Login Here
              </button>
            </p>
          ) : (
            <p>
              Don't have an account yet?{' '}
              <button 
                type="button"
                className='text-[#5f6fff] font-bold hover:underline cursor-pointer' 
                onClick={() => setState('Sign Up')}
              >
                Create One Here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
