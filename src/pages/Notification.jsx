import React, { useState, useEffect } from 'react';
import notificationImage from '../assets/notificationI1.svg';
import alertImage from '../assets/alertNotification.svg';
import { useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import LoaderOverlay from "../components/loadinOverlay";

const GET_NOTIFICATIONS = gql`
  query {
    getNotifications {
      status
      message
      notifications {
        id
        stockId
        bannerId
        message
        status
        priority
        category
        readAt
      }
    }
  }
`;

const MARK_NOTIFICATION_AS_READ = gql`
  mutation markNotificationAsRead($id: ID!) {
    markNotificationAsRead(id: $id) {
      status
      message
    }
  }
`;

const MARK_NOTIFICATIONS_AS_READ = gql`
  mutation markNotificationsAsRead($ids: [ID]!) {
    markNotificationsAsRead(ids: $ids) {
      status
      message
    }
  }
`;

export default function Notification() {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(GET_NOTIFICATIONS);
  const [notifications, setNotifications] = useState([]);
  const [markNotificationAsRead] = useMutation(MARK_NOTIFICATION_AS_READ);
  const [markNotificationsAsRead] = useMutation(MARK_NOTIFICATIONS_AS_READ);

  useEffect(() => {
    if (data && data.getNotifications) {
      const { notifications: fetchedNotifications } = data.getNotifications;
      setNotifications(fetchedNotifications);
    }
  }, [data]);

  const handleMarkAllAsRead = async () => {
    const ids = notifications.map(notification => notification.id);
    await markNotificationsAsRead({ variables: { ids } });
    refetch();
    toast.success("All notifications marked as read");
  };

  const handleMarkAsRead = async (id) => {
    await markNotificationAsRead({ variables: { id } });
    refetch();
    toast.success("Notification marked as read");
  };

  const handleDeleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const formatDate = (date) => {
    const d = new Date(Number(date));
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }

  const unreadNotificationsCount = notifications.filter(item => !item.readAt).length;
  const readNotificationsCount = notifications.length - unreadNotificationsCount;

  return (
    <div className="flex flex-col gap-[48px] p-[48px] w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-[24px] font-[700] leading-[30px]">Notifications ({notifications.length || 0})</h1>
        {notifications.length ? (
          <button
            className="text-[16px] font-[500] leading-[20px] text-[#7487FF]"
            onClick={handleMarkAllAsRead}
          >
            Mark all as Read
          </button>
        ) : null}
      </div>
      <div className="flex justify-between items-center mt-2">
        <p className="text-[16px] font-[500] leading-[20px]">Un Readed Notifications: {unreadNotificationsCount}</p>
        <p className="text-[16px] font-[500] leading-[20px]">Readed Notifications: {readNotificationsCount}</p>
      </div>
      {loading && <LoaderOverlay/>}
      <div className="notifications-container flex flex-col gap-[8px] w-full">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`flex justify-between items-center w-full px-[12px] py-[16px] ${
              item.status === 'read'
                ? 'border-l-2 border-[#94A3B8]'
                : item.category === 'Alert'
                ? 'border-l-2 border-[#F87171] bg-[#FEF2F2]'
                : 'border-l-2 border-[#84CC16] bg-[#F7FEE7]'
            }`}
          >
            <div className="flex gap-[12px] items-center">
              <img
                className={`p-[12px] rounded-[50%] ${
                  item.category === 'Alert' ? 'bg-[#F87171]' : 'bg-[#7487FF]'
                }`}
                src={item.category === 'Alert' ? alertImage : notificationImage}
                alt="notification"
              />
              <div className="flex flex-col gap-[4px]">
                <p className="text-[12px] font-[400] leading-[15px]">
                  <span className="text-[black] text-[14px] font-[700] leading-[20px]"> Category : </span>{item.category}
                </p>
                <p className="text-[12px] font-[400] leading-[15px]">
                  <span className="text-[black] text-[14px] font-[700] leading-[20px]"> Priority :</span> {item.priority}
                </p>
                <h1 className="text-[16px] font-[500] leading-[20px]">
                  <span className="text-[black] text-[14px] font-[700] leading-[20px]"> Message :</span> {item.message}
                </h1>
                <p className="text-[12px] font-[400] leading-[15px]">
                  <span className="text-[black] text-[14px] font-[700] leading-[20px]"> Read At :</span> {formatDate(item.readAt)}
                </p>

                {item.message === 'Stock Expiry alert!' && (
                  <span
                    className="cursor-pointer text-[#7487FF] text-[16px] font-[700] leading-[20px]"
                    onClick={() => {
                      navigate('/home/product');
                    }}
                  >
                    Got to Product
                  </span>
                )}
              </div>
            </div>
            {!item.readAt && (
              <button
                className="text-[16px] font-[500] leading-[20px] text-[#7487FF]"
                onClick={() => handleMarkAsRead(item.id)}
              >
                Mark as Read
              </button>
            )}
          </div>
        ))}
        {!notifications.length && (
          <p className="text-[14px] font-[400] leading-[17.5px] text-[#94A3B8] italic text-center py-[16px]">
            No Notifications
          </p>
        )}
      </div>
    </div>
  );
}
