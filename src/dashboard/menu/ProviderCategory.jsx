import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { useParams, Link } from "react-router-dom";
import { useGetProviderAllSubcatogoryQuery } from "../../redux/features/auth/heashboard/providerAllSubcatogory";
import url from "../../redux/api/baseUrl";

export default function ProviderCategory() {
  const { id } = useParams(); // Get provider ID from URL


  const { data: subCategory, isLoading, error } = useGetProviderAllSubcatogoryQuery(id);

  if (isLoading) {
    return <div className="text-center text-xl text-[#616161] mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-[#ff4d4d] mt-10">Failed to load data.</div>;
  }

  return (
    <div className="bg-[#e8ebf0] rounded-md pb-20 mt-10">
      {/* Provider Header */}
      {/* <div className="p-5 flex items-center gap-5">
        <img
          className="w-36 h-36 rounded-full object-cover"
          src={url + subCategory?.data?.provider?.image || "/image/default-avatar.png"}
          alt="Provider"
        />
        <div>
          <h2 className="mb-2 flex items-center gap-2 font-semibold">
            <span className="text-[20px] font-bold text-[#1397d5]">
              {subCategory?.data?.provider?.fullName || "Provider Name"}
            </span>
            <FaStar className="text-orange-400" />
            {subCategory?.data?.provider?.review?.rating || "0.0"}
          </h2>
          <p className="text-[#616161]">
            {subCategory?.data?.provider?.bio ||
              "No bio available for this provider."}
          </p>
        </div>
      </div> */}

      {/* Divider */}

      {/* Subcategories */}
      <h2 className="p-5 text-[20px] font-semibold text-[#1397d5]">Categories</h2>
      <div className="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-2 p-5  gap-5  ">
        {subCategory?.data?.attributes?.results?.map((item, idx) => (
          <Link
            to={`/dashboard/provider/sub-category/${item.id}?categoryId=${id}`}
            key={idx}
            className="min-w-[200px] bg-white  border rounded-md bg-white border-[#d8d8d8] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <img
              className="w-full min-h-[200px] object-cover "
              src={url + item.image || "/image/default-category.png"}
              alt={item.categoryName || "Subcategory"}
            />
            <h3 className="text-2xl  font-semibold p-3">
              {item.categoryName || "Subcategory Name"}
            </h3>
            {/* <span className="flex items-center gap-2 mt-1">
              <FaStar className="text-[#ffd33c]" />
              {item.rating || "0.0"}
            </span> */}
          </Link>
        ))}
      </div>
    </div>
  );
}
