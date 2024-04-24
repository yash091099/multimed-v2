import React, { useEffect, useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import Loader from '../../loader';

import './subscription.css';

const GET_USER_SUBSCRIPTIONS = gql`
  query GetUserSubscriptions {
    getUserSubscriptions {
      status
      message
      subscriptions {
        id
        productId
        addressId
        deliveryInDays
        status
        userId
      }
    }
  }
`;

const CANCEL_SUBSCRIPTION = gql`
  mutation CancelSubscription($subscriptionId: ID!) {
    cancelSubscription(input: $subscriptionId ) {
      status
      message
    }
  }
`;

const Subscription = (props) => {
  const { loading, error, data, refetch } = useQuery(GET_USER_SUBSCRIPTIONS);
  useEffect(()=>{
    refetch();
    console.log(data,'+==========+++++===++++====+++===+++===++===++++===++==')
  },[])

  const [cancelSubscription] = useMutation(CANCEL_SUBSCRIPTION);
  const [loadingCancel, setLoadingCancel] = useState(false);

  const handleCancelSubscription = async (subscriptionId) => {
    try {
      setLoadingCancel(true);
      const { data } = await cancelSubscription({
        variables: { subscriptionId },
      });
      setLoadingCancel(false);
      toast.success('Subscription cancelled successfully');
      refetch();
    } catch (error) {
      setLoadingCancel(false);
      toast.error('Error : ' + error?.message);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>Error! {error.message}</div>;

  const { getUserSubscriptions } = data;
  const { subscriptions, message } = getUserSubscriptions;

  if (!subscriptions || subscriptions?.length === 0) {
    return (
      <div style={{ textAlign: 'center' }}>

        <div>No subscriptions found</div>
      </div>
    );
  }


  return (
    <div className="subscription-container">
      {subscriptions?.map((subscription) => (
        <div key={subscription?.id} className="subscription-frame283">
          <span className="subscription-text 14Medium">
            <span className="subscription-text01">
              Arriving on {subscription?.deliveryInDays} days to
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <span>Home</span>
          </span>
          <div className="subscription-frame379">
            <div className="subscription-frame182">
              <div className="subscription-frame177">
                <div className="subscription-frame218"></div>
              </div>
              <div className="subscription-frame178">
                <div className="subscription-frame489">
                  <span className="subscription-text03 14Medium">
                    <span>{subscription?.productId}</span>
                  </span>
                  <div className="subscription-frame269">
                    <div className="subscription-interface-essential-done-check">
                      <div className="subscription-group">
                        <div className="subscription-group1">
                          {/* Assuming this is some icon or image */}
                          {/* <img
                            alt="PathI705"
                            src="/external/pathi705-3ryl.svg"
                            className="subscription-path"
                          /> */}
                        </div>
                      </div>
                    </div>
                    <span className="subscription-text05 12Regular">
                      <span>Prescription Needed</span>
                    </span>
                  </div>
                </div>
                <span className="subscription-text07 14Regular">
                  <span>1 strip : 15 capsules</span>
                </span>
              </div>
            </div>
            <div className="subscription-frame296">
              <div className="subscription-frame278">
                <span className="subscription-text09 10RegularItalic">
                  <span>Manufacturer</span>
                </span>
                <div className="subscription-frame284">
                  <div className="subscription-frame2831">
                    <span className="subscription-text11 10RegularItalic">
                      <span>Pfizer Ltd</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="subscription-frame279">
                <span className="subscription-text13 10RegularItalic">
                  <span>Composition</span>
                </span>
                <div className="subscription-frame2832">
                  <span className="subscription-text15 10RegularItalic">
                    <span>Piroxicam (20mg)</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="subscription-frame180">
              <span className="subscription-text17">
                <span className="subscription-text18">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <span>Rs1432</span>
              </span>
              <span className="subscription-text20 14Medium">
                <span>Rs 1243</span>
              </span>
              <div className="subscription-frame239">
                <span className="subscription-text22 10Medium">
                  <span>30% OFF</span>
                </span>
              </div>
            </div>
          </div>
          <div className="subscription-frame491">
            <div className="subscription-frame276">
              <span className="subscription-text24 14Regular">
                <span>Every {subscription?.deliveryInDays} days</span>
              </span>
              <div className="subscription-arrows-diagrams-arrow">
                <div className="subscription-group2">
             
                </div>
              </div>
            </div>
            <div className="subscription-frame169">
              <div className="subscription-frame492">
                <div className="subscription-frame401">
                  <div className="subscription-real-estatehomehousebig">
                    <div className="subscription-group3">
                    
                    </div>
                  </div>
                  <span className="subscription-text26 12Medium">
                    <span>Delivering to :</span>
                  </span>
                </div>
                <span className="subscription-text28 12Medium">
                  <span>My House</span>
                </span>
              </div>
              <span className="subscription-text30 14Medium">
                {/* <span>Change</span> */}
              </span>
            </div>
          </div>
          <div className="subscription-frame490">
            <div className="subscription-frame12">
              <button
                onClick={() => handleCancelSubscription(subscription?.id)}
                className="subscription-text34 16Medium"
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Subscription;
