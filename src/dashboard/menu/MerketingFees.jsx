import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
// import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from "@ant-design/icons";

const MarketingFees = () => {
  const navigate = useNavigate();

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const changePassword = (values) => {
  //   const { confirmPassword, ...ChangePassword } = values;
  //   console.log("Form values: ", ChangePassword);
  // };

  return (
    <div className="mt-8 mx-6 ">
      <h1 className="font-semibold text-header">Marketing</h1>
      <div>
         

       
        <div   className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]">
          <p className="text-[18px] ml-8 font-medium">Product Marketing Fees</p>
          <Link to="/dashboard/settings/privacypolicy" className="mr-8 text-[#193664] px-2 py-1 rounded cursor-pointer">
            <IoIosArrowForward />
          </Link>
        </div>
        <div   className="mt-8 flex justify-between cursor-pointer bg-[#F7F7F7] rounded items-center w-full h-[75px]">
          <p className="text-[18px] ml-8 font-medium">Messaging Fees</p>
          <Link to="/dashboard/settings/termcondition" className="mr-8 text-[#193664] px-2 py-1 rounded cursor-pointer">
            <IoIosArrowForward />
          </Link>
        </div>
        <div   className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]">
          <p className="text-[18px] ml-8 font-medium">Bid Fees</p>
          <Link to="/dashboard/settings/about"className="mr-8 text-[#193664] px-2 py-1 rounded cursor-pointer">
            <IoIosArrowForward />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarketingFees;
