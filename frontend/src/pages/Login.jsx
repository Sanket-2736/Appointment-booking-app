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
  const [phone, setPhone] = useState(''); // New phone state
  const { backendUrl, setToken, token } = useContext(AppContext);
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
      toast.error("Internal server error!");
      console.log("Error in login: ", error);
    }
  };

  useEffect(() => {
    if(token) navigate('/');
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'signup' : 'login'} to book an appointment</p>

        {state === 'Sign Up' && (
          <>
            <div className='w-full'>
              <p>Full Name: </p>
              <input className='border border-zinc-300 rounded w-full p-2 mt-1' 
                type="text" 
                name="name" 
                id="name" 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>

            <div className='w-full'>
              <p>Phone Number: </p>
              <input className='border border-zinc-300 rounded w-full p-2 mt-1' 
                type="text" 
                name="phone" 
                id="phone" 
                onChange={(e) => setPhone(e.target.value)} 
              />
            </div>
          </>
        )}

        <div className='w-full'>
          <p>Email: </p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' 
            type="email" 
            name="email" 
            id="email" 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div className='w-full'>
          <p>Password: </p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' 
            type="password" 
            name="password" 
            id="password" 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <button type='submit' className='bg-[#5f6fff] text-white w-full py-2 rounded cursor-pointer'>
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </button>

        {state === 'Sign Up' ?  
          <p>Already have an account? 
            <span className='text-[#5f6fff] underline hover:cursor-pointer' onClick={() => setState('Login')}> Login Here</span>
          </p> 
          : 
          <p>Create a new account? 
            <span className='text-[#5f6fff] underline hover:cursor-pointer' onClick={() => setState('Sign Up')}> Click here</span>
          </p>
        }
      </div>
    </form>
  );
}

export default Login;
