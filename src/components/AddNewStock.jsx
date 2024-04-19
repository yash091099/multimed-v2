import React, { useEffect, useState } from "react";

export default function AddNewStock(props) {
  const [type, setType] = useState("Boxes");
  const[data]=useState(props.datatoUpdate)
  console.log(data,"data----------------------------")
  const [manufacturer, setManufacturer] = useState(data?.manufacturer||"");
  const [boxes, setBoxNo] = useState(data?.boxes||"");
  const [sheets, setSheetNo] = useState(data?.sheets||"");
  const [noOfTabletsPerSheet, setTabletsPerSheet] = useState(data?.noOfTabletsPerSheet||"");
  const [units, setUnits] = useState(data?.units||"");
  const [unitWeight, setUnitWeight] = useState(data?.unitWeight||"");
  const [grams, setGrams] = useState(data?.grams||"");
  const [kgs, setKgs] = useState(data?.kgs||"");
  const [mrpPerSheet, setMrpPerSheet] = useState(data?.mrpPerSheet||"");
  const [batchNumber, setBatchNumber] = useState(data?.batchNumber||"");
  const [manufacturingDate, setManufacturerDate] = useState(data?.manufacturingDate||"");
  const [expiryDate, setExpiryDate] = useState(data?.expiryDate||"");
  const[boxMrp, setBoxMrp] = useState(data?.boxMrp||"");
  const[id] = useState(data?.id||null);

  

  const [errors, setErrors] = useState({
    manufacturer: "",
    boxes: "",
    sheets: "",
    noOfTabletsPerSheet: "",
    units: "",
    unitWeight: "",
    grams: "",
    kgs: "",
    mrpPerSheet: "",
    boxMrp: "",
    batchNumber: "",
    manufacturingDate: "",
    expiryDate: "",
  });
  const [touched, setTouched] = useState({
    manufacturer: false,
    boxes: false,
    sheets: false,
    noOfTabletsPerSheet: false,
    units: false,
    unitWeight: false,
    grams: false,
    kgs: false,
    mrpPerSheet: false,
    boxMrp: false,
    batchNumber: false,
    manufacturingDate: false,
    expiryDate: false,
  });

  const handleInputChange = (field, value) => {
    switch (field) {
      case "manufacturer":
        setManufacturer(value);
        break;
      case "boxes":
        setBoxNo(value);
        break;
      case "sheets":
        setSheetNo(value);
        break;
      case "noOfTabletsPerSheet":
        setTabletsPerSheet(value);
        break;
      case "units":
        setUnits(value);
        break;
      case "unitWeight":
        setUnitWeight(value);
        break;
      case "grams":
        setGrams(value);
        break;
      case "kgs":
        setKgs(value);
        break;
      case "mrpPerSheet":
        setMrpPerSheet(value);
        break;
      case "batchNumber":
        setBatchNumber(value);
        break;
      case "manufacturingDate":
        setManufacturerDate(value);
        break;
      case "expiryDate":
        setExpiryDate(value);
        break;
      case "boxMrp":
        setBoxMrp(value);
        break;

      default:
        break;
    }

    setTouched({ ...touched, [field]: true });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};
  
    // Manufacturer validation
    if (!manufacturer.trim()) {
      newErrors.manufacturer = "Manufacturer is required";
      valid = false;
    }
  
    // Boxes validation
    if (type === "Boxes") {
      if (!boxes?.trim() || isNaN(boxes)) {
        newErrors.boxes = "Box number is required and must be numeric";
        valid = false;
      }
      if (!sheets?.trim() || isNaN(sheets)) {
        newErrors.sheets = "Sheet number is required and must be numeric";
        valid = false;
      }
      if (!noOfTabletsPerSheet?.trim() || isNaN(noOfTabletsPerSheet)) {
        newErrors.noOfTabletsPerSheet = "Number of tablets per sheet is required and must be numeric";
        valid = false;
      }
    }
  
    // Units validation
    if (type === "Units") {
      if (!units?.trim() || isNaN(units)) {
        newErrors.units = "Number of units is required and must be numeric";
        valid = false;
      }
      if (!unitWeight?.trim() || isNaN(unitWeight)) {
        newErrors.unitWeight = "Unit weight is required and must be numeric";
        valid = false;
      }
    }
  
    // Grams validation
    if (type === "Grams" && (!grams.trim() || isNaN(grams))) {
      newErrors.grams = "Grams is required and must be numeric";
      valid = false;
    }
  
    // Kilograms validation
    if (type === "Kilograms" && (!kgs.trim() || isNaN(kgs))) {
      newErrors.kgs = "Kilograms is required and must be numeric";
      valid = false;
    }
  
    // MRP per sheet validation
    if (!mrpPerSheet?.trim() || isNaN(mrpPerSheet)) {
      newErrors.mrpPerSheet = "MRP per sheet is required and must be numeric";
      valid = false;
    }
  
    // Box MRP validation
    if (!boxMrp?.trim() || isNaN(boxMrp)) {
      newErrors.boxMrp = "Box MRP is required and must be numeric";
      valid = false;
    }
  
    // Batch number validation
    if (!batchNumber.trim()) {
      newErrors.batchNumber = "Batch number is required";
      valid = false;
    }
  
    // Manufacturing date validation
    if (!manufacturingDate.trim()) {
      newErrors.manufacturingDate = "Manufacturing date is required";
      valid = false;
    }
  
    // Expiry date validation
    if (!expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
      valid = false;
    }
  
    // Date comparison validation
    const manufacturingDateObj = new Date(manufacturingDate);
    const expiryDateObj = new Date(expiryDate);
    if (manufacturingDateObj >= expiryDateObj) {
      newErrors.expiryDate = "Expiry date must be after the manufacturing date";
      valid = false;
    }
  
    setErrors(newErrors);
    return valid;
  };
  
  
  const handleSave = () => {
    console.log(id,'-----------------id')
    if (data?true:validateForm()) {
      let payload = {
        manufacturer,
        boxes: Number(boxes),
        sheets: Number(sheets),
        noOfTabletsPerSheet: Number(noOfTabletsPerSheet),
        stockType: type,
        mrpPerSheet: Number(mrpPerSheet),
        batchNumber,
        manufacturingDate,
        expiryDate,
        noOfUnits: Number(units),
        weightPerUnit: Number(unitWeight),
        noOfGrams: Number(grams),
        noOfKgs: Number(kgs),
        boxMrp: Number(boxMrp),
        groupNumber: 1,
      };

      if(id){
        payload['id'] = id
      }
  
      props.stockData(payload);  // Send data back to parent component
      props.setNewStockModal(false);  // Close modal
    } else {
      setTouched({
        manufacturer: true,
        boxes: true,
        sheets: true,
        noOfTabletsPerSheet: true,
        units: true,
        unitWeight: true,
        grams: true,
        kgs: true,
        mrpPerSheet: true,
        batchNumber: true,
        manufacturingDate: true,
        expiryDate: true,
        boxMrp: true,
      });
    }
  };
  

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0">
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black/30"
        onClick={() => props.setNewStockModal(false)}
      ></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-[724px] bg-white rounded-[8px]">
        <div className="flex justify-between w-full px-[16px] py-[8px]">
          <h1 className="text-[16px] font-HelveticaNeueMedium leading-[20px]">
            {data ? "Update" : "Add"}  Stock
          </h1>
          <button
            className="text-[24px]"
            onClick={() => props.setNewStockModal(false)}
          >
            &times;
          </button>
        </div>
        <div className="px-[48px] py-[16px]">
          <div>
            <p className="flex gap-[4px] text-[10px] font-HelveticaNeueThin leading-[12.5px] italic mb-[4px]">
              <p className="text-[#64748B] ">Manufacturer</p>
              <span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              disabled={props?.dataToUpdate}
              placeholder="Enter manufacturer name"
              className="outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full"
              value={manufacturer}
              onChange={(e) =>
                handleInputChange("manufacturer", e.target.value)
              }
            />
            {touched?.manufacturer && errors?.manufacturer && (
              <p className="text-red-500 text-[10px]">{errors?.manufacturer}</p>
            )}
          </div>
          <div>
            <h1 className="text-[16px] font-[700] leading-[20px] mt-[12px]">
              {type}
            </h1>
            <div className="flex flex-col gap-[4px] py-[12px]">
            <h2 className="text-[#64748B] text-[10px] font-[700] leading-[12.5px] mb-[12px]">
                GROUP 1
              </h2>
              <div>
                <p className="flex gap-[4px] text-[10px] font-HelveticaNeueThin leading-[12.5px] italic mb-[4px]">
                  <span className="text-[#64748B] ">Select stock type</span>
                  <span className="text-red-500">*</span>
                </p>
                <select
                  className="outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full"
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                >
                  <option value="Boxes">Box</option>
                  <option value="Units">Unit</option>
                  <option value="Grams">Grams</option>
                  <option value="Kilograms">Kgs</option>
                </select>
              </div>
              <div className="flex gap-[12px] w-full">
                {type === "Boxes" && (
                  <>
                    <div className="flex-1">
                      <p className="flex gap-[4px] text-[10px] font-[300] leading-[12.5px] mb-[4px]">
                        Boxes:
                      </p>
                      <input
                        type="number"
                        placeholder="Enter Box No."
                        className="outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full"
                        value={boxes}
                        onChange={(e) =>
                          handleInputChange("boxes", e.target.value)
                        }
                      />
                      {touched.boxes && errors.boxes && (
                        <p className="text-red-500 text-[10px]">{errors.boxes}</p>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="flex gap-[4px] text-[10px] font-[300] leading-[12.5px] mb-[4px]">
                        Sheets:
                      </p>
                      <input
                        type="number"
                        placeholder="Enter Sheet No."
                        className="outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full"
                        value={sheets}
                        onChange={(e) =>
                          handleInputChange("sheets", e.target.value)
                        }
                      />
                      {touched.sheets && errors.sheets && (
                        <p className="text-red-500 text-[10px]">
                          {errors.sheets}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="flex gap-[4px] text-[10px] font-[300] leading-[12.5px] mb-[4px]">
                        No. of tablets per sheet:
                      </p>
                      <input
                        type="number"
                        placeholder="Enter Tablets No."
                        className="outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full"
                        value={noOfTabletsPerSheet}
                        onChange={(e) =>
                          handleInputChange("noOfTabletsPerSheet", e.target.value)
                        }
                      />
                      {touched.noOfTabletsPerSheet && errors.noOfTabletsPerSheet && (
                        <p className="text-red-500 text-[10px]">
                          {errors.noOfTabletsPerSheet}
                        </p>
                      )}
                    </div>
                  </>
                )}
                {type === "Units" && (
                  <>
                    <div className="flex-1">
                      <p className="flex gap-[4px] text-[10px] font-[300] leading-[12.5px] mb-[4px]">
                        No. of Units
                      </p>
                      <input
                        type="number"
                        placeholder="Enter Units No."
                        className="outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full"
                        value={units}
                        onChange={(e) =>
                          handleInputChange("units", e.target.value)
                        }
                      />
                      {touched.units && errors.units && (
                        <p className="text-red-500 text-[10px]">
                          {errors.units}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="flex gap-[4px] text-[10px] font-[300] leading-[12.5px] mb-[4px]">
                        Enter weight per unit
                      </p>
                      <input
                        type="number"
                        placeholder="Enter Weight"
                        className="outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full"
                        value={unitWeight}
                        onChange={(e) =>
                          handleInputChange("unitWeight", e.target.value)
                        }
                      />
                      {touched.unitWeight && errors.unitWeight && (
                        <p className="text-red-500 text-[10px]">
                          {errors.unitWeight}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {type === "Grams" && (
                  <>
                    <div className="flex-1">
                      <p className="flex gap-[4px] text-[10px] font-[300] leading-[12.5px] mb-[4px]">
                        No. of grams
                      </p>
                      <input
                        type="number"
                        placeholder="Enter Grams"
                        className="outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full"
                        value={grams}
                        onChange={(e) =>
                          handleInputChange("grams", e.target.value)
                        }
                      />
                      {touched.grams && errors.grams && (
                        <p className="text-red-500 text-[10px]">
                          {errors.grams}
                        </p>
                      )}
                    </div>
                  </>
                )}
                {type === "Kilograms" && (
                  <>
                    <div className="flex-1">
                      <p className="flex gap-[4px] text-[10px] font-[300] leading-[12.5px] mb-[4px]">
                        No. of Kgs
                      </p>
                      <input
                        type="number"
                        placeholder="Enter Kgs"
                        className="outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full"
                        value={kgs}
                        onChange={(e) =>
                          handleInputChange("kgs", e.target.value)
                        }
                      />
                      {touched.kgs && errors.kgs && (
                        <p className="text-red-500 text-[10px]">
                          {errors.kgs}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div>
                <p className="flex gap-[4px] text-[10px] font-HelveticaNeueThin leading-[12.5px] italic mb-[4px]">
                  <p className="text-[#64748B] ">Enter MRP</p>
                  <span className="text-red-500">*</span>
                </p>
                <input
                  type="number"
                  className="outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full"
                  placeholder="Enter MRP (in Rs)"
                  value={mrpPerSheet}
                  onChange={(e) =>
                    handleInputChange("mrpPerSheet", e.target.value)
                  }
                />
                {touched.mrpPerSheet && errors.mrpPerSheet && (
                  <p className="text-red-500 text-[10px]">
                    {errors.mrpPerSheet}
                  </p>
                )}
              </div>
              <div>
                <p className="flex gap-[4px] text-[10px] font-HelveticaNeueThin leading-[12.5px] italic mb-[4px]">
                  <p className="text-[#64748B] ">Box MRP</p>
                  <span className="text-red-500">*</span>
                </p>
                <input
                  type="number"
                  className="outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full"
                  placeholder="Box MRP will be shown here"
                  value={boxMrp}
                  onChange={(e) => handleInputChange("boxMrp", e.target.value)}
                />
                {touched.boxMrp && errors.boxMrp && (
                  <p className="text-red-500 text-[10px]">
                    {errors.boxMrp}
                  </p>
                )}
              </div>
              <div>
                <p className="flex gap-[4px] text-[10px] font-HelveticaNeueThin leading-[12.5px] italic mb-[4px]">
                  <p className="text-[#64748B] ">Batch number</p>
                  <span className="text-red-500">*</span>
                </p>
                <input
                  type="text"
                  className="outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full"
                  placeholder="Enter Batch number"
                  value={batchNumber}
                  onChange={(e) => handleInputChange("batchNumber", e.target.value)}
                />
                {touched.batchNumber && errors.batchNumber && (
                  <p className="text-red-500 text-[10px]">
                    {errors.batchNumber}
                  </p>
                )}
              </div>
              <div className="flex gap-[4px]">
                <div className="flex-1">
                  <p className="flex gap-[4px] text-[10px] font-HelveticaNeueThin leading-[12.5px] italic mb-[4px]">
                    <p className="text-[#64748B] ">Manufacturer Date</p>
                    <span className="text-red-500">*</span>
                  </p>
                  <input
                    type="date"
                    onKeyDown={(e) => e.preventDefault()}
                    className="outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full"
                    placeholder="02/02/2023"
                    value={manufacturingDate}
                    onChange={(e) =>
                      handleInputChange("manufacturingDate", e.target.value)
                    }
                  />
                  {touched.manufacturingDate && errors.manufacturingDate && (
                    <p className="text-red-500 text-[10px]">
                      {errors.manufacturingDate}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <p className="flex gap-[4px] text-[10px] font-HelveticaNeueThin leading-[12.5px] italic mb-[4px]">
                    <p className="text-[#64748B] ">Expiry Date</p>
                    <span className="text-red-500">*</span>
                  </p>
                  <input
                    type="date"
                    onKeyDown={(e) => e.preventDefault()}
                    className="outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full"
                    placeholder="02/02/2028"
                    value={expiryDate}
                    onChange={(e) =>
                      handleInputChange("expiryDate", e.target.value)
                    }
                  />
                  {touched.expiryDate && errors.expiryDate && (
                    <p className="text-red-500 text-[10px]">
                      {errors.expiryDate}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div className="flex justify-end gap-[16px] px-[16px] py-[12px]">
          <button
            className="text-[#031B89] text-[16px] font-HelveticaNeueMedium leading-[20px] w-[77px]"
            onClick={() => props.setNewStockModal(false)}
          >
            Cancel
          </button>
          <button
            className="text-white text-[16px] font-HelveticaNeueMedium leading-[20px] px-[16px] py-[12px] bg-[#031B89] w-[134px] rounded-[4px]"
            onClick={() => {
              handleSave();
            }}
          >
            {data ? 'Update' : 'Add'} Stock
          </button>
        </div>
      </div>
    </div>
  );
}
