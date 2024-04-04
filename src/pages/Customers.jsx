import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import SearchIcon from "../assets/searchIcon.svg";
import { GET_USERS } from "../context/mutation";
import { Modal, TextField, Button } from "@material-ui/core";
import { toast } from "react-toastify";
// import Pagination from "@material-ui/lab/Pagination";
import RemovedPP from "../assets/removedPP.png";
import Loader from "../components/Loader";
import LoaderOverlay from "../components/loadinOverlay";
import useS3 from "../context/useS3Upload";

const ADD_USER = gql`
  mutation AddUser($input: AddUserAdminInput!) {
    addUser(input: $input) {
      status
      message
    }
  }
`;

const AddUserModal = ({ isOpen, onClose,refetch, setLoad}) => {
  const { uploadImageOnS3 } = useS3();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const fileRef = useRef(null);

  const [contactNumber, setContactNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [profilePictureUri, setProfilePictureUri] = useState(null);

  const [role] = useState("USER");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
const [loading,setLoading]=useState(false);
  const [addUser] = useMutation(ADD_USER);
useEffect(() => {
  setLoad(loading)
},[loading])


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
  const validateFullName = () => {
    if (!fullName.trim()) {
      setFullNameError("Full Name is required");
    } else {
      setFullNameError("");
    }
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
  };

  const validateContactNumber = () => {
    if (!contactNumber.trim()) {
        setContactNumberError("Contact Number is required");
    } else if (!/^\d{10}$/.test(contactNumber.trim())) {
        setContactNumberError("Please enter a valid 10-digit mobile number");
    } else {
        setContactNumberError("");
    }
};


  const handleClose = () => {
    setFullName("");
    setEmail("");
    setContactNumber("");
    setProfilePicture("");
    onClose();
  };

  const handleSubmit = async () => {
    const isValid = validateForm();
    if (!email || !fullName || !contactNumber ) {
      return;
    }
    if(!profilePicture){
        toast.error("Profile picture is required");
        return;
    }
     const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  if (!isValidEmail(email)) {
    toast.error("Please enter a valid email address.");
    return;
  }

    if (isValid) {
      try {
        const { data } = await addUser({
          variables: {
            input: {
              fullName,
              email,
              contactNumber,
              profilePicture,
              role,
            },
          },
        });

        if (data.addUser.status === "SUCCESS") {
          toast.success("User added successfully")
          onClose();
          refetch();
        } else {
          toast.error("An error occurred while adding the user.");
        }
      } catch (error) {
        toast.error("An error occurred while adding the user.");
      }
    }
  };

  const validateForm = () => {
    validateFullName();
    validateEmail();
    validateContactNumber();
    return !fullNameError && !emailError && !contactNumberError;
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="modal-content flex justify-center items-center bg-white rounded-lg p-8">
        <div className="w-full md:w-96">
          <h2 className="text-lg font-bold mb-4">Add a Customer</h2>
          <span onClick={handleClose} className="cursor-pointer absolute top-5 right-10">X</span>
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

          <TextField
            label="Full Name"
            fullWidth
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            onBlur={validateFullName}
            error={!!fullNameError}
            helperText={fullNameError}
            className="mb-4"
          />
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              
            }}
            onBlur={validateEmail}
            error={!!emailError}
            helperText={emailError}
            className="mb-4"
          />
          <TextField
            label="Contact Number"
            fullWidth
            value={contactNumber}
            onChange={(e) => {
              setContactNumber(e.target.value);
            }}
            onBlur={validateContactNumber}
            error={!!contactNumberError}
            helperText={contactNumberError}
            className="mb-4"
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={handleSubmit}
            fullWidth
          >
            Add Customer
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default function Customers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [loader,setLoading]=useState()
  const { loading, data ,refetch } = useQuery(GET_USERS);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (data) {
      const filteredUsers = data.getUsers.users.filter(
        (item) => item.role === "USER"
      );
      setUsers(filteredUsers);
      setFilteredUsers(filteredUsers);
    }
  }, [data]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchInput(value);
    const filteredData =value? users.filter(
      (user) =>
        user.fullName?.toLowerCase().includes(value) ||
        user?.email?.toLowerCase().includes(value) ||
        (user.addresses && user.addresses[0]?.pincode.includes(value))
    ):users ;
    setFilteredUsers(filteredData);
  };

  const indexOfLastUser = currentPage * usersPerPage;
const indexOfFirstUser = indexOfLastUser - usersPerPage;
const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);


  const handleChangePage = (event, value) => {
    console.log(indexOfFirstUser,indexOfLastUser)
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 400);
    setCurrentPage(value);
  };

  const handleAddUserModalOpen = () => {
    
    setIsModalOpen(true);
  };

  const handleAddUserModalClose = () => {
    setIsModalOpen(false);
  };
  const handleRefetch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    refetch();
  };

  function formatDate(timestamp) {
    if (!timestamp || isNaN(timestamp)) {
        return "Invalid date";
    }

    const date = new Date(parseInt(timestamp));
    if (isNaN(date.getTime())) {
        return "Invalid date";
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}


 const handleChangeDate = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    filterUsers(searchInput, date);
  };

  const filterUsers = (search, date) => {
    const selectedDate = new Date(date);
    const filteredData = users.filter((user) => {
        const fullNameMatch = user.fullName
            ? user.fullName.toLowerCase().includes(search)
            : true;
        const emailMatch = user.email
            ? user.email.toLowerCase().includes(search)
            : true;
        const pincodeMatch =
            user.addresses?.length &&
            user.addresses[0].pincode.toLowerCase().includes(search);

        // Get user's creation date
        const userDate = new Date(user.createdAt);

        // Check if user's creation date matches the selected date
        const dateMatch =
            userDate.getFullYear() === selectedDate.getFullYear() &&
            userDate.getMonth() === selectedDate.getMonth() &&
            userDate.getDate() === selectedDate.getDate();

        return fullNameMatch || emailMatch || pincodeMatch || dateMatch;
    });

    setFilteredUsers(filteredData);
};


  const resetFilters = () => {
    setSearchInput("");
    setSelectedDate(null);
    setFilteredUsers(users);
  };



  return (
    <div className="p-[48px] bg-white w-full">
      <div className="flex justify-between w-full mb-[48px]">
        <h1 className="font-HelveticaNeueBold font-[700] text-[24px] tracking-[0.552px] leading-[30px] ">
          Customers
        </h1>
        <div className="flex md:flex-row flex-col md:gap-4 gap-2 ">
          {/* searchbar */}
          <div className="flex items-center md:w-[442px] rounded border border-[#CBD5E1] bg-white px-2">
            <div className="md:p-2 p-1 flex gap-2 items-center w-full">
              <img src={SearchIcon} alt="search icon" className="w-6 h-6" />
              <input
                type="text"
                placeholder="Search By Name, email or pincode"
                className="placeholder:text-[#94A3B8] md:text-sm text-xs focus:outline-none w-full"
                value={searchInput}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="flex items-center gap-[8px]">
           { (searchInput||selectedDate)&& <button onClick={resetFilters} className="text-[#7487FF] bg-[#F8FAFC] px-[12px] py-[8px] rounded-3xl">Reset</button>}
            </div>
          {/* add user button */}
          <Link
            onClick={handleAddUserModalOpen}
            className="md:text-base text-sm align-middle text-center md:w-[15.5rem] rounded md:py-3 py-2 px-4 bg-[#031B89] text-white"
          >
            {loading ? <span>Loading...</span> : "+ Add a customer"}
          </Link>
        </div>
        
      </div>

      <div>
        <div className="flex gap-[32px]">
          {/* <div className="flex items-center gap-[8px]">
           
              <p className="text-slate-500 font-helvetica-neue text-[12px] font-normal leading-3">
                Date created:{" "}
              </p>
            
            <div className="text-[#7487FF] bg-[#F8FAFC] px-[12px] py-[8px] rounded-3xl">
            
            <input
                  type="date"
                  value={selectedDate || ''} // Ensure that null is converted to an empty string
                  onChange={handleChangeDate}
                  className="bg-transparent outline-none"
              />
                            
            </div>
          </div> */}
        
        </div>
      </div>
      <p className="text-[16px] font-[500] leading-[20px] tracking-[0.36px] my-[16px]">
        Your customers
      </p>
      <div className="w-full border border-[#E2E8F0] rounded-[8px]">
        <div className="flex justify-between text-[#64748B] text-[14px] font-[500] leading-[17.5px] italic  bg-[#FAFAFA] px-[48px] py-[24px] rounded-t-[8px] border-b border-[#E2E8F0]">
          <p className="flex-1 text-left">Name</p>
          <p className="flex-1 text-left">Phone Number</p>
          <p className="flex-1 text-left">Email</p>
          <p className="flex-1 text-left">Pincode</p>
          <p className="flex-1 text-left">Date created</p>
        </div>
        <div className="w-full">
          {currentUsers && currentUsers.map((item) => (
              <div
                className="cursor-pointer flex justify-between text-[#334155] text-[14px] font-[500] leading-[17.5px] px-[48px] py-[24px] border-t border-[#E2E8F0] hover:bg-[#DBEAFE]"
                key={item.id}
                onClick={() =>
                 { localStorage.setItem("userDetails", JSON.stringify(item));
                  navigate("/home/customer_profile");}
                }
              >
                <p className="flex-1 text-left">{item.fullName || "--"}</p>
                <p className="flex-1 text-left">{item.contactNumber || "--"}</p>
                <p className="flex-1 text-left">{item.email || "--"}</p>
                <p className="flex-1 text-left">
                  {item.addresses?.length ? item.addresses[0].pincode : "--"}
                </p>
                <p className="flex-1 text-left">{formatDate(item.createdAt) || "--"}</p>
              </div>
            ))
          }
          {!loading && !currentUsers?.length && (
            <p className="text-center text-[#94A3B8] font-[400] text-[16px] leading-[19.5px] py-[24px]">
              No customers found
            </p>
          )}
        </div>
      </div>
      {/* {!loading && (
        <div className="flex justify-center items-center gap-[12px] font-HelveticaNeue mt-[12px]">
          <Pagination
            count={Math.ceil(filteredUsers.length / usersPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
          />
        </div>
      )} */}
      {(loading||loader) && <LoaderOverlay />}
      <AddUserModal setLoad={setLoading} isOpen={isModalOpen} refetch={handleRefetch} onClose={handleAddUserModalClose} />
    </div>
  );
}
