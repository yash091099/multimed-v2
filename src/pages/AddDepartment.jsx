import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import Loader from "../components/Loader";
import BackArrow from "../assets/backArrow.svg";
import SaveChangesModal from "../components/SaveChangesModal";
import ProfileInput from "../components/ProfileInput";
import ProfileInputBox from "../components/ProfileInputBox";
import DepartmentPermissionCard from "../components/DepartmentPermissionCard";
import { toast } from "react-toastify";
import { ADD_DEPARTMENT } from "../context/mutation";

const AddDepartment = ({ notAdmin }) => {
  const navigate = useNavigate();
  const [dept, setDept] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState({
    salesAnalytics: false,
    addUserDelete: false,
    configureMarketing: false,
    changePermissions: false,
  });
  const [isSaveModal, setIsSaveModal] = useState(false);
  const [formErrors, setFormErrors] = useState({ dept: "", description: "" });

  const [addDepartment, { loading }] = useMutation(ADD_DEPARTMENT);

  const handlePermissionChange = (key, value) => {
    setPermissions({ ...permissions, [key]: value });
  };

  useEffect(() => {
    if (dept?.trim()) setFormErrors((prevErrors) => ({ ...prevErrors, dept: "" }));
    else setFormErrors((prevErrors) => ({ ...prevErrors, dept: "Department name is required" }));

    if (description?.trim()) setFormErrors((prevErrors) => ({ ...prevErrors, description: "" }));
    else setFormErrors((prevErrors) => ({ ...prevErrors, description: "Description is required" }));
  }, [dept, description]);

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
      // If form is not valid
      return;
    }

    // If form is valid
    const payload = {
      name: dept,
      description: description,
      permissions: Object.keys(permissions).filter((key) => permissions[key]),
    };
    addDepartment({ variables:  payload  })
      .then((response) => {
        const { status, message } = response.data.addDepartment;
        if (status === "SUCCESS") {
          toast.success(dept+" Department added successfully.");
          localStorage.setItem("isUserDeleted", true);
          navigate("/home/users");
        } else {
          toast.error("An error occurred while adding the department.");
        }
      })
      .catch((error) => {
        console.error("Error adding department:", error);
        toast.error("An error occurred while adding the department.");
      });
  };

  return (
    <div className="w-full flex flex-col md:p-12 py-8 px-3 md:gap-12 gap-6 bg-white">
      {/* Header */}
      <div className="flex md:flex-row flex-col md:justify-between gap-4">
        <div className="flex gap-1 items-center">
          <button onClick={() => navigate("/home/users")}>
            <img src={BackArrow} alt="back arrow" className="w-6 h-6" />
          </button>
          <h1 className="md:text-2xl text-xl font-HelveticaNeueBold text-[#0F172A]">
            Add Department
          </h1>
        </div>
        {/* buttons */}
        <div className="flex md:flex-row flex-col md:gap-6 gap-3">
          <button
            onClick={() => setIsSaveModal(true)}
            className="md:w-[10.75rem] w-full text-sm font-HelveticaNeueMedium bg-[#031B89] text-white md:py-3 py-2 px-4 rounded"
          >
            Add Department
          </button>
          {isSaveModal && <SaveChangesModal handleSubmit={handleSubmit} setIsSaveModal={setIsSaveModal} />}
          {!notAdmin && (
            <button
              onClick={() => navigate("/home/users")}
              className="md:w-[10.75rem] w-full text-sm font-HelveticaNeueMedium bg-white text-[#031B89] md:py-3 py-2 px-4 rounded"
            >
              Cancel
            </button>
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
      {loading && <Loader />}
    </div>
  );
};

export default AddDepartment;
