import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

function AddDoctor() {

  const [docImg, setDocImg] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [degree, setDegree] = useState('');
  const [fees, setFees] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [experience, setExperience] = useState('1 Year');
  const [about, setAbout] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const {backendUrl, aToken} = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
        if(!docImg){
            return toast.error('Please upload a doctor image');
        }

        const formData = new FormData();
        formData.append('image', docImg);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('name', name);
        formData.append('degree', degree);
        formData.append('fees', Number(fees));
        formData.append('speciality', speciality);
        formData.append('about', about);
        formData.append('experience', experience);
        formData.append('address', JSON.stringify({line1:address1, line2:address2}));

        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        const {data} = await axios.post(backendUrl+'/api/admin/add-doctor', formData, {headers:{aToken}});
        console.log(data)
        if(data.success){
            toast.success(data.message);
            setDocImg(false);
            setEmail('');
            setPassword('');
            setName('');
            setDegree('');
            setFees('');
            setSpeciality('General Physician');
            setAddress1('')
            setAddress2('')
            setAbout('')
            setFees('')
        } else {
            toast.error(data.message);
            console.log("Error in adding doctor: ", error)
        }
        
    } catch (error) {
        console.log(error);
        toast.error('Internal server error!');
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Add Doctor
      </h2>

      {/* Upload Section */}
      <div className="flex flex-col items-center mb-6">
        <label htmlFor="doc-img" className="cursor-pointer">
          <img
            src={assets.upload_area}
            alt="upload area"
            className="w-24 h-24 object-cover rounded-full border border-gray-300 p-1"
          />
        </label>
        <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
        <p className="text-sm text-gray-500 mt-2">Upload doctor picture</p>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="text-gray-700 font-medium">Your Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Your Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Your Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Experience</label>
            <select
              required
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1} Years`}>
                  {i + 1} Years
                </option>
              ))}
              <option value="10+ Years">10+ Years</option>
            </select>
          </div>

          <div>
            <label className="text-gray-700 font-medium">Fees</label>
            <input
              type="number"
              onChange={(e) => setFees(e.target.value)}
              placeholder="Fees"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="text-gray-700 font-medium">Speciality</label>
            <select
              onChange={(e) => setSpeciality(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[
                "General Physician",
                "Gynacologist",
                "Dermatologist",
                "Pediatricians",
                "Neurologist",
                "Gastroentrologist",
              ].map((speciality) => (
                <option key={speciality} value={speciality}>
                  {speciality}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-gray-700 font-medium">Education</label>
            <input
              onChange={(e) => setDegree(e.target.value)}
              type="text"
              placeholder="Education"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Address</label>
            <input
              type="text"
              placeholder="Address line 1"
              required
              onChange={(e) => setAddress1(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <input
              type="text"
              placeholder="Address line 2"
              required
              onChange={(e) => setAddress2(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* About Doctor Section */}
      <div className="mt-6">
        <label className="text-gray-700 font-medium">About Doctor</label>
        <textarea
          type="text"
          name="About"
          id="About"
          onChange={(e) => setAbout(e.target.value)}
          required
          placeholder="About"
          className="w-full h-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Submit Details
      </button>
    </form>
  );
}

export default AddDoctor;
