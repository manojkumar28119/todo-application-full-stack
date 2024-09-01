import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../Navbar";
import "./index.css"

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password: "",
    hashPassword:""
  });

  const [apiStatus,setApiStatus] = useState(false)

  // Fetch user profile data when the component mounts
  useEffect(() => {
    setApiStatus(false)
    const fetchProfileData = async () => {
      const userId = Cookies.get("user_id");

      try {
        const response = await fetch(`https://todo-application-backend-rk3h.onrender.com/profile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData({
            name: data.name,
            email: data.email,
            password: "", // Don't show the password, leave it empty
            hashPassword:data.password
          });
          setApiStatus(true)
        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  // Event handler for updating the profile data state when the input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Event handler for saving the updated profile data
  const handleSave = async (event) => {
    event.preventDefault();
    const userId = Cookies.get("user_id");

    try {
        const response = await fetch("https://todo-application-backend-rk3h.onrender.com/update-profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId, ...profileData }),
        });

        console.log(response)

        if (response.ok) {
          alert("Profile updated successfully");
        } else {
          console.error("Failed to update profile");
        }

      
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };



  const jwtToken = Cookies.get('jwt_token');
  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile-sec">
      <Navbar />
      <div className="profile-container">
        <h1>Profile</h1>
        {apiStatus ? (
          <form onSubmit={handleSave} className="profile-form">
            <div className="input-container">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your name"
              />
            </div>
  
            <div className="input-container">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="form-control"
              />
            </div>
  
            <div className="input-container">
              <label htmlFor="password">change Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={profileData.password}
                onChange={handleChange}
                placeholder="New password"
              />
            </div>
  
            <button type="submit" className="save-button btn btn-primary">
              Save Changes
            </button>
          </form>
        ):(
          <div style={{display:"flex",justifyContent:"center"}}>
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
