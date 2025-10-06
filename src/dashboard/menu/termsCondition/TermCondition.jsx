import React, { useEffect, useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useGetTermsAndServiceQuery } from "../../../redux/features/auth/heashboard/termsAndservices";

const TermCondition = () => {
  const { data: termcondition } = useGetTermsAndServiceQuery();
  const navigate = useNavigate();

  return (
    <div className="mt-8 md:mx-6">
      <Link to="/dashboard/settings" className="flex items-center gap-2">
        <FaCircleArrowLeft className="text-primaryBg w-8 h-8" />
        <p className="font-semibold text-[30px]">Terms and Disclaimers</p>
      </Link>
      <div className="mt-4">
        {/* Use dangerouslySetInnerHTML to render HTML content */}
        <div
          dangerouslySetInnerHTML={{
            __html: termcondition?.data?.attributes[0]?.content || "", // Safely insert the HTML content
          }}
        />
      </div>
      <div className="text-right mt-16">
        <button
          onClick={() => navigate(`/dashboard/settings/edittermcondition`)}
          className="h-[44px] w-[260px] !text-white !bg-primaryBg text-[#fff] rounded-[8px]"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default TermCondition;
