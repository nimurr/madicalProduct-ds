import React from "react";
import { useGetAllNotificationQuery, useUpdateNotificationMutation } from "../../../redux/features/auth/heashboard/notification";
import url from "../../../redux/api/baseUrl";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  // Fetch notifications
  const navigate = useNavigate();

  const { data: notification } = useGetAllNotificationQuery();
  const notifications = notification?.data?.attributes?.notifications;
  const notifications2 = notification?.data?.attributes;
  console.log(notifications2);

  // Update notification mutation
  const [updateNotification, { isLoading }] = useUpdateNotificationMutation();
  if(isLoading){
    return <div className="text-center my-10 text-[40px] text-[#bd0000]">Loading...</div>
  }

  // Handle notification update
  const handleShowAllThisItem = async (notificationId) => {
    console.log(notificationId);
    try {
      await updateNotification({notificationId}).unwrap();
      navigate(`/dashboard/withdrawrequest`);
    } catch (err) {
      console.error("Failed to update notification:", err);
      alert("Failed to update the notification.");
    }
  };

  return (
    <div className="mt-8 mx-0">
      {/* Page Title */}
      <h1 className="font-semibold text-[30px]">Notifications</h1>

      {/* Notification List */}
      {notifications?.map((item, idx) => (
        <div
          key={idx}
          onClick={() => handleShowAllThisItem(item?._id)}
          className={`mt-3 ${
            item?.status === "unread" ? "bg-[#9cbbff4b]" : "bg-white"
          } cursor-pointer flex items-center border-[2px] border-[#9cbbff4b] rounded-lg p-5`}
        >
          {/* Notification Icon */}
          <div>
            <img
              className="w-10 ml-5"
              src={item?.icon ? `${url}${item.icon}` : "/default-icon.png"}
              alt="Notification Icon"
            />
          </div>

          {/* Notification Image */}
          <div>
            <img
              className="w-14 h-14 border-2 border-primaryBg rounded-full mx-5"
              src={item?.image ? `${url}${item.image}` : "/default-image.png"}
              alt="Notification"
            />
          </div>

          {/* Notification Content */}
          <div>
            <p className="text-lg font-medium capitalize text-primaryBg">
              {item?.title}
            </p>
            <p className="text-sm text-gray-500">
              {item?.createdAt?.split("T")[0] || "N/A"}
            </p>
          </div>
        </div>
      ))}

      {/* Loading Indicator */}
      {/* {isLoading && <p className="text-blue-500">Updating notification...</p>} */}
    </div>
  );
};

export default Notification;
