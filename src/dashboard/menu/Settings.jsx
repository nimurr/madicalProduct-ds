import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
// import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from "@ant-design/icons";

const Settings = () => {
  const navigate = useNavigate();

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const changePassword = (values) => {
  //   const { confirmPassword, ...ChangePassword } = values;
  //   console.log("Form values: ", ChangePassword);
  // };

  const users = JSON.parse(localStorage.getItem("user"));
  console.log("users", users?.user);
  const userRole = users?.user?.role;

  return (
    <div className="mt-10">
      <h1 className="font-semibold text-[30px]">Settings</h1>
      <div>
        {/* Privacy policy */}
        {/* {
          userRole === "masterAdmin" && (
            <div onClick={() => navigate("/dashboard/settings/admins")} className="mt-10 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]">
              <p className="text-[18px] ml-8 font-medium">Admin</p>
              <Link to="/dashboard/settings/admins" className="mr-8 text-[#193664] px-2 py-1 rounded cursor-pointer">
                <IoIosArrowForward />
              </Link>
            </div>
          )
        } */}


        {/* Privacy policy */}
        <div onClick={() => navigate("/dashboard/settings/privacypolicy")} className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]">
          <p className="text-[18px] ml-8 font-medium">Privacy Policy</p>
          <Link to="/dashboard/settings/privacypolicy" className="mr-8 text-[#193664] px-2 py-1 rounded cursor-pointer">
            <IoIosArrowForward />
          </Link>
        </div>
        <div onClick={() => navigate("/dashboard/settings/termcondition")} className="mt-8 flex justify-between cursor-pointer bg-[#F7F7F7] rounded items-center w-full h-[75px]">
          <p className="text-[18px] ml-8 font-medium">Terms and Disclaimers</p>
          <Link to="/dashboard/settings/termcondition" className="mr-8 text-[#193664] px-2 py-1 rounded cursor-pointer">
            <IoIosArrowForward />
          </Link>
        </div>
        <div onClick={() => navigate("/dashboard/settings/about")} className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]">
          <p className="text-[18px] ml-8 font-medium">About Us</p>
          <Link to="/dashboard/settings/about" className="mr-8 text-[#193664] px-2 py-1 rounded cursor-pointer">
            <IoIosArrowForward />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Settings;
