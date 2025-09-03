import { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Upload, message } from "antd";
import { PlusOutlined, CloseOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { TbCameraPlus } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import { useCreatePostSubcategoryMutation } from "../../../redux/features/auth/heashboard/subCategory";
import { useGetSubCategoriesQuery } from "../../../redux/features/auth/heashboard/getSubCategory";
import { useDeleteCategoriesMutation } from "../../../redux/features/auth/heashboard/deleteCategory";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import url from "../../../redux/api/baseUrl";

const SubCategory = () => {
  const { id } = useParams(); // Extract category ID from the URL params
  const [categoryName, setCategoryName] = useState(""); // State for category name
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm(); // Form instance to reset
  const [pageNumber, setPageNumber] = useState(1); // State for pagination
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const { data, error, isLoading } = useGetSubCategoriesQuery({
    id,
    categoryName,
    pageNumber,
  });
  const subCategoryAll = data?.data?.attributes?.results;
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoriesMutation();
  const [createSubcategory, { isLoading: isCreating }] = useCreatePostSubcategoryMutation();

  // Filter subcategories based on search query
  const filteredSubCategories = subCategoryAll?.filter((subcategory) =>
    subcategory.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = async (value) => {
    const formData = new FormData();
    formData.append("categoryName", value.name);
    formData.append("type", value.type); // Add type to form data
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await createSubcategory({
        id,
        newPost: formData,
      }).unwrap();
      console.log("Subcategory created successfully:", response);

      // Reset the form after submission
      form.resetFields(); // Reset all form fields

      // Reset the modal state and image
      setImageUrl(null);
      setImageFile(null);
      setIsModalOpen(false); // Close modal after successful post
      message.success("Subcategory added successfully!"); // Success message
    } catch (err) {
      console.error("Failed to create subcategory:", err);
      message.error(err.data?.message || "Something went wrong.");
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
    fileList = fileList.slice(-1); // Keep only the latest file
    if (fileList[0] && fileList[0].originFileObj) {
      const imagePreviewUrl = URL.createObjectURL(fileList[0].originFileObj);
      setImageUrl(imagePreviewUrl);
      setImageFile(fileList[0].originFileObj);
    } else {
      setImageUrl(null);
      setImageFile(null);
    }
  };

  // Handle page change (pagination)
  const handlePageChange = (page) => {
    setPageNumber(page); // Update the current page number
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
          await deleteCategory(categoryId).unwrap(); // Trigger the delete mutation
          Swal.fire({
            title: "Deleted!",
            text: "The category has been deleted successfully.",
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

  return (
    <div className="mt-12 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Link
          to={"/dashboard/category"}
          className="text-2xl font-bold text-header flex items-center gap-3"
        >
          <FaArrowLeft />
          Sub Categories
        </Link>

        <div className="flex items-center gap-3">
          <label htmlFor="">
            <input
              type="text"
              name="search"
              placeholder="Search by Name"
              className="p-2 !rounded-lg border-2 border-[#eee]"
              id=""
              value={searchQuery} // Bind search input to state
              onChange={handleSearchChange} // Update search query on input change
            />
          </label>
          <Button
            onClick={openModal}
            icon={<PlusOutlined />}
            className="flex items-center p-5 !bg-primaryBg !text-whiteText"
          >
            Add SubCategory
          </Button>
        </div>
      </div>

      {/* SubCategory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {/* Show loading state */}
        {isLoading && (
          <div className="h-[80vh] w-full flex items-center justify-center">
            <div className="relative">
              <img className="w-48 ml-20" src="/image/Loading_image.gif" alt="" />
            </div>
          </div>
        )}
        {/* Show error state */}
        {error && <p>Error fetching subcategories.</p>}

        {filteredSubCategories?.map((subcategory) => (
          <div
            key={subcategory.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <img
              src={`${url}${subcategory?.image}`}
              alt={subcategory.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 text-center">
              <div>
                <p
                  className={`text-xl font-semibold text-center capitalize my-3 ${
                    subcategory.type === "product" ? "text-[#afaf1b]" : "text-[#f55]"
                  }`}
                >
                  {subcategory.type}
                </p>
              </div>
              <p className="text-lg font-semibold">{subcategory.categoryName}</p>
              <div className="flex justify-center mt-4 space-x-2">
                <Link to={`/dashboard/category/update/${subcategory.id}`}>
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
                  onClick={() => handleDelete(subcategory.id)} // Attach the delete handler
                  loading={isDeleting} // Show loading state when deleting
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filteredSubCategories?.length > 0 && (
        <div className="mt-4 flex justify-center">
          <Button
            onClick={() => handlePageChange(pageNumber - 1)}
            disabled={pageNumber === 1}
            className="mr-4"
          >
            Previous
          </Button>
          <Button onClick={() => handlePageChange(pageNumber + 1)}>Next</Button>
        </div>
      )}

      {filteredSubCategories?.length === 0 && (
        <div className="mt-8 flex justify-center items-center gap-2">
          <h2 className="text-2xl font-semibold text-header text-[#ff4d4d] my-10">
            No subcategories found
          </h2>
        </div>
      )}

      {/* Add SubCategory Modal */}
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
        closeIcon={
          <CloseOutlined
            style={{
              color: "white",
              backgroundColor: "#de0a26",
              borderRadius: "10%",
              padding: "10px",
            }}
          />
        }
      >
        <div>
          <h1 className="text-[30px] text-center font-semibold">
            Add New Subcategory
          </h1>
          <Form
            form={form} // Assign form instance to reset
            name="form_item_path"
            layout="vertical"
            onFinish={onFinish}
            style={{ marginTop: "44px" }}
          >
            {/* Upload Image */}
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
                        overflow: "hidden",
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
                      borderRadius: "4px",
                    }}
                  >
                    <TbCameraPlus className="text-6xl text-[#193664]" />
                  </div>
                )}
              </Upload>
            </Form.Item>

            {/* Type Select Dropdown */}
            <Form.Item name="type" label="Type">
              <select
                className="w-full p-2 border border-[#999] rounded"
                style={{ maxWidth: "1000px" }}
              >
                <option value="selectYourType">Select Type</option>
                <option value="product">Product</option>
                <option value="service">Service</option>
              </select>
            </Form.Item>

            {/* Subcategory Name Input */}
            <Form.Item name="name" label="Subcategory Name">
              <Input
                placeholder="Subcategory name"
                style={{ maxWidth: "1000px", padding: "10px" }}
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                style={{
                  backgroundColor: "#193664",
                  color: "#fff",
                  height: "56px",
                }}
                htmlType="submit"
                className="h-[36px] py-4 mt-2 text-white hover:border-none border-none rounded-2xl"
              >
                {isCreating ? "Adding..." : "Add Subcategory"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default SubCategory;
