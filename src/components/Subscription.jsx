import React, { useState, useEffect, useContext } from 'react';
import Loader from './loader';
import { toast } from 'react-toastify';
import { gql, useMutation, useQuery } from '@apollo/client';
import Context from '../context/AppContext';

// Define your GraphQL mutations and queries here
const CREATE_SUBSCRIPTION_MUTATION = gql`
  mutation createSubscription(
    $productId: ID!
    $addressId: ID!
    $deliveryInDays: String!
  ) {
    createSubscription(
      input: {
        productId: $productId
        addressId: $addressId
        deliveryInDays: $deliveryInDays
      }
    ) {
      status
      message
    }
  }
`;

const GET_MY_ADDRESSES = gql`
  query getMyAddresses {
    getMyAddresses {
      status
      message
      addresses {
        id
        houseNumber
        aptOrBuildingName
        streetOrAreaName
        city
        pincode
        state
        label
      }
    }
  }
`;

const GET_USER_SUBSCRIPTION = gql`
  query {
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
        product {
          id
          productName
        }
        address {
          id
          pincode
          houseNumber
          aptOrBuildingName
          state
          streetOrAreaName
          city
          label
        }
      }
    }
  }
`;



const EDIT_SUBSCRIPTION_MUTATION = gql`
  mutation EditSubscription($input: EditSubscriptionInput!) {
    editSubscription(input: $input) {
      status
      message
    }
  }
`;


const SubscriptionOption = ({
  description,
  originalPrice,
  discountedPrice,
  discountPercentage,
  selected,
  onSelect,
  isExisting,
}) => (
  <div className="justify-start items-start gap-1 inline-flex">
    {isExisting ? (
      <div className="w-6 h-6 relative bg-blue-900 rounded-[46px] shadow-inner border border-blue-900 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 text-white"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    ) : (
      <input
        type="radio"
        style={{ cursor: 'pointer' }}
        className="w-6 h-6 relative bg-slate-50 rounded-[46px] shadow-inner border border-slate-100"
        checked={selected}
        onChange={() => onSelect(description)}
      />
    )}
    <div className="flex-col justify-center items-start gap-1 inline-flex">
      <div className="text-slate-800 text-sm font-medium font-['Helvetica Neue'] leading-[17.50px]">
        {description}
      </div>
      <div className="flex-col justify-center items-start flex">
        <div className="justify-start items-center gap-1 inline-flex">
          <div className="text-slate-500 text-xs font-normal font-['Helvetica Neue'] line-through leading-[17.50px]">
            Rs {originalPrice}
          </div>
          <div className="text-slate-900 text-sm font-medium font-['Helvetica Neue'] leading-[17.50px]">
            Rs {discountedPrice}
          </div>
        </div>
        <div className="text-lime-600 text-xs font-light font-['Helvetica Neue'] leading-[15px]">
          (save {discountPercentage}%)
        </div>
      </div>
    </div>
  </div>
);

const SubscriptionCard = (pincode) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [existingSubscription, setExistingSubscription] = useState(null);
  const { selectedProduct } = useContext(Context);
  const { loading: subscriptionLoading, error: subscriptionError, data: subscriptionData ,refetch} =
    useQuery(GET_USER_SUBSCRIPTION);

  const [subscriptionOptions] = useState([
    {
      description: 'Monthly - every 30 days',
      originalPrice: selectedProduct?.stocks?.[0]?.mrpPerSheet,
      discountedPrice:
        selectedProduct?.stocks?.[0]?.mrpPerSheet -
        (Number(selectedProduct?.stocks?.[0]?.mrpPerSheet) *
          Number(selectedProduct?.coupon?.percentage)) /
          100,
      discountPercentage: selectedProduct?.coupon?.percentage,
    },
    {
      description: 'Quarterly - every 90 days',
      originalPrice: selectedProduct?.stocks?.[0]?.mrpPerSheet,
      discountedPrice:
        selectedProduct?.stocks?.[0]?.mrpPerSheet -
        (selectedProduct?.stocks?.[0]?.mrpPerSheet * selectedProduct?.coupon?.percentage) / 100,
      discountPercentage: selectedProduct?.coupon?.percentage,
    },
  ]);

  const { loading: addressesLoading, error: addressesError, data: addressesData } = useQuery(
    GET_MY_ADDRESSES
  );

  const [createSubscription] = useMutation(CREATE_SUBSCRIPTION_MUTATION);
  const [editSubscription] = useMutation(EDIT_SUBSCRIPTION_MUTATION);

  useEffect(() => {
    if (subscriptionData) {
      const subscription = subscriptionData?.getUserSubscriptions?.subscriptions?.find(
        (sub) => sub.productId === selectedProduct?.id
      );
      setExistingSubscription(subscription);

      if (subscription) {
        const selectedOption =
          subscription.deliveryInDays === '30'
            ? 'Monthly - every 30 days'
            : 'Quarterly - every 90 days';
        setSelectedOption(selectedOption);
      }
    }
  }, [subscriptionData, selectedProduct]);

  useEffect(() => {
    if ( addressesData) {
      setSelectedAddressId(
        addressesData?.getMyAddresses?.addresses?.filter(
          (address) => address?.pincode === pincode?.pincode
        )[0]?.id
      );
    }
  }, [addressesData,pincode]);

  const handleOptionSelect = (description) => {
    setSelectedOption(description);
  };

  const handleSubscribeClick = async () => {
    console.log(selectedOption, selectedAddressId);
    if (selectedOption && selectedAddressId) {
      setLoading(true);
      try {
        if (existingSubscription) {
          // Edit subscription case
          const { data } = await editSubscription({
            variables: {
              input: {
                subscriptionId: existingSubscription?.id,
                addressId: selectedAddressId,
                deliveryInDays: selectedOption === 'Monthly - every 30 days' ? '30' : '90',
              },
            },
          });
          if (data?.editSubscription?.status === 'SUCCESS') {
            toast.success('Subscription updated successfully!');
            refetch();
          } else {
            throw new Error(data?.editSubscription?.message || 'Failed to update subscription');
          }
        } else {
          // Create subscription case
          const { data } = await createSubscription({
            variables: {
              productId: selectedProduct.id,
              addressId: selectedAddressId,
              deliveryInDays: selectedOption === 'Monthly - every 30 days' ? '30' : '90',
            },
          });
          if (data?.createSubscription?.status === 'SUCCESS') {
            toast.success('Subscription successful!');
            refetch();
          } else {
            throw new Error(data?.createSubscription?.message || 'Failed to subscribe');
          }
        }
      } catch (error) {
        toast.error(error.message || 'Failed to subscribe/update. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Please select a subscription option and an address before subscribing.');
    }
  };

  return (
    <div className="w-[615px] h-[261px] px-3 py-5 bg-white rounded shadow border border-slate-100 flex-col justify-center items-start gap-3 inline-flex">
      <div className="self-stretch h-[23px] flex-col justify-center  items-start gap-1 flex">
        <div className="w-[501px] h-[23px] text-slate-900 text-lg font-medium font-['Helvetica Neue'] leading-snug">
          Subscribe and Save :
        </div>
      </div>
      {subscriptionOptions.map((option, index) => (
        <SubscriptionOption
          key={index}
          {...option}
          selected={selectedOption === option.description}
          onSelect={handleOptionSelect}
          isExisting={existingSubscription !== null && selectedOption === option.description}
        />
      ))}
      <div
        className="self-stretch p-4 rounded border border-blue-900 justify-center items-start gap-2 inline-flex cursor-pointer"
        onClick={handleSubscribeClick}
      >
        <div className="text-blue-900 text-base font-medium font-['Helvetica Neue'] leading-tight">
          {existingSubscription ? 'Update Subscription' : 'Subscribe'}
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default SubscriptionCard;