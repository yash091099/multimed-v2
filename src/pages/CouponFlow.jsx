import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchIcon from "../assets/searchIcon.svg";
import CouponCard from "../components/CouponCard";
import ToggleButton from "../components/ToggleButton";
import downarrow from "../assets/down-arrow.svg";
import uparrow from "../assets/uparrow.svg";
import {
  CREATE_COUPON,
  GET_COUPONS,
  UPDATE_COUPON,
  DELETE_COUPONS,
} from "../context/mutation";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { TextField, Button, Switch } from "@material-ui/core";
import LoaderOverlay from "../components/loadinOverlay";
export default function CouponFlow() {
  const [categoryText, setCategoryText] = useState("");
  const [menuController, setMenuController] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const { data, refetch: refetchCoupons } = useQuery(GET_COUPONS);
  const [createCoupon] = useMutation(CREATE_COUPON);
  const [updateCoupon] = useMutation(UPDATE_COUPON);
  const [deleteCoupon] = useMutation(DELETE_COUPONS);
  const [couponState, setCouponState] = useState(false);
  const [D, setD] = useState([]);
  const [couponsData, setCouponsData] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [loading,setLoading]=useState(true);

  const [filteredCouponsData, setFilteredCouponsData] = useState([]);

  useEffect(() => {
    if (data) {
      setLoading(false);
      setCouponsData(data?.getCoupons?.coupons || []);
      setFilteredCouponsData(data?.getCoupons?.coupons || []);

    }
  }, [data]);
  const [couponForm, setCouponForm] = useState({
    code: "",
    percentage: "",
    description: "",
    type: "PERCENTAGE",
    status: true, // Initial status set to false
    expiryDate: "",
    categories: [],
  });
  const [filters, setFilters] = useState({
    status: "",
    couponType: "",
    expiryDateRange: {
      start: "",
      end: "",
    },
    couponName: "",
  });

  const [errors, setErrors] = useState({
    code: "",
    percentage: "",
    description: "",
    expiryDate: "",
  });
  const [touched, setTouched] = useState({
    code: false,
    percentage: false,
    description: false,
    expiryDate: false,
  });

  useEffect(() => {
    fetchCoupons();
  }, []);
  useEffect(() => {
    applyFilters();
  }, [filters, couponsData]);
  const applyFilters = () => {
    const { status, couponType, expiryDateRange, couponName } = filters;
    console.log(expiryDateRange, "expiryDateRange");
    let filtered = [...couponsData];

    if (status === "active") {
      filtered = filtered.filter((coupon) => coupon.status === "ACTIVE");
    } else if (status === "inactive") {
      filtered = filtered.filter((coupon) => coupon.status === "INACTIVE");
    }

    if (couponType) {
      filtered = filtered.filter((coupon) => coupon.type === couponType);
    }

    if (expiryDateRange.start && expiryDateRange.end) {
      filtered = filtered.filter((coupon) => {
        const expiryDate = new Date(Number(coupon.expiryDate));
        const startDate = expiryDateRange.start
          ? new Date(new Date(expiryDateRange.start).getTime())
          : new Date(-8640000000000000);
        const endDate = expiryDateRange.end
          ? new Date(new Date(expiryDateRange.end).getTime() + 86400000) // Add one day to include the end date
          : new Date(8640000000000000);
        return expiryDate >= startDate && expiryDate <= endDate;
      });
    }

    if (couponName) {
      filtered = filtered.filter((coupon) =>
        coupon.code.toLowerCase().includes(couponName.toLowerCase())
      );
    }

    setFilteredCouponsData(filtered);
  };

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const { data } = await refetchCoupons();
      setCouponsData(data?.getCoupons?.coupons || []);
      setFilteredCouponsData(data?.getCoupons?.coupons || []);

    } catch (error) {
      console.error("Error fetching coupons:", error);
    }finally{
      setLoading(false);
    }
  };

  const handleCreateCoupon = async (event) => {
    event.preventDefault();
    if (!isFormValid()) {
      setTouched({
        code: true,
        percentage: true,
        description: true,
        expiryDate: true,
      });
      return;
    }
    try {
      let category = [];
      D?.forEach((item) => {
        if (item?.text) {
          category.push(item?.text);
        }
      });

      let dts = {
        code: couponForm.code,
        percentage: Number(couponForm.percentage),
        description: couponForm.description,
        type: couponForm.type,
        status: couponForm.status ? "ACTIVE" : "INACTIVE",
        expiryDate: couponForm.expiryDate,
        categories: category,
        products:[],
        fixedAmount:Number(1)
      };
      console.log(dts, "couponForm");
      const { data } = await createCoupon({ variables: dts });
      toast.success("Coupon created successfully!");
      setEditModal(false);
      refetchCoupons();
    } catch (error) {
      console.error("Error creating coupon:", error);
      toast.error("Error creating coupon. Please try again later.");
    }
  };

  const handleUpdateCoupon = async () => {
    if (!selectedCoupon) return;
   
    setLoading(true);
    let category = [];
    D?.forEach((item) => {
      if (item?.text) {
        category.push(item?.text);
      }
    });
    try {
      let dts = {
        code: couponForm.code,
        percentage: parseInt(couponForm.percentage),
        description: couponForm.description,
        type: couponForm.type,
        status: couponForm.status ? "ACTIVE" : "INACTIVE",
        expiryDate: couponForm.expiryDate,
        categories: category,
      };
  
      await updateCoupon({
        variables: {
          id: selectedCoupon.id,
          input: dts,
        },
      });
  
      toast.success("Coupon updated successfully!");
      setEditModal(false);
      refetchCoupons();
      setSelectedCoupon(null);
    } catch (error) {
      console.error("Error updating coupon:", error);
      toast.error("Error updating coupon. Please try again later.");
    }finally{
      setLoading(false);
    }
  };
  

  const handleEditCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setEditModal(true);
  };

  const handleDeleteCoupon = async (id) => {
    if (!id) return;
    setLoading(true);
    try {
      const { data } = await deleteCoupon({ variables: { id } });
      toast.success("Coupon deleted successfully!");
      refetchCoupons();
    } catch (error) {
      console.error("Error deleting coupon:", error);
      toast.error("Error deleting coupon. Please try again later.");
    }finally{
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCouponForm({
      ...couponForm,
      [name]: value,
    });
    setTouched({
      ...touched,
      [name]: true,
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "code":
        error = value.trim() ? "" : "Coupon code is required";
        break;
      case "percentage":
        error = value.trim() ? "" : "Coupon percentage is required";
        break;
      case "description":
        error = value.trim() ? "" : "Coupon description is required";
        break;
      case "expiryDate":
        error = value.trim() ? "" : "Expiry date is required";
        break;
      default:
        break;
    }
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleToggleChange = () => {
    // Toggle the status value
    setCouponForm({
      ...couponForm,
      status: !couponForm.status,
    });
  };

  const handleCategoryInput = (event) => {
    if (event.code === "Backspace") return;
    if (event.code === "Enter") {
      setD([...D, { id: categoryText, text: categoryText }]);
      setCategoryText("");
      return;
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
    
  };
  

  const handleResetFilters = () => {
    setFilters({
      status: "",
      couponType: "",
      expiryDateRange: {
        start: "",
        end: "",
      },
      couponName: "",
    });
  };
  const handleDateRangeChange = (key, value) => {
    setFilters({
      ...filters,
      expiryDateRange: {
        ...filters.expiryDateRange,
        [key]: value,
      },
    });
  };

  const isFormValid = () => {
    const { code, percentage, description, expiryDate } = couponForm;
    const errors = {};
    let isValid = true;
    if (!code.trim()) {
      errors.code = "Coupon code is required";
      isValid = false;
    }

    if (!percentage.trim()) {
      errors.percentage = "Coupon percentage is required";
      isValid = false;
    }

    if (!description.trim()) {
      errors.description = "Coupon description is required";
      isValid = false;
    }

    if (!expiryDate.trim()) {
      errors.expiryDate = "Expiry date is required";
      isValid = false;
    }

    setErrors(errors);

    return isValid;
  };

  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true,
    });
    validateField(field, couponForm[field]);
  };

  const resetForm = () => {
    setD([]);
    setCouponForm({
      code: "",
      percentage: "",
      description: "",
      type: "PERCENTAGE",
      status: false,
      expiryDate: "",
      categories: [],
    });
    setErrors({
      code: "",
      percentage: "",
      description: "",
      expiryDate: "",
    });
    setTouched({
      code: false,
      percentage: false,
      description: false,
      expiryDate: false,
    });
  };

  useEffect(() => {
    if (!editModal) {
      resetForm();
    }
  }, [editModal]);
  const formatDate = (expiryDate) => {
    // Convert milliseconds to Date object
    const date = new Date(Number(expiryDate));
    // Get year, month, and day components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    // Construct the formatted date string
    return `${year}-${month}-${day}`;
};
  useEffect(()=>{
    console.log(selectedCoupon)
    if(selectedCoupon){
      setCouponForm({
        code: selectedCoupon?.code,
        percentage: selectedCoupon?.percentage,
        description: selectedCoupon?.description,
        type: selectedCoupon?.type,
        status: selectedCoupon?.status === "ACTIVE",
        expiryDate: formatDate(selectedCoupon?.expiryDate), // Format expiry date
        categories: selectedCoupon?.categories
      })
    }
  },[selectedCoupon])

  return (
    <div className="p-[48px] bg-white w-full">
      <div className="flex justify-between w-full mb-[48px]">
        <h1 className="font-HelveticaNeueBold font-[700] text-[24px] tracking-[0.552px] leading-[30px] ">
          Coupon Managment
        </h1>
        <div className="flex md:flex-row flex-col md:gap-4 gap-2 ">
          <div className="flex items-center md:w-[426px] rounded border border-[#CBD5E1] bg-white px-2">
            <div className="md:p-2 p-1 flex gap-2 items-center w-full">
              <img src={SearchIcon} alt="search icon" className="w-6 h-6" />
              <input
                type="text"
                placeholder="Search for coupon"
                className="placeholder:text-[#94A3B8] md:text-sm text-xs focus:outline-none w-full"
                name="couponName"
                value={filters.couponName}
                onChange={handleFilterChange}
                
              />
            </div>
          </div>
          <button
            className="md:text-base text-sm align-middle text-center md:w-[15.5rem] rounded md:py-3 py-2 px-4 bg-[#031B89] text-white"
            onClick={() => {setSelectedCoupon(null);setEditModal(true);}}
          >
            + Create Coupon
          </button>
        </div>
      </div>
      <div>
        <p className="mb-[8px]">Filters</p>
        <div className="flex gap-[32px]">
          <div className="flex items-center gap-[8px]">
            <p className="text-slate-500 font-helvetica-neue text-[12px] font-normal leading-3">
              Select Status
            </p>
            <div className="text-[#7487FF] bg-[#F8FAFC] px-[12px] py-[8px] rounded-3xl">
              <select
                className="bg-transparent outline-none"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-[8px]">
            <p className="text-slate-500 font-helvetica-neue text-[12px] font-normal leading-3">
              Sort by Coupon type:
            </p>
            <div className="text-[#CBD5E1] bg-[#F8FAFC] px-[12px] py-[8px] rounded-3xl">
              <select
                className="bg-transparent outline-none"
                name="couponType"
                value={filters.couponType}
                onChange={handleFilterChange}
              >
                <option value="">Select</option>
                <option value="PERCENTAGE">Percentage</option>
                <option value="FIXED">Fixed</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-[8px]">
            <p className="text-slate-500 font-helvetica-neue text-[12px] font-normal leading-3">
              Expiry Date Range:
            </p>
            <div className="flex gap-2">
              <TextField
                id="expiryDateRangeStart"
                type="date"
                value={filters.expiryDateRange.start}
                onChange={(e) => handleDateRangeChange("start", e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="expiryDateRangeEnd"
                type="date"
                value={filters.expiryDateRange.end}
                onChange={(e) => handleDateRangeChange("end", e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
          <div>
            {filters.status ||
            filters.couponType ||
            filters.expiryDateRange?.end ||
            filters.expiryDateRange?.start ||
            filters.couponName ? (
              <Button
                variant="outlined"
                color="primary"
                onClick={handleResetFilters}
              >
                Reset
              </Button>
            ) : null}
          </div>
        </div>
      </div>
      {filteredCouponsData?.length === 0 ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p className="mt-[48px] text-[#94A3B8] text-[14px] font-[500] leading-[17.5px]">
            No Coupons To Show
          </p>
        </div>
      ) : (
        <div className="w-full grid md:grid-cols-2 gap-y-[14px] gap-x-[16px] rounded-[8px] mt-[48px]">
          {filteredCouponsData?.map((item) => (
            <div
              className=" flex flex-col gap-[8px] border border-[#DBEAFE] rounded-[8px] "
              key={item.id}
            >
              <CouponCard
                item={item}
                menuController={menuController}
                setMenuController={setMenuController}
                setEditModal={handleEditCoupon} // Change setEditModal to handleEditCoupon
                setDeleteItem={setDeleteItem}
              />
            </div>
          ))}
        </div>
      )}
      {editModal && (
        <>
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black/30"
            onClick={() => setEditModal(false)}
          ></div>
          <div className="fixed top-1/2 left-1/2 flex flex-col gap-[12px] py-[16px] bg-white rounded-[8px] w-[724px] -translate-x-[50%] -translate-y-[50%]">
            <div className="px-[16px] py-[8px] flex justify-between items-center">
              <h1 className="text-[16px] font-[700] leading-[20px]">
                {selectedCoupon ? "Edit" : "Add"} Coupon
              </h1>
              <div
                className="cursor-pointer text-[24px] font-[400]"
                onClick={() => setEditModal(false)}
              >
                &times;
              </div>
            </div>
            <div className="px-[16px] flex flex-col gap-[12px]">
              {/* Coupon Code */}
              <div>
                <p className="text-[#64748B] text-[10px] font-[300] leading-[12.5px] italic mb-[4px]">
                  Coupon Code
                </p>
                <TextField
                  error={touched.code && !!errors.code}
                  helperText={touched.code && errors.code}
                  className="outline-none w-full p-[12px] border border-[#64748B] rounded-[4px]"
                  type="text"
                  name="code"
                  value={couponForm.code}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("code")}
                  required
                />
              </div>
              {/* Coupon Percentage */}
              <div>
                <p className="text-[#64748B] text-[10px] font-[300] leading-[12.5px] italic mb-[4px]">
                  Coupon Percentage
                </p>
                <TextField
                  error={touched.percentage && !!errors.percentage}
                  helperText={touched.percentage && errors.percentage}
                  className="outline-none w-full p-[12px] border border-[#64748B] rounded-[4px]"
                  type="number"
                  name="percentage"
                  value={couponForm.percentage}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("percentage")}
                  required
                />
              </div>
              {/* Coupon Description */}
              <div>
                <p className="text-[#64748B] text-[10px] font-[300] leading-[12.5px] italic mb-[4px]">
                  Coupon Description
                </p>
                <TextField
                  error={touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  className="outline-none w-full p-[12px] border border-[#64748B] rounded-[4px]"
                  type="text"
                  name="description"
                  value={couponForm.description}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("description")}
                  required
                />
              </div>
              {/* Coupon Type */}
              <div>
                <p className="text-[#64748B] text-[10px] font-[300] leading-[12.5px] italic mb-[4px]">
                  Coupon Type
                </p>
                <input
                  className="outline-none w-full p-[12px] border border-[#64748B] rounded-[4px]"
                  type="text"
                  name="type"
                  value="PERCENTAGE"
                  onChange={handleInputChange}
                  disabled
                  required
                />
              </div>
              {/* Coupon Status */}
              <div>
                <p className="text-[#64748B] text-[10px] font-[300] leading-[12.5px] italic mb-[4px]">
                  Coupon Status
                </p>
                {/* Toggle button for status */}
                <Switch
                  checked={couponForm.status}
                  onChange={handleToggleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              {/* Expiry Date */}
              <div>
                <p className="text-[#64748B] text-[10px] font-[300] leading-[12.5px] italic mb-[4px]">
                  Expiry Date
                </p>
                <TextField
                  error={touched.expiryDate && !!errors.expiryDate}
                  helperText={touched.expiryDate && errors.expiryDate}
                  className="outline-none w-full p-[12px] border border-[#64748B] rounded-[4px]"
                  type="date"
                  name="expiryDate"
                  value={couponForm.expiryDate}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("expiryDate")}
                  required
                />
              </div>
              {/* Categories */}
              {/* <div>
                <p className="text-[#64748B] text-[10px] font-[300] leading-[12.5px] italic mb-[4px]">
                  Categories
                </p>
                <input
                  className="outline-none w-full p-[12px] border border-[#64748B] rounded-[4px]"
                  type="text"
                  name="categories"
                  value={categoryText}
                  onChange={(e) => setCategoryText(e.target.value)}
                  onKeyPress={handleCategoryInput}
                  placeholder="Type and press enter to add category"
                />
                {D.map((category) => (
                  <span
                    key={category.id}
                    className="bg-gray-200 px-2 py-1 rounded-md text-sm m-1"
                  >
                    {category.text}
                  </span>
                ))}
              </div> */}
              {/* Save Button */}
              {!selectedCoupon && (
                <button
                  className="bg-[#031B89] text-white text-[16px] font-[500] leading-[20px] px-[4px] py-[12px] w-full mb-[16px] rounded-[4px]"
                  onClick={handleCreateCoupon}
                >
                  Save
                </button>
              )}
              {selectedCoupon && (
                <button
                  className="bg-[#031B89] text-white text-[16px] font-[500] leading-[20px] px-[4px] py-[12px] w-full mb-[16px] rounded-[4px]"
                  onClick={handleUpdateCoupon}
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {deleteItem && (
        <>
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black/30"
            onClick={() => setDeleteItem(false)}
          ></div>
          <div className="fixed flex flex-col gap-[12px] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white rounded-[8px] p-[16px] w-[328px]">
            <p className="text-center text-[16px] font-[700] leading-[20px]">
              Delete Coupon
            </p>
            <p className="text-center text-[14px] font-[400] leading-[17.5px] mb-[16px]">
              Are you sure you want to delete this coupon?
            </p>
            <div className="flex gap-[16px] justify-end">
              <button
                className="text-[12px] font-[400] leading-[15px] border rounded-[4px] border-[#64748B] p-[8px] px-[16px]"
                onClick={() => setDeleteItem(false)}
              >
                Cancel
              </button>
              <button
                className="text-[12px] font-[400] leading-[15px] border rounded-[4px] bg-[#031B89] text-white p-[8px] px-[16px]"
                onClick={() => {
                  handleDeleteCoupon(deleteItem);
                  setDeleteItem(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </>
      )}
      {loading && <LoaderOverlay />}
    </div>
  );
}
