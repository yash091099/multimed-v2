import React, { useState } from 'react';

export default function PrescriptionApprovalModal({ setApproveModal, onApprovePrescription, onRejectPrescription }) {
  const [comment, setComment] = useState('');

  const handleApprove = () => {
    // This function will be called when the user clicks on 'Approve'
    onApprovePrescription(comment);
    setApproveModal(false); // Close modal after approval
  };

  const handleReject = () => {
    // This function will be called when the user clicks on 'Reject'
    onRejectPrescription(comment);
    setApproveModal(false); // Close modal after rejection
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <div className='fixed inset-0 bg-black/30' onClick={() => setApproveModal(false)}></div>
      <div className='bg-white p-4 rounded-md shadow-lg w-[724px]'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-lg font-bold'>Prescription Approval</h1>
          <button onClick={() => setApproveModal(false)}>&times;</button>
        </div>
        <div className='mb-4'>
          <p className='font-semibold'>Review Prescription Details</p>
          {/* Placeholder for prescription details */}
        </div>
        <div>
          <label className='block my-2'>Comments (optional):</label>
          <textarea
            className='border p-2 w-full'
            rows="3"
            placeholder="Enter any comments"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div className='mt-4 flex justify-end space-x-2'>
          <button className='bg-red-500 text-white px-4 py-2 rounded shadow' onClick={handleReject}>Reject</button>
          <button className='bg-green-500 text-white px-4 py-2 rounded shadow' onClick={handleApprove}>Approve</button>
        </div>
      </div>
    </div>
  );
}
