import { gql,useQuery } from "@apollo/client";
import CopyIcon from "../assets/copyIcon.svg";
import { useContext, useEffect } from "react";
import Context from "../context/AppContext";
const GET_COUPONS = gql`
query{getActiveCoupons{
  status
  message
  coupons{
    id
    code
    type
    percentage
    fixedAmount
    description
    expiryDate
    createdAt
    updatedAt
    associatedCategories{
      id
      categoryName
      segmentId
      categoryDescription
      segment{
        id
        segmentName
        
      }
    }
  }
}}
`;

 const DiscountBanner = ({ handleClose }) => {
  const { data ,refetch} = useQuery(GET_COUPONS);
  const {isLoggedIn}=useContext(Context)
  useEffect(() => {

   refetch();
  },[isLoggedIn])
  return (
    <>
    {data?.getActiveCoupons?.coupons?.length&&<div className="hidden lg:flex w-full justify-center items-center py-[1rem] text-[#021156] gap-2 bg-[#C2F5E9]">
      <div className="text-center my-[0.5px] sm:text-[1.125rem] text-sm font-HelveticaNeueMedium">
        Use {data?.getActiveCoupons?.coupons?.[0]?.code } and get {data?.getActiveCoupons?.coupons?.[0]?.percentage}% off on your FIRST ORDER!
      </div>
      <img
        src={CopyIcon}
        alt="copy icon"
        onClick={() => navigator.clipboard.writeText(`${data?.getActiveCoupons?.coupons?.[0]?.code}`)}
        className="cursor-pointer w-[1.5rem] h-[1.5rem]"
      />
      <span className="cursor-pointer absolute right-[1rem]" onClick={handleClose}>x</span>
    </div>}
    </>
  );
};
export default DiscountBanner;