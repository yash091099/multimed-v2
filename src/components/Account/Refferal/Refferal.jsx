import React, { useEffect, useState } from 'react';
import './refferal.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { gql, useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../loader';
import { FaCopy, FaRedoAlt, FaLink } from 'react-icons/fa';
import { HiOutlineClipboardCopy } from 'react-icons/hi';
import Tooltip from '@material-ui/core/Tooltip';

const GET_REFERRALS = gql`
  query GetUserReferrals {
    getUserReferrals {
      status
      message
      referrals {
        id
        code
        linkStatus
        expiryDate
        createdAt
        updatedAt
      }
    }
  }
`;

const GENERATE_REFERRAL = gql`
  mutation GenerateReferral($days: Int!) {
    generateReferral(input: { days: $days }) {
      status
      message
      referral {
        id
        code
        linkStatus
        expiryDate
        createdAt
        updatedAt
      }
    }
  }
`;

const Referrals = () => {
  const { loading, error, data, refetch } = useQuery(GET_REFERRALS);
  const [generateReferral] = useMutation(GENERATE_REFERRAL);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loadingg, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch referrals");
    }
  }, [error]);

  const handleCopyLink = (code) => {
    if (code) {
      navigator.clipboard.writeText(code).then(
        () => toast.success('Copied!'),
        () => toast.error('Failed to copy!')
      );
    }
  };

  const handleRegenerateLink = async () => {
    setLoading(true);
    try {
      const { data } = await generateReferral({ variables: { days: 7 } });
      if (data.generateReferral.status === "SUCCESS") {
        toast.success('Link regenerated!');
        refetch();
      } else {
        toast.error('Failed to regenerate link');
      }
    } catch (error) {
      toast.error('Failed to regenerate link');
    }
    setLoading(false);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  if (loading) return <Loading />; // Show loader when fetching data
  if (error) return <p>Error :(</p>;

  const referrals = data.getUserReferrals.referrals;

  const filteredReferrals = referrals.filter(referral => {
    const expiryDate = new Date(referral.expiryDate);
    if (startDate && endDate) {
      return expiryDate >= startDate && expiryDate <= endDate;
    }
    return true;
  });

  return (
    <div className="refferal-container">
      <div className="refferal-refferal">
        <div className="refferal-refferal479">
          <div className="refferal-refferal482">
            <span className="refferal-text 18Medium" style={{ fontWeight: "bold" }}>Referral Code</span>
            <span className="refferal-text02 14RegularItalic">Refer a friend and get 20% off on your next order</span>
          </div>
          <div className="refferal-refferal481">
            <div className="refferal-refferal478">
              <div className="refferal-refferal476">
                <span className="refferal-text04 20Medium">{referrals.length > 0 ? referrals[0].code : 'No referral code available'}</span>
              </div>
              <Tooltip title="Copy" arrow>
                <div style={{ cursor: "pointer" }} className="refferal-refferal477" onClick={() => handleCopyLink(referrals.length > 0 ? referrals[0].code : null)}>
                  <HiOutlineClipboardCopy className="text-gray-500 hover:text-gray-700" size={24} />
                </div>
              </Tooltip>
            </div>
            <Tooltip title="Regenerate Link" arrow>
              <div style={{ cursor: "pointer" }} className="refferal-refferal480" onClick={handleRegenerateLink}>
                <FaRedoAlt className="text-blue-500 hover:text-blue-700" size={18} />
                <span className="refferal-text08 14Medium" style={{ color: "blue" }}>Regenerate Link</span>
              </div>
            </Tooltip>
          </div>
        </div>
        <div className="refferal-refferal281">
          <div className="refferal-refferal295">
            <div className="refferal-refferal278">
              <span className="refferal-text11 16Medium">Active Referrals</span>
            </div>
            <div className="refferal-refferal276">
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={handleDateChange}
                isClearable={true}
                placeholderText="Select a date range"
              />
            </div>
          </div>
          <div className="refferal-refferal473" style={{ maxHeight: '520px', overflowY: 'auto' }}>
            {filteredReferrals.length > 0 ? filteredReferrals.map((referral, index) => (
              <div key={index} className="refferal-refferal381" style={{ backgroundColor: index % 2 === 0 ? "rgb(238, 245, 253)" : "none" }}>
                <div className="refferal-refferal483">
                  <FaLink className="text-gray-500" size={16} />
                  <span className="refferal-text21 14Medium">{referral.code}</span>
                  <Tooltip title="Copy" arrow>
                    <span style={{ cursor: "pointer" }} className="refferal-text23 12Medium" onClick={() => handleCopyLink(referral.code)}>
                      <HiOutlineClipboardCopy className="text-gray-500 hover:text-gray-700" size={16} />
                    </span>
                  </Tooltip>
                </div>
                <span className="refferal-text25 14Medium">{new Date(referral.expiryDate).toLocaleString()}</span>
                <span className="refferal-text27 14Medium" style={{ color: referral.linkStatus === 'ACTIVE' ? 'green' : 'red' }}>
                  {referral.linkStatus === 'ACTIVE' ? 'Active' : 'Inactive'}
                </span>
              </div>
            )) : (
              <div className="refferal-refferal381" style={{ backgroundColor: "rgb(238, 245, 253)" }}>
                <div>
                  <span className="refferal-text21 14Medium" style={{ gridColumn: "span 4" }}>No data available</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {loadingg && <Loading />} {/* Show loader when generating referral link */}
    </div>
  );
};

export default Referrals;