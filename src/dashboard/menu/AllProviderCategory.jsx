import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import brandLogoImage from '/image/handsome-man.png'
import { Link, useParams } from "react-router-dom";
import { useGetSingleProviderQuery } from "../../redux/features/auth/heashboard/singleProvider";
import url from "../../redux/api/baseUrl";

export default function AllProviderCategory() {

  const { id } = useParams();
  const { data: SingleProvider, isLoading } = useGetSingleProviderQuery(id);
  if (isLoading) {
    return <div className="h-[80vh] w-full flex items-center justify-center">
      <div className="relative">
        <img className="w-48" src="/image/Loading_image.gif" alt="" />
      </div>
    </div>;
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const halfStar = rating % 1 !== 0; // Check if there's a half star
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

    console.log(SingleProvider);

    return (
      <>
        {Array.from({ length: fullStars }).map((_, i) => (
          <FaStar key={`full-${i}`} className="text-[#ffd33c]" />
        ))}
        {halfStar && <CiStar className="text-[#ffd33c]" />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <CiStar key={`empty-${i}`} className="text-gray-400" />
        ))}
      </>
    );
  };

  return (
    <div className=" bg-[#e8ebf0] rounded-md pb-20 mt-10">
      <div className="p-5 flex items-center gap-5">
        <img className="w-36 h-36 rounded-full" src={url + '' + SingleProvider?.data?.provider?.image} alt="" />
        <div>
          <h2 className="mb-2 flex items-center gap-2 font-semibold">
            <span className="text-[20px] font-bold text-[#1397d5]">
              {SingleProvider?.data?.provider?.fullName}
            </span>{" "}
            {renderStars(SingleProvider?.data?.provider?.review?.rating || 0)} ({SingleProvider?.data?.provider?.review?.rating}.00)
          </h2>
          <p className="">
            {SingleProvider?.data?.provider?.bio}
          </p>
        </div>
      </div>
      <hr className="border-none bg-[#d8d8d8] h-[2px] w-full block my-5" />
      <div className="grid xl:grid-cols-5 lg:grid-cols-3 grid-cols-2 gap-5 my-10">
        {SingleProvider?.data?.providerCategory.map((item, idx) => {
          return (
            <Link to={`/dashboard/provider/category/${item.id}`} key={idx} className="block">
              <img
                className="w-full h-[220px] "
                src={url + '' + item.image}
                alt="Category"
              />
              <h3 className="text-[25px] font-semibold ml-2 mt-2">{item.categoryName}</h3>
              {/* Assuming static 5.0 for categories */}
              {/* <span className="flex items-center gap-2">
                {renderStars(5)} 
              </span> */}
            </Link>
          );
        })}
      </div>
      <div>
        <h2 className="text-[20px] font-bold text-[#1397d5] mb-5 ">Rating</h2>
        {SingleProvider?.data?.providerReview.map((item, idx) => {
          return (
            <div key={idx}>
              <Link className="flex gap-3 items-center">
                <img className="w-12" src={brandLogoImage} alt="" />
                <div className="flex justify-between w-full">
                  <div>
                    <h3>{item?.reviewer?.fullName}</h3>
                    <div className="flex gap-1 items-center">
                      {renderStars(item?.rating || 0)} ({item?.rating || 0}.00)
                    </div>
                  </div>
                  <h3 className="text-sm text-gray-400">
                    {item?.reviewer?.createdAt
                      ? new Date(item.reviewer.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                      : "Unknown date"}
                  </h3>
                </div>
              </Link>
              <br />
              <p>{item?.reviewText || "No review text provided."}</p>
            </div>
          );
        })}
      </div>
    </div>
  )
}
