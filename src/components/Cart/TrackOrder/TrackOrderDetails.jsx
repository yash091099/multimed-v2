import React from 'react';
import './TrackOrderDetails.css';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

const TrackOrderDetail = () => {
  const { state } = useLocation();
  const orderDetails = state?.orderDetails;

  const downloadInvoice = () => {
    const content = document.getElementById("downloadContent");
    html2canvas(content).then(canvas => {
      canvas.toBlob(function(blob) {
        saveAs(blob, "order-details.png");
      });
    });
  };

  return (
    <div className="track-detail-container">
      <div id="downloadContent" className="track-detail-frame215">
        <div className="track-detail-frame471">
        <span className="track-detail-text20 16Medium">
            {orderDetails?.trackURL ? (
              <a href={orderDetails?.trackURL} className="link-style " target="_blank" rel="noopener noreferrer">Track your order</a>
            ) : '--'}
          </span>
        </div>
        <div className="track-detail-frame501">
          <div className="track-detail-frame470">
            <span className="track-detail-text">
              Expected to arrive by {orderDetails?.shipmentActivity?.date || '--'}
            </span>
          </div>
          <div className="track-detail-frame381">
            <span className="track-detail-text02 16Medium">
              Order ID: {orderDetails?.orderId || '--'}
            </span>
            <div className="track-detail-frame460">
              <div className="track-detail-frame278">
                <span className="track-detail-text04 10RegularItalic">Date of order</span>
                <span className="track-detail-text06 12Medium">{orderDetails?.shipmentActivity?.date || '--'}</span>
              </div>
              <div className="track-detail-frame279">
                <span className="track-detail-text12 10RegularItalic">Order Total</span>
                <span className="track-detail-text14 12Medium">Rs {orderDetails?.total || '--'} (paid)</span>
              </div>
            </div>
          </div>
          {/* Shipment details explicitly displayed */}
          {orderDetails?.shipmentActivity && (
            <div className="track-detail-shipment-details">
              <span className="track-detail-text">
                Shipment Status: {orderDetails?.shipmentActivity?.status || '--'}
              </span>
              <span className="track-detail-text">
                Last Activity: {orderDetails?.shipmentActivity?.activity || '--'}
              </span>
              <span className="track-detail-text">
                Location: {orderDetails?.shipmentActivity?.location || '--'}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="track-detail-download">
        <span className="track-detail-text16 14Medium" onClick={downloadInvoice} style={{cursor: "pointer"}}>
          Download Invoice
        </span>
      </div>
    </div>
  );
}

export default TrackOrderDetail;
