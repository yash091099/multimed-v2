import React, { useEffect, useState } from "react";

import ProfileInput from "../components/ProfileInput";
import DepartmentPermissionCard from "../components/DepartmentPermissionCard";
import { GET_DEPARTMENT_USER,DELETE_DEPARTMENT,UPDATE_DEPARTMENT } from "../context/mutation";
import BackArrow from "../assets/backArrow.svg";
import SaveChangesModal from "../components/SaveChangesModal";
import DeleteUserModal from "../components/DeleteUserModal";
import ProfileInputBox from "../components/ProfileInputBox";
import SearchIcon from "../assets/searchIcon.svg";
import UserCell from "../components/UserCell";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { client } from "../main";
import {toast} from 'react-toastify'
import Loader from "../components/Loader";
const EditDepartment = ({ notAdmin }) => {
  const location=useLocation();
  const navigate=useNavigate()
  const departmentData=location.state;
  const [dept, setDept] = useState(departmentData?.name||"");
  const [description, setDescription] = useState(departmentData?.description||"");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaveModal, setIsSaveModal] = useState(false);
  const [formErrors, setFormErrors] = useState({ dept: "", description: "" });
const [loading,setLoading]=useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState( );
  const [permissions, setPermissions] = useState({
    salesAnalytics: departmentData?.permissions?.includes("salesAnalytics") ? true : false,
    addUserDelete: departmentData?.permissions?.includes("addUserDelete") ? true : false,
    configureMarketing: departmentData?.permissions?.includes("configureMarketing") ? true : false,
    changePermissions: departmentData?.permissions?.includes("changePermissions") ? true : false,
  });
  const [updateDepartment, { loading:updateLoading }] = useMutation(UPDATE_DEPARTMENT);
  const [deleteDepartmentMutation] = useMutation(DELETE_DEPARTMENT);

  const[departmentUsers,setDepartmentUser]=useState([]);
  const handlePermissionChange = (key, value) => {
    setPermissions({ ...permissions, [key]: value });
  };

  useEffect(() => {
    if (dept?.trim()) setFormErrors((prevErrors) => ({ ...prevErrors, dept: "" }));
    else setFormErrors((prevErrors) => ({ ...prevErrors, dept: "Department name is required" }));

    if (description?.trim()) setFormErrors((prevErrors) => ({ ...prevErrors, description: "" }));
    else setFormErrors((prevErrors) => ({ ...prevErrors, description: "Description is required" }));
  }, [dept, description]);
  useEffect(() => {
    const fetchDepartmentUser = async () => {
      setLoading(true)
      try {
        const { data } = await client.query({
          query: GET_DEPARTMENT_USER,
          variables: { input: departmentData?.id }
        });
        setDepartmentUser(data?.getDepartmentUsers?.users);
      } catch (error) {
        console.error('Error fetching department users:', error);
      }finally{
        setLoading(false)
      }
    };
  
    if (departmentData?.id) {
      fetchDepartmentUser();
    }
  }, [departmentData?.id]);
  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearchQuery(e.target.value);
  };
  const filteredUsers = searchQuery?.trim() ? 
  departmentUsers?.filter((user) => 
    user.fullName?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  ) : departmentUsers;

  const handleSubmit = () => {
    // Validation
    const errors = {};
    if (!dept.trim()) {
      errors.dept = "Department name is required";
    }
    if (!description.trim()) {
      errors.description = "Description is required";
    }
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true)
    const payload = {
      name: dept,
      description: description,
      permissions: Object.keys(permissions).filter((key) => permissions[key]),
      departmentId:departmentData?.id
    };
    updateDepartment({ variables:  payload  })
      .then((response) => {
        const { status, message } = response.data.updateDepartment;
        if (status === "SUCCESS") {
          toast.success(dept+" Department Updated successfully.");
          navigate("/home/users");
        } else {
          toast.error("An error occurred while adding the department.");
        }
      })
      .catch((error) => {
        console.error("Error Update department:", error);
        toast.error("An error occurred while adding the department.");
      });
    setLoading(false)
  };
  

  const handleDelete = async () => {
    console.log("Delete", departmentData?.id);
    setLoading(true);
    try {
        const { data } = await deleteDepartmentMutation({
          variables: { deptId: departmentData?.id }
        });
        localStorage.setItem("isUserDeleted", true);
        toast.success("Department deleted successfully.");
        navigate("/home/users");
    } catch (error) {
        console.error('Error deleting department:', error);
        toast.error("An error occurred while deleting the department.");
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="w-full flex flex-col md:p-12 py-8 px-3 md:gap-12 gap-6 bg-white">
      {/* Header */}
      <div className="flex md:flex-row flex-col justify-between gap-4">
        <div className="flex gap-1 items-center">
          <Link to="/home/users">
            <img src={BackArrow} alt="back arrow" className="w-6 h-6" />
          </Link>

          <h1 className="md:text-2xl text-xl font-HelveticaNeueBold text-[#0F172A]">
            Edit Department
          </h1>
        </div>

        {/* buttons */}
        <div className="flex md:flex-row flex-col md:gap-6 gap-2">
          <button
            onClick={() => setIsSaveModal(true)}
            className="md:w-[10.75rem] w-full text-sm font-HelveticaNeueMedium bg-[#031B89] text-white md:py-3 py-2 px-4 rounded"
          >
            Update
          </button>

          {isSaveModal && <SaveChangesModal setIsSaveModal={setIsSaveModal} handleSubmit={handleSubmit} />}

          {!notAdmin && (
            <button
              onClick={() => setIsDeleteModal(true)}
              // style={{cursor:"not-allowed"}}
              className="md:w-[10.75rem] w-full text-sm font-HelveticaNeueMedium bg-white text-[#EF4444] border border-[#EF4444] md:py-3 py-2 px-4 rounded"
            >
              Delete Department
            </button>
          )}

          {isDeleteModal && (
            <DeleteUserModal handleDelete={handleDelete} setIsDeleteModal={setIsDeleteModal} />
          )}
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[0.625rem] font-HelveticaNeueMedium uppercase text-[#94A3B8]">
          DEPT. DETAILS
        </h2>

        <div className="gap-6 flex flex-col">
          {/* Name and description */}
          <div className="flex flex-col py-1 gap-6">
            {/* Name input */}
            <ProfileInput
              title="dept name"
              value={dept}
              setValue={setDept}
              isError={!!formErrors.dept}
              errorMsg={formErrors.dept}
              big
            />

            {/* description input */}
            <ProfileInputBox
              title="description"
              value={description}
              setValue={setDescription}
              isError={!!formErrors.description}
              errorMsg={formErrors.description}
              big
            />
          </div>
        </div>
      </div>

      {/* Permissions */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[0.625rem] font-HelveticaNeueMedium uppercase text-[#94A3B8]">
          DEPARTMENT PERMISSIONS
        </h2>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-1">
          <DepartmentPermissionCard
            title="View Sales Analytics"
            description="Can view day-to-day revenue cadences"
            permission={permissions.salesAnalytics}
            setPermission={(value) => handlePermissionChange("salesAnalytics", value)}
          />
          <DepartmentPermissionCard
            title="Can Add/Delete Users"
            description="Can view day-to-day revenue cadences"
            permission={permissions.addUserDelete}
            setPermission={(value) => handlePermissionChange("addUserDelete", value)}
          />
          <DepartmentPermissionCard
            title="Configure Marketing"
            description="Can view day-to-day revenue cadences"
            permission={permissions.configureMarketing}
            setPermission={(value) => handlePermissionChange("configureMarketing", value)}
          />
          <DepartmentPermissionCard
            title="Change permissions"
            description="Can view day-to-day revenue cadences"
            permission={permissions.changePermissions}
            setPermission={(value) => handlePermissionChange("changePermissions", value)}
          />
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2">
        {/* header */}
        <div className="flex md:flex-row flex-col justify-between md:items-center gap-2">
          <h2 className="text-[0.625rem] font-HelveticaNeueMedium uppercase text-[#94A3B8]">
            USERS IN DEPARTMENT
          </h2>

          {/* searchbar */}
          <div className="md:w-[19.625rem] rounded border border-[#CBD5E1] bg-white md:py-0.5 px-2">
            <div className="p-2 flex gap-2 items-center">
              <img src={SearchIcon} alt="search icon" className="w-6 h-6" />

              <input
                    type="text"
                    placeholder="Search for people"
                    className="placeholder:text-[#94A3B8] md:text-sm text-xs focus:outline-none"
                    onChange={handleSearch}
                    value={searchQuery}
                  />
            </div>
          </div>
        </div>

        {/* user table */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white flex flex-col">
          {/* labels */}
          <div className="md:flex hidden justify-between border-y border-[#CBD5E1] bg-[#FAFAFA] py-6 px-12">
            <h1 className="lg:w-[11.25rem] md:w-[8rem] text-sm font-HelveticaNeueItalic text-[#64748B]">
              Name
            </h1>
            <h1 className="lg:w-[11.25rem] md:w-[8rem] text-sm font-HelveticaNeueItalic text-[#64748B]">
              Employee ID
            </h1>
            <h1 className="lg:w-[11.25rem] md:w-[8rem] text-sm font-HelveticaNeueItalic text-[#64748B]">
              Department
            </h1>
            <h1 className="lg:w-[11.25rem] md:w-[8rem] text-sm font-HelveticaNeueItalic text-[#64748B]">
              Role
            </h1>
          </div>

          {/* user cells */}
          {filteredUsers?.length ? filteredUsers.map((tableData) => { return (<UserCell key={tableData.id} tableData={tableData} />) }) : <div className="p-4 text-sm font-HelveticaNeueItalic text-[#64748B] text-center w-full">No users found</div>}

        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default EditDepartment;
