import { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Upload } from "antd";
import {
  PlusOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
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

  // State for pagination
  const [pageNumber, setPageNumber] = useState(1); // Initial page number

  // Get the mutation hook to create subcategory
  const [createSubcategory, { isLoading: isCreating }] =
    useCreatePostSubcategoryMutation();

  // Fetch subcategories based on dynamic id and categoryName
  const { data, error, isLoading } = useGetSubCategoriesQuery({
    id,
    categoryName,
    pageNumber,
  });
  // Subcategories fetched from the API
  const subCategoryAll = data?.data?.attributes?.results;

  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoriesMutation();

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
          // Optionally handle UI updates or fetch updated data here
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

  useEffect(() => {
    // You can dynamically set the categoryName based on your logic
    if (data && data.category) {
      setCategoryName(data.category.name); // Assuming categoryName is available in the response
    }
  }, [data]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = async (value) => {
    console.log("Subcategory Name:", value.name); // Subcategory name from form
    console.log("Image URL:", imageUrl); // Image preview URL
    console.log("File:", imageFile); // Image file object

    // Prepare the form data
    const formData = new FormData();
    formData.append("categoryName", value.name);
    formData.append("type", value.type); // Add type to form data
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Call the mutation with category id and form data
    try {
      const response = await createSubcategory({
        id,
        newPost: formData,
      }).unwrap();
      console.log("Subcategory created successfully:", response);
      setIsModalOpen(false); // Close modal after successful post
    } catch (err) {
      console.error("Failed to create subcategory:", err);
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

  // Handle page change (pagination)
  const handlePageChange = (page) => {
    setPageNumber(page); // Update the current page number
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
        <Button
          onClick={openModal}
          icon={<PlusOutlined />}
          className="flex items-center p-5 !bg-primaryBg !text-whiteText"
        >
          Add SubCategory
        </Button>
      </div>

      {/* Category Grid */}
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

        {/* Display fetched subcategories */}
        {subCategoryAll?.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <img
              src={`${url}${category?.image}`}
              alt={category.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 text-center">
              <div>
                <p className={`text-xl font-semibold text-center my-3 ${category.type == "product" ? "text-[#afaf1b]" : "text-[#f55]"}`}>{category.type}</p>
              </div>
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
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
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

      {/* Modal to Add Subcategory */}
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

            <Form.Item name="type" label="Type">
              <select
                className="w-full p-2 border border-[#999] rounded"
                style={{ maxWidth: "1000px" }}
              >
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
