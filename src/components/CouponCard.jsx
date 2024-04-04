import React from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const CouponCard = ({ item, setEditModal, setDeleteItem }) => {
  const formatDate = (date) => {
    const d = new Date(Number(date));
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };

  const isExpired = new Date(Number(item?.expiryDate)) < new Date();

  return (
    <div className={`coupon-card-container shadow-lg p-4 rounded-lg ${isExpired ? "bg-gray-200" : "bg-white"}`}>
      <div className="flex justify-between items-start">
        <div>
          <div className={`status-tag ${item.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} text-xs font-semibold px-2 py-1 inline-flex items-center rounded-full mb-2`}>
            {item.status}
          </div>
          <p className="font-bold text-xl mb-1">{item.code}</p>
          <p className="text-gray-600">{item.description}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className={`discount-tag ${isExpired ? "bg-red-600" : "bg-blue-600"} text-white px-3 py-1 rounded-full text-sm font-semibold mb-2`}>
            {item.percentage}% off
          </div>
          {isExpired ? (
            <span className="text-xs text-red-600 font-semibold">Expired</span>
          ) : (
            <span className="text-xs text-gray-500">Expiring On: {formatDate(item?.expiryDate)}</span>
          )}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <EditIcon className="cursor-pointer text-blue-500 mr-2" onClick={() => setEditModal(item)} />
        <DeleteIcon className="cursor-pointer text-red-500" onClick={() => setDeleteItem(item?.id)} />
      </div>
    </div>
  );
};

export default CouponCard;
