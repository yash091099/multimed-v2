import React from 'react'
import './TxnFail.css'
import { useNavigate } from 'react-router-dom'

const TxnFail = (props) => {
  const navigate=useNavigate()
  return (
    <div className="txn-fail-container">
      <div className="txn-fail-frame215">
        <div className="txn-fail-frame332">
          <div className="txn-fail-frame383">
            <div className="txn-fail-frame413">
              <div className="txn-fail-interface-essential-delete-disabled">
                <div className="txn-fail-group">
                  <div className="txn-fail-group1">
                    <img
                      src="/external/pathi318-40gr.svg"
                      alt="PathI318"
                      className="txn-fail-path"
                    />
                    <img
                      src="/external/pathi318-7msp.svg"
                      alt="PathI318"
                      className="txn-fail-path1"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="txn-fail-frame407">
              <span className="txn-fail-text 14Medium">
                <span>Transaction failed</span>
              </span>
              <span className="txn-fail-text2 14Regular">
                <span>
                  There was an error and your transaction did not go through!
                </span>
              </span>
            </div>
            <div className="txn-fail-frame12">
              <span style={{ cursor: 'pointer' }} onClick={()=>{navigate('/cart')}} className="txn-fail-text4 16Medium">
                <span>Retry payment</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TxnFail
