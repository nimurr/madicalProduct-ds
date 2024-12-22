import { IoMdNotificationsOutline } from "react-icons/io";
import { useGetAllNotificationQuery } from "../../../redux/features/auth/heashboard/notification";
import url from "../../../redux/api/baseUrl";

const Notification = () => {


  const { data: notification } = useGetAllNotificationQuery();

  const notifications = notification?.data?.attributes?.notifications;
  console.log(notifications);


  return (

    <div className="mt-8 mx-0">
      <h1 className="font-semibold text-[30px]">Notifications</h1>

      <div className="mt-8 bg-[#e9e9e9] flex  items-center border rounded border-[#19366433] justify-start gap-5 w-full h-auto py-5">
        <div>
          <p className="">
            <IoMdNotificationsOutline className=" h-12 w-12 ml-4 border rounded-full p-2 border-[#193664] text-[#193664]]" />
          </p>
        </div>
        <div>
          <img className="w-14 h-14 border-2 border-primaryBg rounded-full" src="/image/category3.png" alt="" />
        </div>
        <div>
          <p className="text-[20px] font-medium  capitalize text-primaryBg">
            {" "}
            oh! very good well done <br />{" "}
          </p>
          {/* <p className='text-[18px] ml-8 font-medium'>{notification?.createdAt?.split("T")[0] ? notification?.createdAt?.split("T")[0] : "N/A"}</p> */}
          <p className="text-[15px] text-[#000000] ">Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa vero molestiae saepe impedit facere. Exercitationem provident voluptates harum quaerat ex. <br />
            <ul className="list-disc ml-5">
              <li className="font-semibold text-[14px]">consectetur adipisicing</li>
              <li className="font-semibold text-[14px]">consectetur adipisicing</li>
            </ul>
          </p>
        </div>
      </div>


      {
        notifications?.map((item, idx) => {
          return (
            <div key={idx} className="mt-8 bg-[#e9e9e9] flex  items-center border rounded border-[#19366433] justify-start gap-5 w-full h-auto py-5">
              <div>
                <p className="">
                  {/* <IoMdNotificationsOutline className=" h-12 w-12 ml-4 border rounded-full p-2 border-[#193664] text-[#193664]]" /> */}
                    <img src={`${url}${item?.icon}`} alt="" />
                </p>
              </div>
              <div>
                <img className="w-14 h-14 border-2 border-primaryBg rounded-full" src="/image/category3.png" alt="" />
              </div>
              <div>
                <p className="text-[20px] font-medium  capitalize text-primaryBg">
                  {" "}
                  oh! very good well done <br />{" "}
                </p>
                {/* <p className='text-[18px] ml-8 font-medium'>{notification?.createdAt?.split("T")[0] ? notification?.createdAt?.split("T")[0] : "N/A"}</p> */}
                <p className="text-[15px] text-[#000000] ">Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa vero molestiae saepe impedit facere. Exercitationem provident voluptates harum quaerat ex. <br />
                  <ul className="list-disc ml-5">
                    <li className="font-semibold text-[14px]">consectetur adipisicing</li>
                    <li className="font-semibold text-[14px]">consectetur adipisicing</li>
                  </ul>
                </p>
              </div>
            </div>
          )
        })
      }



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
