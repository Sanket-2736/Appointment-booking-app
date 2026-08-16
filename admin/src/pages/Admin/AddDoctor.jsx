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
    <div className="m-5 sm:m-8 w-full max-w-4xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Add Doctor</h1>
        <p className="text-slate-500 text-xs mt-0.5">Register a new medical practitioner to the system</p>
      </div>

      <form onSubmit={onSubmitHandler} className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Upload Section */}
        <div className="flex items-center gap-5 mb-8 pb-6 border-b border-slate-100">
          <label htmlFor="doc-img" className="cursor-pointer group relative">
            <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-blue-200 group-hover:border-[#5f6fff] bg-slate-50 flex items-center justify-center overflow-hidden transition-colors">
              <img
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt="upload area"
                className={docImg ? "w-full h-full object-cover" : "w-10 h-10 opacity-60"}
              />
            </div>
          </label>
          <div>
            <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
            <label htmlFor="doc-img" className="text-sm font-semibold text-[#5f6fff] hover:underline cursor-pointer">
              Upload Doctor Picture
            </label>
            <p className="text-xs text-slate-400 mt-0.5">Allowed PNG, JPG or JPEG. Max size 2MB</p>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Doctor Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Dr. John Doe"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-[#5f6fff]/30 focus:border-[#5f6fff] focus:outline-none transition duration-150"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Doctor Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="doctor@example.com"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-[#5f6fff]/30 focus:border-[#5f6fff] focus:outline-none transition duration-150"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Account Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-[#5f6fff]/30 focus:border-[#5f6fff] focus:outline-none transition duration-150"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Experience</label>
              <select
                required
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-[#5f6fff]/30 focus:border-[#5f6fff] focus:outline-none transition duration-150"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={`${i + 1} Year`}>
                    {i + 1} Year{i > 0 ? 's' : ''}
                  </option>
                ))}
                <option value="10+ Years">10+ Years</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Consultation Fees ($)</label>
              <input
                type="number"
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                placeholder="50"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-[#5f6fff]/30 focus:border-[#5f6fff] focus:outline-none transition duration-150"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Speciality</label>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-[#5f6fff]/30 focus:border-[#5f6fff] focus:outline-none transition duration-150"
              >
                {[
                  "General Physician",
                  "Gynacologist",
                  "Dermatologist",
                  "Pediatricians",
                  "Neurologist",
                  "Gastroentrologist",
                ].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Education / Degree</label>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                type="text"
                placeholder="MBBS, MD"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-[#5f6fff]/30 focus:border-[#5f6fff] focus:outline-none transition duration-150"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Clinic Address</label>
              <input
                type="text"
                placeholder="Address line 1"
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-[#5f6fff]/30 focus:border-[#5f6fff] focus:outline-none transition duration-150 mb-2"
              />
              <input
                type="text"
                placeholder="Address line 2"
                required
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-[#5f6fff]/30 focus:border-[#5f6fff] focus:outline-none transition duration-150"
              />
            </div>
          </div>
        </div>

        {/* About Doctor Section */}
        <div className="mt-6">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">About Doctor</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
            placeholder="Write a brief summary about the doctor's experience and background..."
            rows={4}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:ring-2 focus:ring-[#5f6fff]/30 focus:border-[#5f6fff] focus:outline-none transition duration-150"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 bg-[#5f6fff] hover:bg-[#4353ff] text-white px-8 py-3 rounded-xl font-medium shadow-md shadow-blue-500/20 active:scale-[0.99] transition duration-150 cursor-pointer"
        >
          Add Doctor Profile
        </button>
      </form>
    </div>
  );
}

export default AddDoctor;
