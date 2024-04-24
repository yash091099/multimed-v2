import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Dropdown from "../assets/dropdownArrow.svg";
import DropdownUp from "../assets/dropdownUpArrow.svg";
import Search from "../assets/searchIcon.svg";
import PincodeModal from "./PincodeModal";
import SearchBarDropdown from "./SearchBarDropdown";
import { gql,useQuery,useLazyQuery } from "@apollo/client";
import Context from "../context/AppContext";
import { GET_ALL_PRODUCTS } from "../context/mutation";


const GET_MY_ADDRESSES = gql`
  query getMyAddresses {
    getMyAddresses {
      status
      message
      addresses {
        id
        houseNumber
        aptOrBuildingName
        streetOrAreaName
        city
        pincode
        state 
        label 
      }
    }
  }
`;


const SearchBar = ({
  isPincode,
  button,
  isHero,
  placeholderText,
  isFilter,
  // selectedAddress, // This prop will be passed from the parent component where the selected address state is managed
  // setSelectedAddress, // Function to update the selected address, passed from parent component
}) => {
  const [input, setInput] = useState('');
  const [isPincodeModal, setIsPincodeModal] = useState(false);
  const [isSearchDropdown, setIsSearchDropdown] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const {setSelectedProduct} = useContext(Context);
  const {  error, data: dataList } = useQuery(GET_ALL_PRODUCTS);
const navigate=useNavigate()
  useEffect(() => {
    if (input) {
      const filtered = dataList?.getAllProducts?.products?.filter((product) => {
        const inputLower = input?.toLowerCase().trim().replace(/\s+/g, ' ');
        return (
          product.manufacturer?.toLowerCase().includes(inputLower) ||
          product.productName?.toLowerCase().includes(inputLower)
        );
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [input, dataList]);

  const onSearchTextChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick=(data)=>{
    console.log(data,'data transfer');
    setSelectedProduct(data);
    navigate(`/product/${data.id}`) ;
    setInput('')
  }

  return (
    <div
      className={`${
        isHero ? 'flex' : 'w-full lg:flex hidden'
      } items-center py-0.5 px-2 md:max-w-[40.688rem] lg:mx-0 grow h-[2.75rem] border border-slate-300 rounded`}
    >
      {isPincode && (
        <button
          onClick={() => setIsPincodeModal(true)}
          className="flex justify-between items-center p-2 gap-1"
        >
          <div>
            <h1 className="font-InterMedium w-[7.2rem]">
              {selectedAddress ? selectedAddress.pincode : "Select Code"}
            </h1>
          </div>
          <img
            src={isPincodeModal ? DropdownUp : Dropdown}
            alt="drop down arrow icon"
            className="h-[1.5rem] w-[1.5rem]"
          />
          <div className="h-[1.438rem] border-l border-slate-400" />
        </button>
      )}

      {isPincodeModal && (
        <PincodeModal
          setIsPincodeModal={setIsPincodeModal}
          onAddressSelect={setSelectedAddress}
        />
      )}

      <div className="group relative flex p-2 gap-1 grow">
        <Link to="/results">
          <img src={Search} alt="search icon" className="min-h-[1.5rem] min-w-[1.5rem]" />
        </Link>
        <input
          
          onFocus={() => setIsSearchDropdown(true)}
          type="text"
          value={input}
          onChange={onSearchTextChange}
          placeholder={placeholderText}
          className={`${
            isFilter ? 'max-w-[9.5rem]' : 'grow'
          } text-[0.875rem] placeholder:text-[#94A3B8] focus:outline-none`}
        />
        {input && isSearchDropdown && (
          <SearchBarDropdown isHero={isHero} data={filteredProducts} clickSearch={handleClick} />
        )}
      </div>

      {button && (
        <div className="ml-auto">
          <button className="xl:block hidden bg-[#031B89] text-white font-HelveticaNeueMedium py-1 px-4 rounded">
            Search
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
