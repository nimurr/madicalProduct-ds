import React from "react";
import { BiSolidUserPlus } from "react-icons/bi";
import { BsExclude } from "react-icons/bs";
import { CiBag1 } from "react-icons/ci";
import { FaPersonRunning, FaUsers } from "react-icons/fa6";
import {
  HiOutlineCurrencyDollar,
  HiOutlineOfficeBuilding
} from "react-icons/hi";
import { SiMagento } from "react-icons/si";

const Card = () => {
  return (
    <div className=" md:mt-14 md:mb-10 my-10 ">
      {/* <h1 className="font-medium text-xl">Overview</h1> */}
      <div className="grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-2 grid-cols-1 lg:gap-2 xl:gap-3 w-full">
        <div className=" rounded h-[180px] flex justify-between items-center card bg-[#e8ebf0]">
          <div className="mx-6 h-16 w-16 rounded bg-primaryBg flex justify-center items-center">
            <HiOutlineCurrencyDollar className=" text-whiteText w-12 h-12" />
          </div>
          <div className="mx-6 text-right">
            <p className="text-[18px] font-semibold text-[#193664] my-4">
              Total Earnings
            </p>
            <h1 className="text-[34px] font-medium">$570</h1>
          </div>
        </div>
        <div className=" rounded h-[180px] flex justify-between items-center card bg-[#e8ebf0]">
          <div className="mx-6 h-16 w-16 rounded bg-primaryBg flex justify-center items-center">
            <FaUsers className="text-whiteText w-12 h-12" />
          </div>
          <div className="mx-6 text-right">
            <p className="text-[18px] font-semibold text-primaryBg my-4">
              Total User
            </p>
            <h1 className="text-[34px] font-medium">23</h1>
          </div>
        </div>

        <div className="  rounded h-[180px] flex justify-between items-center card bg-[#e8ebf0]">
          <div className="mx-6 h-16 w-16 rounded bg-primaryBg flex justify-center items-center">
            <HiOutlineOfficeBuilding className="text-whiteText w-12 h-12" />
          </div>
          <div className="mx-6 text-right">
            <p className="text-[18px] font-semibold text-[#193664] my-4">
              Total Provider
            </p>
            <h1 className="text-[34px] font-medium">95 </h1>
          </div>
        </div>

        <div className="  rounded h-[180px] flex justify-between items-center card bg-[#e8ebf0]">
          <div className="mx-6 h-16 w-16 rounded bg-primaryBg flex justify-center items-center">
            <HiOutlineOfficeBuilding className="text-whiteText w-12 h-12" />
          </div>
          <div className="mx-6 text-right">
            <p className="text-[18px] font-semibold text-[#193664] my-4">
              Total Agent
            </p>
            <h1 className="text-[34px] font-medium">95</h1>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Card;
