import { NavLink, useNavigate } from "react-router-dom";
import logo from "/image/logo.png";

import { BiCategory, BiSolidDashboard } from "react-icons/bi";

import { CiSettings } from "react-icons/ci";
import Swal from "sweetalert2";
import { FaAd, FaUserFriends, FaUsers } from "react-icons/fa";

import { HiLogout } from "react-icons/hi";
import { HiCash } from "react-icons/hi";
import { CiCalendar } from "react-icons/ci";
import { IoMenuOutline } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaUserShield } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to log out from here!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        Swal.fire({
          title: "Logged Out!",
          text: "User has been logged out successfully.",
          icon: "success",
          timer: 2000
        });
        navigate("/");
      }
    });
  };

  return (
    <div className="lg:w-[250px]  xl:w-[300px] md:w-[200px] sm:w-[120px] w-[60px] h-screen overflow-y-auto flex flex-col justify-between bg-primaryBg  min-h-screen rounded-md">
      <div className="">
        <div className="p-[10px] grid justify-items-stretch  sm:p-[16px]">
          <img
            className="w-24 rounded-lg justify-self-center"
            src={logo}
            alt="Logo"
          />

          {/* <hr className="w-full mt-4 text-[#54D496] hidden sm:block" /> */}
        </div>
        <div className="sm:ml-5 mt-8 ">
          <ul className="">
            <NavLink
              to="home"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[18px] font-medium p-[10px] bg-[#FFFFFF] text-[#193664] m-[6px] rounded-lg"
                  : "flex text-[white] cursor-pointer items-center text-[18px] font-medium p-[10px] m-[6px] rounded-lg"
              }
            >
              <BiSolidDashboard className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Dashboard</span>
            </NavLink>

            <NavLink
              to="earning"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[18px] font-medium p-[10px] bg-[#FFFFFF] text-[#193664] m-[6px] rounded-lg"
                  : "flex text-[white] cursor-pointer items-center text-[18px] font-medium p-[10px]  m-[6px] rounded-lg"
              }
            >
              <HiCash className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Earning</span>
            </NavLink>

            {/* <NavLink
              to="newsletter"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[18px] font-medium p-[10px] bg-[#FFFFFF] text-[#193664] m-[6px] rounded-lg"
                  : "flex text-[white] cursor-pointer items-center text-[18px] font-medium p-[10px]  m-[6px] rounded-lg"
              }
            >
              <MdOutlineEmail className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Newsletter</span>
            </NavLink> */}

            <NavLink
              to="users"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center font-medium bg-[#FFFFFF] text-[#193664] rounded-lg"
                  : "flex text-[white] p-[10px] m-[6px] cursor-pointer items-center font-medium  rounded-lg"
              }
            >
              <FaUsers className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Users</span>
            </NavLink>

            <NavLink
              to="agents"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[18px] font-medium p-[10px] bg-[#FFFFFF] text-[#193664] m-[6px] rounded-lg"
                  : "flex text-[white] cursor-pointer items-center text-[18px] font-medium p-[10px]   m-[6px] rounded-lg"
              }
            >
              <FaUserShield className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Agents</span>
            </NavLink>

            <NavLink
              to="provider"
              className={({ isActive }) =>
                isActive
                  ? "flex cursor-pointer items-center text-[18px] font-medium p-[10px] bg-[#FFFFFF] text-[#193664] m-[6px] rounded-lg"
                  : "flex text-[white] cursor-pointer items-center text-[18px] font-medium p-[10px]   m-[6px] rounded-lg"
              }
            >
              <FaUserFriends className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Provider</span>
            </NavLink>



            <NavLink
              to="bidhistory"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium bg-[#FFFFFF] text-[#193664] rounded-lg"
                  : "flex text-[white] p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium   rounded-lg"
              }
            >
              <CiCalendar className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Bid History</span>
            </NavLink>

            <NavLink
              to="category"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium bg-[#FFFFFF] text-[#193664] rounded-lg"
                  : "flex text-[white] p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium   rounded-lg"
              }
            >
              <BiCategory className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Category</span>
            </NavLink>

            <NavLink
              to="marketing"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium bg-[#FFFFFF] text-[#193664] rounded-lg"
                  : "flex text-[white] p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium   rounded-lg"
              }
            >
              <HiCash className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Marketing fees</span>
            </NavLink>

            <NavLink
              to="/dashboard/withdrawrequest"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium bg-[#FFFFFF] text-[#193664] rounded-lg"
                  : "flex text-[white] p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium   rounded-lg"
              }
            >
              <RiMoneyDollarCircleLine className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Withdrawal Request</span>
            </NavLink>

            <NavLink
              to="/dashboard/bannerads/banneradsAll"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium bg-[#FFFFFF] text-[#193664] rounded-lg"
                  : "flex text-[white] p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium   rounded-lg"
              }
            >
              <FaAd className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Banner Ad</span>
            </NavLink>
            <NavLink
              to="/dashboard/reports"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium bg-[#FFFFFF] text-[#193664] rounded-lg"
                  : "flex text-[white] p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium   rounded-lg"
              }
            >
              <TbReportSearch className="h-7 w-7 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Reports</span>
            </NavLink>

            <NavLink
              to="settings"
              className={({ isActive }) =>
                isActive
                  ? "flex p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium bg-[#FFFFFF] text-[#193664] rounded-lg"
                  : "flex text-[white] p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium   rounded-lg"
              }
            >
              <CiSettings className="h-8 w-8 lg:h-5 lg:w-5" />
              <span className="hidden ml-2 sm:block">Settings</span>
            </NavLink>
          </ul>
        </div>
      </div>

      <div className="mb-[60px] mt-2">
        <div
          onClick={handleLogOut}
          className="flex items-center ml-3 sm:ml-[35px] cursor-pointer gap-2 text-[#f84141] font-medium"
        >
          <HiLogout className="h-8 w-8 lg:h-5 lg:w-5" />
          <span className="hidden sm:block text-[20px]">Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
