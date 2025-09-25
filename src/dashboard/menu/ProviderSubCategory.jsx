import { FaStar } from "react-icons/fa6";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useGetProviderCategoryProductsQuery } from "../../redux/features/auth/heashboard/providerProducts";
import url from "../../redux/api/baseUrl";

export default function ProviderSubCategory() {
  const { id } = useParams(); // Get the sub-category ID from the URL
  const [searchParams] = useSearchParams(); // Get query parameters
  const categoryId = searchParams.get("categoryId"); // Extract categoryId from the query params

  console.log("Sub-category ID:", id); // Log the sub-category ID
  console.log("Category ID:", categoryId); // Log the category ID

  // Fetch the sub-category products
  const { data: subCategory, isLoading, error } = useGetProviderCategoryProductsQuery({ categoryId, id });

  if (isLoading) {
    return <div className="text-center text-lg">Loading Products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading products. Please try again later.</div>;
  }

  const products = subCategory?.data?.attributes?.results || [];


  console.log(products);

  return (
    <div>
      <div className=" bg-[#e8ebf0] rounded-md pb-20 mt-10">
        <h2 className="mb-5 p-5 text-[20px] font-semibold text-[#1397d5]">
          Sub-Category Products
        </h2>
        <div className="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5 my-10 p-5">
          {products.map((product, idx) => (
            <div key={idx} className="min-w-[200px]  border rounded-md bg-white border-[#d8d8d8] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                className="w-full h-[200px] object-cover rounded-md"
                src={url + '' + product.images[0]} // Fallback image if none provided
                alt={product.name || "Product"}
              />
              <div className="px-3 py-2">
                <h3 className="text-[20px] font-semibold capitalize">{product.name || "Product Name"}</h3>
                <p className="my-1">{product.description}</p>
                <div className="flex items-center justify-between">
                  <h2 className="text-[20px] font-semibold text-[#0364d3]">${product.initialPrice || "N/A"}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
