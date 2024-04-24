import React, { useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowUp from "../assets/arrowUp.svg";
import ArrowDown from "../assets/arrowDown.svg";
import SearchIcon from "../assets/searchIcon.svg";
import InventoryBox from "../components/InventoryBox";
import AddNewDropdown from "../components/AddNewDropdown";
import { useLocation, useNavigate } from "react-router-dom";
import LoaderOverlay from "../components/loadinOverlay";
const sortByList = [
  { id: 0, name: "All" },
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 3, name: "C" },
  { id: 4, name: "D" },
  { id: 5, name: "E" },
  { id: 6, name: "F" },
  { id: 7, name: "G" },
  { id: 8, name: "H" },
  { id: 9, name: "I" },
  { id: 10, name: "J" },
  { id: 11, name: "K" },
  { id: 12, name: "L" },
  { id: 13, name: "M" },
  { id: 14, name: "N" },
  { id: 15, name: "O" },
  { id: 16, name: "P" },
  { id: 17, name: "Q" },
  { id: 18, name: "R" },
  { id: 19, name: "S" },
  { id: 20, name: "T" },
  { id: 21, name: "U" },
  { id: 22, name: "V" },
  { id: 23, name: "W" },
  { id: 24, name: "X" },
  { id: 25, name: "Y" },
  { id: 26, name: "Z" },
];

const GET_SEGMENTS = gql`
  query GetSegments {
    getSegments {
      status
      message
      segments {
        id
        segmentName
        totalProducts
        totalCategories
      }
    }
  }
`;
const GET_CATEGORIES = gql`
query{getCategories{
  status
  message
  categories{
    id
    categoryName
    segmentId
    categoryDescription
    segment{
      id
      segmentName
    }
    products{
      id
      productName
      productImages
      composition
      sp
      discount
      manufacturer
      maxRetailPrice
      

    }
    createdAt
    updatedAt
  }
}}
`;

const CREATE_SEGMENT = gql`
  mutation CreateSegment($segmentName: String!) {
    createSegment(input: { segmentName: $segmentName }) {
      status
      message
    }
  }
`;

const Inventory = () => {
  const [sortBy, setSortBy] = useState("All");
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [segmentName, setSegmentName] = useState("");
  const {  data:categoriesData, refetch:refetchCategories } = useQuery(GET_CATEGORIES);
  const[isAddedSegment,setIsAddSegment]=useState(false);
console.log(categoriesData?.getCategories?.categories,"categoriesData");


const { loading: segmentsLoading, error, data, refetch } = useQuery(GET_SEGMENTS);
const [createSegment, { loading: createSegmentLoading }] = useMutation(CREATE_SEGMENT);

const refetchCategoriesFunc=()=>{
  setLoading(true);
  refetchCategories();
  
}
const refetchFunc=()=>{
  setLoading(true);
  refetch();
}

useEffect(()=>{
  setLoading(false);
  
},[categoriesData,data])
  const handleAddSegment = async () => {
    if (!segmentName?.trim()) {
      setSegmentName("");
      toast.error("Segment name is required");
      return;
    }

    setLoading(true);
    try {
      await createSegment({ variables: { segmentName } });
      await refetch();
      setSegmentName("");
      setIsAddSegment(false);
      toast.success("Segment added successfully!");
    } catch (error) {
      console.error("Error adding segment:", error);
      toast.error("Error adding segment");
    } finally {
      setLoading(false);
    }
  };

  const filteredSegments = data?.getSegments?.segments?.filter((segment) => {
    const startsWithAlphabet = sortBy === "All" || segment.segmentName.toLowerCase().startsWith(sortBy.toLowerCase());
    const includesSearchText = segment.segmentName.toLowerCase().includes(searchText.toLowerCase());
    return startsWithAlphabet && includesSearchText;
  });

  useEffect(()=>{
    if(localStorage.getItem("isCategoryDeleted")){
      refetch();
      refetchCategories();
      localStorage.removeItem("isCategoryDeleted");
    }
  },[])

  return (
    <div className="w-full p-12 flex flex-col gap-12 bg-white">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-HelveticaNeueBold text-[#0F172A]">
            Your inventory
          </h1>
          <div className="flex gap-4">
            <div className="flex items-center w-[19.625rem] rounded border border-[#CBD5E1] bg-white py-0.5 px-2">
              <div className="p-2 flex gap-1 items-center">
                <img src={SearchIcon} alt="search icon" className="w-[24px]" />
                <input
                  type="text"
                  placeholder="Search for Segments"
                  className="placeholder:text-[#94A3B8] text-[14px] focus:outline-none"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
            <button onClick={() => setSegmentName("")}>
              <AddNewDropdown refetchCategories={refetchCategoriesFunc} segments={data?.getSegments?.segments} refetchSegments={refetchFunc} setIsAddSegment={setIsAddSegment} />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xs">Sort by:</h1>
          <div className="flex justify-between font-medium text-[#334155]">
            {sortByList.map((item) => (
              <button
                key={item.id}
                className={sortBy === item.name && "text-[#7487FF]"}
                onClick={() => setSortBy(item.name)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add Segment */}
      {isAddedSegment && 
      <div className="flex justify-between items-center border-b border-[#CBD5E1] pb-[8px]">
        <div className="flex gap-[8px] items-center">
          <input
            className="px-[16px] py-[8px] rounded-[4px] outline-none border-2 border-[#031B89] w-[337px]"
            type="text"
            placeholder="New segment name"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            required
          />
          <button
            className="text-[#7487FF] text-[14px] leading-[17.5px] font-HelvetiaNeueMedium cursor-pointer  w-[12.5rem] h-full rounded py-3 px-4 bg-[#031B89] text-white"
            onClick={handleAddSegment}
          >
            Add Segment
          </button>
        </div>
        <button onClick={() => setIsAddSegment(false)}>
          <img
            src={ArrowDown}
            alt="arrow down"
            className="w-6 h-6"
          />
        </button>
      </div>
      }

      {/* Display Segments */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <div>
          {filteredSegments?.length === 0 ? (
            <p className="text-center">No segments found</p>
          ) : (
            filteredSegments?.map((segment) => (
              <InventoryBox key={segment.id} refetch={refetch} segment={segment} categories={categoriesData?.getCategories?.categories?.filter((category) => category?.segmentId === segment?.id)} />
            ))
          )}
        </div>
      )}
      
      {(loading||segmentsLoading) && <LoaderOverlay />}

    </div>
  );
};

export default Inventory;
