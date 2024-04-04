import React, { useEffect, useRef, useState } from "react";
import ProfileInput from "../components/ProfileInput";
import BackArrow from "../assets/backArrow.svg";
import RemovedPP from "../assets/removedPP.png";
import SaveChangesModal from "../components/SaveChangesModal";
import { Link } from "react-router-dom";
import { ADD_DEPARTMENT_USER, GET_ADDED_DEPARTMENTS } from "../context/mutation";
import {  useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoaderOverlay from "../components/loadinOverlay";
import useS3 from "../context/useS3Upload";
const AddUser = () => {
  const {uploadImageOnS3} = useS3();
  const navigate=useNavigate();
  const[departmentList,setDepartmentList]=useState([]);
  const [addUser] = useMutation(ADD_DEPARTMENT_USER);
  const  { data : departments } = useQuery(GET_ADDED_DEPARTMENTS);
  const fileRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dept, setDept] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureUri, setProfilePictureUri] = useState(null);
  const [removePP, setRemovePP] = useState(false);
  const [isSaveModal, setIsSaveModal] = useState(false);
  const [loading,setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    dept: "",
    jobTitle: "",
  });

  useEffect(()=>{
    if(departments){
      setDepartmentList(departments.getAddedDepartments.departments)
    }
    
  },[departments])
 

  const handleInputChange = (field, value) => {
    if (field === "name") {
      setName(value);
    } else if (field === "email") {
      setEmail(value);
    } else if (field === "phone") {
      setPhone(value);
    } else if (field === "dept") {
      setDept(value);
    } else if (field === "jobTitle") {
      setJobTitle(value);
    }
    if(!value?.trim()){

      setFormErrors({
        ...formErrors,
        [field]: `${field?.toUpperCase()} is required`,
      });
    }else{
      setFormErrors({
        ...formErrors,
        [field]: "",
      });
    }
    
  };

  

  const handleFileUpload = async (file) => {
    setLoading(true);
    try {
      const uploadedUrl = await uploadImageOnS3({
        file,
        title: 'banner',
        type: 'banner',
      });      console.log(uploadedUrl, "uploaded url");
      setProfilePicture(uploadedUrl);
      setProfilePictureUri(uploadedUrl);
    } catch (error) {
      console.error("Error uploading file:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureRemove = () => {
    setProfilePicture(null);
    setProfilePictureUri(null);
    setRemovePP(true);
  };

  const handleFormSubmit = () => {
    const errors = {};
    if (!name?.trim()) {
      errors.name = "NAME is required";
    }
    if (!email?.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Invalid EMAIL address";
    }
    if (!phone?.trim()) {
      errors.phone = "PHONE NUMBER is required";
    }
    if (!dept?.trim()) {
      errors.dept = "DEPARTMENT is required";
    }
    if (!jobTitle?.trim()) {
      errors.jobTitle = "JOB TITLE is required";
    }
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }
    if(!profilePictureUri){
      toast.error("Profile picture is required");
      return
    }

    if (Object.keys(errors).length === 0) {
      const formData = {
        fullName:name,
        email:email,
        contactNumber:phone,
        departmentId:departmentList?.find((d)=>d.name===dept)?.id,
        role:jobTitle,
        profilePicture: profilePictureUri,
      };

      setLoading(true);

      addUser({ variables: formData })
        .then((response) => {
          const { status, message } = response.data.addUser;
          if (status === "SUCCESS") {
             setLoading(false);

            toast.success("User added successfully.");
            localStorage.setItem("isUserDeleted", true);
            navigate("/home/users");
          } else {
            setLoading(false);

            toast.error(message);
          }
        })
        .catch((error) => {
          setLoading(false);

          toast.error(error.message);
        });
    }
  };

  return (
    <div className="w-full flex flex-col md:p-12 py-8 px-3 md:gap-12 gap-6 bg-white">
      {/* Heading */}
      <div className="flex gap-1 items-center">
        <Link to="/home/users">
          <img src={BackArrow} alt="back arrow" className="w-6 h-6" />
        </Link>
        <h1 className="md:text-2xl text-xl font-HelveticaNeueBold drea">
          Add User
        </h1>
      </div>

      {/* Main */}
      <div name="profile" className="w-full flex flex-col gap-4">
        {/* Heading */}
        <h1 className=" font-HelveticaNeueMedium md:text-[1.125rem] text-[#0F172A]">
          Profile
        </h1>

        {/* Pfp */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[0.625rem] font-HelveticaNeueMedium uppercase text-[#94A3B8]">
            PROFILE PICTURE
          </h2>
          <div className="py-1 gap-6 flex">
            <img
              src={profilePicture || RemovedPP}
              alt="profile picture"
              className=" w-[4.5rem] h-[4.5rem] cursor-pointer rounded-full"
            />
            <button
              className="text-[0.75rem] font-HelveticaNeueMedium text-[#031B89]"
              onClick={() => fileRef.current.click()}
            >
              EDIT
            </button>
            <input
              type="file"
              ref={fileRef}
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files[0])}
            />
            <button
              onClick={handleProfilePictureRemove}
              className="opacity-30 text-[0.75rem] font-HelveticaNeueMedium text-[#031B89]"
            >
              REMOVE
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[0.625rem] font-HelveticaNeueMedium uppercase text-[#94A3B8]">
            PERSONAL DETAILS
          </h2>
          <div className="gap-6 flex flex-col">
            {/* Name and email */}  
            <div className="flex lg:flex-row flex-col py-1 gap-6">
              <ProfileInput
                title="name"
                value={name}
                setValue={(value) => handleInputChange("name", value)}
                isError={!!formErrors.name}
                errorMsg={formErrors.name}
                big
              />
              <ProfileInput
                title="email"
                value={email}
                setValue={(value) => handleInputChange("email", value)}
                isError={!!formErrors.email}
                errorMsg={formErrors.email}
                big
              />
            </div>
            {/* Phone number */}
            <ProfileInput
              title="phone number"
              value={phone}
              isNumber={true}
              setValue={(value) => handleInputChange("phone", value)}
              isError={!!formErrors.phone}
              errorMsg={formErrors.phone}
              big
            />
          </div>
        </div>

        {/* Job Details */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[0.625rem] font-HelveticaNeueMedium uppercase text-[#94A3B8]">
            JOB INFORMATION
          </h2>
          <div className="gap-6 flex flex-col">
            {/* Name and email */}
            <div className="flex lg:flex-row flex-col py-1 gap-6">
              <ProfileInput
                title="dept"
                value={dept}
                setValue={(value) => handleInputChange("dept", value)}
                isError={!!formErrors.dept}
                errorMsg={formErrors.dept}
                big
                dropdownField
                dropdownList={departmentList}
                disabled
              />
              <ProfileInput
                title="job title"
                value={jobTitle}
                setValue={(value) => handleInputChange("jobTitle", value)}
                isError={!!formErrors.jobTitle}
                errorMsg={formErrors.jobTitle}
                big
              />
            </div>
          </div>
        </div>
      </div>

      {/* buttons */}
      <div className="flex md:flex-row flex-col md:gap-6 gap-3">
        <button
          onClick={handleFormSubmit}
          className="md:w-[10.75rem] w-full text-sm font-HelveticaNeueMedium bg-[#031B89] text-white md:py-3 py-2 px-4 rounded"
        >
          Save Changes
        </button>
        {isSaveModal && <SaveChangesModal setIsSaveModal={setIsSaveModal} />}
        <button
          onClick={() => {navigate('/home/users');}}
          className="md:w-[10.75rem] w-full text-sm font-HelveticaNeueMedium bg-white text-[#031B89] md:py-3 py-2 px-4 rounded"
        >
          Cancel
        </button>
       
      </div>
      {loading && <LoaderOverlay />}
    </div>
  );
};

export default AddUser;
