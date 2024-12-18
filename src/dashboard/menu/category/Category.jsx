import { useState } from "react";
import { Button, Form, Input, Modal, Upload } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { TbCameraPlus } from "react-icons/tb";
import { useGetCategoriesQuery } from "../../../redux/features/auth/profile/getCategories";
import { useDeleteCategoriesMutation } from "../../../redux/features/auth/heashboard/deleteCategory";
import { useCreatePostMutation } from "../../../redux/features/auth/heashboard/postCategory";
import { Link } from "react-router-dom";

const Category = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpenEdit(false);
  };

  // Fetch Categories
  const { data , isLoading } = useGetCategoriesQuery();
  console.log(data);



  // Mutation Hooks
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoriesMutation();
  const [postCategory, { isLoading: isPostLoading }] = useCreatePostMutation();

  const categories = data?.data?.attributes?.results;

  // Modal Open Handler
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Form Submit Handler for Adding a Category
  const onFinish = async (value) => {
    console.log("Category Name:", value.categoryName); // Category name from form
    console.log("Image URL:", imageUrl); // Image preview URL
    console.log("File:", imageFile); // Image file object

    // Prepare the form data
    const formData = new FormData();
    formData.append("categoryName", value.categoryName);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await postCategory(formData).unwrap();
      console.log("Category created successfully:", response);
      setIsModalOpen(false); // Close modal after successful post
    } catch (err) {
      console.error("Failed to create category:", err);
    }
  };

  // Form Submit Handler for Editing a Category

  // File Change Handler (for image upload)
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

  // Delete Category Handler
  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId).unwrap(); // Trigger the delete mutation
      // Optionally handle successful deletion, like showing a success message
    } catch (err) {
      // Optionally handle errors, e.g., show an error message
      console.error("Failed to delete category:", err);
    }
  };

  if (isLoading) return <div className="text-[30px] text-[#fd3131] text-center mt-10">Category Loading...</div>;


  return (
    <div className="mt-10 pb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-header">Category</h2>
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
            <Link to={`/dashboard/category/sub-category/${category.id}`}>
              <img
                src={`http://192.168.10.169:6089${category?.image}`}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-4 text-center">
              <p className="text-lg font-semibold">{category.categoryName}</p>
              <div className="flex justify-center mt-4 space-x-2">
                <Link to={`/dashboard/category/update/${category.id}`}>
                  <Button
                    type="default"
                    icon={<EditOutlined />}
                    className="!bg-primaryBg !text-whiteText"
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  type="default"
                  icon={<DeleteOutlined />}
                  danger
                  className="!bg-[#E8EBF0] text-white"
                  onClick={() => handleDelete(category.id)} // Attach the delete handler
                  loading={isDeleting} // Show loading state when deleting
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      <Modal
        title="Add Category"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          className="ant-upload"
          name="form_item_path"
          layout="vertical"
          onFinish={onFinish}
          style={{ marginTop: "44px" }}
        >
          {/* Upload */}
          <Form.Item
            label="Image Upload"
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

          {/* Category Name Input */}
          <Form.Item name="categoryName" label="Category Name">
            <Input
              placeholder="Category Name"
              style={{ maxWidth: "1000px", padding: "10px" }}
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              style={{
                backgroundColor: "#193664",
                color: "#fff",
                height: "56px"
              }}
              htmlType="submit"
              className="h-12 !bg-primaryBg !text-whiteText"
              loading={isPostLoading} // Add loading state for post request
            >
              {isPostLoading ? "Saving..." : "Save Category"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Category;
