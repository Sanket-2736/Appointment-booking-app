import axios from 'axios'
import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

function Login() {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {setAToken, backendUrl} = useContext(AdminContext);
  const {dToken, setDToken} = useContext(DoctorContext);

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
          toast.error(data.message); // Show error message from response
        }
      } else {
        const {data} = await axios.post(backendUrl+'/api/doctor/login', {email, password});
        if (data.success) {
          setDToken(data.token);
          localStorage.setItem('dToken', data.token);
          toast.success("Login successful!");
        } else {
          toast.error(data.message); // Show error message from response
        }
      }
    } catch (error) {
      console.error(error);
  
      // Display error message from the response, if available
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={onSubmitHandler} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-semibold text-zinc-600 text-center mb-4">{state} Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 cursor-pointer rounded-md hover:bg-blue-600 active:bg-blue-700 transition duration-200"
        >Login</button>
          {
            state === 'Admin' ? <p className='mt-2'>Doctor Login? <span className='text-blue-500 underline cursor-pointer' onClick={() => setState('Doctor')}>Click Here</span></p> : <p className='mt-2'>Admin Login? <span className='text-blue-500 underline cursor-pointer' onClick={() => setState('Admin')}>Click Here</span></p>
          }
        
      </form>
    </div>
  );
}

export default Login;
