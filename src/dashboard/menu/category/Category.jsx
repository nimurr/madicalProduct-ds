import { useState } from "react";
import { Button, Form, Input, Modal, Upload, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { TbCameraPlus } from "react-icons/tb";
import { useGetCategoriesQuery } from "../../../redux/features/auth/profile/getCategories";
import { useDeleteCategoriesMutation } from "../../../redux/features/auth/heashboard/deleteCategory";
import { useCreatePostMutation } from "../../../redux/features/auth/heashboard/postCategory";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import url from "../../../redux/api/baseUrl";

const Category = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetCategoriesQuery(pageNumber);
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoriesMutation();
  const [postCategory, { isLoading: isPostLoading }] = useCreatePostMutation();
  const [form] = Form.useForm();  // Create a form instance for handling reset

  const categories = data?.data?.attributes?.results;
  const totalPages = data?.data?.attributes?.totalPages || 1;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = async (value) => {
    const formData = new FormData();
    formData.append("categoryName", value.categoryName);
    formData.append("type", value.type);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await postCategory(formData).unwrap();
      console.log("Category created successfully:", response);
      form.resetFields(); // Reset the form fields after successful post
      setIsModalOpen(false); // Close modal after successful post
      setImageUrl(null);
      setImageFile(null);
    } catch (err) {
      console.error("Failed to create category:", err);
      message.error(err.data?.message);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleChange = (info) => {
    let fileList = [...info.fileList];
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

  const handleDelete = async (categoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCategory(categoryId).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "The category has been deleted.",
            icon: "success",
          });
        } catch (err) {
          console.error("Failed to delete category:", err);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the category. Please try again.",
            icon: "error",
          });
        }
      }
    });
  };

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  if (isLoading) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <div className="relative">
          <img className="w-48" src="/image/Loading_image.gif" alt="" />
        </div>
      </div>
    );
  }

  console.log(categories);

  return (
    <div className="mt-10 pb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-header">Categories</h2>
        <Button
          onClick={openModal}
          icon={<PlusOutlined />}
          className="flex items-center p-5 !bg-primaryBg !text-whiteText"
        >
          Add Categories
        </Button>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {categories?.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <Link to={`/dashboard/category/sub-category/${category.id}`}>
              <img
                src={url + category?.image}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div>
              <p className={`text-xl font-semibold text-center !capitalize my-3 ${category.type == "product" ? "text-[#e4b312]" : "text-[#f55] "}`}>
                {category.type}
              </p>
            </div>
            <div className="p-4 text-center">
              <p className="text-lg font-semibold capitalize">{category.categoryName}</p>
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
                  onClick={() => handleDelete(category.id)}
                  loading={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {
        categories?.length > 0 && (
          <div className="mt-8 flex justify-center items-center gap-2">
            <Button
              onClick={() => handlePageChange(pageNumber - 1)}
              disabled={pageNumber === 1}
              className="flex items-center"
            >
              Previous
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={pageNumber === page ? "!bg-primaryBg !text-[#fff]" : ""}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              onClick={() => handlePageChange(pageNumber + 1)}
              disabled={pageNumber === totalPages}
            >
              Next
            </Button>
          </div>
        )
      }

      {
        categories?.length == 0 && (
          <div className="mt-8 flex justify-center items-center gap-2">
            <h2 className="text-2xl font-semibold text-header text-[#ff4d4d] my-10">No categories found</h2>
          </div>
        )
      }

      {/* Add Category Modal */}
      <Modal
        title="Add Category"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form} // Assign form instance to reset
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

          {/* Type Selection */}
          <Form.Item name="type" label="Type">
            <select
              className="w-full p-2 border border-[#999] rounded"
              style={{ maxWidth: "1000px" }}
              defaultValue={"select"}
            >
              <option value="select">Select Type</option>
              <option value="product">Product</option>
              <option value="service">Service</option>
            </select>
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
