import React, { useEffect, useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useGetAboutUsQuery } from "../../../redux/features/auth/heashboard/aboutUs";

const About = () => {
  const navigate = useNavigate();
  const { data: about } = useGetAboutUsQuery();
  
  return (
    <div className=" mt-8 md:mx-6">
      <Link to="/dashboard/settings" className="flex items-center gap-2">
        <FaCircleArrowLeft className=" text-primaryBg w-8 h-8" />
        <p className=" font-semibold text-[30px]">About Us</p>
      </Link>
      <div className="mt-4">
        {/* Render the HTML content using dangerouslySetInnerHTML */}
        <div 
          dangerouslySetInnerHTML={{ __html: about?.data?.attributes[0]?.content }}
        />
      </div>
      <div className=" text-right mt-16">
        <Button
          onClick={() => navigate(`/dashboard/settings/editabout`)}
          className=" h-[44px] w-[260px] !text-white !bg-primaryBg text-[#fff] rounded-[8px]"
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default About;
