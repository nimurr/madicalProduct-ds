import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Button, Form } from "antd";
import "../../../index.css"; 
import toast from "react-hot-toast"; 
import { useCreatePrivacyPostMutation } from "../../../redux/features/auth/heashboard/updatePrivacy";
import { useGetPrivacyAndPolicyQuery } from "../../../redux/features/auth/heashboard/privacyAndpolicy";

// Function to decode HTML entities
const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const EditTermCondition = () => {
  const { data: privacyPolicy } = useGetPrivacyAndPolicyQuery();
  const [updateTC, { isLoading }] = useCreatePrivacyPostMutation();
  const editor = useRef(null);
  const navigate = useNavigate();

  // console.log(privacyPolicy.data.attributes[0]?.content);

  // State for holding content
  const [content, setContent] = useState("");
  const [isInitialized, setIsInitialized] = useState(false); // Prevent unnecessary re-renders

  // Effect to load the terms and conditions data
  useEffect(() => {
    if (privacyPolicy?.data?.attributes?.docs?.length && !isInitialized) {
      const decodedContent = decodeHtml(
        privacyPolicy.data.attributes.docs[0].content
      );
      setContent(decodedContent); // Set decoded content to editor
      setIsInitialized(true); // Set flag to prevent re-initialization
    }
  }, [privacyPolicy, isInitialized]);

  // Function to handle form submission
  const handlePostTerms = async () => {
    try {
      // Update terms and conditions with the content
      const res = await updateTC({ content }).unwrap();

      navigate("/dashboard/settings/privacypolicy"); // Redirect after success

      if (res?.code === 200) {
        toast.success(res?.message); // Show success notification
        setTimeout(() => {}, 1000);
      }
    } catch (error) {
      toast.error("Failed to update terms and conditions"); // Show error notification
      console.error("Error:", error);
    }
  };

  return (
    <div className="mt-8 mx-6">
      <Link
        to="/dashboard/settings/privacypolicy"
        className="flex items-center gap-2"
      >
        <FaCircleArrowLeft className="text-primaryBg w-8 h-8" />
        <p className="font-semibold text-[30px]">Edit Term & Condition</p>
      </Link>

      <Form
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 40 }}
        layout="vertical"
        onFinish={handlePostTerms}
      >
        <div className="mt-6">
          <JoditEditor
            ref={editor}
            value={privacyPolicy.data.attributes[0]?.content} // Controlled by state content
            onChange={(newContent) => setContent(newContent)} // Update content on change
            // config={{
            //   readonly: isLoading // Disable editing while loading
            // }}
          />
        </div>

        <div className="text-right mt-6">
          <Form.Item>
            <Button
              htmlType="submit"
              className="h-[44px] w-[260px] !text-white !bg-primaryBg text-[#fff] rounded-[8px]"
              loading={isLoading} // Add loading state to button
            >
              Update Term & Condition
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default EditTermCondition;
