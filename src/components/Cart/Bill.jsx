import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import Loader from '../loader';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DocumentIcon from "../../assets/cart/documentIcon.svg";
import Context from "../../context/AppContext";

const GET_WALLET_BALANCE = gql`
  query GetWalletBalance {
    getWalletBalance {
      status
      message
      walletBalance
    }
  }
`;

const Coupons = ({ cartListCoupon,remainingReferralDiscounts, discountPercent = 0 }) => {
  const { useWallet, userWalletDebit, setUseWallet, setAmountDebitedFromWallet } = useContext(Context);

  const { loading, error, data } = useQuery(GET_WALLET_BALANCE);
  const [walletBalance, setWalletBalance] = useState(0);

  const [totalMrp, setTotalMrp] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  useEffect(() => {
    if (data?.getWalletBalance?.walletBalance) {
      setWalletBalance(data.getWalletBalance.walletBalance);
    }
  }, [data]);
useEffect(() => {
  console.log(userWalletDebit)
  console.log(useWallet)
},[userWalletDebit,useWallet])
  useEffect(() => {
    let mrp = 0;
    let discount = 0;
    cartListCoupon?.forEach(item => {
      const quantity = item?.quantity || 0;
      mrp += item?.product?.stocks?.[0]?.mrpPerSheet * quantity;
      discount += (item?.product?.stocks?.[0]?.mrpPerSheet * quantity) * (item?.product?.coupon?.percentage / 100);
    });

    const couponDiscount = mrp * (discountPercent / 100);
    discount += couponDiscount;
    if(remainingReferralDiscounts>0){
      discount += (Number(mrp)*0.20)
    }
    let walletAmountToUse = useWallet ? Math.min(walletBalance, mrp - discount) : 0;
    const finalAmount = mrp - discount - walletAmountToUse;

    setTotalMrp(mrp);
    setTotalDiscount(discount);
    setFinalPrice(finalAmount);
  }, [cartListCoupon, discountPercent, walletBalance, useWallet]);

  if (loading) return <Loader />;
  if (error) {
    toast.error(`Error: ${error.message}`);
    return null;
  }

  const hadleChangeWallet=(e)=>{
    console.log(finalPrice);
    // localStorage.setItem('useWalletForPayment', e.target.checked);
    // localStorage.setItem('amountDebitedFromWallet', finalPrice);
    setAmountDebitedFromWallet(finalPrice)
    setUseWallet(e.target.checked)
  }

  return (
    <div className="flex flex-col border-b border-dashed border-[#CBD5E1] px-3 py-6 gap-4 bg-white text-[#0F172A]">
      <div className="flex gap-1 items-center">
        <img src={DocumentIcon} className="h-6 w-6" alt="Bill Summary" />
        <h1 className="font-HelveticaNeueMedium">Bill Summary</h1>
      </div>

      <div className="flex justify-between items-center">
        <h1>Item total (MRP)</h1>
        <h2>Rs. {totalMrp.toFixed(2)}</h2>
      </div>

      <div className="flex justify-between items-center">
        <h1>Total Discount</h1>
        <h2>-Rs {totalDiscount.toFixed(2)}</h2>
      </div>
      <div className="flex justify-between items-center">
    <h1>Refferal Discount</h1>
    <h2>-Rs {parseFloat(Number(totalMrp) * 0.20).toFixed(2)}</h2>
</div>


      <div className="flex justify-between items-center">
        <h1>Shipping Free</h1>
        <h2>Free</h2>
      </div>

      <div className="flex justify-between items-center">
        <h1>Wallet Balance:</h1>
        <label className="flex items-center">
         {(useWallet?(Number(walletBalance)-Number(userWalletDebit))?.toFixed(2):walletBalance.toFixed(2) )>0 && <input 
            type="checkbox" 
            checked={useWallet} 
            onChange={hadleChangeWallet}
            className="mr-2 cursor-pointer"
          />}
          -Rs {useWallet?(Number(walletBalance)-Number(userWalletDebit))?.toFixed(2):walletBalance.toFixed(2)}
        </label>
      </div>

      <div className="flex justify-between items-center">
        <h1>Total Amount:</h1>
        <h2>Rs. {finalPrice.toFixed(2)}</h2>
      </div>

      {/* <div className="capitalize text-[0.75rem] text-[#94A3B8]">
        <p>COD AVAILABLE</p>
      </div> */}
    </div>
  );
};

export default Coupons;
