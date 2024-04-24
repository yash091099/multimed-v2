import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import gototlast from "../assets/gotolast.svg";
import MenuAddPlusWhite from "../assets/menu-add-plus-white.svg";
import { Delete, DeleteForeverOutlined } from "@mui/icons-material";
import {toast} from 'react-toastify';
const ContentManagement = ({ onSave ,pointsProp}) => {
  const [points, setPoints] = useState(pointsProp?.length?pointsProp:[
    { point: "Point 1", description: "", author: "" },
  ]);
  const [isValid, setIsValid] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const handlePointChange = (index, field, value) => {
    const newPoints = [...points];
    newPoints[index][field] = value;
    setPoints(newPoints);
    validatePoints();
  };

  const handleSave = () => {
    if (isValid) {
      toast.success("Points saved successfully");
      console.log(points);
      onSave(points);
    }
  };

  const validatePoints = () => {
    const isValid = points.every(
      (point) => point.point && point.description && point.author
    );
    setIsValid(isValid);
  };

  const addNewPoint = () => {
    setPoints([
      ...points,
      { point: `Point ${points.length + 1}`, description: "", author: "" },
    ]);
  };

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  const removePoint = (index) => {
    const newPoints = [...points];
    newPoints.splice(index, 1);
    setPoints(newPoints);
    validatePoints();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-HelveticaNeueBold text-[#0F172A]">
          Content Management
        </h1>
      </div>

      <div className="flex gap-[2px] text-[12px] font-normal font-[500] leading-[15px]">
        <Tab.Group>
          <Tab.List className="flex gap-[2px] text-[12px] font-normal font-[500] leading-[15px]">
            {points.map((point, index) => (
              <Tab
                key={index}
                className={`relative cursor-pointer py-[8px] min-w-[125px] ${
                  index === selectedTab
                    ? "border-b-[3px] border-[#031B89]"
                    : "text-[#64748B] bg-[#F8FAFC]"
                }`}
                onClick={() => handleTabChange(index)}
              >
                {point.point}
                <button
                  className="absolute top-0 right-0 p-1 bg-white rounded-full"
                  onClick={() => removePoint(index)}
                >
                 {index !== 0?<DeleteForeverOutlined className="h-4 w-4 text-gray-500" />:<></>}
                </button>
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
        <button
          className="rounded-full bg-[#7487FF] p-1 ml-[24px]"
          onClick={addNewPoint}
        >
          <img src={MenuAddPlusWhite} alt="plus" />
        </button>
      </div>

      <div>
        <p className="flex gap-[4px] text-[10px] font-HelveticaNeueItalic leading-[12.5px] italic mb-[4px]">
          <span className="text-[#64748B]">Assign Topic Name</span>
          <span className="text-red-500">*</span>
        </p>
        <input
          type="text"
          className="outline-none text-[14px] font-[400] leading-[17.5px] bg-[#FAFAFA] border border-[#E2E8F0] p-[12px] rounded-sm w-1/2"
          value={points[selectedTab]?.point}
          placeholder="Enter topic name"
          onChange={(e) =>
            handlePointChange(selectedTab, "point", e.target.value)
          }
        />

        <p className="flex gap-[4px] text-[10px] font-HelveticaNeueItalic leading-[12.5px] italic mb-[4px]">
          <span className="text-[#64748B]">Add Description</span>
          <span className="text-red-500">*</span>
        </p>
        <textarea
          rows="5"
          className="outline-none text-[14px] font-[400] bg-[#FAFAFA] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-1/2"
          value={points[selectedTab]?.description}
          placeholder="Enter description"
          onChange={(e) =>
            handlePointChange(selectedTab, "description", e.target.value)
          }
        />

        <p className="flex gap-[4px] text-[10px] font-HelveticaNeueItalic leading-[12.5px] italic mb-[4px]">
          <span className="text-[#64748B]">Add Author</span>
          <span className="text-red-500">*</span>
        </p>
        <input
          type="text"
          className="outline-none text-[14px] font-[400] leading-[17.5px] bg-[#FAFAFA] border border-[#E2E8F0] p-[12px] rounded-sm w-1/2"
          value={points[selectedTab]?.author}
          placeholder="Enter author name"
          onChange={(e) =>
            handlePointChange(selectedTab, "author", e.target.value)
          }
        />
      </div>

      <button
        className={`w-[6.688rem] h-12 text-sm font-HelveticaNeueMedium text-[#031B89] flex gap-2 items-center justify-center py-2 px-3 rounded border border-[#031B89] bg-white ${
          isValid ? "" : "opacity-50 cursor-not-allowed"
        }`}
        onClick={handleSave}
        disabled={!isValid}
      >
        Save
      </button>
    </div>
  );
};

export default ContentManagement;
