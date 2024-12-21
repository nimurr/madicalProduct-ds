import { Button, Form, Input, Upload } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";
import "react-phone-number-input/style.css";
import defaultUserImage from "/image/randomuser.jpg";
import { useUpdateProfileMutation } from "../../../redux/features/auth/profile/editProfile";
import toast, { Toaster } from "react-hot-toast";
import { useGetProfileQuery } from "../../../redux/features/auth/profile/getProfile";
import url from "../../../redux/api/baseUrl";

const EditProfile = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const [updateProfile] = useUpdateProfileMutation();
  const { data } = useGetProfileQuery();

  useEffect(() => {
    if (data?.data?.attributes) {
      setPhoneNumber(data.data.attributes.phoneNumber || ""); // Set default phone number
      // You can also set imageUrl if the profile has an image
      const existingImageUrl = data.data.attributes.image ? `${url}${data.data.attributes.image}` : "";
      setImageUrl(existingImageUrl);
    }
  }, [data]);

  // Handle file upload changes
  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList[0]?.originFileObj) {
      const reader = new FileReader();
      reader.readAsDataURL(newFileList[0].originFileObj);
      reader.onload = () => setImageUrl(reader.result);
    }
  };

  // Handle profile update
  const handleUpdateProfile = async (values) => {
    const formData = new FormData();
    formData.append("fullName", values?.fullName);
    formData.append("phoneNumber", phoneNumber);

    // Append image if a file is selected
    if (fileList[0]?.originFileObj) {
      formData.append("image", fileList[0].originFileObj);
    }

    try {
      const res = await updateProfile(formData).unwrap();
      if (res?.code === 200) {
        toast.success(res?.message);
      }
      setTimeout(() => {
        navigate("/dashboard/profile");
      }, 1000);
    } catch (error) {
      console.error("Error updating profile:", error?.data);
      toast.error("Profile update failed!");
    }
  };

  return (
    <div>
      <Toaster />
      <div
        onClick={() => navigate("/dashboard/profile")}
        className="flex items-center cursor-pointer ml-6 mt-10 mb-16"
      >
        <MdOutlineKeyboardArrowLeft size={30} />
        <h1 className="text-xl font-medium ml-2">Edit Profile</h1>
      </div>

      <div className="mx-6 p-9 rounded-xl bg-white shadow-md">
        <Form
          layout="vertical"
          autoComplete="off"
          onFinish={handleUpdateProfile}
        >
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex flex-col items-center w-full lg:w-1/3 border-dotted border">
              <div className="relative w-56 h-56 rounded-full flex justify-center items-center mt-5 bg-gray-50 border">
                <Upload
                  name="avatar"
                  showUploadList={false}
                  onChange={handleUploadChange}
                >
                  <img
                    className="w-44 h-44 rounded-full"
                    src={imageUrl || defaultUserImage}
                    alt="Profile"
                  />
                  <Button
                    className="border-none text-md text-blue-500 absolute bottom-6 flex items-center"
                    icon={<LuImagePlus size={20} className="mr-2" />}
                  >
                    Change Picture
                  </Button>
                </Upload>
              </div>

              <div className="text-center mt-6">
                <p className="text-lg">{"admin"}</p>
                <h1 className="text-2xl font-medium">
                  {data?.data?.attributes?.fullName}
                </h1>
              </div>
            </div>

            <div className="flex-1 w-full lg:w-2/3">
              <div className="flex flex-col gap-6">
                <Form.Item
                  label={<span className="text-lg font-medium">Name</span>}
                  name="fullName"
                  initialValue={data?.data?.attributes?.fullName}
                  rules={[{ required: true, message: "Please input your name!" }]}
                >
                  <Input
                    placeholder="Full Name"
                    className="p-4 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="text-lg font-medium">Email</span>}
                  name="email"
                  initialValue={data?.data?.attributes?.email}
                  readOnly
                >
                  <Input
                    placeholder="Email"
                    value={data?.data?.attributes?.email}
                    readOnly
                    className="p-4 rounded-lg border-gray-300 bg-gray-100"
                  />
                </Form.Item>

                <div className="flex flex-col">
                  <label className="text-lg font-medium mb-2">Phone Number</label>
                  <PhoneInput
                    placeholder="Enter phone number"
                    international
                    defaultCountry="BD"
                    value={'+'+phoneNumber.toString()}
                    onChange={setPhoneNumber}
                    className="p-2 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    style={{ height: "50px" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <Button
            htmlType="submit"
            className="w-full mt-12 h-14 !bg-[#193664] text-[#fff] rounded-lg text-lg font-medium"
          >
            Update Profile
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
