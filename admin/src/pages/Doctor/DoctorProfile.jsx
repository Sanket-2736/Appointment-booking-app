import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

function DoctorProfile() {
  const { getProfileData, setProfileData, profileData, dToken } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [editedData, setEditedData] = useState(null);

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  useEffect(() => {
    if (profileData) {
      setEditedData({
        ...profileData,
        address: profileData.address ? JSON.parse(profileData.address) : { line1: "", line2: "" }
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value }
    }));
  };

  const handleCheckboxChange = (e) => {
    setEditedData((prev) => ({
      ...prev,
      available: e.target.checked
    }));
  };

  const handleSave = () => {
    setProfileData({
      ...editedData,
      address: JSON.stringify(editedData.address)
    });
    setIsEdit(false);
  };

  const handleCancel = () => {
    setEditedData({
      ...profileData,
      address: profileData.address ? JSON.parse(profileData.address) : { line1: "", line2: "" }
    });
    setIsEdit(false);
  };

  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-[#5f6fff]/80 w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt="Doctor"
            />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/* Doctor info */}
            <p className="flex items-start gap-2 text-3xl font-medium text-gray-700">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {profileData.experience}
              </button>
            </div>

            {/* About section */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-500 mt-3">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>

            {/* Fees */}
            <p className="text-gray-600 font-medium mt-4">
              Appointment Fee:{" "}
              <span className="text-gray-800">
                {currency}{" "}
                {isEdit ? (
                  <input
                    type="number"
                    name="fees"
                    value={editedData.fees}
                    onChange={handleChange}
                    className="border p-1 rounded w-20"
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>

            {/* Address */}
            <div className="flex gap-2 py-2">
              <p className="text-sm">Address: </p>
              <div>
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      name="line1"
                      value={editedData.address.line1}
                      onChange={handleAddressChange}
                      className="border p-1 rounded w-full"
                      placeholder="Line 1"
                    />
                    <input
                      type="text"
                      name="line2"
                      value={editedData.address.line2}
                      onChange={handleAddressChange}
                      className="border p-1 rounded w-full mt-2"
                      placeholder="Line 2"
                    />
                  </>
                ) : (
                  <>
                    {profileData.address.line1} <br />
                    {profileData.address.line2}
                  </>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="flex gap-1 pt-2">
              <input
                type="checkbox"
                name="available"
                id="available"
                checked={editedData.available}
                onChange={handleCheckboxChange}
                disabled={!isEdit}
              />
              <label htmlFor="available">Available</label>
            </div>

            {/* Edit, Save, and Cancel buttons */}
            {!isEdit ? (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-1 border border-[#5f6fff] text-sm rounded-full hover:text-white transition-all mt-5 hover:bg-[#5f6fff]"
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-2 mt-5">
                <button
                  onClick={handleSave}
                  className="px-4 py-1 border border-green-500 text-sm rounded-full hover:text-white transition-all hover:bg-green-500"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-1 border border-red-500 text-sm rounded-full hover:text-white transition-all hover:bg-red-500"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default DoctorProfile;
