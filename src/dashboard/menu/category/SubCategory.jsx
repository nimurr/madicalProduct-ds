import { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Upload } from "antd";
import {
  PlusOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { TbCameraPlus } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import { useCreatePostSubcategoryMutation } from "../../../redux/features/auth/heashboard/subCategory";
import { useGetSubCategoriesQuery } from "../../../redux/features/auth/heashboard/getSubCategory";
import { useDeleteCategoriesMutation } from "../../../redux/features/auth/heashboard/deleteCategory";

const SubCategory = () => {
  const { id } = useParams(); // Extract category ID from the URL params
  const [categoryName, setCategoryName] = useState(""); // State for category name
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get the mutation hook to create subcategory
  const [createSubcategory, { isLoading: isCreating }] =
    useCreatePostSubcategoryMutation();

  // Fetch subcategories based on dynamic id and categoryName
  const { data, error, isLoading } = useGetSubCategoriesQuery({
    id,
    categoryName
  });
  // console.log(data?.data?.attributes?.results); // Logging the fetched data
  const subCategoryAll = data?.data?.attributes?.results;

  console.log(subCategoryAll);

  const [deleteCategory] = useDeleteCategoriesMutation();

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId).unwrap(); // Trigger the delete mutation
      // Optionally handle successful deletion, like showing a success message
    } catch (err) {
      // Optionally handle errors, e.g., show an error message
      console.error("Failed to delete category:", err);
    }
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
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Call the mutation with category id and form data
    try {
      const response = await createSubcategory({
        id,
        newPost: formData
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

  return (
    <div className="mt-12 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-header">Subcategory</h2>
        <Button
          onClick={openModal}
          icon={<PlusOutlined />}
          className="flex items-center p-5 !bg-primaryBg !text-whiteText"
        >
          Add Subcategory
        </Button>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
        {/* Render subcategories dynamically from the API response */}
        {isLoading && <p>Loading subcategories...</p>}
        {error && <p>Error fetching subcategories.</p>}
        {data &&
          data.subCategories &&
          data.subCategories.length > 0 &&
          data.subCategories.map((subCategory) => (
            <div key={subCategory.id}>
              <h3>{subCategory.name}</h3> {/* Display subcategory name */}
              <img src={subCategory.imageUrl} alt={subCategory.name} />{" "}
              {/* Display subcategory image */}
            </div>
          ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
        {subCategoryAll?.map((category) => (
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
                  // loading={isDeleting} // Show loading state when deleting
                >
                  {/* {isDeleting ? "Deleting..." : "Delete"} */} delete
                </Button>
              </div>
            </div>
          </div>
        ))}
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
              padding: "10px"
            }}
          />
        }
      >
        <div>
          <h1 className="text-header text-center">Add New Subcategory</h1>
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
                  height: "56px"
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
