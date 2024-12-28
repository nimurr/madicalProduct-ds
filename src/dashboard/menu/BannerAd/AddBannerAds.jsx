import React, { useState } from "react";
import { Input, Upload, Button, Form, Space, message } from "antd";
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleAdsBannerQuery, useUpdatePublishedMutation } from "../../../redux/features/auth/heashboard/adsBanner";
import url from "../../../redux/api/baseUrl";

const { TextArea } = Input;

const AddBannerAds = () => {
  const { id } = useParams();
  // console.log("Ad ID:", id);
  const navigate = useNavigate();

  const status = {status : "published"};
  const { data: singleAd, isLoading } = useGetSingleAdsBannerQuery(id);
  const defaultValues = singleAd?.data?.attributes || {};
  const [published, { isLoading: isPublishing }] = useUpdatePublishedMutation();

  const [fileList, setFileList] = useState([]);

  const handleFormSubmit = async (values) => {
    try {
      const res = await published({ id, status }).unwrap();

      navigate('/dashboard/bannerads/banneradsAll')
      console.log("Ad successfully published:", res);
      message.success(`Ad successfully published.`);	
    } catch (error) {
      console.error("Failed to publish ad:", error);
      message.error("Failed to publish ad. Please try again.");
    }
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const beforeUpload = (file) => {
    setFileList([...fileList, { originFileObj: file }]); // Add file to state
    return false; // Prevent automatic upload
  };

  return (
    <div className="p-6 bg-white border-2 border-[#eee] rounded-lg mt-14">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Form
          onFinish={handleFormSubmit}
          layout="vertical"
          initialValues={{
            title: defaultValues.title,
            subTitle: defaultValues.subTitle,
            keys: defaultValues.keys || [],
            description: defaultValues.description,
            amount: defaultValues.amount,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Section */}
            <div className="flex flex-col gap-4">
              <Form.Item
                label={<span className="font-semibold">Ad Title</span>}
                name="title"
                rules={[{ required: true, message: "Please enter Ad Title" }]}
              >
                <Input className="py-3" placeholder="Enter Ad Title" />
              </Form.Item>

              <Form.Item
                label={<span className="font-semibold">Sub Title</span>}
                name="subTitle"
                rules={[{ required: true, message: "Please enter Sub Title" }]}
              >
                <Input className="py-3" placeholder="Enter Sub Title" />
              </Form.Item>

              {/* Dynamically Add Key Benefits */}
              <Form.Item label={<span className="font-semibold">Key Benefits</span>}>
                <Form.List name="keys">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <Space key={key} align="baseline" className="flex justify-between mb-2">
                          <Form.Item
                            {...restField}
                            name={[name]}
                            fieldKey={[fieldKey]}
                            rules={[{ required: true, message: "Please enter a Key Benefit" }]}
                            className="w-full"
                          >
                            <Input placeholder="Enter Key Benefit" />
                          </Form.Item>
                          <MinusCircleOutlined
                            onClick={() => remove(name)}
                            className="text-red-500 cursor-pointer"
                          />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                          className="bg-gray-100 text-blue-500"
                        >
                          Add Key Benefit
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>

              <Form.Item
                label={<span className="font-semibold">Description</span>}
                name="description"
              >
                <TextArea rows={4} placeholder="Enter Description" />
              </Form.Item>
            </div>

            {/* Right Section */}
            <div className="flex flex-col gap-4">
              <Form.Item
                label={<span className="font-semibold">Set Price</span>}
                name="amount"
                rules={[{ required: true, message: "Please enter the price" }]}
              >
                <Input className="py-3" placeholder="Enter Price" />
              </Form.Item>

              <Form.Item
                label={<span className="font-semibold">Ad Image</span>}
                name="image"
              >
                {singleAd?.data?.attributes?.image && fileList.length === 0 ? (
                  <img
                    className="w-20 h-20 mb-5"
                    src={url + singleAd?.data?.attributes?.image}
                    alt="Ad Preview"
                  />
                ) : null}
                <Upload
                  className="!border-none !outline-none w-full h-[300px]"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={beforeUpload} // Handle before upload
                >
                  {fileList.length < 1 && (
                    <div className="flex flex-col items-center justify-center cursor-pointer">
                      <UploadOutlined className="text-4xl text-gray-500" />
                      <p className="mt-2 text-gray-600 text-sm">Upload Ad Image</p>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primaryBg text-whiteText hover:bg-[#1e66ca] font-semibold px-20 py-3 rounded-md"
            >
              Publish Ad
            </button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default AddBannerAds;
