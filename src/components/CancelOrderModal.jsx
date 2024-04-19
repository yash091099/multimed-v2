import React, { useState } from 'react';

export default function CancelOrderModal({ setCancelOrderModal, cancelOrder }) {
  const [reason, setReason] = useState('');
  const [refundMethod, setRefundMethod] = useState('');
  const [comments, setComments] = useState('');

  const handleCancelOrder = () => {
    cancelOrder({
      variables: {
        reason: reason,
        refundMethod: refundMethod,
        comments: comments
      }
    });
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center' onClick={() => setCancelOrderModal(false)}>
      <div className='bg-white p-4 rounded-md shadow-lg w-[724px]' onClick={e => e.stopPropagation()}>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-lg font-bold'>Cancel Order</h1>
          <button onClick={() => setCancelOrderModal(false)}>&times;</button>
        </div>
        <div>
          <label className='block mb-2'>Reason for Cancellation:</label>
          <select className='border p-2 w-full' value={reason} onChange={(e) => setReason(e.target.value)}>
            <option value="">Select a reason</option>
            <option value="Unavailable product">Unavailable Product</option>
            <option value="Customer request">Customer Request</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className='block my-2'>Mode of Refund:</label>
          <select className='border p-2 w-full' value={refundMethod} onChange={(e) => setRefundMethod(e.target.value)}>
            <option value="">Select refund method</option>
            <option value="Back to card">Back to Card</option>
            <option value="Store credit">Store Credit</option>
          </select>
        </div>
        <div>
          <label className='block my-2'>Additional Comments:</label>
          <textarea
            className='border p-2 w-full'
            rows="3"
            placeholder="Enter any additional comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
        </div>
        <div className='mt-4 flex justify-end'>
          <button className='bg-blue-500 text-white px-4 py-2 rounded shadow' onClick={handleCancelOrder}>Confirm Cancellation</button>
        </div>
      </div>
    </div>
  );
}
