import React, { useEffect, useRef, useState } from "react";
import ProfileInput from "../components/ProfileInput";
import BackArrow from "../assets/backArrow.svg";
import RemovedPP from "../assets/removedPP.png";
import SaveChangesModal from "../components/SaveChangesModal";
import { Link, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GET_ADDED_DEPARTMENTS, UPDATE_USER,DELETE_USER } from "../context/mutation";
import LoaderOverlay from "../components/loadinOverlay";

const EditUser = () => {
  const location = useLocation();
  const tableData= location?.state;
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [departmentList, setDepartmentList] = useState([]);
  const [name, setName] = useState(tableData?.fullName || "");
  const [email, setEmail] = useState(tableData?.email || "");
  const [phone, setPhone] = useState(tableData?.contactNumber || "");
  const [dept, setDept] = useState(tableData?.department?.name || "");
  const [jobTitle, setJobTitle] = useState(tableData?.role || "");
  const [deleteUser] = useMutation(DELETE_USER);
  const [removePP, setRemovePP] = useState(false);
  const [isSaveModal, setIsSaveModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    dept: "",
    jobTitle: "",
  });

  const [updateUser] = useMutation(UPDATE_USER);
  const { data: departments } = useQuery(GET_ADDED_DEPARTMENTS);

  useEffect(() => {
    if (departments) {
      setDepartmentList(departments.getAddedDepartments.departments);
    }
  }, [departments]);

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
    if (!value?.trim()) {
      setFormErrors({
        ...formErrors,
        [field]: `${field.toUpperCase()} is required`,
      });
    } else {
      setFormErrors({
        ...formErrors,
        [field]: "",
      });
    }
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

    if (Object.keys(errors).length === 0) {
      const formData = {
        userId: tableData.id,
        fullName: name,
        email: email,
        contactNumber: phone,
        departmentId: departmentList?.find((d) => d.name === dept)?.id,
        role: jobTitle,
      };
setLoading(true);
      updateUser({ variables: formData })
        .then((response) => {
          const { status, message } = response.data.updateUser;
          if (status === "SUCCESS") {
setLoading(false);

            toast.success("User updated successfully.");
            localStorage.setItem("isUserDeleted", true);
            navigate("/home/users");
          } else {
            toast.error(message);
          }
        })
        .catch((error) => {
setLoading(false);

          toast.error(error.message);
        });
        
    }
  };

  const handleDeleteUser = () => {
    const formData = {
      id: tableData.id
    };
    deleteUser({ variables: formData })
    .then((response) => {
      const { status, message } = response.data.deleteUser;
      if (status === "SUCCESS") {
        toast.success("User deleted successfully.");
        localStorage.setItem("isUserDeleted", true);
        navigate("/home/users");
      } else {
        toast.error(message);
      }
    })
    .catch((error) => {
      toast.error(error.message);
    });

  };

  return (
    <div className="w-full flex flex-col md:p-12 py-8 px-3 md:gap-12 gap-6 bg-white">
      {/* Heading */}
      <div className="flex gap-1 items-center">
        <Link to="/home/users">
          <img src={BackArrow} alt="back arrow" className="w-6 h-6" />
        </Link>
        <h1 className="md:text-2xl text-xl font-HelveticaNeueBold drea">
          Edit User
        </h1>
      </div>

      {/* Main */}
      <div name="profile" className="w-full flex flex-col gap-4">
        {/* Heading */}
        <h1 className=" font-HelveticaNeueMedium md:text-[1.125rem] text-[#0F172A]">
          Profile
        </h1>

        {/* Pfp */}
        {/* <div className="flex flex-col gap-2">
          <h2 className="text-[0.625rem] font-HelveticaNeueMedium uppercase text-[#94A3B8]">
            PROFILE PICTURE
          </h2>
          <div className="py-1 gap-6 flex">
            <img
              src={!removePP ? ProfilePicture : RemovedPP}
              alt="profile picture"
              className="border-[3px] border-[#031B89] w-[4.5rem] h-[4.5rem] cursor-pointer rounded-full"
            />
            <button
              className="text-[0.75rem] font-HelveticaNeueMedium text-[#031B89]"
              onClick={() => fileRef.current.click()}
            >
              CHANGE
            </button>
            <input
              type="file"
              ref={fileRef}
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files[0])}
            />
            <button
              onClick={() => setRemovePP(true)}
              className="text-[0.75rem] font-HelveticaNeueMedium text-[#031B89]"
            >
              REMOVE
            </button>
          </div>
        </div> */}

        {/* Details */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[0.625rem] font-HelveticaNeueMedium uppercase text-[#94A3B8]">
            PERSONAL DETAILS
          </h2>
          <div className="gap-6 flex flex-col">
            {/* Name and email */}
            <div className="flex lg:flex-row flex-col py-1 gap-6">
              {/* Name input */}
              <ProfileInput
                title="name"
                value={name}
                setValue={(value) => handleInputChange("name", value)}
                isError={!!formErrors.name}
                errorMsg={formErrors.name}
                big
              />

              {/* Email input */}
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
              {/* Dept input */}
              <ProfileInput
                title="dept"
                value={dept}
                setValue={(value) => handleInputChange("dept", value)}
                isError={!!formErrors.dept}
                errorMsg={formErrors.dept}
                big
                dropdownField
                dropdownList={departmentList}
              />

              {/* Job title input */}
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
          Update
        </button>
        <button
            onClick={handleDeleteUser}
            className="md:w-[10.75rem] w-full text-sm font-HelveticaNeueMedium bg-white text-[#EF4444] border border-[#EF4444] md:py-3 py-2 px-4 rounded"
          >
            Delete User
          </button>
        {isSaveModal && <SaveChangesModal setIsSaveModal={setIsSaveModal} />}
      </div>
      {loading && <LoaderOverlay />}
    </div>
  );
};

export default EditUser;
