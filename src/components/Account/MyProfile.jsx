import React, { useState ,useRef} from "react";
import { gql, useMutation } from "@apollo/client";
import ProfilePicture from "../../assets/accountProfile.png";
import ProfileInput from "../../components/Account/ProfileInput";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../loader";
import useS3 from "../useS3Upload";
const UPDATE_PROFILE = gql`
mutation updateProfile($fullName: String!, $contactNumber: String!, $email: String!, $profilePicture: String!) {
  updateProfile(input: {
    fullName: $fullName,
    contactNumber: $contactNumber,
    email: $email,
    profilePicture: $profilePicture
  }) {
    status
    message
  }
}
`;


const MyProfile = (key) => {
  const { uploadImageOnS3 } = useS3();

  const fileInputRef = useRef();

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const [name, setName] = useState(userInfo?.fullName || "");
  const [disaleBtn, setBtnDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(userInfo?.email || "");
  const [phone, setPhone] = useState(userInfo?.contactNumber || "");
  const [profilePicture, setProfilePicture] = useState(userInfo?.profilePicture);
  const [publicUrl, setProfilePictureUri] = useState(userInfo?.profilePicture);
  const [errors, setErrors] = useState({});
console.log(profilePicture,'pro')
  const [updateProfile, { loading: otpLoading }] = useMutation(UPDATE_PROFILE, {
    variables: {
      fullName: name,
      contactNumber: phone,
      email: email,
      profilePicture: profilePicture
    },
    onCompleted: (data) => {
      if (data.updateProfile.status === 'SUCCESS') {
        // Update local storage
        localStorage.setItem("userInfo", JSON.stringify({
          fullName: name,
          contactNumber: phone,
          email: email,
          profilePicture: profilePicture
        }));
        // Clear errors
        setErrors({});
        setBtnDisable(false)
        setLoading(false)
        toast.success('Profile updated successfully.');
        
      }else{
        setBtnDisable(false)
        setLoading(false)
        toast.error(data?.updateProfile?.message);
      }
    },
    onError:(err)=>{
      toast.error('Error : ' + err?.message);

      setBtnDisable(false)
      setLoading(false)
    }
  });

 
  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const uploadedUrl = await uploadImageOnS3({
        file,
        title: 'profilePicture',
        type: 'profilePicture',
      });

      console.log('Uploaded URL:', uploadedUrl);
      setProfilePicture(uploadedUrl);
      setProfilePictureUri(uploadedUrl);
      // Here, you can call a mutation or another function to utilize the uploaded URL
      // For example, saving the URL in your database
    } catch (error) {
      toast.error("Error uploading file: " + error.message);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    let errors = {};
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Invalid email';
    }

    if (phone.length !== 10 || isNaN(phone)) {
      errors.phone = 'Invalid phone number';
    }

    if (!name) {
      errors.name = 'Name is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    }

    if (!phone) {
      errors.phone = 'Phone number is required';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setLoading(true);
    setBtnDisable(true);

    updateProfile();
  };

  return (
    <div className="w-full flex flex-col gap-4">
    
                {loading && <Loader />}

      {/* Heading */}
      <h1 className=" font-HelveticaNeueMedium text-[1.125rem] text-[#0F172A]">
        My Profile
      </h1>

      {/* Pfp */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[0.625rem] font-HelveticaNeueMedium uppercase text-[#94A3B8]">
          PROFILE PICTURE
        </h2>

        <div className="py-1 gap-6 flex">
          <img
            src={publicUrl||ProfilePicture}
            alt="profile picture"
            className="w-[4.5rem] h-[4.5rem] cursor-pointer rounded-full"
          />

          <div>
                <button 
                  onClick={handleEditClick}
                  className="text-[0.75rem] font-HelveticaNeueMedium text-[#031B89]"
                >
                  EDIT
                </button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  ref={fileInputRef}
                  style={{ display: "none" }} // Hide the input
                />
              </div>

        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[0.625rem] font-HelveticaNeueMedium uppercase text-[#94A3B8]">
          DETAILS
        </h2>

        <div className="gap-6 flex flex-col">
          {/* Name and email */}
          <div className="flex py-1 gap-6">
        {/* Name input */}
        <ProfileInput
          title="name"
          value={name}
          setValue={setName}
          isError={!!errors.name}
          errorMessage={errors.name}
          big
          disabled={!!userInfo.name}
        />

        {/* Email input */}
        <ProfileInput
          title="email"
          value={email}
          setValue={setEmail}
          isError={!!errors.email}
          errorMessage={errors.email}
          big
          disabled={!!userInfo.email}
        />
      </div>

      {/* Phone number */}
      <ProfileInput
        title="phone number"
        value={phone}
        setValue={setPhone}
        isError={!!errors.phone}
        errorMessage={errors.phone}
        big
        disabled={!!userInfo.contactNumber}
      />
          <button style={{width:'155px'}} className="xl:block hidden bg-[#7487FF] text-white font-HelveticaNeueMedium ${
             py-2 px-4 rounded" onClick={handleSubmit} disabled={!name || !email ||!profilePicture|| !phone|| disaleBtn}>Update Profile</button>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
