import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Confetti from 'react-confetti';
import './TxnSuccess.css';

const TxnSuccess = (props) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(2.5); // For star rating, default to 2.5
  const [feedbackText, setFeedbackText] = useState(''); // For feedback text
  const [confetti, setConfetti] = useState(false); // For controlling the display of confetti

  useEffect(() => {
    // Trigger confetti on mount
    setConfetti(true);
    const timer = setTimeout(() => {
      // Stop confetti after 2 seconds
      setConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFeedbackChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleSubmitFeedback = () => {
    // Logic to handle feedback submission
    navigate('/');
  };

  return (
    <div className="transaction-success-container">
      {confetti && <Confetti />}
      <div className="transaction-success-frame215">
      <div className="transaction-success-frame332">
          <div className="transaction-success-frame383">
            <div className="transaction-success-frame413">
              <div className="transaction-success-interface-essential-done-check">
                <div className="transaction-success-group">
                  <div className="transaction-success-group01">
                    <img
                      src="/external/pathi318-96p6.svg"
                      alt="PathI318"
                      className="transaction-success-path"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="transaction-success-frame407">
              <span className="transaction-success-text 14Medium">
                <span>Transaction successful</span>
              </span>
              <span className="transaction-success-text02 14Regular">
                <span>Your order has been placed.</span>
              </span>
            </div>
            <span style={{ cursor: 'pointer' }} onClick={()=>{navigate('/track-order')}} className="transaction-success-text04 14Medium">
              <span>Track your order here</span>
            </span>
          </div>
        </div>        <div className="transaction-success-frame281">
          <span className="transaction-success-text06 14Medium">
            Leave Feedback for your order
          </span>
          <Rating
            name="feedback-rating"
            value={value}
            precision={0.5}
            onChange={handleRatingChange}
          />
          <TextareaAutosize
            className="transaction-success-textarea"
            minRows={6}
            maxRows={10}
            placeholder="Tell us more about your order"
            value={feedbackText}
            onChange={handleFeedbackChange}
          />
          <div onClick={handleSubmitFeedback} style={{ cursor: 'pointer' }} className="transaction-success-frame12">
            <span className="transaction-success-text10 16Medium">
              Submit Feedback
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TxnSuccess;
