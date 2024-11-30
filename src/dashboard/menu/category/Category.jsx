import { useState } from "react";
import { Button, Form, Input, Modal, Upload } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined
} from "@ant-design/icons";
import { TbCameraPlus } from "react-icons/tb";     
import { useGetCategoriesQuery } from "../../../redux/features/auth/profile/getCategories";
// import { useGetProfileQuery } from "../../../redux/features/auth/profile/getProfile";
// import category1 from './../../../../public/image/category1.png'
// import category2 from './../../../../public/image/category2.png'
// import category3 from './../../../../public/image/category3.png'

// const categories = [
//   {
//     id: 1,
//     name: "Category Name",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6WF_YS6V_XSRU_f-a5dzEwTffIK7NFmV-Gw&s"
//   },
//   {
//     id: 2,
//     name: "Category Name",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqw8muly6Bp4CHdfDpadPwLmAgun90ANzYng5zfFjsbsQaLTm04iKXvb_P_5C4ekU79As&usqp=CAU"
//   },
//   {
//     id: 3,
//     name: "Category Name",
//     image:
//       "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202210/64e01bf1f7dbd9099e249e9c3247fdbb9a46b4b1-1280x720-sixteen_nine.jpg?size=948:533"
//   },
//   {
//     id: 4,
//     name: "Category Name",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW0mlewfpyL1NE2tKxp25aexWDiI9zp_GMYxZcj-6Ud94atnOBWj5A6GwfSshkh2-3gY0&usqp=CAU"
//   }
// ];

const Category = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const {data } = useGetCategoriesQuery()
  const categories = data?.data?.attributes?.results ;
  
  console.log(categories)



  const openModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = async (value) => {
    console.log("Description:", value.name);
    console.log("Image URL:", imageUrl);
    console.log("file:", imageFile);

    const formData = new FormData();

    // Append the description and image file to the FormData object
    formData.append("description", value.description);
    if (imageFile) {
      formData.append("file", imageFile);
    }
    console.log(formData);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleChange = (info) => {
    let fileList = [...info.fileList];

    // We only keep the latest file in the list to replace the previous image
    fileList = fileList.slice(-1);

    if (fileList[0] && fileList[0].originFileObj) {
      const imagePreviewUrl = URL.createObjectURL(fileList[0].originFileObj);
      setImageUrl(imagePreviewUrl);
      setImageFile(fileList[0].originFileObj);
    } else {
      setImageUrl(null);
      setImageFile(null);
    }
  };

  return (
    <div className=" mt-12 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-header">Category</h2>
        <Button
          onClick={openModal}
          icon={<PlusOutlined />}
          className="flex items-center p-5 !bg-primaryBg !text-whiteText"
        >
          Add Category
        </Button>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
        {categories?.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <img
              src={`http://192.168.10.169:6089${category?.image}`}
              alt={category.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <p className="text-lg font-semibold">{category.categoryName}</p>
              <div className="flex justify-center mt-4 space-x-2">
                <Button
                  type="default"
                  icon={<EditOutlined />}
                  className="!bg-primaryBg !text-whiteText"
                >
                  Edit
                </Button>
                <Button
                  type="default"
                  icon={<DeleteOutlined />}
                  danger
                  className="!bg-[#E8EBF0] text-white"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
        closeIcon={
          <CloseOutlined
            style={{
              color: "white", // Icon color
              backgroundColor: "#de0a26", // Background color of the close icon
              borderRadius: "10%", // Rounded background
              padding: "10px" // Padding inside the background
            }}
          />
        }
      >
        <div>
          <div className="pt-8">
            <h1 className="text-header text-center">Add New Category</h1>
            <Form
              className="ant-upload"
              name="form_item_path"
              layout="vertical"
              onFinish={onFinish}
              style={{ marginTop: "44px" }}
            >
              {/* Upload */}
              <Form.Item
                label="image upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                className="w-[200px]"
              >
                <Upload
                  listType="picture-card"
                  showUploadList={false}
                  onChange={handleChange}
                  beforeUpload={() => false}
                  className="ant-upload-select"
                  placeholder="image"
                >
                  {imageUrl ? (
                    <div className="relative overflow-hidden max-h-72">
                      <img
                        src={imageUrl}
                        alt="Uploaded"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "4px",
                          overflow: "hidden"
                        }}
                      />
                      <TbCameraPlus className="text-[44px] absolute top-[40%] left-[40%] opacity-60 text-white" />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "4px"
                      }}
                    >
                      <TbCameraPlus className="text-6xl text-[#193664]" />
                    </div>
                  )}
                </Upload>
              </Form.Item>

              {/* TextArea */}
              <Form.Item name="name" label="category name">
                <Input
                  placeholder="category name"
                  style={{ maxWidth: "1000px", padding: "10px" }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  style={{
                    backgroundColor: "#193664",
                    color: "#fff",
                    height: "56px"
                  }}
                  htmlType="submit"
                  className="  h-[36px] py-4 mt-2 text-white hover:border-none border-none rounded-2xl"
                >
                  Category added
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Category;
