import { useState, useEffect } from "react";
import { Button, Input, Modal, message } from "antd";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetSingleCategoriesQuery } from "../../../redux/features/auth/profile/getCategories";
import { useCreateUpdateCategoryMutation } from "../../../redux/features/auth/heashboard/updateCategory";
import url from "../../../redux/api/baseUrl";

export default function UpdateCategory() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get category ID from URL

  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    image: null,
    imagePreview: null, // For previewing the uploaded image
    type: "product", // Default type
  });

  const [updateCategory, { isError, isLoading }] = useCreateUpdateCategoryMutation();
  const { data: categoryItem } = useGetSingleCategoriesQuery(id); // Fetch category data

  // Update state with fetched category data
  useEffect(() => {
    if (categoryItem?.data?.attributes) {
      setCategoryData((prevData) => ({
        ...prevData,
        categoryName: categoryItem.data.attributes.categoryName,
        imagePreview: url + categoryItem.data.attributes.image,
      }));
    }
  }, [categoryItem]);

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Updating category with data:", categoryData);
    const formData = new FormData();
    formData.append("categoryName", categoryData.categoryName);
    formData.append("type", categoryData.type);
    // Use existing type or default to 'product'

    if (categoryData.image) {
      formData.append("image", categoryData.image);
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Complete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateCategory({ id, newPost: formData }).unwrap();
          Swal.fire({
            title: "Category Updated!",
            text: "The category has been successfully updated.",
            icon: "success",
          });

          // Reset form data after successful update
          setCategoryData({
            categoryName: "",
            image: null,
            imagePreview: null,
            type: "product", // Reset type to default
          });

          // Optionally, reset modal visibility here (if using modal)
          // closeModal(); // Uncomment if using modal's state to handle visibility

          navigate(-1); // Go back to the previous page
        } catch (error) {
          console.error("Error updating category:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to update category. Please try again.",
            icon: "error",
          });
        }
      }
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryData((prevData) => ({
        ...prevData,
        image: file,
        imagePreview: URL.createObjectURL(file), // Preview the uploaded image
      }));
    }
  };

  return (
    <div className="mt-20">
      <button
        className="bg-primaryBg text-[#fff] py-2 px-5 rounded flex justify-center items-center gap-2 w-48 font-semibold"
        onClick={() => navigate(-1)} // Go back to the previous page
      >
        <FaArrowLeft /> Back To Previous
      </button>

      <form
        onSubmit={handleUpdate}
        className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg md:mt-0 mt-10"
      >
        <div className="mb-6">
          {/* Show image preview */}
          {categoryData.imagePreview ? (
            <img
              src={categoryData.imagePreview}
              alt="Category Preview"
              className="w-32 h-32 object-cover rounded mx-auto"
            />
          ) : (
            <p className="text-[#f11]">No image available</p>
          )}
        </div>

        {/* Image Upload Input */}
        <div className="">
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="block w-full p-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-primaryBg focus:border-primaryBg"
          />
        </div>

        {/* Type Selection */}
        <div className="mb-6">
          <select
            className="w-full p-2 border my-5 border-[#999] rounded"
            style={{ maxWidth: "1000px" }}
            value={categoryData.type}
            onChange={(e) =>
              setCategoryData((prevData) => ({
                ...prevData,
                type: e.target.value,
              }))
            }
            defaultValue={"selectCategory"}
          >
            <option value="product">Product</option>
            <option value="service">Service</option>
          </select>
        </div>

        {/* Category Name Input */}
        <div className="mb-6">
          <input
            type="text"
            name="categoryName"
            placeholder="Category Name"
            required
            value={categoryData.categoryName}
            onChange={(e) =>
              setCategoryData((prevData) => ({
                ...prevData,
                categoryName: e.target.value,
              }))
            }
            className="block w-full p-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-primaryBg focus:border-primaryBg"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-primaryBg text-[#fff] text-lg font-semibold rounded-lg shadow-md hover:bg-primaryBg/80 focus:outline-none focus:ring-2 focus:ring-primaryBg focus:ring-opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update"}
        </button>

        {/* Display error message if update fails */}
        {isError && (
          <div className="text-red-500 mt-4 text-center">
            <p>Error updating category. Please try again.</p>
          </div>
        )}
      </form>
    </div>
  );
}
