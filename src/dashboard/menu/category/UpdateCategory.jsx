import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react"; 
import url from "../../../redux/api/baseUrl";
import { useCreateUpdateCategoryMutation } from "../../../redux/features/auth/heashboard/updateCategory";
import { FaArrowLeft } from "react-icons/fa6";


export default function UpdateCategory() {

  const navigate = useNavigate();

  const { id } = useParams(); // Get category ID from URL
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    image: null,
  });

  const [updateCategory, { isError, isLoading }] = useCreateUpdateCategoryMutation();

  // Fetch the category data when the component is mounted
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        // Fetching category data from the backend (replace with actual API call)
        const response = await fetch(`${url}/api/v1/category/${id}`);
        const data = await response.json();
        
        // Set fetched category data (image could be a URL or a file)
        setCategoryData({
          categoryName: data.categoryName,
          image: data.image ? data.image : null, // Ensure image is handled
        });
      } catch (error) {
        console.error("Failed to fetch category data:", error);
      }
    };

    fetchCategory();
  }, [id]);

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("categoryName", categoryData.categoryName);
  
    if (categoryData.image) {
      formData.append("image", categoryData.image);
    }
  
    // Log FormData content (for debugging)
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      // Send the updated data to the backend
      await updateCategory({ id, newPost: formData }).unwrap();
      console.log("Category updated successfully!");

      // Reset form data after successful update
      setCategoryData({
        categoryName: "",
        image: null,
      });

      alert('Category updated successfully!');
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryData((prevData) => ({
        ...prevData,
        image: file, // Update the image file in state
      }));
    }
  };

  return (
    <div className="mt-20">
     <button
      className="bg-primaryBg text-[#fff] py-2 px-5 rounded flex justify-center items-center gap-2 w-48 font-semibold"
      onClick={() => navigate(-1)} // Go back to the previous page
    >
      <FaArrowLeft /> Back To Previus
    </button>
      <form onSubmit={handleUpdate} className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
        <div className="mb-6">
          {/* Show image preview */}
          {categoryData.image ? (
            typeof categoryData.image === "string" ? (
              // If image is a string (URL), show it
              <img
                src={categoryData.image}
                alt="Category"
                className="w-32 h-32 object-cover rounded mx-auto"
              />
            ) : (
              // If image is a file, show a preview of it
              <img
                src={URL.createObjectURL(categoryData.image)}
                alt="Category Preview"
                className="w-32 h-32 object-cover rounded mx-auto"

              />
            )
          ) : (
            <p className="text-center text-gray-500">No image selected</p>
          )}
        </div>

        {/* Image Upload Input */}
        <div className="mb-6">
          <input
            type="file"
            name="image"
            required
            onChange={handleFileChange}
            className="block w-full p-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-primaryBg focus:border-primaryBg"
          />
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
          className="w-full py-3 bg-primaryBg !text-[#fff] text-lg font-semibold rounded-lg shadow-md hover:bg-primaryBg/80 focus:outline-none focus:ring-2 focus:ring-primaryBg focus:ring-opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update'}
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
