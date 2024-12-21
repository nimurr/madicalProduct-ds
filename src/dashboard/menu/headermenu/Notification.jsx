import { IoMdNotificationsOutline } from "react-icons/io";
import { useGetAllNotificationQuery } from "../../../redux/features/auth/heashboard/notification";

const Notification = () => {


  const { data: notification } = useGetAllNotificationQuery();



  const notifications = notification?.data?.attributes;

  console.log(notifications);


  return (

    <div className="mt-8 mx-0">
      <h1 className="font-semibold text-[30px]">Notifications</h1>

      <div className="mt-8 flex border rounded border-[#19366433]  items-center w-full h-[100px]">
        <div>
          <p className="">
            <IoMdNotificationsOutline className=" h-12 w-12 ml-4 border rounded-full p-2 border-[#193664] text-[#193664]]" />
          </p>
        </div>
        <div>
          <p className="text-[18px] ml-8 font-medium text-[#333333] capitalize">
            {" "}
            oh! very good well done <br />{" "}
          </p>
          {/* <p className='text-[18px] ml-8 font-medium'>{notification?.createdAt?.split("T")[0] ? notification?.createdAt?.split("T")[0] : "N/A"}</p> */}
          <p className="text-[14px] ml-8 text-[#76b395]">Fri, 12:30pm</p>
        </div>
      </div>
      <div className="mt-3 flex border rounded border-[#19366433]  items-center w-full h-[100px]">
        <div>
          <p className="">
            <IoMdNotificationsOutline className=" h-12 w-12 ml-4 border rounded-full p-2 border-[#193664] text-[#193664]]" />
          </p>
        </div>
        <div>
          <p className="text-[18px] ml-8 font-medium text-[#333333] capitalize">
            {" "}
            oh! very good well done <br />{" "}
          </p>
          {/* <p className='text-[18px] ml-8 font-medium'>{notification?.createdAt?.split("T")[0] ? notification?.createdAt?.split("T")[0] : "N/A"}</p> */}
          <p className="text-[14px] ml-8 text-[#76b395]">Fri, 12:30pm</p>
        </div>
      </div>
      <div className="mt-3 flex border rounded border-[#19366433]  items-center w-full h-[100px]">
        <div>
          <p className="">
            <IoMdNotificationsOutline className=" h-12 w-12 ml-4 border rounded-full p-2 border-[#193664] text-[#193664]]" />
          </p>
        </div>
        <div>
          <p className="text-[18px] ml-8 font-medium text-[#333333] capitalize">
            {" "}
            oh! very good well done <br />{" "}
          </p>
          {/* <p className='text-[18px] ml-8 font-medium'>{notification?.createdAt?.split("T")[0] ? notification?.createdAt?.split("T")[0] : "N/A"}</p> */}
          <p className="text-[14px] ml-8 text-[#76b395]">Fri, 12:30pm</p>
        </div>
      </div>

    </div>
  );
};

export default Notification;
