import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Button, Form } from "antd";
import { useGetTermsAndServiceQuery } from "../../../redux/features/auth/heashboard/termsAndservices";
import { useCreateTermsPostMutation } from "../../../redux/features/auth/heashboard/updateTeramCondition";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";

const EditTermCondition = () => {
  const { data: termcondition, isLoading } = useGetTermsAndServiceQuery();
  const [updateTC, { isLoading: isUpdating }] = useCreateTermsPostMutation();
  const [content, setContent] = useState(""); // Ensure content is initialized properly
  const navigate = useNavigate();

  // Set initial content when data is available
  useEffect(() => {
    if (termcondition?.data?.attributes?.length > 0) {
      setContent(termcondition?.data?.attributes[0]?.content || "");
    }
  }, [termcondition]);

  const handleEditTermCondition = async () => {
    if (content.trim() === "") {
      toast.error("Content cannot be empty.");
      return;
    }

    try {
      const res = await updateTC({ content }).unwrap();
      navigate("/dashboard/settings/termcondition");

      
      if (res?.code === 200) {
        toast.success(res?.message);
        setTimeout(() => {
        }, 1000);
      }
    } catch (error) {
      toast.error("Failed to update term condition.");
      console.log(error);
    }
  };

  return (
    <div className="mt-8 md:mx-6">
      <Link to="/dashboard/settings/termcondition" className="flex items-center gap-2">
        <FaCircleArrowLeft className="!text-primaryBg w-8 h-8" />
        <p className="font-semibold text-[30px]">Edit Terms and Disclaimers</p>
      </Link>

      <Form
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 40 }}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleEditTermCondition}
      >
        <div className="mt-6">
          {/* Ensure the editor is receiving the correct content */}
          <JoditEditor
            value={content}
            onChange={(newContent) => setContent(newContent)} // Update content state on change
            // config={{
            //   readonly: isLoading, // Disable editor while loading data
            // }}
          />
        </div>

        <div className="text-right mt-6">
          <Form.Item>
            <Button
              htmlType="submit"
              className="h-[44px] w-[260px] !text-white !bg-primaryBg text-[#fff] rounded-[8px]"
              loading={isUpdating} // Show loading spinner when updating
            >
              Update Term Condition
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default EditTermCondition;
