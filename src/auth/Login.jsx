import { Button, Checkbox, Form, Input } from "antd";
import signin from "/image/Isometric.png";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMailOpen } from "react-icons/hi";
import { BiLock } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";
import { useAdminLoginMutation } from "../redux/features/auth/login.js";

import { getToken } from "firebase/messaging";
import { messaging } from "../firebase.js";

const Login = () => {
  const [adminLogin, { isLoading }] = useAdminLoginMutation();
  const [checkboxError, setCheckboxError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const [fcmToken, setFcmToken] = useState("");

  // Check if user is already logged in (localStorage)
  const user = localStorage.getItem("user");

  // UseEffect hook to handle navigation when user is already logged in
  useEffect(() => {
    if (user && user.length > 1) {
      return navigate("/dashboard/home");
    }
  }, [user, navigate]);

  // Fire base Notification
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          "BBootNIW54IBRESHBFkv5NRL2gFr3V068R3w_lDQup3_jcJ-qYhkG1VkewR9mUNEYMHMbR-6KxEhK1otgWiB96g"
      });
      setFcmToken(token);

      console.log(token);

      // Send this token  to server ( db)
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    // Req user for notification permission
    requestPermission();
  }, []);

  // console.log(fcmToken);

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      setCheckboxError("");
    }
  };

  // Handle form submission
  const onFinish = async (values) => {
    // const formData = { ...values , fcmToken  };
    const formData = { ...values };

    console.log(formData);
    // formData
    // console.log("Form Data: ", formData); // Log the data to see what is being sent

    try {
      const res = await adminLogin(formData).unwrap(); // Call the adminLogin mutation
      if (res?.code === 200) {
        toast.success(res?.message);
        localStorage.setItem("user", JSON.stringify(res?.data?.attributes));
        localStorage.setItem(
          "token",
          res?.data?.attributes?.tokens?.access?.token
        );
        navigate("/dashboard/home");
      }
    } catch (err) {
      alert(err.message)
      // console.error("Error Response: ", err); // Log the entire error for debugging
      const errorMessage = err?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
      // toast.error(errorMessage); // Display the error message returned by the API
    }
  };

  return (
    <div className="mt-12 h-auto md:h-[680px] shadow-xl w-[80%] md:w-[1096px] mx-auto bg-white rounded-[8px]">
      <Toaster />
      <div className="flex flex-col-reverse md:flex-row justify-around gap-4 px-6 md:px-10 mt-4 md:mt-8 py-4">
        <div className="h-[200px] hidden md:block md:h-[488px] mt-4 md:mt-[100px]">
          <img
            src={signin}
            alt="Signin"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-[20px] md:w-1/2">
          <h1 className="mt-4 md:mt-7 text-left text-[#222222] font-medium text-xl md:text-2xl">
            Hello, Welcome!
          </h1>
          <p className="font-poppins text-left w-full text-[14px] md:text-[16px] font-normal mt-2">
            Please Enter Your Details Below to Continue
          </p>
          <Form
            name="normal_login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              label={
                <span className="text-[16px] mt-5 font-medium">Email</span>
              }
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!"
                },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                  message: "Please enter a Gmail address!"
                }
              ]}
            >
              <Input
                size="large"
                placeholder="Enter Your Email"
                prefix={
                  <HiOutlineMailOpen
                    className="mr-2 bg-white text-black rounded-full p-[6px]"
                    size={28}
                    color="red"
                  />
                }
                style={{
                  height: "52px",
                  background: "#E6F9EF",
                  outline: "none",
                  marginBottom: "20px",
                  border: "1px solid green"
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="text-[16px] font-medium">Password</span>}
              rules={[
                { required: true, message: "Please input your password!" }
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Enter Your Password"
                prefix={
                  <BiLock
                    className="mr-2 bg-white rounded-full p-[6px]"
                    size={28}
                    color="red"
                  />
                }
                style={{
                  background: "#E6F9EF",
                  height: "52px",
                  outline: "none",
                  marginBottom: "20px",
                  border: "1px solid green"
                }}
              />
            </Form.Item>

            <div className="flex justify-between items-center">
              <Form.Item>
                <Checkbox
                  required
                  className="text-black"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                >
                  Remember me
                </Checkbox>
                {checkboxError && (
                  <p className="text-red-500 font-medium">{checkboxError}</p>
                )}
              </Form.Item>
              <div className="mb-4 flex justify-between items-center">
                <Link to="/forgotpassword">
                  <p className="cursor-pointer text-[14px] font-medium text-[#00BF63]">
                    Forgot password?
                  </p>
                </Link>
              </div>
            </div>

            <Form.Item>
              {/* Show loading spinner when request is in progress */}
              <Button
                htmlType="submit"
                className="block w-full h-[52px] px-2 py-4 mt-2 !text-[#fff] font-semibold !bg-primaryBg"
                loading={isLoading} // Loading spinner
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
