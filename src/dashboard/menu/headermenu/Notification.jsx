import { IoMdNotificationsOutline } from "react-icons/io";
import { useGetAllNotificationQuery } from "../../../redux/features/auth/heashboard/notification";
import url from "../../../redux/api/baseUrl";
// import ReactMarkdown from "react-markdown";


const Notification = () => {


  const { data: notification } = useGetAllNotificationQuery();

  const notifications = notification?.data?.attributes?.notifications;
  console.log(notifications);


  return (

    <div className="mt-8 mx-0">
      <h1 className="font-semibold text-[30px]">Notifications</h1>

 

      {
        notifications?.map((item, idx) => {
          return (
            <div key={idx} className="mt-8 bg-[#e9e9e9] flex items-center border rounded border-[#19366433] justify-start gap-5 w-full h-auto py-5">
              <div>
                <p className="">
                  {/* <IoMdNotificationsOutline className=" h-12 w-12 ml-4 border rounded-full p-2 border-[#193664] text-[#193664]]" /> */}
                  <img className="w-10 ml-5" src={`${url}${item?.icon}`} alt="" />
                </p>
              </div>
              <div>
                {/* <img className="w-14 h-14 border-2 border-primaryBg rounded-full" src="/image/category3.png" alt="" /> */}
                <img className="min-w-14 mx-5 min-h-14 max-w-14  border-2 border-primaryBg rounded-full" src={`${url}${item?.image}`} alt="" />
              </div>
              <div>
                <p className="text-[20px] font-medium  capitalize text-primaryBg">
                 
                 {item?.title} <br /> 
                </p>
                {/* <p className='text-[18px] ml-8 font-medium'>{notification?.createdAt?.split("T")[0] ? notification?.createdAt?.split("T")[0] : "N/A"}</p> */}
                <div onClick={handleShowAllThisItem}>
                  {/* {item?.content} */}
                  {/* <ReactMarkdown>{item?.content.slice(0, 50)+'...'}  

                    if click this then show this all : {item?.content} 
                  </ReactMarkdown> */}
                </div>
              </div>
            </div>
          )
        })
      }
 

    </div>
  );
};

export default Notification;
