import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useMutation, gql } from "@apollo/client"; // Import necessary Apollo Client functions

import Cross from "../assets/cross.svg";

import ProfileInput from "../components/ProfileInput";
import ProfileInputBox from "../components/ProfileInputBox";

// Define your GraphQL mutation
const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      status
      message
    }
  }
`;

const AddCategoryModal = ({ setCategoryModalOpen, categoryModalOpen, segments,refetchSegments ,refetchCategories}) => {
  const [formData, setFormData] = useState({
    categoryName: "",
    segment: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    categoryName: "",
    segment: "",
    description: "",
  });
const [segmentList,setSegmentList]=useState([]);
useEffect(()=>{
  let data=[];
  segments.forEach((segment)=>{
    data.push({id:segment.id,name:segment.segmentName})
  })
  setSegmentList(data)
},[segments])
  const [createCategoryMutation] = useMutation(CREATE_CATEGORY_MUTATION); // Initialize the mutation

  useEffect(() => {
    if (!categoryModalOpen) {
      // Reset form and errors when modal closes
      setFormData({
        categoryName: "",
        segment: "",
        description: "",
      });
      setErrors({
        categoryName: "",
        segment: "",
        description: "",
      });
    }
  }, [categoryModalOpen]);

  const closeModal = () => {
    setCategoryModalOpen(false);
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate input and update errors
    if (!value.trim()) {
      setErrors({
        ...errors,
        [name]: `Please enter ${name === "segment" ? "a" : "an"} ${name}.`,
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors = {};

    // Validate form fields
    for (const key in formData) {
      if (!formData[key].trim()) {
        newErrors[key] = `Please enter ${key === "segment" ? "a" : "an"} ${key}.`;
        formIsValid = false;
      }
    }

    if (formIsValid) {
      try {
        // Perform the mutation
        const { data } = await createCategoryMutation({
          variables: {
            input: {
              categoryName: formData.categoryName,
              segmentId: segments.find((segment) => segment.segmentName === formData.segment)?.id,
              categoryDescription: formData.description,
            },
          },
        });

        // Check if mutation was successful
        if (data && data.createCategory.status === "SUCCESS") {
          // Close the modal on successful completion
          refetchSegments();
          refetchCategories();
          closeModal();
        } else {
          // Handle error scenario
          console.error("Error:", data.createCategory.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // Form is invalid, update errors
      setErrors(newErrors);
    }
  };
  return (
    <>
      <Transition appear show={categoryModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[45.25rem] flex flex-col rounded-lg bg-white border border-[#CBD5E1] gap-3 transition-all">
                  {/* header */}
                  <div className="flex justify-between items-center py-2 px-4">
                    <h1 className="font-HelveticaNeueMedium">Add New Category</h1>
                    <button onClick={closeModal}>
                      <img src={Cross} alt="cross" className="w-6 h-6" />
                    </button>
                  </div>

                  {/* form */}
                  <form onSubmit={handleSubmit}>
                    <div className="h-[19.875rem] py-4 px-12 flex flex-col gap-3">
                      <ProfileInput
                        title="Assign name to category"
                        name="categoryName"
                        value={formData.categoryName}
                        big
                        wide
                        setValue={(value) => handleInputChange("categoryName", value)}
                        errorMsg={errors.categoryName}
                        isError={errors?.categoryName}
                      />

                      <ProfileInput
                        title="Assign segment"
                        name="segment"
                        value={formData.segment}
                        big
                        wide
                        dropdownField
                        dropdownList={segmentList}
                        isError={errors.segment}
                        setValue={(value) => handleInputChange("segment", value)}
                        errorMsg={errors?.segment}
                      />

                      <ProfileInputBox
                        title="Add category description"
                        name="description"
                        value={formData.description}
                        big
                        wide
                        setValue={(value) => handleInputChange("description", value)}
                        isError={errors?.description}
                        errorMsg={errors?.description}
                      />
                    </div>

                    {/* buttons */}
                    <div className="bg-[#F8FAFC] w-full py-3 px-4 flex gap-4 justify-end rounded-b-lg">
                      <button
                        type="button"
                        className="md:w-[8.375rem] w-full text-sm font-HelveticaNeueMedium bg-transparent text-[#031B89] md:py-3 py-2 px-4 rounded"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="md:w-[8.375rem] w-full text-sm font-HelveticaNeueMedium bg-[#031B89] text-white md:py-3 py-2 px-4 rounded"
                        disabled={!formData.categoryName || !formData.segment || !formData.description}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddCategoryModal;
