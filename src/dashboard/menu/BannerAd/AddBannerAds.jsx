import React, { useState } from "react";
import { Input, Upload, Button, Form, Space } from "antd";
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const AddBannerAds = () => {
  const [fileList, setFileList] = useState([]);

  const handleFormSubmit = (values) => {
    console.log("Form Submitted with values:", values);
    console.log("Uploaded File:", fileList);
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <div className="p-6 bg-white border-2 border-[#eee] rounded-lg mt-14">
      <Form onFinish={handleFormSubmit} layout="vertical">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Section */}
          <div className="flex flex-col gap-4">
            <Form.Item
              label={<span className="font-semibold">Ad Title</span>}
              name="adTitle"
              rules={[{ required: true, message: "Please enter Ad Title" }]}
            >
              <Input className="py-3" placeholder="Enter Ad Title" />
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold">Medicine Name</span>}
              name="medicineName"
              rules={[{ required: true, message: "Please enter Medicine Name" }]}
            >
              <Input className="py-3" placeholder="Enter Medicine Name" />
            </Form.Item>

            {/* Dynamically Add Key Benefits */}
            <Form.Item label={<span className="font-semibold">Key Benefits</span>}>
              <Form.List name="keyBenefits">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Space key={key} align="baseline" className="flex justify-between mb-2">
                        <Form.Item
                          {...restField}
                          name={[name]}
                          fieldKey={[fieldKey]}
                          rules={[
                            { required: true, message: "Please enter a Key Benefit" },
                          ]}
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
              name="setPrice"
              rules={[{ required: true, message: "Please enter the price" }]}
            >
              <Input className="py-3" placeholder="Enter Price" />
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold">Ad Image</span>}
              name="adImage"
              valuePropName="fileList"
              getValueFromEvent={handleUploadChange}
            >
              <Upload
                className="!border-none !outline-none w-full h-[300px]"
                listType="picture-card"
                fileList={fileList}
                onChange={handleUploadChange}
                beforeUpload={() => false} // Prevent automatic upload
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
            Create Ad
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AddBannerAds;
