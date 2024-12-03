import React, { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Button, Form } from "antd";
import { useCreateAboutPostMutation } from "../../../redux/features/auth/heashboard/updateAbout";
import toast from "react-hot-toast";
import { useGetAboutUsQuery } from "../../../redux/features/auth/heashboard/aboutUs";

const EditAbout = () => {
  const [content, setContent] = useState(""); // Content state
  const editor = useRef(null); // Ref for the editor
  const navigate = useNavigate(); // Navigate function
  const { data: aboutUs } = useGetAboutUsQuery();

  // console.log(aboutUs.data.attributes[0].content);

  const [updateAbout, { isLoading }] = useCreateAboutPostMutation(); // Mutation for updating content

  // Fetch the existing content (replace with your query if needed)
  useEffect(() => {
    // This is where you fetch the current content, replace with your actual query
    const fetchData = async () => {
      // Fetch the data (simulate fetching data here)
      // Replace this part with actual fetching logic if needed.
      const fetchedContent = "Current content of the About Us section"; // Replace with actual API call response
      setContent(fetchedContent); // Set the fetched content
    };
    fetchData();
  }, []); // Empty dependency array means it runs once when the component mounts

  // Handle form submission (updating About Us)
  const handleEditAbout = async () => {
    console.log(content);
    try {
      const res = await updateAbout({ content }).unwrap();
      navigate("/dashboard/settings/about");

      if (res?.code === 200) {
        toast.success(res?.message);
        setTimeout(() => {}, 1000);
      }
    } catch (error) {
      toast.error("Failed to update About Us content.");
      console.log(error);
    }
  };

  return (
    <div className="mt-8 mx-6">
      <Link to="/dashboard/settings/about" className="flex items-center gap-2">
        <FaCircleArrowLeft className="!text-primaryBg w-8 h-8" />
        <p className="font-semibold text-[30px]">Edit About</p>
      </Link>

      <Form
        labelCol={{ span: 22 }}
        wrapperCol={{ span: 40 }}
        layout="vertical"
        initialValues={{
          remember: true
        }}
        onFinish={handleEditAbout}
      >
        <div className="mt-6">
          <JoditEditor
            ref={editor}
            value={aboutUs.data.attributes[0].content} // Bind the editor value to the content state
            onChange={(newContent) => setContent(newContent)} // Update content on change
          />
        </div>

        <div className="text-right mt-6">
          <Form.Item>
            <Button
              htmlType="submit"
              className="h-[44px] w-[260px] !text-white !bg-primaryBg rounded-[8px]"
              loading={isLoading} // Show loading spinner while updating
            >
              Update About Us
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default EditAbout;
