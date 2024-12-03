import React, { useEffect, useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useGetPrivacyAndPolicyQuery } from "../../../redux/features/auth/heashboard/privacyAndpolicy";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  // Fetch the privacy data
  const { data } = useGetPrivacyAndPolicyQuery();

  console.log(data?.data.attributes[0].content);

  // Ensure you're accessing the content correctly.
  // It seems you're expecting content to be in `data.data.attributes.content`.
  const content = data?.data?.attributes[0].content;

  return (
    <div className="h-[575px]">
      <div className="mt-8 mx-6">
        <Link to="/dashboard/settings" className="flex items-center gap-2">
          <FaCircleArrowLeft className="text-primaryBg w-8 h-8" />
          <p className="font-semibold text-[30px]">Privacy Policy</p>
        </Link>
        <div className="mt-4">
          {/* Render the HTML content */}
          {content && (
            <div
              dangerouslySetInnerHTML={{
                __html: content, // Render the content with HTML tags
              }}
            />
          )}
        </div>
        <div className="text-right mt-16">
          <button
            onClick={() => navigate(`/dashboard/settings/editprivacypolicy`)}
            className="h-[44px] w-[260px] !text-white !bg-primaryBg rounded-[8px]"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
