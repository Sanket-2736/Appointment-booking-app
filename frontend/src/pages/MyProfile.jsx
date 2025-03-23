import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify";

function MyProfile() {
  const { userData, setUserData, backendUrl, token, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      formData.append("address", JSON.stringify(userData.address));

      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating data: ", error);
      toast.error("Internal Server Error!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      {/* Profile Image */}
      <div className="flex flex-col items-center mb-6">
        {isEdit ? (
          <label htmlFor="image" className="relative cursor-pointer">
            <img
              className="w-36 h-36 rounded-full border-4 border-gray-200 shadow-md object-cover"
              src={image ? URL.createObjectURL(image) : userData?.image}
              alt=""
            />
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        ) : (
          <img
            src={userData?.image}
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-gray-200 shadow-md object-cover"
          />
        )}
      </div>

      {/* User Details */}
      <div className="text-center mb-6">
        {isEdit ? (
          <input
            type="text"
            className="border rounded p-2 w-full text-center"
            value={userData?.name || ""}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <h2 className="text-2xl font-semibold text-gray-800">
            {userData?.name || "No Name"}
          </h2>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        {!isEdit ? (
          <button
            className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            onClick={() => setIsEdit(true)}
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              onClick={updateUserProfileData}
            >
              Save Changes
            </button>
            <button
              className="px-5 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </button>
          </>
        )}
      </div>

      <hr className="border-t border-gray-300 my-4" />

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Contact Information</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Email:</p>
            {isEdit ? (
              <input
                type="email"
                className="border rounded p-2 w-full"
                value={userData?.email || ""}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            ) : (
              <p>{userData?.email || "No Email"}</p>
            )}
          </div>

          <div>
            <p className="text-gray-600">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                className="border rounded p-2 w-full"
                value={userData?.phone || ""}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p>{userData?.phone || "No Phone"}</p>
            )}
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-300 my-4" />

      {/* Address Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Address</h3>
        {isEdit ? (
          <div className="grid grid-cols-1 gap-2">
            <input
              type="text"
              className="border rounded p-2 w-full"
              placeholder="Address Line 1"
              value={userData?.address?.line1 || ""}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value },
                }))
              }
            />
            <input
              type="text"
              className="border rounded p-2 w-full"
              placeholder="Address Line 2"
              value={userData?.address?.line2 || ""}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value },
                }))
              }
            />
          </div>
        ) : (
          <p>
            {userData?.address?.line1 || "No Address"}, {userData?.address?.line2 || ""}
          </p>
        )}
      </div>

      <hr className="border-t border-gray-300 my-4" />

      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Gender:</p>
            {isEdit ? (
              <select
                className="border rounded p-2 w-full"
                value={userData?.gender || ""}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option>Male</option>
                <option>Female</option>
                <option>Rather not say</option>
              </select>
            ) : (
              <p>{userData?.gender || "Not Specified"}</p>
            )}
          </div>

          <div>
            <p className="text-gray-600">Date of Birth:</p>
            {isEdit ? (
              <input
                type="date"
                className="border rounded p-2 w-full"
                value={userData?.dob || ""}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p>{userData?.dob || "Not Specified"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
