import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { useGetProfileQuery } from "../redux/features/auth/profile/getProfile";

const Main = () => {

  const { data, isLoading } = useGetProfileQuery();
  const userInfo = localStorage.getItem("userInfo")
  console.log(userInfo);

  console.log(data?.data?.attributes?.isAdmin);
  const navitage = useNavigate()

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="relative">
          <img src="/image/Loading_image.gif" alt="" />
          <span className="font-semibold text-[#414141] absolute opacity-20 left-[45%] top-[50%] translate-[-50% -50%]">Loading...</span>
        </div>
      </div>
    )
  }

  if (!data?.data?.attributes?.isAdmin) {
    return navitage('/');
  }


  return (
    <div className="">
      <div className="flex p-4 min-h-screen">
        <div className="fixed z-30 w-[200px]  left-3">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className=" fixed xl:ml-[310px] lg:ml-[250px] md:ml-[200px] sm:ml-[120px] ml-[70px] w-[75%] mx-auto z-30  lg:w-[calc(98%-300px)]">
            <Header />
          </div>
          <div className="overflow-y-auto ml-8 h-full flex-1 pt-[80px] lg:pl-[280px] md:pl-[220px] sm:pl-[160px] pl-[40px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
